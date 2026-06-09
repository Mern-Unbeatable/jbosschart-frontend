import { connect as connectTwilioVideo, createLocalAudioTrack, createLocalVideoTrack } from 'twilio-video';

class TwilioVideoService {
    constructor() {
        this.room = null;
        this.localTracks = [];
        this.isMuted = false;
        this.isVideoOff = false;
        this._audioContainer = null;
        this._participantListeners = new Map();
    }

    _getAudioContainer() {
        if (!this._audioContainer) {
            let container = document.getElementById('twilio-audio-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'twilio-audio-container';
                container.style.cssText =
                    'position:fixed;width:0;height:0;opacity:0;pointer-events:none;overflow:hidden;';
                document.body.appendChild(container);
            }
            this._audioContainer = container;
        }
        return this._audioContainer;
    }

    _cleanupBeforeConnect() {
        this._participantListeners.forEach((listeners, participant) => {
            listeners.forEach(({ event, fn }) => {
                try { participant.off(event, fn); } catch (_) {}
            });
        });
        this._participantListeners.clear();

        this.localTracks.forEach(track => {
            try { track.stop(); track.detach().forEach(el => el.remove()); } catch (_) {}
        });
        this.localTracks = [];

        if (this.room) {
            try { this.room.removeAllListeners(); this.room.disconnect(); } catch (_) {}
            this.room = null;
        }

        if (this._audioContainer) {
            this._audioContainer.innerHTML = '';
        }
    }

    async _getLocalTracks(callType) {
        const tracks = [];
        try {
            const audioTrack = await createLocalAudioTrack();
            tracks.push(audioTrack);
        } catch (e) {
            console.warn('⚠️ No microphone:', e.message);
        }
        if (callType === 'VIDEO') {
            try {
                const videoTrack = await createLocalVideoTrack({ width: 640, height: 480 });
                tracks.push(videoTrack);
            } catch (e) {
                console.warn('⚠️ No camera:', e.message);
            }
        }
        return tracks;
    }

    // ✅ FIX 1: Audio attach is now robust — setAttribute + multiple gesture unlocks
    _attachTrack(track, remoteVideoRef) {
        if (track.kind === 'audio') {
            const audioContainer = this._getAudioContainer();
            const el = track.attach();

            // ✅ Set both property AND attribute — some browsers need the attribute
            el.autoplay = true;
            el.playsInline = true;
            el.muted = false;
            el.volume = 1;
            el.setAttribute('autoplay', '');
            el.setAttribute('playsinline', '');

            audioContainer.appendChild(el);

            const tryPlay = () => {
                const p = el.play();
                if (p) p.catch(() => setTimeout(() => el.play().catch(() => {}), 500));
            };

            tryPlay();

            // ✅ Unlock on ANY user gesture — covers mobile + desktop
            const unlock = () => { tryPlay(); };
            ['click', 'touchstart', 'keydown', 'pointerdown'].forEach(evt =>
                document.addEventListener(evt, unlock, { once: true, passive: true })
            );

        } else if (track.kind === 'video') {
            if (!remoteVideoRef) return;
            const el = track.attach();
            el.style.position = 'absolute';
            el.style.top = '0';
            el.style.left = '0';
            el.style.width = '100%';
            el.style.height = '100%';
            el.style.objectFit = 'cover';
            el.autoplay = true;
            el.playsInline = true;
            el.setAttribute('autoplay', '');
            el.setAttribute('playsinline', '');
            remoteVideoRef.appendChild(el);
        }
    }

    _attachParticipant(participant, remoteVideoRef) {
        const listeners = [];

        const subscribeToPublication = (publication) => {
            if (publication.isSubscribed && publication.track) {
                this._attachTrack(publication.track, remoteVideoRef);
            } else if (!publication.isSubscribed) {
                publication.subscribe().catch(err => {
                    console.warn('subscribe() error:', err.message);
                });
            }
        };

        participant.tracks.forEach(publication => {
            subscribeToPublication(publication);
        });

        const onTrackPublished = (publication) => {
            subscribeToPublication(publication);
        };
        participant.on('trackPublished', onTrackPublished);
        listeners.push({ event: 'trackPublished', fn: onTrackPublished });

        const onSubscribed = (track) => {
            this._attachTrack(track, remoteVideoRef);
        };
        participant.on('trackSubscribed', onSubscribed);
        listeners.push({ event: 'trackSubscribed', fn: onSubscribed });

        const onUnsubscribed = (track) => {
            track.detach().forEach(el => el.remove());
        };
        participant.on('trackUnsubscribed', onUnsubscribed);
        listeners.push({ event: 'trackUnsubscribed', fn: onUnsubscribed });

        this._participantListeners.set(participant, listeners);
    }

    async connectVideo(token, roomName, localVideoRef, remoteVideoRef) {
        this._cleanupBeforeConnect();

        const localTracks = await this._getLocalTracks('VIDEO');
        this.localTracks = localTracks;

        this.room = await connectTwilioVideo(token, {
            name: roomName,
            tracks: localTracks,
            // ✅ FIX 2: Use group-small for proper track subscription behavior
            type: 'group',
        });

        console.log('✅ Connected to video room:', this.room.name);

        // Show local camera in PiP
        localTracks.forEach(track => {
            if (track.kind === 'video' && localVideoRef) {
                const el = track.attach();
                el.style.position = 'absolute';
                el.style.top = '0';
                el.style.left = '0';
                el.style.width = '100%';
                el.style.height = '100%';
                el.style.objectFit = 'cover';
                el.autoplay = true;
                el.playsInline = true;
                el.setAttribute('autoplay', '');
                el.setAttribute('playsinline', '');
                localVideoRef.innerHTML = '';
                localVideoRef.appendChild(el);
            }
        });

        // Wire up remote participants already in the room
        this.room.participants.forEach(participant => {
            this._attachParticipant(participant, remoteVideoRef);
        });

        // Wire up participants who join after us
        this.room.on('participantConnected', participant => {
            this._attachParticipant(participant, remoteVideoRef);
        });

        this.room.on('participantDisconnected', participant => {
            participant.tracks.forEach(pub => {
                if (pub.track) pub.track.detach().forEach(el => el.remove());
            });
            this._participantListeners.delete(participant);
        });

        this.room.on('disconnected', () => { this.cleanup(); });

        return this.room;
    }

    async connectAudio(token, roomName, onConnect, onDisconnect) {
        this._cleanupBeforeConnect();

        const localTracks = await this._getLocalTracks('PHONE');
        this.localTracks = localTracks;

        this.room = await connectTwilioVideo(token, {
            name: roomName,
            tracks: localTracks,
        });

        console.log('✅ Connected to audio room:', this.room.name);

        // ✅ FIX 3: attach existing participants immediately
        this.room.participants.forEach(participant => {
            this._attachParticipant(participant, null);
        });

        this.room.on('participantConnected', participant => {
            this._attachParticipant(participant, null);
            onConnect?.();
        });

        this.room.on('participantDisconnected', participant => {
            participant.tracks.forEach(pub => {
                if (pub.track) pub.track.detach().forEach(el => el.remove());
            });
            onDisconnect?.();
        });

        this.room.on('disconnected', () => {
            this.cleanup();
            onDisconnect?.();
        });

        if (this.room.participants.size > 0) {
            setTimeout(() => onConnect?.(), 200);
        }

        return this.room;
    }

    mute() {
        this.localTracks.forEach(t => { if (t.kind === 'audio') t.disable(); });
        this.isMuted = true;
    }

    unmute() {
        this.localTracks.forEach(t => { if (t.kind === 'audio') t.enable(); });
        this.isMuted = false;
    }

    disableVideo() {
        if (this.room) {
            this.room.localParticipant.videoTracks.forEach(pub => {
                if (pub.track) pub.track.disable();
            });
        }
        this.isVideoOff = true;
    }

    enableVideo() {
        if (this.room) {
            this.room.localParticipant.videoTracks.forEach(pub => {
                if (pub.track) pub.track.enable();
            });
        }
        this.isVideoOff = false;
    }

    cleanup() {
        this._participantListeners.forEach((listeners, participant) => {
            listeners.forEach(({ event, fn }) => {
                try { participant.off(event, fn); } catch (_) {}
            });
        });
        this._participantListeners.clear();

        this.localTracks.forEach(track => {
            try { track.stop(); track.detach().forEach(el => el.remove()); } catch (_) {}
        });
        this.localTracks = [];

        if (this.room) {
            try { this.room.removeAllListeners(); this.room.disconnect(); } catch (_) {}
            this.room = null;
        }

        if (this._audioContainer) {
            this._audioContainer.innerHTML = '';
        }

        this.isMuted = false;
        this.isVideoOff = false;
    }

    disconnect() {
        this.cleanup();
    }
}

export const twilioVideoService = new TwilioVideoService();
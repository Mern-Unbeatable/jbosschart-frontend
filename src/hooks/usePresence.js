import { useState, useEffect, useCallback } from 'react';
import socketService from '../services/socketService';


export function usePresence() {
    const [liveStatuses, setLiveStatuses] = useState({});

    useEffect(() => {
        socketService.on('consultant_status_changed', 'usePresence', ({ userId, status }) => {
            setLiveStatuses((prev) => ({ ...prev, [userId]: status }));
        });

        return () => {
            socketService.off('consultant_status_changed', 'usePresence');
        };
    }, []);
    const getStatus = useCallback(
        (userId, fallback = 'OFFLINE') => {
            if (!userId) return fallback;
            return liveStatuses[userId] ?? fallback;
        },
        [liveStatuses],
    );

    return { liveStatuses, getStatus };
}


export function useConsultantStatus(userId, initialStatus = 'OFFLINE') {
    const [status, setStatus] = useState(initialStatus);

    useEffect(() => {
        setStatus(initialStatus);
    }, [initialStatus]);

    useEffect(() => {
        if (!userId) return;

        const key = `status_${userId}`;
        socketService.on('consultant_status_changed', key, (data) => {
            if (data.userId === userId) {
                setStatus(data.status);
            }
        });

        return () => {
            socketService.off('consultant_status_changed', key);
        };
    }, [userId]);

    return status;
}
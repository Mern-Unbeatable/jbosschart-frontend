// src/components/GlobalCallHandler.jsx
import React, { useState, useEffect } from 'react';
import CallRoom from './CallRoom'; // adjust path as needed

const GlobalCallHandler = () => {
    const [activeCallData, setActiveCallData] = useState(null);

    useEffect(() => {
        const handleOpenCallWindow = (event) => {
            const callData = event.detail;
            if (callData?.callId) {
                setActiveCallData(callData);
            }
        };

        window.addEventListener('open-call-window', handleOpenCallWindow);

        return () => {
            window.removeEventListener('open-call-window', handleOpenCallWindow);
        };
    }, []);

    const handleClose = () => {
        setActiveCallData(null);
    };

    if (!activeCallData) return null;

    return (
        <CallRoom
            callData={activeCallData}
            onClose={handleClose}
        />
    );
};

export default GlobalCallHandler;
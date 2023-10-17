import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";

function Editor() {
    const [content, setContent] = useState("");
    const socket = socketIOClient(ENDPOINT);

    useEffect(() => {
        socket.on('contentUpdate', (updatedContent) => {
            setContent(updatedContent);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const handleChange = (e) => {
        setContent(e.target.value);
        socket.emit('contentChange', e.target.value);
    };

    return (
        <textarea 
            value={content}
            onChange={handleChange}
            rows="20"
            cols="50"
        />
    );
}

export default Editor;

import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Viewpaste = () => {
    const { id } = useParams();
    const pastes = useSelector((state) => state.paste.pastes);
    const paste = pastes.find((p) => p._id === id);

    if (!paste) {
        return <div className="p-4">Paste not found.</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{paste.title}</h1>
            <p className="mt-2">{paste.content}</p>
        </div>
    );
};

export default Viewpaste;

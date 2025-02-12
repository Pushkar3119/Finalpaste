import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletepaste } from '../Redux/Pasteslice';

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleDelete(id) {
        dispatch(deletepaste(id));
    }

    function handleShare(id) {
        const url = `${window.location.origin}/pastes/${id}`;
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">All Pastes</h1>
            {pastes.length === 0 ? (
                <p>No pastes found.</p>
            ) : (
                pastes.map((paste) => (
                    <div key={paste._id} className="border p-3 my-2 rounded-lg flex justify-between">
                        <div>
                            <h3 className="font-bold">{paste.title}</h3>
                        </div>
                        <div>
                            <button
                                className="text-blue-500 mr-2"
                                onClick={() => navigate(`/pastes/${paste._id}`)}
                            >
                                View
                            </button>
                            <button
                                className="text-red-500 mr-2"
                                onClick={() => handleDelete(paste._id)}
                            >
                                Delete
                            </button>
                            <button
                                className="text-purple-500"
                                onClick={() => handleShare(paste._id)}
                            >
                                Share
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Paste;

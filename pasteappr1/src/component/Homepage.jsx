import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { addtopaste, updatetopaste, deletepaste } from '../Redux/Pasteslice';
import { FaSearch, FaCopy, FaTrash, FaEdit, FaShare } from 'react-icons/fa';

const Homepage = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [search, setSearch] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteid");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pastes = useSelector((state) => state.paste.pastes);

    function handleCreatePaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updatetopaste(paste));
        } else {
            dispatch(addtopaste(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    }

    function handleDelete(id) {
        dispatch(deletepaste(id));
    }

    function handleEdit(paste) {
        setTitle(paste.title);
        setValue(paste.content);
        setSearchParams({ pasteid: paste._id });
    }

    function handleShare(id) {
        const url = `${window.location.origin}/pastes/${id}`;
        navigator.clipboard.writeText(url);
        alert("🔗 Link copied to clipboard!");
    }

    function handleCopy(content) {
        navigator.clipboard.writeText(content);
        alert("📋 Content copied!");
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex gap-4">
                <input
                    className="p-3 rounded-xl w-2/3 border shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    placeholder="Enter the title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    onClick={handleCreatePaste}
                    className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-md transition hover:scale-105"
                >
                    {pasteId ? "Update Paste" : "Create Paste"}
                </button>
            </div>
            <textarea
                className="mt-4 w-full p-4 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter the text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={5}
            />

            {/* Search Bar */}
            <div className="flex mt-6 items-center border rounded-xl px-3 py-2 shadow-md bg-white">
                <FaSearch className="text-gray-500" />
                <input
                    type="text"
                    className="w-full px-3 py-2 focus:outline-none"
                    placeholder="Search pastes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Paste List */}
            <div className="mt-6">
                <h2 className="text-2xl font-bold">Your Pastes</h2>
                {pastes.length === 0 ? (
                    <p className="text-gray-500">No pastes available.</p>
                ) : (
                    pastes
                        .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase()))
                        .map((paste) => (
                            <div key={paste._id} className="border p-4 my-3 rounded-lg shadow-md bg-white flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg">{paste.title}</h3>
                                    <p className="text-gray-500 text-sm">{new Date(paste.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        className="text-blue-500 transition hover:scale-110"
                                        onClick={() => navigate(`/pastes/${paste._id}`)}
                                    >
                                        <FaSearch />
                                    </button>
                                    <button
                                        className="text-green-500 transition hover:scale-110"
                                        onClick={() => handleEdit(paste)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="text-red-500 transition hover:scale-110"
                                        onClick={() => handleDelete(paste._id)}
                                    >
                                        <FaTrash />
                                    </button>
                                    <button
                                        className="text-purple-500 transition hover:scale-110"
                                        onClick={() => handleShare(paste._id)}
                                    >
                                        <FaShare />
                                    </button>
                                    <button
                                        className="text-gray-700 transition hover:scale-110"
                                        onClick={() => handleCopy(paste.content)}
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
};

export default Homepage;

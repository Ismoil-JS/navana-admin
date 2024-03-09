import React, { useState } from 'react';
import axios from 'axios';
import './components-style.scss';

const EditCreateNewsModal = ({ id, headers, modalType, modalTitle }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const updateNews = () => {
        if(!title && !description) return alert('Please fill changing fields.');
        axios
            .patch(`http://localhost:9000/api/news/${id}`,
                {
                    title,
                    description
                }, { headers })
            .then(() => {
                alert('News has been updated!');
                window.location.reload();
            })
            .catch(() => {
                alert('An error occurred on update.');
            });
    };

    const createNews = () => {
        if(!title || !description) return alert('Please fill all fields.');
        axios
            .post('http://localhost:9000/api/news',
                {
                    title,
                    description
                }, { headers })
            .then(() => {
                alert('News has been created!');
                window.location.reload();
            })
            .catch(() => {
                alert('An error occurred on create.');
            });
    };

    const handleSubmit = () => {
        if (modalType === 'Edit') {
            updateNews();
        } else {
            createNews();
        }
    }

    return (
        <div className="edit__modal">
            <div className="edit__modal__content">
                <h2>{modalTitle}</h2>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <div className="button-container">
                    <button onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditCreateNewsModal;

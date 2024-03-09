import React, { useState } from 'react';
import axios from 'axios';
import c from './components-style.module.scss';
import useCloudinaryUpload from "../../../../components/UploadWidget";

const EditCreateCarModal = ({ id, headers, modalType, modalTitle }) => {
    const [model, setModel] = useState('');
    const [year, setYear] = useState();
    const [color, setColor] = useState([]);
    const [type, setType] = useState('');
    const [price, setPrice] = useState();
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const { openWidget } = useCloudinaryUpload((imageUrl) => {
        setImage(imageUrl);
    });

    const updateCar = () => {
        axios
            .patch(`http://localhost:9000/api/car/${id}`,
                {
                    model,
                    year,
                    color,
                    type,
                    price,
                    image,
                    description
                }, { headers })
            .then(() => {
                alert('Car has been updated!');
                window.location.reload();
            })
            .catch(() => {
                alert('An error occurred on update.');
            });
    };

    const createCar = () => {
        if (!model || !year || !color || !type || !price || !image || !description) return alert('Please fill all fields.');
        axios
            .post('http://localhost:9000/api/car',
                {
                    model,
                    year,
                    color,
                    type,
                    price,
                    image,
                    description
                }, { headers })
            .then(() => {
                alert('Car has been created!');
                window.location.reload();
            })
            .catch(() => {
                alert('An error occurred on create.');
            });
    };

    const handleSubmit = () => {
        if (modalType === 'Edit') {
            updateCar();
        } else {
            createCar();
        }
    }

    return (
        <div className={c.edit__modal}>
            <div className={c.edit__modal__content}>
                <h2>{modalTitle}</h2>
                <form className={c.input__container}>
                    <input type="text" id="model" name="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model" />
                    <input type="number" id="year" name="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
                    <input type="text" id="color" name="color" value={color} onChange={(e) => setColor(e.target.value.split(','))} placeholder="Color" />
                    <select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Electric">Electric</option>
                        <option value="Benzin">Benzin</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                    <input type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                    <input hidden type="text" placeholder="Product Image..." value={image} readOnly />
                    <button type="button" onClick={openWidget}>Select Image</button>
                    <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                </form>

                <div className={c.button_container}>
                    <button onClick={() => window.location.reload()} style={{ background: "red" }}>Cancel</button>
                    <button onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditCreateCarModal;

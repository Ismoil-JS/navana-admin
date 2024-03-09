import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import c from "./Car.module.scss"
import EditCreateCarModal from './components/edit-create-car-modal';

const Car = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null);
  const [editedCarId, setEditedCarId] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const headers = useMemo(() => {
    return { 'Authorization': localStorage.getItem('token') };
  }, []);

  useEffect(() => {
    axios
      .get('https://api.tasksforwork.uz/api/car', { headers })
      .then((response) => {
        setCars(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [headers]);

  if (loading) {
    return <p>Loading...</p>;
  }

  function deleteCar(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this news?');

    if (confirmDelete) {
      axios
        .delete(`https://api.tasksforwork.uz/api/car/${id}`, { headers })
        .then(() => {
          alert('Car has been deleted!');
          setCars((prevCars) => prevCars.filter((car) => car.id !== id));
        })
        .catch(() => {
          alert('An error occurred. Please try again later.');
        });
    } else {
      alert('Deletion canceled.');
    }
  }

  return (
    <div className={c.all__cars}>
      {cars.map((car) => (
        <div key={car.id} className={c.car}>
          <div className={c.car__info}>
            <div className={c.car_image_and_names}>
              <img src={car.image_url} alt={car.model} className={c.car__image} />
              <div className={c.car__infos}>
                <h2>Model: {car.model}</h2>
                <p><b>Produced year:</b> {car.year}</p>
                <p><b>Colors: </b> {car.color.map((c, index) => <i key={index}>{c}  </i>)}</p>
                <p><b>Type: </b> {car.type}</p>
                <p><b>Price: </b> {car.price}</p>
              </div>
            </div>
            <p><b>Description: </b>{car.description}</p>
          </div>
          <div className={c.car_actions}>
            <button 
              onClick={() => {
              setEditedCarId(car.id);
              setModalType('Edit');
              setModalTitle('Edit Car');}} 
              className={c.car__edit}>
              <FiEdit3 />
            </button>
            <button 
              onClick={() => deleteCar(car.id)} 
              className={c.car__delete}>
              <FiTrash2 />
            </button>
          </div>
        </div>
      ))}
      <button onClick={() => {setModalType('Create'); setModalTitle('Create Car')}} className={c.create__btn}>Create Car</button>
      {modalType && <EditCreateCarModal id={editedCarId} headers={headers} modalType={modalType} modalTitle={modalTitle} />}
    </div>
  );
};

export default Car;

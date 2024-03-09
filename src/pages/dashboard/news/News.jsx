import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import c from './News.module.scss';
import EditCreateNewsModal from './components/edit-create-news-modal';

const News = () => {
  const [news, setNews] = useState([]);
  const [editedNewsId, setEditedNewsId] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const headers = useMemo(() => {
    return { 'Authorization': localStorage.getItem('token') };
  }, []);

  useEffect(() => {
    axios
      .get('https://api.tasksforwork.uz/api/news')
      .then((response) => {
        setNews(response.data);
      })
      .catch(() => {
        alert('An error occurred on load.');
      });
  }, []);

  function deleteNews(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this news?');
    
    if (confirmDelete) {
      axios
        .delete(`https://api.tasksforwork.uz/api/news/${id}`, { headers })
        .then(() => {
          alert('News has been deleted!');
          setNews((prevNews) => prevNews.filter((news) => news.id !== id));
        })
        .catch(() => {
          alert('An error occurred on delete.');
        });
    } else {
      alert('Deletion canceled.');
    }
  }

  return (
    <div className={c.all_news}>
      {news.map((item) => (
        <div key={item.id} className={c.news}>
          <div className="news__content">
            <h3 className={c.news__title}>{item.title}</h3>
            <p className={c.news__description}>{item.description}</p>
          </div>
          <div className={c.news__actions}>
            <button
              onClick={() => {
                setEditedNewsId(item.id);
                setModalType('Edit');
                setModalTitle('Edit News');}}
              className={c.news__edit}
            >
              <FiEdit3 />
              <span>Edit</span>
            </button>
            <button
              onClick={() => deleteNews(item.id)}
              className={c.news__delete}
            >
              <FiTrash2 />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}
      <button onClick={() => {setModalType('Create'); setModalTitle('Creata news')}} className={c.create__btn}>Create News</button>
      {modalType && <EditCreateNewsModal id={editedNewsId} headers={headers} modalType={modalType} modalTitle={modalTitle} />
}
    </div>
  );
};

export default News;

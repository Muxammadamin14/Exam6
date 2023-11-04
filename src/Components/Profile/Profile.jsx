import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = (props) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleLogout = () => {
    window.location.reload(); // Обновляем страницу
    localStorage.removeItem('userData'); // Удаляем данные пользователя из localStorage
    props.history.push('/');
  };

  return (
    <div className="container">
      <h1>Профиль</h1>
      {userData ? (
        <div className="profile-details">
          <p>Имя: {userData.firstName}</p>
          <p>Фамилия: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          <p>Пароль: {userData.password}</p>
          <div className="profile-buttons">
            <Link to="/add" className="btn btn-primary">Создать Новый Товар</Link>
            <Link to="/home" className="btn btn-warning">Товар</Link>
            <button className="btn btn-danger" onClick={handleLogout}>Выйти</button>
          </div>
        </div>
      ) : (
        <div className="profile-not-registered">
          <p>Вы еще не зарегистрированы</p>
          <Link to='/'>Вернуться на главную страницу</Link>
        </div>
      )}
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
        <div>
          <p>Имя: {userData.firstName}</p>
          <p>Фамилия: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          <p>Пароль: {userData.password}</p>
          <button className="btn btn-primary" onClick={handleLogout}>Выйти</button>
          <Link to="/add"><button className='createNewProduct'>Создать Новый Товар</button></Link>
          <Link to="/home"><button className='createNewProduct'>Товар</button></Link>
        </div>
      ) : (
        <Link to='/'>🔄 Уппс , вы еще не зарегестрированы</Link>
      )}
    </div>
  );
};

export default Profile;

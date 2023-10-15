import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    const userData = {
      firstName,
      lastName,
      email,
      password
    };

    const storedData = localStorage.getItem('userData');
    if (storedData) {
      toast.error('Вы уже зарегистрированы');
    } else {
      localStorage.setItem('userData', JSON.stringify(userData));
      toast.success('Регистрация успешна!');
      window.location.reload();
    }
  };

  render() {
    const { firstName, lastName, email, password } = this.state;

    return (
      <div className="container">
        <h1>Регистрация</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">Имя</label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              value={firstName}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Фамилия</label>
            <input
              type="text"
              id="lastName"
              className="form-control"
              value={lastName}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
          <Link to="/profile"><button className='btn btn-info'>Профиль</button></Link>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default Registration;

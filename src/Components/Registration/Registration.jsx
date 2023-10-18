import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const handleSubmit = (values) => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      toast.error('Вы уже зарегистрированы');
    } else {
      localStorage.setItem('userData', JSON.stringify(values));
      toast.success('Регистрация успешна!');
      window.location.reload();
    }
  };

  return (
    <div className="container">
      <h1>Регистрация</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'Обязательное поле';
          }
          if (!values.lastName) {
            errors.lastName = 'Обязательное поле';
          }
          if (!values.email) {
            errors.email = 'Обязательное поле';
          }
          if (!values.password) {
            errors.password = 'Обязательное поле';
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">Имя</label>
            <Field type="text" id="firstName" name="firstName" className="form-control" required />
            <ErrorMessage name="firstName" component="div" className="error" />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Фамилия</label>
            <Field type="text" id="lastName" name="lastName" className="form-control" required />
            <ErrorMessage name="lastName" component="div" className="error" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <Field type="email" id="email" name="email" className="form-control" required />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Пароль</label>
            <Field type="password" id="password" name="password" className="form-control" required />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
          <Link to="/profile"><button className='btn btn-info'>Профиль</button></Link>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Registration;

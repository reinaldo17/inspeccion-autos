import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import './styles.scss';
import TextField from '@mui/material/TextField';
import LoginIcon from '../../assets/login.png';

export default function Login(props) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const [searchVehicle, setSearchVehicle] = useState('');
  const { setIsLogged, setOpen } = props;

  const onSubmit = (data) => {
    console.log(data);
    setOpen(true);
    if (data.userName === 'admin' && data.password === 'admin') {
      setTimeout(() => {
        setOpen(false);
        sessionStorage.setItem('isUserLogged', true);
        setIsLogged(true);
      }, 1000);
    } else {
      setOpen(false);
      alert('Usuario o Contraseña Incorrectos');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-login">
      <h6 className="title-section-form">Inicio de Sesión</h6>
      <div className="input-label-fullscreen">
        <img className="img-login" src={LoginIcon} />
      </div>
      <div className="input-label-fullscreen">
        <label>Usuario</label>
        <input required {...register('userName')} />
      </div>
      <div className="input-label-fullscreen">
        <label>Contraseña</label>
        <input required type="password" {...register('password')} />
      </div>
      <button className="form-control-button" type="submit">
        Ingresar
      </button>
    </form>
  );
}

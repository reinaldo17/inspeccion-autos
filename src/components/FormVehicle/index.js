import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import './styles.scss';
import TableWorks from '../tableWorks';
import TextField from '@mui/material/TextField';
import AddIcon from '../../assets/add.png';

export default function FormVehicle(props) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const [searchVehicle, setSearchVehicle] = useState('');
  const { setIsLogged, setOpen } = props;
  const onSubmit = (data) => console.log(data);

  const logout = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      sessionStorage.setItem('isUserLogged', false);
      setIsLogged(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-vehicle">
      <h6 className="title-section-form">Formulario de Vehiculo</h6>
      <div style={{ position: 'relative' }}>
        <TextField
          sx={{
            '& .MuiFormLabel-root': {
              fontSize: '0.8rem',
            },
          }}
          className="container-search-input text-field-full-width"
          id="search"
          color={'error'}
          variant="standard"
          name="searchVehicle"
          value={searchVehicle}
          label="Buscar Vehiculo"
          onChange={(event) => setSearchVehicle(event.target.value)}
        />
        <img
          onClick={() => alert('add')}
          src={AddIcon}
          style={{
            position: 'absolute',
            top: '30px',
            right: '5px',
          }}
        />
      </div>
      <div className="container-inputs-3">
        <div className="input-label">
          <label>Nro Placa</label>
          <input {...register('placa')} />
        </div>
        <div className="input-label">
          <label>Año</label>
          <input type="number" {...register('year', { required: true })} />
        </div>
        <div className="input-label">
          <label>Marca</label>
          <select {...register('marca')}>
            <option value=""></option>
            <option value="female">Toyota</option>
            <option value="male">Mercedes</option>
            <option value="other">other</option>
          </select>
        </div>
      </div>
      <div className="container-inputs-3">
        <div className="input-label">
          <label>Modelo</label>
          <select {...register('modelo')}>
            <option value=""></option>
            <option value="female">Toyota</option>
            <option value="male">Mercedes</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="input-label">
          <label>Versión</label>
          <select {...register('version')}>
            <option value=""></option>
            <option value="female">Toyota</option>
            <option value="male">Mercedes</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="input-label">
          <label>Color</label>
          <select {...register('Color')}>
            <option value=""></option>
            <option value="female">Rojo</option>
            <option value="male">Verde</option>
            <option value="other">Negro</option>
          </select>
        </div>
      </div>
      <div className="input-label-fullscreen">
        <label>Nombre de Cliente</label>
        <input {...register('NombreCliente')} />
      </div>
      <div className="input-label-fullscreen">
        <label>Descripción de Vehiculo</label>
        <textarea rows="3" {...register('descripcionVehicle')} />
      </div>
      <div className="input-label-fullscreen">
        <label>Observación de Vehiculo</label>
        <textarea rows="3" {...register('descripcionVehicle')} />
      </div>
      {/* <input type="submit" /> */}
      <div>
        <br />
        <h6 className="title-section-form">Trabajos Realizados</h6>
        <TableWorks />
      </div>
      <button onClick={logout} className="form-control-button">
        Cerrar Sesión
      </button>
    </form>
  );
}
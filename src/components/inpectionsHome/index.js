import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import './styles.scss';
import TableWorks from '../tableWorks';
import TextField from '@mui/material/TextField';
import AddIcon from '../../assets/add.png';

export default function InspectionHome(props) {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-vehicle">
      <h6 className="title-section-form">Lista de Inspecciones</h6>
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

      <div>
        <br />
        <h6 className="title-section-form">Trabajos Realizados</h6>
        <TableWorks />
      </div>
    </form>
  );
}

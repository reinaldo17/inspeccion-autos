import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import './styles.scss';
import TableWorks from '../tableWorks';
import TextField from '@mui/material/TextField';
import AddIcon from '../../assets/add.png';
import VehicleModal from '../vehicleModal';

export default function InspectionHome(props) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const {
    setIsLogged,
    setOpen,
    setSearchVehicle,
    searchVehicle,
    setOpenVehicle,
  } = props;
  const onSubmit = (data) => {
    console.log(data);
    setOpenVehicle(true);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <VehicleModal show={show} handleClose={handleClose} />
      <form onSubmit={handleSubmit(onSubmit)} className="form-vehicle">
        <h6 className="title-section-form">Inspecciones</h6>
        <div style={{ position: 'relative' }}>
          <TextField
            sx={{
              '& .MuiFormLabel-root': {
                fontSize: '0.8rem',
              },
            }}
            className="container-search-input text-field-full-width"
            id="search"
            {...register('VehicleSearch', { required: true })}
            color={'error'}
            variant="standard"
            name="searchVehicle"
            value={searchVehicle}
            label="Buscar Vehiculo"
            onChange={(event) => setSearchVehicle(event.target.value)}
          />
          <img
            onClick={() => handleShow()}
            src={AddIcon}
            style={{
              position: 'absolute',
              top: '30px',
              right: '5px',
            }}
          />
          <button className="form-control-button" type="submit">
            Buscar
          </button>
        </div>

        <div>
          <br />
          <h6 className="title-section-form">Ultimas Inspecciones</h6>
          <TableWorks notSearch={true} />
        </div>
      </form>
    </>
  );
}

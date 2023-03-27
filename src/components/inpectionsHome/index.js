import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import './styles.scss';
import TableInspections from '../tableInspections';
import TextField from '@mui/material/TextField';
import AddIcon from '../../assets/add.png';
import VehicleModal from '../vehicleModal';
import {
  createInspection,
  getInspections,
  deleteItem,
} from '../../aplication/api';

export default function InspectionHome(props) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const {
    setInspectionSelected,
    setSearchVehicle,
    searchVehicle,
    setOpenVehicle,
    setVehicleId,
    setOpen,
  } = props;

  const onSubmit = (data) => {
    setOpenVehicle(true);
  };

  const [show, setShow] = useState(false);
  const [listInspection, setListInspection] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShow2 = (item) => {
    console.log(item);
    setInspectionSelected(item);
    setVehicleId(item.id);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setOpenVehicle(true);
    }, 4500);
  };

  useEffect(() => {
    getInspections(setListInspection);
  }, []);

  const handleDeleteItem = (item) => {
    if (window.confirm('¿Estás seguro que desea Eliminar este Trabajo?')) {
      deleteItem(item.id, setListInspection, setOpen);
    }
  };

  return (
    <>
      <VehicleModal
        show={show}
        handleClose={handleClose}
        setVehicleId={setVehicleId}
        setOpenVehicle={setOpenVehicle}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="form-vehicle">
        <h6 className="title-section-form">Inspecciones</h6>
        {/* <div style={{ position: 'relative' }}>
          <TextField
            sx={{
              '& .MuiFormLabel-root': {
                fontSize: '0.8rem',
              },
            }}
            className="container-search-input text-field-full-width"
            id="search"
            {...register('VehicleSearch')}
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
        </div> */}

        <div>
          {/* <br />
          <h6 className="title-section-form">Vehiculos</h6> */}
          <TableInspections
            handleShow={handleShow}
            handleShow2={handleShow2}
            data={listInspection}
            handleDeleteItem={handleDeleteItem}
          />
        </div>
      </form>
    </>
  );
}

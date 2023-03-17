import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import './styles.scss';
import TableWorks from '../tableWorks';
import TextField from '@mui/material/TextField';
import AddIcon from '../../assets/add.png';
import VehicleModal from '../vehicleModal';
import InspectionModal from '../inspectionModal';
import { createInspection, getInspections } from '../../aplication/api';

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
  } = props;

  const onSubmit = (data) => {
    setOpenVehicle(true);
  };

  const [show, setShow] = useState(false);
  const [listInspection, setListInspection] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);

  const handleShow2 = (item) => {
    console.log(item);
    setInspectionSelected(item);
    setShow2(true);
    setOpenVehicle(true);
  };

  useEffect(() => {
    getInspections(setListInspection);
  }, []);

  return (
    <>
      <VehicleModal
        show={show}
        handleClose={handleClose}
        setVehicleId={setVehicleId}
        setOpenVehicle={setOpenVehicle}
      />
      <InspectionModal show={show2} handleClose={handleClose2} />

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
        </div>

        <div>
          <br />
          <h6 className="title-section-form">Ultimas Inspecciones</h6>
          <TableWorks
            notSearch={true}
            handleShow2={handleShow2}
            data={listInspection}
          />
        </div>
      </form>
    </>
  );
}

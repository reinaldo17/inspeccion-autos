import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import './styles.scss';
import TableWorks from '../tableWorks';
import InspectionModal from '../inspectionModal';
import InspectionHome from '../inpectionsHome';
import Button from 'react-bootstrap/Button';

export default function FormVehicle(props) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const [searchVehicle, setSearchVehicle] = useState('');
  const [openVehicle, setOpenVehicle] = useState(false);
  const [vehicleId, setVehicleId] = useState(false);
  const { setIsLogged, setOpen } = props;
  const onSubmit = (data) => console.log(data);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  useEffect(() => {
    console.log(vehicleId);
  }, [vehicleId]);

  return (
    <>
      <InspectionModal show={show2} handleClose={handleClose2} />
      {openVehicle ? (
        <form onSubmit={handleSubmit(onSubmit)} className="form-vehicle">
          <h6 className="title-section-form">Vehiculo</h6>

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
            <TableWorks handleShow2={handleShow2} />
            <Button
              variant="secondary"
              onClick={() => setOpenVehicle(false)}
              style={{ border: 'none', fontSize: '12px' }}
            >
              Regresar
            </Button>
          </div>
        </form>
      ) : (
        <InspectionHome
          setVehicleId={setVehicleId}
          searchVehicle={searchVehicle}
          setSearchVehicle={setSearchVehicle}
          setOpenVehicle={setOpenVehicle}
        />
      )}
    </>
  );
}

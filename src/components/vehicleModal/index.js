import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
  createInspection,
  getAutoYears,
  getAutoMarks,
  getAutoModels,
  getAutoVersions,
  carColors,
} from '../../aplication/api';
import './styles.scss';

export default function VehicleModal(props) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    watch: watch1,
    errors: errors1,
    setValue: setValue1,
    setError: setError1,
    control: control1,
  } = useForm();

  const [dataClient, setDataClient] = useState(null);
  const [arrayYears, setArrayYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [arrayMarks, setArrayMarks] = useState([]);
  const [selectedMark, setSelectedMark] = useState(null);
  const [arrayModels, setArrayModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [arrayVersion, setArrayVersion] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [openVehicleForm, setOpenVehicleForm] = useState(false);
  const { show, handleClose, setVehicleId, setOpenVehicle } = props;

  useEffect(() => {
    getAutoYears(setArrayYears);
  }, []);

  const onSubmit = async (data) => {
    setDataClient(data);
    let idVehicle = await createInspection(data);
    setVehicleId(idVehicle);
    reset();
    setOpenVehicleForm(false);
    handleClose();
  };
  const saveClientData = (data) => {
    setDataClient(data);
    console.log(data);
    setOpenVehicleForm(true);
  };

  const handlerYear = (data) => {
    setSelectedYear(data.target.value);
    getAutoMarks(data.target.value, setArrayMarks);
  };
  const handlerMark = (data) => {
    setSelectedMark(data.target.value);
    getAutoModels(selectedYear, data.target.value, setArrayModels);
  };

  const handlerModel = (data) => {
    setSelectedModel(data.target.value);
    getAutoVersions(
      selectedYear,
      selectedMark,
      data.target.value,
      setArrayVersion
    );
  };

  return (
    <Modal show={show} onHide={handleClose} centered fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Vehiculo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!openVehicleForm ? (
          <form
            className="form-vehicle modal-form"
            onSubmit={handleSubmit1(saveClientData)}
          >
            <h6 className="title-section-form">Datos del Cliente</h6>
            <br />
            <div className="input-label-fullscreen">
              <div className="input-label">
                <label>Cédula</label>
                <input type="number" {...register('idClient')} />
              </div>
            </div>
            <div className="input-label-fullscreen">
              <div className="input-label">
                <label>Nombre Completo</label>
                <input {...register('nombre')} />
              </div>
            </div>

            <div className="input-label-fullscreen">
              <label>Celular</label>
              <input type="phone" {...register('phoneClient')} />
            </div>
            <div className="input-label-fullscreen">
              <label>Teléfono 2</label>
              <input type="phone" {...register('phoneClient2')} />
            </div>
            <div className="input-label-fullscreen">
              <label>Correo</label>
              <input type="mail" {...register('mailClient')} />
            </div>
            <div className="input-label-fullscreen">
              <label>Dirección</label>
              <textarea rows="3" {...register('directionClient')} />
            </div>
            <Button
              style={{
                backgroundColor: '#e87510a1',
                border: 'none',
                outline: 'none',
                marginLeft: 'auto',
                display: 'block',
                marginTop: '20px',
              }}
              type="submit"
            >
              Siguiente
            </Button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form-vehicle modal-form"
          >
            <div className="container-inputs-3">
              <div className="input-label">
                <label>Nro Placa</label>
                <input
                  {...register('placa')}
                  onChange={(e) => {
                    return e.target.value.toUpperCase();
                  }}
                />
              </div>
              <div className="input-label">
                <label>Año</label>
                <select {...register('year')} onChange={handlerYear}>
                  <option value=""></option>
                  {arrayYears?.map((item, index) => {
                    return (
                      <option key={index} value={item.VALOR}>
                        {item.DESCRIP}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="input-label">
                <label>Marca</label>
                <select {...register('marca')} onChange={handlerMark}>
                  <option value=""></option>
                  {arrayMarks?.map((item, index) => {
                    return (
                      <option key={index} value={item.VALOR}>
                        {item.DESCRIP}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="container-inputs-3">
              <div className="input-label">
                <label>Modelo</label>
                <select {...register('modelo')} onChange={handlerModel}>
                  <option value=""></option>
                  {arrayModels?.map((item, index) => {
                    return (
                      <option key={index} value={item.VALOR}>
                        {item.DESCRIP}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="input-label">
                <label>Versión</label>
                <select {...register('version')}>
                  <option value=""></option>
                  {arrayVersion?.map((item, index) => {
                    return (
                      <option key={index} value={item.VALOR}>
                        {item.DESCRIP}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="input-label">
                <label>Color</label>
                <select {...register('color')}>
                  <option value=""></option>
                  {carColors?.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="input-label-fullscreen">
              <label>Descripción de Vehiculo</label>
              <textarea rows="3" {...register('descriptionVehicle')} />
            </div>
            <div className="input-label-fullscreen">
              <label>Observación de Vehiculo</label>
              <textarea rows="3" {...register('observationVehicle')} />
            </div>
            {/* <input type="submit" /> */}
            <Modal.Footer
              style={{ marginTop: '50px', border: 'none', fontSize: '12px' }}
            >
              <Button
                variant="secondary"
                onClick={() => setOpenVehicleForm(false)}
                style={{ border: 'none', fontSize: '12px' }}
              >
                Regresar
              </Button>
              <Button
                style={{
                  backgroundColor: '#e87510a1',
                  border: 'none',
                  fontSize: '12px',
                }}
                type="submit"
              >
                Guardar Vehiculo
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
}

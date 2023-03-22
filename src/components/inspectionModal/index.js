import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './styles.scss';

export default function InspectionModal(props) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [dataClient, setDataClient] = useState(null);

  const { show, handleClose, inspectionSelected, onSubmit2 } = props;

  const onSubmit = (data) => {
    const dataInspection = inspectionSelected;
    if (
      inspectionSelected.trabajos === undefined ||
      inspectionSelected.trabajos === null
    ) {
      const work = [
        {
          descriptionTaller: data.descripcionTaller,
          descriptionExtern: data.descripcionProvider,
        },
      ];
      dataInspection.trabajos = work;
      onSubmit2(dataInspection);
      reset();
      handleClose();
    } else {
      let arrayWorks = inspectionSelected.trabajos;
      const work = {
        descriptionTaller: data.descripcionTaller,
        descriptionExtern: data.descripcionProvider,
      };
      arrayWorks.push(work);
      dataInspection.trabajos = arrayWorks;
      console.log(dataInspection);
      onSubmit2(dataInspection);
      reset();
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Trabajo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-vehicle modal-form"
        >
          {/* <div className="container-inputs-3">
            <div className="input-label">
              <label>Nro Placa</label>
              <input {...register('placa')} />
            </div>
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
          </div> */}

          <div className="input-label-fullscreen">
            <label>Descripción Trabajo Realizado en Nuestro Taller</label>
            <textarea rows="3" {...register('descripcionTaller')} />
          </div>
          <div className="input-label-fullscreen">
            <label>Descripción Trabajo Proveedor Externo</label>
            <textarea rows="3" {...register('descripcionProvider')} />
          </div>
          {/* <input type="submit" /> */}
          <Modal.Footer
            style={{ marginTop: '50px', border: 'none', fontSize: '12px' }}
          >
            <Button
              variant="secondary"
              onClick={() => handleClose()}
              style={{ border: 'none', fontSize: '12px' }}
            >
              Cancelar
            </Button>
            <Button
              style={{
                backgroundColor: '#e87510a1',
                border: 'none',
                fontSize: '12px',
              }}
              type="submit"
            >
              Guardar Trabajo
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

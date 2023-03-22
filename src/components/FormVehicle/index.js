import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import './styles.scss';
import TableWorks from '../tableWorks';
import InspectionModal from '../inspectionModal';
import InspectionHome from '../inpectionsHome';
import {
  getItemById,
  getAutoMarks,
  getAutoModels,
  getAutoVersions,
  getAutoYears,
  carColors,
  updateInspection,
} from '../../aplication/api';
import Button from 'react-bootstrap/Button';
import { async } from '@firebase/util';

export default function FormVehicle(props) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [searchVehicle, setSearchVehicle] = useState('');
  const [openVehicle, setOpenVehicle] = useState(false);
  const [vehicleId, setVehicleId] = useState(null);
  const [inspectionSelected, setInspectionSelected] = useState(null);
  const [arrayYears, setArrayYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [arrayMarks, setArrayMarks] = useState([]);
  const [selectedMark, setSelectedMark] = useState(null);
  const [arrayModels, setArrayModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [arrayVersion, setArrayVersion] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const { setIsLogged, setOpen } = props;

  const onSubmit = (data) => {
    console.log(vehicleId);
    console.log(data);
    updateInspection(
      vehicleId,
      data,
      setOpen,
      setInspectionSelected,
      setOpenVehicle
    );
  };

  const [show2, setShow2] = useState(false);

  const [showCreateWork, setShowCreateWork] = useState(false);

  const handleCloseCreateWork = () => setShowCreateWork(false);
  const handleShowCreateWork = () => setShowCreateWork(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  useEffect(() => {
    getAutoYears(setArrayYears);
  }, []);

  useEffect(() => {
    if (vehicleId) {
      getItemById(vehicleId, setInspectionSelected, setOpenVehicle, setOpen);
    }
  }, [vehicleId]);

  useEffect(() => {
    if (inspectionSelected) {
      handlerYear(inspectionSelected.year);
      handlerMark2(inspectionSelected.year, inspectionSelected.marca);
      handlerModel2(
        inspectionSelected.year,
        inspectionSelected.marca,
        inspectionSelected.modelo
      );
      setSelectedVersion(inspectionSelected.version);
    }
  }, [inspectionSelected]);

  const handlerYear = (year) => {
    setSelectedYear(year);
    getAutoMarks(year, setArrayMarks);
  };
  const handlerMark = (mark) => {
    setSelectedMark(mark);
    getAutoModels(selectedYear, mark, setArrayModels);
  };

  const handlerModel = (model) => {
    setSelectedModel(model);
    getAutoVersions(selectedYear, selectedMark, model, setArrayVersion);
  };

  const handlerMark2 = (year, mark) => {
    setSelectedMark(mark);
    getAutoModels(year, mark, setArrayModels);
  };

  const handlerModel2 = (year, mark, model) => {
    setSelectedModel(model);
    getAutoVersions(year, mark, model, setArrayVersion);
  };

  return (
    <>
      <InspectionModal
        show={showCreateWork}
        handleClose={handleCloseCreateWork}
        inspectionSelected={inspectionSelected}
        onSubmit2={onSubmit}
      />
      {openVehicle ? (
        <>
          {inspectionSelected && (
            <form onSubmit={handleSubmit(onSubmit)} className="form-vehicle">
              <h6 className="title-section-form">Vehiculo</h6>

              <div className="container-inputs-3">
                <div className="input-label">
                  <label>Nro Placa</label>
                  <input
                    defaultValue={inspectionSelected.placa}
                    {...register('placa')}
                  />
                </div>
                <div className="input-label">
                  <label>Año</label>
                  <select
                    {...register('year')}
                    defaultValue={inspectionSelected.year}
                    onChange={(e) => handlerYear(e.target.value)}
                  >
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
                  {selectedMark && (
                    <select
                      {...register('marca')}
                      onChange={(e) => handlerMark(e.target.value)}
                      defaultValue={inspectionSelected.marca}
                    >
                      <option value=""></option>
                      {arrayMarks?.map((item, index) => {
                        return (
                          <option key={index} value={item.VALOR}>
                            {item.DESCRIP}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>
              </div>
              <div className="container-inputs-3">
                <div className="input-label">
                  <label>Modelo</label>
                  {selectedModel && (
                    <select
                      {...register('modelo')}
                      onChange={(e) => handlerModel(e.target.value)}
                      defaultValue={inspectionSelected.modelo}
                    >
                      <option value=""></option>
                      {arrayModels?.map((item, index) => {
                        return (
                          <option key={index} value={item.VALOR}>
                            {item.DESCRIP}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>
                <div className="input-label">
                  <label>Versión</label>
                  {selectedVersion && (
                    <select
                      {...register('version')}
                      defaultValue={inspectionSelected.version}
                    >
                      <option value=""></option>
                      {arrayVersion?.map((item, index) => {
                        return (
                          <option key={index} value={item.VALOR}>
                            {item.DESCRIP}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>
                <div className="input-label">
                  <label>Color</label>
                  <select
                    {...register('color')}
                    defaultValue={inspectionSelected.color}
                  >
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
                <label>Nombre de Cliente</label>
                <input
                  defaultValue={inspectionSelected.nombre}
                  {...register('nombre')}
                />
              </div>
              <div className="input-label-fullscreen">
                <label>Descripción de Vehiculo</label>
                <textarea
                  defaultValue={inspectionSelected.descriptionVehicle}
                  rows="3"
                  {...register('descriptionVehicle')}
                />
              </div>
              <div className="input-label-fullscreen">
                <label>Observación de Vehiculo</label>
                <textarea
                  defaultValue={inspectionSelected.observationVehicle}
                  rows="3"
                  {...register('observationVehicle')}
                />
              </div>
              <Button
                type="submit"
                style={{
                  border: 'none',
                  fontSize: '12px',
                  background: '#fcbd43',
                  outline: 'none',
                  border: 'none',
                  boxShadow: 'none',
                }}
              >
                Guardar Cambios
              </Button>
              <div>
                <br />
                <h6 className="title-section-form">Trabajos Realizados</h6>
                <TableWorks
                  handleShow2={handleShowCreateWork}
                  data={inspectionSelected.trabajos}
                  inspectionSelected={inspectionSelected}
                  onSubmit={onSubmit}
                />
                <Button
                  variant="secondary"
                  onClick={() => {
                    setOpenVehicle(false);
                    reset();
                  }}
                  style={{ border: 'none', fontSize: '12px' }}
                >
                  Regresar
                </Button>
              </div>
            </form>
          )}
        </>
      ) : (
        <InspectionHome
          setVehicleId={setVehicleId}
          searchVehicle={searchVehicle}
          setSearchVehicle={setSearchVehicle}
          setOpenVehicle={setOpenVehicle}
          setInspectionSelected={setInspectionSelected}
          setOpen={setOpen}
        />
      )}
    </>
  );
}

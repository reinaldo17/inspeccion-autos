import React, { useState, useEffect } from 'react';
import useServices from '../../hooks/useServices';
import FormVehicle from '../FormVehicle';
import Login from '../login';
import './styles.scss';

export default function Home(props) {
  const { setOpen } = props;
  const [services, setServices] = useState([]);
  const [isLogged, setIsLogged] = useState(
    sessionStorage.getItem('isUserLogged') === null
      ? false
      : JSON.parse(sessionStorage.getItem('isUserLogged'))
  );
  const [inspectionSelected, setInspectionSelected] = useState([]);

  useEffect(() => {
    console.log(sessionStorage.getItem('isUserLogged'));
  }, []);

  const logout = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      sessionStorage.setItem('isUserLogged', false);
      setIsLogged(false);
    }, 1000);
  };

  //

  return (
    <div className="home-container">
      {isLogged ? (
        <>
          <FormVehicle setOpen={setOpen} />
          <button onClick={logout} className="form-control-button">
            Cerrar Sesión
          </button>
        </>
      ) : (
        <Login setOpen={setOpen} setIsLogged={setIsLogged} />
      )}
    </div>
  );
}

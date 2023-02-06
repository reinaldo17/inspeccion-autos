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

  useEffect(() => {
    console.log(sessionStorage.getItem('isUserLogged'));
  }, []);

  //

  return (
    <div className="home-container">
      {isLogged ? (
        <FormVehicle setIsLogged={setIsLogged} setOpen={setOpen} />
      ) : (
        <Login setIsLogged={setIsLogged} setOpen={setOpen} />
      )}
    </div>
  );
}

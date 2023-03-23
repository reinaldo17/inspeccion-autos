import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Home from '../src/components/home';
import './App.css';
import Backdrop from '@mui/material/Backdrop';
import '../src/styles/globals.scss';
import '../src/styles/App.scss';
import icoLogo from '../src/assets/carLogo.png';
import CircularProgress from '@mui/material/CircularProgress';
import BackgroundCard from '../src/assets/backgroundCard.webp';
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
} from 'react-router-dom';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <img src={BackgroundCard} className="background-card" />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <img
            src={icoLogo}
            style={{ position: 'absolute', width: '38px', height: '38px' }}
          />
          <CircularProgress
            className="backdrop-container"
            color="inherit"
            size={60}
          />
        </Backdrop>
        <Home setOpen={setOpen} />
      </div>
    </BrowserRouter>
  );
}

export default App;

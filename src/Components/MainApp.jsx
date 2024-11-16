import React, { useState } from 'react';
import Header from './Header';
import App from '../App';
import { Outlet } from 'react-router-dom';

function MainApp() {
    const [language, setLanguage] = useState('hindi');
  
    return (
      <>
        <Header />
        <main className="pt-12">
          <Outlet  />
        </main>
      </>
    );
  }

export default MainApp;

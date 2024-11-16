import React, { useState } from 'react';
import Header from './Header';
import App from '../App';
import { Outlet } from 'react-router-dom';

function MainApp() {
    const [language, setLanguage] = useState('english');
  
    return (
      <>
        <Header />
        <main className="pt-24">
          <Outlet  />
        </main>
      </>
    );
  }

export default MainApp;
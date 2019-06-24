import React from 'react';
import './App.scss';
import Uploader from './Uploader'

function App() {

  return (
    <div className="app">
      <header>
        <h1>Fauna Flobber</h1>
      </header>
      <content>
        <Uploader />
      </content>
    </div>
  );
}

export default App;

import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import RouteApp from './components/Route/RouteApp';


function App() {
  return (
   <div>
      <BrowserRouter >
        <RouteApp/> 
      </BrowserRouter>
    </div>
  );
}

export default App;


import React, { Component }  from 'react';
import { Routes ,Route } from 'react-router-dom';
import Footer from '../template/footer';
import Header from '../template/header';
import Artist from '../Views/Artist';
import Home from '../Views/Home';
import ListSong from '../Views/listSong';
import Login from '../Views/Login';
import PageNotFound from '../Views/PageNotFound';
import Song from '../Views/Song';
import DetailSong from '../Views/DetailSong';
import Script from '../Views/Script';


function RouteApp() {
  
  return (
    sessionStorage.getItem('logged') ?  <div>
    <Header/>
    <Routes>
        <Route  path="/" element={<Login/>} exact/>
        <Route path='/artist' element={<Artist/>} exact/>
        <Route path='/home' element={<Home/>} exact/>
        <Route path='/songs' element={<Song/>} exact/>
        <Route path='/listsong' element={<ListSong/>} exact/>
        <Route path='/detailsong/:id' element={<DetailSong/>} exact/>
        <Route path='/script' element={<Script/>} exact/>
        <Route path="*" element={<PageNotFound/>} />
    </Routes>
    <Footer/>
  </div> : <div>
      <Routes>
          <Route  path="/" element={<Login/>} exact/>
          <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </div>
    

  );
}

export default RouteApp;
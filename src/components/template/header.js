import { useState } from "react";
import { Link } from 'react-router-dom';

function Header() {
    const deconnectUser= () => {
        sessionStorage.clear()
        window.location = '/'
        
    }
  return (
    <header class="header-section clearfix">
    <Link to="/home"><a class="site-logo">
     <h3 style={{color:'orange', fontFamily:'Arial'}}> Yal<i class='fa fa-music'></i>ir</h3>
    </a></Link>
    <div class="header-right">
        <a href="#" class="hr-btn">Help</a>
        <span>|&nbsp;</span>
        <div class="user-panel">
            {sessionStorage.getItem('logged') ? <p style={{cursor:'pointer', color:'orange'}}  class="register" onClick={() => deconnectUser()} ><i class="fa fa-user"></i> Logout</p> : <a  class="login"> Login</a>}
        </div> 
    </div>
    <ul class="main-menu">
        <li><Link to="/home"> <i class="fa fa-home"></i> Home</Link></li>
        <li><a href="#"><i class="fa fa-book"></i> Pages</a>
            <ul class="sub-menu">
                <li><Link to="/artist">Add new & Artists</Link></li>
                <li><Link to="/listsong">Lyrics & Songs</Link></li>
                <li><Link to="/songs">Add new song</Link></li>
                <li><Link to="/script">Generate script</Link></li>
            </ul>
        </li>
    </ul>
    </header>
    
  );
}

export default Header;
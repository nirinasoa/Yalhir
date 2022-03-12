import { useState } from "react";


function Footer() {
  return (
    <footer class="footer-section">
    <div class="container">
        <div class="row">
            <div class="col-xl-6 col-lg-7 order-lg-2">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="footer-widget">
                            <h2>About us</h2>
                            <ul>
                                <li><a href="">Our Story</a></li>
                                <li><a href="">YalhirBlog</a></li>
                                <li><a href="">History</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="footer-widget">
                            <h2>Products</h2>
                            <ul>
                                <li><a href="">Lyrics</a></li>
                                <li><a href="">Artist</a></li>
                                <li><a href="">Song</a></li>
                                <li><a href="">Footage</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="footer-widget">
                            <h2>Playlists</h2>
                            <ul>
                                <li><a href="">Yeladim</a></li>
                                <li><a href="">Batim</a></li>
                                <li><a href="">Toliara</a></li>
                                <li><a href="">Yaldot</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-5 order-lg-1">
            <h4 style={{color:'orange', fontFamily:'Arial'}}> Yal<i class='fa fa-music'></i>ir</h4>
                <div class="copyright"><div class="social-links">
                    <a href=""><i class="fa fa-instagram"></i></a>
                    <a href=""><i class="fa fa-pinterest"></i></a>
                    <a href=""><i class="fa fa-facebook"></i></a>
                    <a href=""><i class="fa fa-twitter"></i></a>
                    <a href=""><i class="fa fa-youtube"></i></a>
                </div>
            </div>
        </div>
    </div>
    </div>
</footer>
  );
}

export default Footer;
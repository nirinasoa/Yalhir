import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
   <div>
    <section class="intro-section spad" style={{backgroundColor:'#0c1c3c'}}>
        <div class="container">
            <div class="row">
                <div class="col-lg-6" >
                <h1 style={{color: '#ffffff'}}><span style={{color: 'orange'}}>Read </span><span style={{fontSize:40}}> some lyrics. </span></h1>
								<p style={{color: '#ffffff', fontSize:'16px', fontFamily:'Arial'}}>Welcome to Yalhir site web, you can navigate trough this site now,<br/> 
								by adding new artist, song and display lyrics. You can manage data<br/> <i>© Copyright to Yaldot</i> </p>
								<Link to="/artist"  class="site-btn"  style={{backgroundColor: 'orange'}}><i class="fa fa-star"></i> Add new artist</Link>&nbsp;
								<Link to="/songs" class="site-btn sb-c2"> <i class="fa fa-music"></i> Add songs</Link>
                </div>
                <div class="col-lg-6" >
                    <img src="assets/img/hero-bg.png" alt=""/>
                </div>
            </div>
        </div>
    </section>
    <section class="intro-section spad">
		<div class="container">
			<div class="row">
				<div class="col-lg-6">
					<div class="section-title">
						<h2>Features</h2>
					</div>
				</div>
				<div class="col-lg-6">
					<p>To help us store songs and lyrics, you can now use our site web to realize it. 
					We are guiding you for the next step on what to do. You can click the button below.
					</p>
					<Link to="/artist" style={{backgroundColor:'orange'}} class="site-btn"> <i class="fa fa-arrow-right"></i> Let's go</Link>
				</div>
			</div>
		</div>
	</section>
 </div>
  );
}

export default Home;

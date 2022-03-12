import { useState , useEffect } from "react";
import { useForm  } from "react-hook-form";
import Header from '../template/header';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Song() {
  const { register, handleSubmit,getValues } = useForm();
  const [data, setData] = useState("");
  const [artists, setArtists] = useState([]);
  const onSubmit = (data, e) => {
    setData(data)
    let IdArtist = getValues("artist");
    let title = getValues("title");
    let link = getValues("link");
    let year = getValues("year");
    let refrain = getValues("refrain");
    let orderSong = getValues("order");
    let paragraph1 = getValues("P1");
    let paragraph2 = getValues("P2");
    let paragraph3 = getValues("P3");
    let paragraph4 = getValues("P4");
    let paragraph5 = getValues("P5");
    let paragraph6 = getValues("P6");
    const song={
        idArtist:IdArtist,
        title:title,
        isFavorite:'0',
        link:link,
        yearProduction:year,
        refrain:refrain,
        orderSong:orderSong,
        paragraph1:paragraph1,
        paragraph2:paragraph2,
        paragraph3:paragraph3,
        paragraph4:paragraph4,
        paragraph5:paragraph5,
        paragraph6:paragraph6,
      }
      console.log(song);
      Axios.post('https://yalhir-nodejs-mongodb.herokuapp.com/song',song)
      .then(res=>{
        console.log(res.data);
        window.alert('Song created successsfully');
        window.location='/listsong';
      });
  };
  const onError = (errors, e) => console.log(errors, e);
 
  useEffect(() => {
    Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/artists')
            .then(response=>{
             const list = response.data;
             setArtists(list)
             console.log(artists)
   })

 }, []);

  return (
    <div>
        <section class="intro-section spad">
                <div class="container" style={{padding:20,boxShadow: '0 0 5px #b5b1b1'}}>
                <form class="form-group" onSubmit={handleSubmit(onSubmit, onError)}>
                    <div class="row">
                        <div class="col-lg-1">
                        </div>
                        <div class="col-lg-5" >
                            <div class="section-title">
                                <h3>  <img src="https://i.pinimg.com/564x/5f/da/c5/5fdac5c59299e878fe1618615eb3ffab--musica-rock-music-studios.jpg" alt="" style={{width:100,flex:1}}/><i class="fa fa-music"></i> Add new Lyrics </h3>
                               
                                <div >
                                  
                                        <label for="">Title of the song:</label>
                                        <input class="form-control" {...register("title")} placeholder="Title" required/>
                                        <label for="">Artist:</label>
                                        <select class="form-control" {...register("artist")} required>
                                         <option selected >Select artist</option>
                                        { artists.map(item =>
                                            <option key={item._id} value={item.idArtist} >{item.username}</option>
                                        )}
                                        </select>
                                        <label for="">Link of the song (*optional):</label>
                                        <input class="form-control" {...register("link")} placeholder="Link" />
                                        <label for="">Year (*optional):</label>
                                        <input class="form-control" {...register("year")} placeholder="Year" />
                                        <label for="">Paragrah 1:</label>
                                        <textarea class="form-control" rows="5" {...register("P1")} placeholder="Paragrah" />  
                                        <label for="">Paragrah 2:</label>
                                        <textarea class="form-control" rows="5"  {...register("P2")} placeholder="Paragrah" />  
                                        <label for="">Paragrah 3:</label>
                                        <textarea  rows="5"class="form-control" {...register("P3")} placeholder="Paragrah" />   
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5"><br/>
                           <label for="">Paragrah 4:</label>
                            <textarea  rows="5" class="form-control" {...register("P4")} placeholder="Paragrah" />
                            <label for="">Paragrah 5:</label>
                            <textarea rows="5" class="form-control" {...register("P5")} placeholder="Paragrah" />
                            <label for="">Paragrah 6:</label>
                            <textarea rows="5" class="form-control" {...register("P6")} placeholder="Paragrah" />
                            <label for="">Order of song:</label>
                            <input class="form-control" {...register("order")} placeholder="P1,P2,P1,P3,..."  required/>
                            <label for="">Place of chorus:</label>
                            <select class="form-control" {...register("refrain")} required>
                                <option  value="P1" selected>P1</option>
                                <option  value="P2">P2</option>
                                <option  value="P3">P3</option>
                                <option  value="P4">P4</option>
                                <option  value="P5">P5</option>
                                <option  value="P6">P6</option>
                            </select>
                            <br/>
                            <button style={{color:'white'}} class="btn btn-warning" type="submit"> <i class='fa fa-save'></i> Save & accept</button>&nbsp;&nbsp;
                            <Link to="/listsong" class="btn btn-danger"> <i class='fa fa-eye'></i> View list song</Link>
                        </div>
                    </div>
                    </form>
                </div>
            </section>
    </div>
  );
}

export default Song;

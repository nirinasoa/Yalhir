import { useState, useEffect } from "react";
import { useForm  } from "react-hook-form";
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import '../../components/style.css'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Axios from 'axios';
import Moment from 'moment';

function Artist() {
  const { register, handleSubmit,getValues ,reset} = useForm();
  const [data, setData] = useState("");
  const [username, setUsername] = useState("");
  const [belongsTo, setBelongsTo] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [artists, setArtists] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0)
  const [search, setSearch] = useState("")
  const [reponse, setReponse] = useState("")

  const displayData = (res) => {
    const data = res.data;
    const slice = data.slice(offset, offset + perPage)
    const postData = slice.map(item => 
      <div key={item._id} class="song-item">
      <div class="row">
          <div  class="col-xl-5 col-lg-12 col-md-5">
              <div class="song-info-box">
                  <img src={`assets/img/artist/${item.photo?item.photo:'noname.jpg'}`} alt=""/>
                  <div class="song-info">
                  <Link to={`/detailsongArtist/${item.idArtist}`}>
                  {id == item._id?(
                            <div>
                              <input class="form-control" type="text" placeholder="Username" onChange={onChangeUsernameHandler} value={username}  />
                              <input class="form-control" type="text" placeholder="Group name" onChange={onChangeBelongsToHandler} value={belongsTo}/>
                              <input class="form-control" type="text" placeholder="Photo link" onChange={onChangePhotoHandler} value={photo} />
                              <button class="btn btn-success" type="submit" onClick={() => editArtist(item._id)}>Edit</button>&nbsp;
                              <button class="btn btn-danger" onClick={() => closeForm()}><i class="fa fa-close"></i> Close</button>
                          </div>  
                      ): <span>
                  
                      <h4>{item.username}</h4>
                      <p style={{fontSize:14}}>Id: {item.idArtist}<br/>Group: {item.belongsTo}</p>
                  </span>  } 
                  </Link>
                  </div>
              </div>
          </div>
          <div  class="col-xl-5 col-lg-12 col-md-5">
             <i class="fa fa-trash" style={{color:'#e60e47', cursor:'pointer',fontSize:20}} onClick={() => deleteArtist(item._id)}></i>&nbsp;
             <i class="fa fa-edit" style={{color:'#0c66ab', cursor:'pointer',fontSize:20}} onClick={() => openForm(item._id)}></i>
          </div>
      </div>
      <hr/>
  </div>
   )
    setArtists(postData)
    setPageCount(Math.ceil(data.length / perPage))
  }
  const getDataArtist = async() => {
    const res = await  Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/artists')
    displayData(res)
 }  
 const submitSearch = async(e) => {
  setSearch(e.target.value)
  const searchTxt = search;
  const res = await Axios.post('https://yalhir-nodejs-mongodb.herokuapp.com/searchartist',{search:searchTxt})
  displayData(res)
  setReponse(res.data.length+' result(s) found')
  if(searchTxt == ''){
      const res = await  Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/songs')
      displayData(res) 
      setReponse('')
  }
}
  const onSubmit = (data, e) => {
    setData(data)
    let IdArtist = getValues("IdArtist");
    let username = getValues("firstName");
    let belongsTo = getValues("belongsTo");
    let photo = getValues("photo");
    const artist={
        idArtist:IdArtist,
        username:username,
        belongsTo:belongsTo,
        photo:photo
      }
      console.log(artist);
      Axios.post('https://yalhir-nodejs-mongodb.herokuapp.com/artist',artist)
      .then(res=>{
        console.log(res.data);
        window.alert('Artist created successsfully');
        window.location='/artist';
      });
  };
  useEffect(() => {
    getDataArtist()

  }, [offset]);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
};
  const deleteArtist = (id) => {
    if(window.confirm("Voulez-vous vraiment le supprimer définitivement?")){
        Axios.delete('https://yalhir-nodejs-mongodb.herokuapp.com/artist/'+id)
        .then(res => {
          window.location.reload();
        });
    }
  }
  const editArtist = (id) => {
    const artist={
        username:username,
        belongsTo:belongsTo,
        photo:photo
      }
    Axios.patch('https://yalhir-nodejs-mongodb.herokuapp.com/artist/'+id,artist)
    .then(res => {
        setId("")
        setUsername("")
        setBelongsTo("")
        setPhoto("")
    });
    window.location='/artist';
  }
  const closeForm= () => {
    setId("")
    setUsername("")
    setBelongsTo("")
    setPhoto("")
    setData([])
  }
  const openForm= (id) => {
        // setOpenFormEdit(true)
        Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/artistOne/'+id)
        .then(response=>{
         const list = response.data;
        //  setArtists(list)
         console.log(list.belongsTo)
         setId(list._id)
         setUsername(list.username)
         setBelongsTo(list.belongsTo)
         setPhoto(list.photo)
        })
   
  }
  const onError = (errors, e) => console.log(errors, e);
  const onChangeUsernameHandler = event => {
    setUsername(event.target.value);
  };
  const onChangePhotoHandler = event => {
    setPhoto(event.target.value);
  };
  const onChangeBelongsToHandler = event => {
    setBelongsTo(event.target.value);
  };
  return (
    <div>
        <section class="intro-section spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="section-title">
                                <h3> <i class="fa fa-plus"></i> Add artist</h3>
                                <p>You can add artist here by filling the given forms </p>
                                <br/>
                                <div style={{color:'#ffffff',backgroundColor:'#011c40',padding:20,boxShadow: '5px 5px 5px #b5b1b1'}}>
                                    <form class="form-group" onSubmit={handleSubmit(onSubmit, onError)}>
                                        <label for="">Id Artist:</label>
                                        <input class="form-control" {...register("IdArtist")} placeholder="Id artist" required/>
                                        <label for="">Artist firstname:</label>
                                        <input class="form-control" {...register("firstName")} placeholder="First name" required/>
                                        <label for="">Name of group:</label>
                                        <input class="form-control" {...register("belongsTo")} placeholder="Group" />
                                        <label for="">Image link:</label>
                                        <input class="form-control" {...register("photo")} placeholder="Image" />
                                        <br/>
                                        <a style={{cursor:'pointer', color:'white'}} class="btn btn-danger" onClick={() => {reset({IdArtist: "",firstName: "",belongsTo: "",photo: "",});}}  > <i class="fa fa-refresh"></i> Reset Form</a>&nbsp;&nbsp;
                                       <button class="btn btn-warning" type="submit" style={{color:'white'}}> <i class="fa fa-save"></i> Save & accept</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <h1 class="display-4">List of 734 artists</h1>
                            <div class="song-details-box" style={{padding:50}}>   
                            <div class="search-form">
                              <input type="text" placeholder="Enter username or group name..." onChange={submitSearch}  value={search}/>
                              <button style={{backgroundColor:'#f7b80b',fontWeight:500}}>Search</button>
                              <strong class="text-danger">{reponse}</strong>
                            </div>
                                {artists}
                                <div style={{marginLeft:'40%'}}>
                                  <ReactPaginate 
                                      previousLabel={<KeyboardArrowLeftIcon fontSize="medium"/>}
                                      nextLabel={<KeyboardArrowRightIcon fontSize="medium" />}
                                      breakLabel={"..."}
                                      breakClassName={"break-me"}
                                      pageCount={pageCount}
                                      marginPagesDisplayed={2}
                                      pageRangeDisplayed={5}
                                      onPageChange={handlePageClick}
                                      containerClassName={"pagination"}
                                      subContainerClassName={"pages pagination"}
                                      activeClassName={"active"}/>
                                  </div>
                            
                        </div>
                    </div>
                </div>
                </div>
            </section>
    </div>
  );
}

export default Artist;

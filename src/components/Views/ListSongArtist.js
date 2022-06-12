import { useState , useEffect } from "react";
import { Link , useParams} from 'react-router-dom';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../../components/style.css'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Moment from 'moment';


function ListSongArtist() {
    const [songs, setSong] = useState([]);
    const [artists, setArtist] = useState([]);
    const [nameArtist, setnameArtist] = useState();
    const [photo, setPhoto] = useState();
    const [offset, setOffset] = useState(0);
    const [perPage,setPerPage] = useState(50);
    const [pageCount, setPageCount] = useState(0)
    const [total, setTotal] = useState()
    const [search, setSearch] = useState("")
    const [reponse, setReponse] = useState("")
    const { id } = useParams();
    
    const getDataSongs = async() => {
        const res = await  Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/songArtist/'+id)
        displayData(res)
    } 
    useEffect(() => {
        getArtistname()
        getDataSongs()
        Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/artists')
                .then(response=>{
                 const list = response.data;
                 setArtist(list)
                 console.log(list)
        })
       
    }, [offset]);  
    const getArtistname = () => {
        Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/artistOne/'+id)
        .then(response=>{
        const list = response.data;
        setnameArtist(list[0].username)
        setPhoto(list[0].photo)
        console.log(list)
        })
   }


    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };
     const deleteSong = (id) => {
        if(window.confirm("Voulez-vous vraiment le supprimer définitivement?")){
            Axios.delete('https://yalhir-nodejs-mongodb.herokuapp.com/song/'+id)
            .then(res => {
              window.location.reload();
            });
        }
      }
    const openForm= (id) => {
        Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/songOne/'+id)
        .then(response=>{
        const list = response.data;
        console.log(list)
        })

    }
    const displayArtist= (id) => {
       let result = id;
      if(id === '1'){
          result = 'Ryvkah'
      }
      if(id === '2'){
          result = 'Ndriana'
      }
      if(id === '3'){
        result = 'Poopy'
      }
      if(id === '4'){
        result = 'Kefa'
       }
      if(id === '5'){
        result = 'Petoela'
       }
       if(id === '6'){
        result = 'Toliara'
       }
       if(id === '8'){
        result = 'Iaakov'
       }
       if(id === '7'){
        result = 'Yaldot'
       }
       return result
    }

  const displayData = (res) => {
    const data = res.data;
    const slice = data.slice(offset, offset + perPage)
    const postData = slice.map(item => 
          <tr key={item._id}>
                  <td class='table-warning'><Link to={`/detailsong/${item._id}`}>{item.title}</Link></td>
                  <td style={{textTransform:'lowercase'}}>{item.paragraph1}...</td>
                  <td>{Moment(item.createdAt).format('DD/MM/YYYY')}</td>
                  <td>{Moment(item.createdAt).format('hh:mm')}</td>
                  <td>{item.orderSong}</td>
                  <td>
                      <i class="fa fa-trash" style={{color:'#e60e47', cursor:'pointer',fontSize:20}} onClick={() => deleteSong(item._id)}></i>&nbsp;&nbsp;
                      <Link to={`/detailsong/${item._id}`}> <i class="fa fa-edit" style={{color:'#0c66ab', cursor:'pointer',fontSize:20}}></i></Link>
                   </td>
          </tr>   
   )
     setSong(postData)
     setTotal(data.length)
    setPageCount(Math.ceil(data.length / perPage))
  }
  const submitSearch = async(e) => {
    setSearch(e.target.value)
    const searchTxt = search;
    const res = await Axios.post('https://yalhir-nodejs-mongodb.herokuapp.com/searchsongByArtist',{search:searchTxt , idArtist:id})
    displayData(res)
    setReponse(res.data.length+' result(s) found')
    if(searchTxt == ''){
        getDataSongs()
    }
 }
 const handle = (e) => {
    setPerPage(e.target.value)
    console.log(perPage)
 }
 const findByArtist = async(e) => {
    const res = Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/songArtist/'+id)
    console.log(res)
    // displayData(res) 
 }
  return (
   <div>
      
    <section class="intro-section spad">
        <div class="container">
            <div class='row'>
                <div class="col-lg-5"> 
                <h3> <i class="fa fa-music"></i> {nameArtist} <span class="badge badge-pill badge-warning">{total}</span></h3>
                
                <p>You can search here by entering the title or the part of some lyrics</p>
                </div>
                <div class="col-lg-5">
                    <div class="d-flex h-100 align-items-end">
						<div class="search-form">
							<input type="text" placeholder="Enter title or some part of lyrics..." onChange={submitSearch}  value={search}/>
							<button style={{backgroundColor:'#f7b80b',fontWeight:500}}>Search</button>
                            <strong class="text-danger">{reponse}</strong>
						</div>
			        </div>
                </div>
                <div class='col-lg-2'>
                <img src="https://thumbs.dreamstime.com/b/listening-music-emoji-cartoon-isolated-white-background-201765263.jpg" alt="" width={100}/>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2" style={{color:'#ffffff',backgroundColor:'#011c40', padding:25,  }}>
                    <Link to='/songs'><button class="btn btn-info" type=""> <i class="fa fa-plus"></i> Add new song</button></Link><br/><br/>
                    <p style={{color:'#ffffff',fontSize:18}}>Songs by artist:<br/>
                    { artists.map(item =>
                    <a  href={`/detailsongArtist/${item.idArtist}`}><li class="btn btn-warning"  key={item._id}><i class="fa fa-music"></i> &nbsp;{item.username}</li><br/><br/></a>
                    )}
                    </p>
                </div>
                <div class="col-lg-10">
                    <div class="section-title">
                        <h4>List of songs by {nameArtist}</h4>&nbsp;<br/>
                        <div class="alert alert-success" style={{width:'30%'}} role="alert">
                            <h6>Total of songs saved: <span class='text-danger'>{total}</span></h6>
                        </div>
                        <table class="table table-bordered">
                                    <thead style={{backgroundColor:'#eee'}}>
                                        <tr>
                                            <th>Title</th>
                                            <th>Paragraph1</th>
                                            <th>Created At</th>
                                            <th>Hour</th>
                                            <th>Order song</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {songs}
                         </tbody>
                    </table>
                    <div style={{marginLeft:'40%'}}>
                    <ReactPaginate 
                        previousLabel={<KeyboardArrowLeftIcon fontSize="medium"/>}
                        nextLabel={<KeyboardArrowRightIcon fontSize="medium" />}
                        pageCount={pageCount}
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

export default ListSongArtist;

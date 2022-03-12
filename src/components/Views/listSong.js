import { useState , useEffect } from "react";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../../components/style.css'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';



function ListSong() {
    const [songs, setSong] = useState([]);
    const [artists, setArtist] = useState([]);
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(20);
    const [pageCount, setPageCount] = useState(0)
    const [search, setSearch] = useState("")
    const [reponse, setReponse] = useState("")
    
    const getDataSongs = async() => {
        const res = await  Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/songs')
        displayData(res)
    } 
    useEffect(() => {
        getDataSongs()
        Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/artists')
                .then(response=>{
                 const list = response.data;
                 setArtist(list)
                 console.log(list)
        })
    
    }, [offset]);  
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
                  <td>{displayArtist(item.idArtist)}</td>
                  <td><Link to={`/detailsong/${item._id}`}>{item.title}</Link></td>
                  <td>{item.orderSong}</td>
                  <td>{item.yearProduction}</td>
                  <td>{item.refrain}</td>
                  <td>
                      <i class="fa fa-trash" style={{color:'#e60e47', cursor:'pointer',fontSize:20}} onClick={() => deleteSong(item._id)}></i>&nbsp;&nbsp;
                      <Link to={`/detailsong/${item._id}`}> <i class="fa fa-edit" style={{color:'#0c66ab', cursor:'pointer',fontSize:20}}></i></Link>
                   </td>
                  <td>  <Link to={`/detailsong/${item._id}`}> <i class="fa fa-eye" style={{cursor:'pointer',fontSize:20}}></i></Link>&nbsp;</td>
          </tr>   
   )
     setSong(postData)
    setPageCount(Math.ceil(data.length / perPage))
  }
  const submitSearch = async(e) => {
    setSearch(e.target.value)
    const searchTxt = search;
    const res = await Axios.post('https://yalhir-nodejs-mongodb.herokuapp.com/searchsong',{search:searchTxt})
    displayData(res)
    setReponse(res.data.length+' result(s) found')
    if(searchTxt == ''){
        const res = await  Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/songs')
        displayData(res) 
        setReponse('')
    }
 }
  return (
   <div>
      
    <section class="intro-section spad">
        <div class="container">
            <div class='row'>
                <div class="col-lg-5"> 
                <h3> <i class="fa fa-arrow-right"></i> Need to find a specific lyrics?</h3>
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
                    <Link to='/songs'><button class="btn btn-warning" type=""> <i class="fa fa-plus"></i> Add new song</button></Link><br/><br/>
                    <p style={{color:'#ffffff'}}>Reminder:<br/>
                    { artists.map(item =>
                    <li  style={{color:'#ffffff'}} key={item._id}>{item.idArtist} &nbsp;<i class="fa fa-arrow-right"></i> &nbsp;{item.username}</li>
                    )}
                    </p>
                </div>
                <div class="col-lg-10">
                    <div class="section-title">
                        <h4>List of songs</h4>&nbsp;<br/>
                        <table class="table table-bordered">
                                    <thead style={{backgroundColor:'#eee'}}>
                                        <tr>
                                            <th>Artist</th>
                                            <th>Title</th>
                                            <th>Order song</th>
                                            <th>Date</th>
                                            <th>Chorus part</th>
                                            <th></th>
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

export default ListSong;

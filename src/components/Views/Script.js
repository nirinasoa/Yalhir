import { useState , useEffect } from "react";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../../components/style.css'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';



function Script() {
    const [songs, setSong] = useState([]);
    const [artists, setArtist] = useState([]);
    const [offset, setOffset] = useState(0);
    const [perPage,setPerPage] = useState(20);
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
    const postData = data.map(item => 
        <div   key={item._id}>({item.idArtist},"{item.title}","{item.isFavorite}","{item.link}","{item.yearProduction}"
        ,"{item.refrain}","{item.orderSong}","{item.paragraph1}","{item.paragraph2}","{item.paragraph3}","{item.paragraph4}","{item.paragraph5}","{item.paragraph6}"),</div> 
   )
     setSong(postData)
   
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
 const handle = (e) => {
    setPerPage(e.target.value)
    console.log(perPage)
 }
  return (
   <div>
      
    <section class="intro-section spad">
        <div class="container">
            <div class='row'>
                <div class="col-lg-5"> 
                <h3> <i class="fa fa-arrow-right"></i> Generate script sqlite here?</h3>
                <p>You can generate dump sqlite here.</p>
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
            <h4>Script Artist</h4>&nbsp;<br/>
                <div class="col-lg-12" style={{ padding:25,border:'1px solid black'  }}>
                    <div> INSERT INTO Artist (idArtist,username,belongsTo,photo)VALUES </div>
                    { artists.map(item =>
                    <div   key={item._id}>({item.idArtist},"{item.username}","{item.belongsTo}","{item.photo}"),</div>
                    )}
                  
                </div>
                </div>
                <div class="row">
                <h4>Script Song</h4>&nbsp;<br/><br/>
                <div class="col-lg-12" style={{border:'1px solid black'}}>
                    <div>
                    INSERT INTO Song (
            idArtist,
            title,
            isFavorite,
            link,
            yearProduction,
            refrain,
            orderSong,
            paragraph1,
            paragraph2,
            paragraph3,
            paragraph4,
            paragraph5,
            paragraph6
            )
            VALUES
                    </div>
                                        {songs}
                         
                
   
        </div>

       
        </div>
       </div>
    </section>
 </div>
  );
}

export default Script;

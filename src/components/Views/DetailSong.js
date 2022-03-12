import { useState , useEffect } from "react";
import { Link , useParams} from 'react-router-dom';
import Axios from 'axios';

function DetailSong() {
const { id } = useParams();
const [song, setSong] = useState("");
const [usernameArtist, setUsernameArtist] = useState("");
const [belongsTo, setBelongsTo] = useState("");
const [photo, setPhoto] = useState("");
const [arrayOrder, setArrayOrder] = useState([]);
const [openFormEdit, setOpenFormEdit] = useState(false);
const [title, setTitle] = useState('');
const [yearProduction, setYearProduction] = useState('');
const [order, setOrder] = useState('');
const [refrain, setRefrain] = useState('');
const [paragraph1, setParagraph1] = useState('');
const [paragraph2, setParagraph2] = useState('');
const [paragraph3, setParagraph3] = useState('');
const [paragraph4, setParagraph4] = useState('');
const [paragraph5, setParagraph5] = useState('');
const [paragraph6, setParagraph6] = useState('');
const [response, setResponse] = useState('');
const [_id, set_id] = useState('');

useEffect(() => {
    Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/songOne/'+id)
        .then(response=>{
            const list = response.data;
            setSong(list)
            setTitle(list.title)
            setYearProduction(list.yearProduction)
            setOrder(list.orderSong)
            setRefrain(list.refrain)
            setParagraph1(list.paragraph1)
            setParagraph2(list.paragraph2)
            setParagraph3(list.paragraph3)
            setParagraph4(list.paragraph4)
            setParagraph5(list.paragraph5)
            setParagraph6(list.paragraph6)
            set_id(list.id)
            const arrayOrder = list.orderSong.split(",");
            for(var i=0; i < arrayOrder.length; i++) {
                arrayOrder[i] = arrayOrder[i].replace('P1', list.refrain === 'P1' ? '[Ref] '+ list.paragraph1 : list.paragraph1)
                                             .replace('P2',list.refrain === 'P2' ? '[Ref] '+ list.paragraph2 : list.paragraph2)
                                             .replace('P3',list.refrain === 'P3' ? '[Ref] '+ list.paragraph3 : list.paragraph3)
                                             .replace('P4', list.refrain === 'P4' ? '[Ref] '+ list.paragraph4 :list.paragraph4)
                                             .replace('P5', list.refrain === 'P5' ? '[Ref] '+ list.paragraph5 :list.paragraph5)
                                             .replace('P6', list.refrain === 'P6' ? '[Ref] '+ list.paragraph6 :list.paragraph6)
                

               }
            setArrayOrder(arrayOrder)
            Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/artistByIdArtist/'+list.idArtist)
                .then(res=>{
                const listA = res.data[0];
                    setUsernameArtist(listA.username)
                    setBelongsTo(listA.belongsTo)
                    setPhoto(listA.photo)
            
            })
   })
  

 }, []);
 const openForm= () => {
    setOpenFormEdit(true)
 }
 const closeForm= () => {
    setOpenFormEdit(false)
 }
 const submitEdit= (id) => {
    setOpenFormEdit(false)
    const song = {
        title : title,
        yearProduction : yearProduction,
        orderSong : order,
        refrain : refrain,
        paragraph1 : paragraph1,
        paragraph2 : paragraph2,
        paragraph3 : paragraph3,
        paragraph4 : paragraph4,
        paragraph5 : paragraph5,
        paragraph6 : paragraph6,
    }
    Axios.patch('https://yalhir-nodejs-mongodb.herokuapp.com/song/'+id,song)
    .then(res => {
        setResponse('/detailsong/'+id)
    });
    setTimeout(() => {
        window.location= '/detailsong/'+id
        console.log('response')
      }, 1000);
    // 
    
 }
 
  return (
   <div>
    <section class="intro-section spad">
        <div class="container">
            <div class="row" >
                <div class="col-lg-2">
                <img src="https://oceancitymd.gov/oc/wp-content/uploads/2019/01/Music-PNG-Photos.png" alt="" style={{width:'500px'}}/>
                </div>
                <div class="col-lg-8"  style={{padding:20,boxShadow: '0 0 5px #b5b1b1', borderRadius:10}}>
                    <div class="section-title">
                        <div class="blog-item">
                            <div class="blog-date">Year:
                             {openFormEdit ? <input  type="text" name="" onChange={e => setYearProduction(e.target.value)}  value={yearProduction}/> :song.yearProduction}
                             </div>
                             <h4 style={{textAlign:'center'}}>{openFormEdit ? <input type="text" name=""  onChange={e => setTitle(e.target.value)}  value={title}/> :<h3 style={{textAlign:'center'}}> <i class="fa fa-music"></i> {song.title}</h3>}</h4>
                            <div class="text-info" style={{textAlign:'center'}}>by <a href="" >{usernameArtist}</a> in <a href="">{belongsTo}</a></div>
                            <p style={{fontSize:13,textAlign:'center'}}>Order: {openFormEdit ? <input type="text" name=""  onChange={e => setOrder(e.target.value)} value={order}/> :order}  <br/>
                                                    Chorus part: {openFormEdit ? <input type="text" name=""  onChange={e => setRefrain(e.target.value)} value={refrain}/> :refrain}  </p>
                            {openFormEdit ? <button class="btn btn-danger"  onClick={() =>closeForm()}><i class="fa fa-close"></i></button>:''}&nbsp;
                            {openFormEdit ? <button class="btn btn-success" style={{float:"right"}}  onClick={() =>submitEdit(id)}><i class="fa fa-check"></i></button>:''}
                            
                            {!openFormEdit ? arrayOrder.map((value, index) => {
                                return (
                                <p style={{padding:20,textIndent:20}} key={index}>
                                     <span>{value.includes("[Ref]") ? <strong>{value}</strong> : value}</span>
                                </p>
                                )
                            }):
                            <div>
                                <label for="">Paragraph1:{refrain === 'P1' ? <strong>  [Chrorus part] <img src="https://thumbs.dreamstime.com/b/dessin-d-%C3%A9coute-emoji-de-musique-l-isol%C3%A9e-sur-le-fond-blanc-201765263.jpg" style={{flex:1, width:50,paddingTop:20}}/></strong>:''} </label>
                                <textarea rows="10" class="form-control" type="text" name=""  onChange={e => setParagraph1(e.target.value)} value={paragraph1}/>
                                <label for="">Paragraph2: {refrain === 'P2' ? <strong>  [Chrorus part]<img src="https://thumbs.dreamstime.com/b/dessin-d-%C3%A9coute-emoji-de-musique-l-isol%C3%A9e-sur-le-fond-blanc-201765263.jpg" style={{flex:1, width:50,paddingTop:20}}/></strong>:''}</label>
                                <textarea rows="10" class="form-control" type="text" name=""  onChange={e => setParagraph2(e.target.value)} value={paragraph2}/>
                                <label for="">Paragraph3: {refrain === 'P3' ? <strong>  [Chrorus part]<img src="https://thumbs.dreamstime.com/b/dessin-d-%C3%A9coute-emoji-de-musique-l-isol%C3%A9e-sur-le-fond-blanc-201765263.jpg" style={{flex:1, width:50,paddingTop:20}}/></strong>:''}</label>
                                <textarea rows="10" class="form-control" type="text" name=""  onChange={e => setParagraph3(e.target.value)} value={paragraph3}/>
                                <label for="">Paragraph4: {refrain === 'P4' ? <strong>  [Chrorus part]<img src="https://thumbs.dreamstime.com/b/dessin-d-%C3%A9coute-emoji-de-musique-l-isol%C3%A9e-sur-le-fond-blanc-201765263.jpg" style={{flex:1, width:50,paddingTop:20}}/></strong>:''}</label>
                                <textarea rows="10" class="form-control" type="text" name=""  onChange={e => setParagraph4(e.target.value)} value={paragraph4}/>
                                <label for="">Paragraph5: {refrain === 'P5' ? <strong>  [Chrorus part]<img src="https://thumbs.dreamstime.com/b/dessin-d-%C3%A9coute-emoji-de-musique-l-isol%C3%A9e-sur-le-fond-blanc-201765263.jpg" style={{flex:1, width:50,paddingTop:20}}/></strong>:''}</label>
                                <textarea rows="10" class="form-control" type="text" name=""  onChange={e => setParagraph5(e.target.value)} value={paragraph5}/>
                                <label for="">Paragraph6: {refrain === 'P6' ? <strong>  [Chrorus part]<img src="https://thumbs.dreamstime.com/b/dessin-d-%C3%A9coute-emoji-de-musique-l-isol%C3%A9e-sur-le-fond-blanc-201765263.jpg" style={{flex:1, width:50,paddingTop:20}}/></strong>:''}</label>
                                <textarea rows="10" class="form-control" type="text" name=""  onChange={e => setParagraph6(e.target.value)} value={paragraph6}/>
                            </div>
                            
                            }
                               {openFormEdit ? <button class="btn btn-danger"  onClick={() =>closeForm()}><i class="fa fa-close"></i></button>:''}&nbsp;
                            {openFormEdit ? <button class="btn btn-success" style={{float:"right"}}  onClick={() =>submitEdit(id)}><i class="fa fa-check"></i></button>:''}
                        </div>
                        
                    </div>
                </div>
                <div class="col-lg-2">
                    <button class="btn btn-primary"><i class="fa fa-download"></i> Export to word</button><br/><br/>
                    <button class="btn btn-warning"><i class="fa fa-download"></i> Export to PDF</button><br/><br/>
                    <button class="btn btn-success" onClick={() => openForm()}><i class="fa fa-edit" ></i> Edit this song</button><br/><br/>
                    <Link to="/listsong"><button class="btn btn-danger"><i class="fa fa-arrow-left"></i> Back to song list</button></Link>
                </div>
            </div>
       </div>
    </section>
 </div>
  );
}

export default DetailSong;

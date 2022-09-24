import React, { useState ,useEffect} from 'react'
import Love from '../Love/Love'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from 'axios'
import DotLoader from "react-spinners/DotLoader";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import config from '../../config';
import './home.css'
import Header from '../Header/Header';
import Search from '../search/Search';
import { useBooksContext } from '../context/useBooksContext';
import Error from '../Error/Error';
const Home = () => {
  const [open,setOpen]=useState(false)
  const [love,setLove]=useState([])
  const [war,setWar]=useState([])
  const [crime,setCrime]=useState([])
  const [adventure,setAdventure]=useState([])
  const [thriller,setThrillers]=useState([])
  const [fantasy,setFantasy]=useState([])
  const [search,setSearch]=useState('')
  const [error,setError]=useState(false)
  const [books,setBooks]=useState([])
  const [loading,setLoading]=useState(false)
  const [value,setValue]=useState('title')
  const {booksFav,dispatch}=useBooksContext()
  const {authState,authDispatch}=useBooksContext()
  const email = localStorage?.getItem('email')
  useEffect(()=>{
    (async ()=>{
    try{
     setLoading(true)
     const Love = await axios.get(`${config.bookapi}/love`)
     const War = await axios.get(`${config.bookapi}/war`)
     const Crime = await axios.get(`${config.bookapi}/crime`)
     const Adventure = await axios.get(`${config.bookapi}/adventures`)
     const Thriller = await axios.get(`${config.bookapi}/thrillers`)
     const Fantasy = await axios.get(`${config.bookapi}/fantasy`)
     setLove(Love.data.works)
     setWar(War.data.works)
     setCrime(Crime.data.works)
     setAdventure(Adventure.data.works)
     setThrillers(Thriller.data.works)
     setFantasy(Fantasy.data.works)
     setLoading(false)
   }catch(err){
     handleOpen()
   } })()
},[])

    useEffect(()=>{
      axios.get(`${config.favapi}/${email}`,{
         headers: {
        'Authorization': localStorage.getItem('token')
      }
      })
      .then((res)=>{
        dispatch({type:"SET_FAVORITE",payload:res.data})
      })
      .catch((err)=>{
      })
    },[authState])
   const searchByAuthor=()=>{
    if(value==="author"){
      setLoading(true)
      axios.get(`${config.bookapi}?${value}=${search}`)
      .then((res)=>{
        const doc = res.data.docs.length
        if(doc > 0){
         setBooks(res.data.docs)
         setLoading(false)
         setError(false)
        }
       })
      .catch((err)=>{
        setError(true)
        setLoading(false)
      })
    }
    else{
      setLoading(true)
      axios.get(`${config.booktitleapi}?${value}=${search}`)
      .then((res)=>{
        const doc = res.data.docs.length
        if(doc > 0){
         setBooks(res.data.docs)
         setLoading(false)
         setError(false)
         }
       })
      .catch((err)=>{
        setError(true)
        setLoading(false)
      })
    }
   }
   const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
  return (
    <>
<Header/>
<div className="container">
<div className="row">
<div className="input-group mt-2">
  <select className="dropdown-toggle"  style={{backgroundColor:"#CD9CFF"}} onChange={(e)=>setValue(e.target.value)}>
    <option value="title">Title</option>
    <option value="author">Author</option>
  </select>
   <input type="text" className="form-control" onChange={(e)=>setSearch(e.target.value)} value={search}/>
    <IconButton className='text-light' style={{backgroundColor:"#CD9CFF"}} onClick={searchByAuthor}>
    <SearchOutlinedIcon/>
  </IconButton>
</div>
</div>
   
   { loading ? <DotLoader color={"#CD9CFF"} loading={loading} cssOverride={{margin:"50px auto"}} size={100}/> : 
    (error) ? <Error/>:
    (books.length !== 0)?
    <div className='mt-3' style={{backgroundColor:"#CD9CFF"}}>
       <Search states={books} loading={loading} main={setBooks} titleset={setSearch} title={search}/> </div>:
    <div>
    {
    <div className='mt-3' style={{backgroundColor:"#CD9CFF"}}>
    <Love states={love} title="Love"/>
    <Love states={war} title="War"/>
    <Love states={crime}  title="Crime"/>
    <Love states={adventure} title="Adventure"/>
    <Love states={thriller} title="Thriller"/>
    <Love states={fantasy} title="Fantasy"/>
    </div>
    }
    </div>
   }
</div>
<Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    503 Internal Server Error
                </Alert>
</Snackbar>
</>
  )
}
export default Home
import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useBooksContext } from '../context/useBooksContext';
import config from '../../config';
import axios from 'axios';
import LoginAlert from '../LoginAlert/LoginAlert';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:'15px'
};
const Love = (props) => {
  const token = localStorage.getItem('token')
  const {booksFav,dispatch}=useBooksContext()
  const {authState}=useBooksContext()
   const [open, setOpen] = React.useState(false);
   const [added,setAdded]=useState(false)
   const handleAdded = () => setAdded(true)
   const handleOpen = () => setOpen(true);
  const {states} = props
  const {title} = props
  const [add,setAdd]=useState(false)
  const handleAdd =()=> setAdd(true)
  const handleClosed = ()=>setAdd(false)
  const handleCloses = ()=>setAdded(false)
  const favoritesChecker=(key)=>{
    const boolean = booksFav.some((book)=> book?.key === key)
    return boolean
  }
  let navigate = useNavigate();
  const favoriteAdd=(item)=>{
   if(token){
   let favoriteBook = item;
   let storedMovie = booksFav.find(item => item?.key === favoriteBook.key )
    if(storedMovie){
      handleAdd()
    }
    else{
    axios.post(`${config.favapi}/addfavorite`,{coverImage: favoriteBook.cover_id,title:favoriteBook.title,key:favoriteBook.key,email:localStorage.getItem('email')},{
       headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
    .then((res)=>{
      dispatch({type:'CREATE_FAVORITE',payload:res.data.data})
      handleAdded()
    })
    .catch((err)=>{
    })
   } 
   
  }
  }
  return (
    <>
      <div className="container">
          <div className="row">
          <div className="row">
              <div className="col-md-8 col-6">
                <h4 className='text-start text-dark mt-2'>{title}</h4>
              </div>
              <div className='col-md-4 col-6'>
                <button className='float-end btn text-light mt-2 text-decoration-underline' onClick={()=>navigate(`/explore/${props.title}`)
                }>Explore More</button>
              </div>
            </div>
           {  
            states?.slice(0,4).map((item,index)=>
            <div key={item.key.replace("/works/","")} className='col-sm-6 col-md-4 col-lg-3 mt-2'>
            <div className="card shadow p-2 mb-2 bg-body rounded mx-auto" style={{width: "210px" , minHeight:"300px", maxHeight:"320px"}}>
            {
              item?.cover_id ? <img src={`http://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`} className="card-img-top" style={{height:"250px"}} onClick={()=>navigate(`/details/${item.key.replace("/works/","")}`)} alt="..."/> :
              <img src={"/images/cover_not_found.jpg"} className="card-img-top" style={{height:"250px"}} alt="..." onClick={()=>navigate(`/details/${item.key.replace("/works/","")}`)}/>
            }
            <div className="row">
              <div className="col-8 col-sm-8 col-md-10">
                  <span className="card-text  text-center">{item.title.substring(0,40)}</span>
              </div>
              <div className="col-4 col-sm-4 col-md-2">
              {  (authState)?
                favoritesChecker(item.key) ? <span><IconButton className='float-end card-text mt-0 text-danger'  onClick={()=>favoriteAdd(item)}>
                <FavoriteIcon />
                </IconButton></span> : <span><IconButton className='float-end card-text mt-0'  onClick={()=>favoriteAdd(item)}>
                <FavoriteIcon  />
                </IconButton></span> :
                 favoritesChecker(item.key) ? <span><IconButton className='float-end card-text mt-0 text-danger'  onClick={()=>favoriteAdd(item)}>
                <FavoriteIcon />
                </IconButton></span> : <span><IconButton className='float-end card-text mt-0'  onClick= {handleOpen}>
                <FavoriteIcon  />
                </IconButton></span> 
               }
              </div>
            </div>
            </div>
            </div>
             ) 
          }
          </div>
        <LoginAlert state={open} main={setOpen}/>
        <Snackbar open={add} autoHideDuration={6000} onClose={handleClosed} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClosed} severity="error" sx={{ width: '100%' }}>
                    This Book is already added in your favorite
                </Alert>
        </Snackbar>
        <Snackbar open={added} autoHideDuration={6000} onClose={handleCloses} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloses} severity="success" sx={{ width: '100%' }}>
                    This Book is added to your favorite
                </Alert>
        </Snackbar>
      </div>  
      <hr/>
    </>
  )
}

export default Love
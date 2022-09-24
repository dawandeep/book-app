import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import config from "../../config";
import { useBooksContext } from '../context/useBooksContext';
import LoginAlert from '../LoginAlert/LoginAlert';
import { useNavigate } from 'react-router-dom';
const Search = (props) => {
   let navigate = useNavigate()
  const token = localStorage.getItem('token')
  const {booksFav,dispatch}=useBooksContext()
  const {authState}=useBooksContext()
  const [open, setOpen] = React.useState(false);
  const [add,setAdd]=useState(false)
   const [added,setAdded]=useState(false)
  const handleAdded = () => setAdded(true)
  const handleAdd =()=> setAdd(true)
  const handleClosed = ()=>setAdd(false)
  const handleCloses = ()=>setAdded(false)
   const handleOpen = () => setOpen(true);
   const favoritesChecker=(key)=>{
    const boolean = booksFav.some((book)=> book?.key === key)
    return boolean
  }

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
  else{
    alert("Please Login");
  }
  }
  return (
    <>
    <div>
      <div className="container">
          <div className="row">
          <div className="row">
              <div className="col-md-8 col-6">
                <h4 className='text-start text-dark mt-2'>Search Based on {props.title}</h4>
              </div>
              <div className='col-md-4 col-6'>
                <button className='float-end btn text-light mt-2 text-decoration-underline' onClick={()=>props.main('') || props.titleset('')}>Close</button>
              </div>
            </div>
          {
            props.states.slice(0,20).map((item,index)=>
            <div key={index} className='col-sm-6 col-md-4 col-lg-3 mt-2'>
            <div className="card shadow p-2 mb-2 bg-body rounded mx-auto" style={{width: "210px" , minHeight:"300px", maxHeight:"320px"}}>
            {
              item.cover_i ? <img src={`http://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`} className="card-img-top" style={{height:"250px"}} alt="..." onClick={()=>navigate(`/details/${item.key.replace("/works/","")}`)}/> :
              <img src={"/images/cover_not_found.jpg"} className="card-img-top" style={{height:"250px"}} alt="..." onClick={()=>navigate(`/details/${item.key.replace("/works/","")}`)}/>
            }
            <div className="row">
              <div className="col-8 col-sm-8 col-md-10">
                  <span className="card-text  text-center">{item.title.substr(0,30)}</span>
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
    </div>
    <hr/>
    </>
  )
}

export default Search
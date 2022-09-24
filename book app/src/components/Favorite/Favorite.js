import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { borders } from '@mui/system';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Slide } from '@mui/material';
import config from '../../config';
import { useBooksContext } from '../context/useBooksContext';
import AuthHoc from '../../AuthHoc';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Favorite = () => {
   let navigate = useNavigate()
    const {booksFav,dispatch}=useBooksContext()
    const email = localStorage.getItem('email')
    const [open,setOpen]=useState(false)
    const [bookId, setBookId] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
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
    },[])
    const DeleteBooks= () =>{
      axios.delete(`${config.favapi}/${bookId}`,{
         headers: {
        'Authorization': localStorage.getItem('token')
      }
      })
      .then((res)=>{
        dispatch({type:"REMOVE_FAVORITE",payload:bookId})
        setOpen(false)
      })
      .catch((err)=>{
      })
    }
    const DeleteBook=(id)=>{
        setBookId(id);
        handleClickOpen();
    }
  return (
    <div>
        <div className="container">
          <div className="row">
              <div className="row mt-2">
              <div className="col-md-1 col-sm-6">
              <Button className="btn text-decoration-underline float-start fw-bold" color="inherit" component={Link} to='/'>Back</Button>
              </div>
              <div className='col-md-11 col-sm-6'>
                 <h4 className='text-center text-dark mt-2'>Favorite Books</h4>
              </div>
            </div>
           {
            booksFav.map((item,index)=>
            <div key={index} className='col-sm-6 col-md-4 col-lg-3 mt-2'>
            <div className="card shadow p-2 mb-2 bg-body rounded mx-auto" style={{width: "210px" , minHeight:"300px", maxHeight:"320px"}}>
            {
              item?.coverImage ? <img src={`http://covers.openlibrary.org/b/id/${item?.coverImage}-M.jpg`} className="card-img-top" style={{height:"250px"}} alt="..." onClick={()=>navigate(`/details/${item.key.replace("/works/","")}`)}/> :
              <img src={"/images/cover_not_found.jpg"} className="card-img-top" style={{height:"250px"}} alt="..." onClick={()=>navigate(`/details/${item.key.replace("/works/","")}`)}/>
            }
            <div className="row">
              <div className="col-8 col-sm-8 col-md-10">
                  <span className="card-text  text-center">{item?.title.substring(0,40)}</span>
              </div>
              <div className="col-4 col-sm-4 col-md-2">
                <span><IconButton className='float-end card-text  mt-0 text-danger' onClick={()=>DeleteBook(item._id)}>
                <DeleteIcon />
                </IconButton></span>
              </div>
            </div>
            </div>
            </div>
            ) 
          }
          </div>
             <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle  style={{backgroundColor:"#CD9CFF"}} className="text-center fw-bold">{"BOOK APP"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" className='mt-2 fw-bold'>
                        Do you want to delete this Book?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='d-flex justify-content-center'>
                    <Button variant='contained' style={{backgroundColor:"#CD9CFF"}}  onClick={DeleteBooks}>Yes</Button>
                    <Button variant='contained' style={{backgroundColor:"#CD9CFF"}} onClick={handleClose}>No</Button>
                </DialogActions>
            </Dialog>
       </div>  
      <hr/>
    </div>
  )
}

export default AuthHoc(Favorite)
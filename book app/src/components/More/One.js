import React,{ useEffect,useState } from "react";
import ReactPaginate from "react-paginate";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DotLoader from "react-spinners/DotLoader";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import config from "../../config";
import { useBooksContext } from '../context/useBooksContext';
import { Link, useNavigate } from 'react-router-dom';
import LoginAlert from "../LoginAlert/LoginAlert";
export default function One(props){
   let navigate = useNavigate()
    const {states} = props;
    const {loading} = props;
    const {title} = props;
// We start with an empty list of states.
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const {authState}=useBooksContext()
  const itemsPerPage = 8;
  const {booksFav,dispatch}=useBooksContext()
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const [add,setAdd]=useState(false)
   const [added,setAdded]=useState(false)
  const handleAdded = () => setAdded(true)
  const handleAdd =()=> setAdd(true)
  const handleClosed = ()=>setAdd(false)
  const handleCloses = ()=>setAdded(false)
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(states.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(states.length / itemsPerPage));
  }, [itemOffset,itemsPerPage,states]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % states.length;
    setItemOffset(newOffset);
  };
 const favoriteAdd=(item)=>{
  const token = localStorage.getItem('token')
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
const favoritesChecker=(key)=>{
    const boolean = booksFav.some((book)=> book?.key === key)
    return boolean
  }
  return (
    <>
     <div>
      <div className="container">
          <div className="row">
          <div className="row mt-2">
              <div className="col-md-1 col-sm-6">
              {/* <button  component={Link} to='/'>Back</button> */}
              <Button className="btn text-decoration-underline float-start fw-bold" color="inherit" component={Link} to='/'>Back</Button>
              </div>
              <div className='col-md-11 col-sm-6'>
                 <h4 className='text-center text-dark mt-2'>Explore Books {title}</h4>
              </div>
            </div>
           { loading ? <DotLoader color={"#CD9CFF"} loading={loading} cssOverride={{margin:"50px auto"}} size={100}/> :
            currentItems.map((item,index)=>
            <div key={index} className='col-sm-6 col-md-4 col-lg-3 mt-2'>
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
         <LoginAlert state={open} main={setOpen} />
      </div>
    </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination d-flex justify-content-center mt-2"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link back text-light"
        nextLinkClassName="page-link back text-light"
        activeLinkClassName="active"
      />
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
    </>
  );
}

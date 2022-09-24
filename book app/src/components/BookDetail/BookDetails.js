import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import DotLoader from "react-spinners/DotLoader";
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header'
import config from '../../config';
import axios from 'axios';
import  './book-detailed.css'
const BookDetails = () => {
  const {key} = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    async function getBookDetails(){
      try{
        const response = await axios.get(`${config.bookapi}/detail/${key}`);
        let data = response.data
        if(data){
          const {title, covers, subject_places, subject_times, subjects} = data;
          const newBook = {
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : <img src={"/images/cover_not_found.jpg"} className="card-img-top" style={{height:"250px"}} alt="..."/>,
            subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
            subject_times : subject_times ? subject_times.join(", ") : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found"
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch(error){
        setLoading(false);
      }
    }
    getBookDetails();
  }, [key]);

  return (
    <div className='book-detailed'>
    <Header/>
    {
      loading ?  <DotLoader color={"#CD9CFF"} loading={loading} cssOverride={{margin:"50px auto"}} size={100}/> :
        <section className="book-details">
      <div className='container'>
      <div className="row">
        <div className="col-md-12">
        <button type='button' className='d-flex align-items-center justify-content-center back-btn'  onClick={() => navigate("/")}>
          <FaArrowLeft size = {22} /><span className='fw-bold'>Go Back</span>
        </button>
        </div>
      </div>
    <div className="row">
      <div className="col-md-12 col-lg-5">
        <div className='book-details-img'>
          <img src = {book?.cover_img} alt = "cover img" height="450px" />
          </div>
        </div>
        <div className="col-md-12 col-lg-7 d-flex align-items-start justify-content-center flex-column">
          <div className='book-details-info text-start' style={{overFlow:"hidden"}} >
            <div className='book-details-item'>
              <p className='fw-bold'>{book?.title}</p>
            </div>
            {/* <div>
              <span className='fw-light'>{book?.description}</span>
            </div> */}
            <div className='book-details-item'>
              <span className='fw-bold'>Subject Places: </span>
             <span className='fw-light'>{book?.subject_places}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-bold'>Subject Times: </span>
              <span className='fw-light'>{book?.subject_times}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-bold '>Subjects: </span>
              <span className='fw-light'>{book?.subjects}</span>
            </div>
          </div>
          </div>
</div>

      </div>
    </section>
    }
    </div>
  )
}

export default BookDetails
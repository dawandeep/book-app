import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../config';
import './page.css'
import One from './One';
const More = () => {
    let {name} = useParams();
    const subjectName = name.toLowerCase();
    const [loading,setLoading]=useState(false)
    const [books,setBooks]=useState([])
    useEffect(()=>{
      setLoading(true)
      axios.get(`${config.bookapi}/${subjectName}`)  
      .then((res)=>{
        setBooks(res.data.works)
        setLoading(false)
      })
      .catch((err)=>{
      })
    },[subjectName])
  return (
    <>
    <One states={books} title={name} loading={loading}/>
    </>
  )
}

export default More
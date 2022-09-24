import axios from 'axios';
import {
  Card,
  CardContent,
} from "@mui/material";
import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useParams, Link } from 'react-router-dom'
import config from '../../config';
import { Button } from '@mui/material';
const User = () => {
    const [student,setStudent]=useState();
     let {email} = useParams();
    useEffect(()=>{
        axios.get(`${config.authapi}/user/${email}`,{
           headers: {
        'Authorization': localStorage.getItem('token')
      }
        })
        .then((res)=>{
            setStudent(res.data)
        })
        .catch((err)=>{
        })
    },[email])
  return (
    <div>
     <Card style={{ maxWidth: 450, margin: "0 auto", padding: "10px 5px" }} className='mt-3'>
      <CardContent>
       <div className="container d-flex justify-content-center align-items-center flex-column mt-1">
            <Avatar src={`http://localhost:7000/uploads/${student?.image}`} style={{ width: 250, height: 250 }} />
            <h2 className="mt-2">{student?.firstname} {student?.lastname}</h2>
            <p><LocationCityIcon/>{student?.city}</p>
            <p><EmailIcon/>{student?.email}</p>
            <p><LocalPhoneIcon />{student?.phone}</p>
        </div>
        <Button id="ght" component={Link} className="text-center" variant='contained' to="/">Back</Button>
         </CardContent>
         </Card>
    </div>
  )
}

export default User

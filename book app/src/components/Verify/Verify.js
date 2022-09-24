import axios from 'axios'
import styles from "./styles.module.css";
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import config from '../../config'

const Verify = () => {
    const [message,setMessage]=useState('');
    let {id} = useParams()
    let navigate = useNavigate()
    useEffect(()=>{
    async function Verify(){
    const response =await axios.get(`${config.authapi}/verify/${id}`)
    setMessage(response.data.message)
    } Verify()
  },[id])
  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col-md-12 mt-5 text-center">
                    <h1>Welcome to the Book App {message}</h1>
                </div>
            </div>
             <div className="row">
                <div className="mt-2 text-center mt-2">
						<button type="submit" onClick={()=>navigate('/login')}  className={styles.prp_btn}>
							LOG IN
						</button>
				</div>
            </div>
        </div>
    </div>
  )
}

export default Verify
import { useFormik } from 'formik';
import config from '../../config';
import React,{useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import { Icon } from 'react-icons-kit';
import axios from 'axios';
import * as yup from 'yup';
import {Link} from 'react-router-dom'
import styles from "./Home.css";
import { useNavigate } from "react-router-dom";
import { useBooksContext } from '../context/useBooksContext';
export default function Login() {
    let navigate = useNavigate()
    const {authState,authDispatch}=useBooksContext()
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);
    const [type, setType]=useState('password');
    const [icon, setIcon]=useState(eyeOff);

  const handleToggle=()=>{    
    if(type==='password'){
      setIcon(eye);      
      setType('text');
    }
    else{
      setIcon(eyeOff);     
      setType('password');
    }
  }
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password:'',
        },
        onSubmit: (values) => {
          axios.post(`${config.authapi}/login`,{
            email:values.email,
            password:values.password
          }).then((data)=>{
             if (data.status === 200) {
                    localStorage.setItem("token", data.data.token);
                    localStorage.setItem("email", values.email);
                    authDispatch({type: 'LOGIN'})
                    navigate('/');
                }
          }).catch((err)=>{
             handleOpen()
          })
        },
		validationSchema: yup.object().shape({
            email: yup.string()
                .email('Invalid Email Address')
                .required('Email cannot be empty'),
            password: yup.string()
                .required('Password cannot be empty'),
            
        }),
      });
return (
    <div className = "container mt-5" >
        <div className = "row">
            <div className = "col-md-12 col-lg-5 col-sm-12 text-center p-5 mt-5">
			<img className="imgicon" src="/images/login.svg" alt=""/>
              <div className="mt-3 d-flex justify-content-center">
			  <h2>Login to Your Account</h2>
              </div>
			  <form className="form_container" onSubmit={formik.handleSubmit}>
						<div className="mt-2 w-75">
                            <input id="email" name="email" type="text" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Email" />
                            {formik.errors.email && formik.touched.email ? <span className="text-danger">{formik.errors.email}</span> : null}
						</div>
						<div style={{position:"relative"}} className="mt-2 w-75">
							<input id="password"  name="password" type={type} value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Password" />
              <span onClick={handleToggle} className="password-toogle-icon"><Icon icon={icon} size={20}/>
                                    </span>
                            {formik.errors.password && formik.touched.password ? <span className="text-danger">{formik.errors.password} </span> : null}
                            
                            </div>
                            
                            <div className="mt-2 w-75">
                            <Link to="/forgot-password">Forget password?</Link>
                            </div>
							<div className="mt-2 text-center mt-2">
						<button id="btnLogin" type="submit" className="prp_btn">
							Sign In 
						</button>
                       
						</div>
						
					</form>
				</div>
				<div className = "col-md-8 col-lg-7 col-sm-12">
				<img className="w-100" src="/images/register.svg" alt=""/>
				</div>
				</div>
                <Snackbar id="error" open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Incorrect email or password
                </Alert>
            </Snackbar>
		</div>
	);
};


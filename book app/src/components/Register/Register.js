import { useFormik } from 'formik';
import * as yup from 'yup';
import React,{useState} from 'react';
import styles from "./styles.module.css";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import { Icon } from 'react-icons-kit';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);
    const [status,setStatus]= React.useState(false);
    const [type, setType]=useState('password');
    const [types, setTypes]=useState('password');
    const [icon, setIcon]=useState(eyeOff);
    const [icons, setIcons]=useState(eyeOff);
    const SUPPORTED_FORMATS = ["image/jpg","image/jpeg","image/png"];
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
  const handleToggle2=()=>{    
    if(types==='password'){
      setIcons(eye);      
      setTypes('text');
    }
    else{
      setIcons(eyeOff);     
      setTypes('password');
    }
  }
    let navigate=useNavigate()
    const handleOpen = () => {
        setOpen(true);
    };
    const handleStatus = () => {
        setStatus(true);
    };
    const handleStatusClose = () => {
        setStatus(false);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password:'',
            confirmpassword:'',
            city: '',
            mob:'',
            image:'',
    },
        onSubmit: (values) => {
          const formData = new FormData()
          formData.append('myFile',values.image,values.image.name)
          formData.append('firstname',values.firstname)
          formData.append('lastname',values.lastname)
          formData.append("city",values.city)
          formData.append("phone",values.mob)
          formData.append("email",values.email)
          formData.append("password",values.confirmpassword)
          axios.post(`${config.authapi}/register`,formData
            ).then((res)=>{
            if(res.data.status === 409){
                handleOpen()
            }
            else if(res.data.status === 200){
              handleStatus()  
             setTimeout(() => {
                navigate('/login')
                 }, 4000)
             }
           })
          .catch((err)=>{
        })
        },

    validationSchema: yup.object().shape({
            firstname: yup.string()
                .min(2, 'FirstName should contain atleast 2 characters')
                .max(10, 'FirstName is too long')
                .required('FirstName cannot be empty'),
            lastname: yup.string()
                .min(1, 'LastName should contain atleast 1 characters')
                .max(10, 'LastName is too long')
                .required('LastName cannot be empty'),
            email: yup.string()
                .email('Invalid Email Address')
                .required('Email cannot be empty'),
            password: yup.string()
                .required('Password cannot be empty'),
            confirmpassword: yup.string()
                .required('Confirm Password cannot be empty')
                .test('confirmpassword', 'Password & confirm password should be same', function(cpass){
                    if(this.parent.password===cpass){
                        return true;
                    }
                    return false;
                }),
            city: yup.string()
                .required('City cannot be empty'),
            mob: yup
                .string("Enter numbers only")
                .max(10, "Mobile no should contain only 10 digits")
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(10, "Mobile no should contain minimum 10 digits")
                .required("Mobile no  is required"),
                image: yup.mixed()
                .nullable()
                .required()
                .test(
                    "FILE_SIZE",
                    "Uploaded file is to big.",
                    (value) => !value || (value && value.size <= 1024*1024)
                )
                .test(
                    "FILE_FORMAT",
                    "Uploaded file has unsupported format",
                    (value)=> !value || (value && SUPPORTED_FORMATS.includes(value?.type))
                ),
            
        }),
      });
    //   {({setFieldValue})}
return (
		<div className = "container mt-3" >
            <div className = "row">
                <div className = "col-md-12 col-lg-5 col-sm-12 text-center p-5 mt-2">
                    <img className={styles.igeicon} src="/images/m13.svg" alt=""/>
                        <div className=" d-flex justify-content-center">
                            <h2>Create Account</h2>
                        </div>
                    <form className={styles.form_container} onSubmit={formik.handleSubmit}>
                        <div className="mt-2 w-100">
                            <input id="firstname" name="firstname" type="text" value={formik.values.firstname} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="First Name" />
                            {formik.errors.firstname && formik.touched.firstname ? <span className="text-danger">{formik.errors.firstname}</span> : null}
                        </div>
                        
                        <div className="mt-2 w-100">
                            <input id="lastname" name="lastname" type="text" value={formik.values.lastname} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Last Name" />
                            {formik.errors.lastname && formik.touched.lastname ? <span className="text-danger">{formik.errors.lastname}</span> : null}
                        </div>
                        <div className="mt-2 w-100">
                            <input id="email" name="email" type="text" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Email" />
                            {formik.errors.email && formik.touched.email ? <span className="text-danger">{formik.errors.email}</span> : null}
                        </div>
                        <div style={{position:"relative"}} className="mt-2 w-100">
                            <input id="password" name="password" type={type} value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Password" />
                            <span onClick={handleToggle} className="password-toogle-icon"><Icon icon={icon} size={20}/></span>
                            {formik.errors.password && formik.touched.password ? <span className="text-danger">{formik.errors.password}</span> : null}
                        </div>
                        <div style={{position:"relative"}} className="mt-2 w-100">
                            <input id="confirmpassword" name="confirmpassword" type={types} value={formik.values.confirmpassword} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Confirm Password" />
                            <span onClick={handleToggle2} className="password-toogle-icon"><Icon icon={icons} size={20}/></span>
                            {formik.errors.confirmpassword && formik.touched.confirmpassword ? <span className="text-danger">{formik.errors.confirmpassword}</span> : null}
                        </div>
                        <div className="mt-2 w-100">
                            <input id="city" name="city" type="text" value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="City" />
                            {formik.errors.city && formik.touched.city ? <span className="text-danger">{formik.errors.city}</span> : null}
                        </div>
                        <div className="mt-2 w-100">
                            <input id="mob" name="mob" type="tel" value={formik.values.mob} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Mobile" />
                            {formik.errors.mob && formik.touched.mob ? <span className="text-danger">{formik.errors.mob}</span> : null}
                        </div>
                        <div className="mt-2 w-100">
                           Profile Upload: <input id="image" type="file" className="form-control"  autoComplete='off' onChange={(event)=>{
                               formik.setFieldValue("image",event.target.files[0]);
                            }}/>
                            {formik.errors.image && formik.touched.image ? <span className="text-danger">{formik.errors.image}</span> : null}
                        </div>
                        <div className="mt-2 text-center mt-2">
                        <button id="btnSignup" type="submit" className={styles.prp_btn}>
							Sign Up
						</button>
                        </div>
                        </form>
                    </div>

                    <div className = "col-md-8 col-lg-7 col-sm-12">
                        <img id="image" className="w-100 mt-2" src="/images/rsg.svg" alt=""/>
                    </div>
                </div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert id="rsg" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    User with specified email already exists
                </Alert>
            </Snackbar>
             <Snackbar open={status} autoHideDuration={6000} onClose={handleStatusClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleStatusClose} severity="success" sx={{ width: '100%' }}>
                    User registered successfully and Please verify your mail id
                </Alert>
            </Snackbar>

            </div>
    );
};

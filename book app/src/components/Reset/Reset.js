import { useFormik } from 'formik';
import * as yup from 'yup';
import "./Resetpassword.css";
import React,{useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import MuiAlert from '@mui/material/Alert';
import { Icon } from 'react-icons-kit';
import axios from 'axios';
import config from '../../config'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
export default function Reset_password() {
    let {token} = useParams()
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);
    const [status,setStatus]= React.useState(false);
    const [type, setType]=useState('password');
    const [types, setTypes]=useState('password');
    const [icon, setIcon]=useState(eyeOff);
    const [icons, setIcons]=useState(eyeOff);

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
      newpassword:'',
      confirmpassword:''
    },
    onSubmit: (values) => {
        axios.post(`${config.authapi}/reset-password/${token}`,{
        password:values.confirmpassword
      })
      .then((res)=>{
        if(res.data.status === 400){
                handleOpen()
            }
            else if(res.data.status === 200){
              handleStatus()  
             setTimeout(() => {
                navigate('/login')
                 }, 3500)
             }
      }).catch((err)=>{
      })
    },
validationSchema: yup.object().shape({
        newpassword: yup.string()
        .required('Password cannot be empty'),
        confirmpassword: yup.string()
        .required('Confirm Password cannot be empty')
        .test('confirmpassword', 'Password & confirm password should be same', function(cpass){
        if(this.parent.newpassword===cpass){
        return true;
        }
        return false;
        }),
     }),
  });
return(
   <div className = "container mt-5" >
      <div className = "row">
          <div className = "col-md-12 col-lg-5 col-sm-12 text-center p-4 mt-4">
            <div className="mt-5 d-flex justify-content-center flex-column">
            <h2>Reset Password</h2>
            </div>
            <form className="form_container" onSubmit={formik.handleSubmit}>
            <div style={{position:"relative"}} className="mt-2 w-100">
                        <input id="newpassword" name="newpassword" type={type} value={formik.values.newpassword} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="New Password" />
                        <span onClick={handleToggle} className="password-toogle-icon"><Icon icon={icon} size={20}/></span>
                        {formik.errors.newpassword && formik.touched.newpassword ? <span className="text-danger">{formik.errors.newpassword}</span> : null}
                        </div>
                        <div style={{position:"relative"}} className="mt-2 w-100">
                        <input id="confirmpassword" name="confirmpassword" type={types} value={formik.values.confirmpassword} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Confirm Password" />
                         <span onClick={handleToggle2} className="password-toogle-icon"><Icon icon={icons} size={20}/></span>
                         {formik.errors.confirmpassword && formik.touched.confirmpassword ? <span className="text-danger">{formik.errors.confirmpassword}</span> : null}
                        </div>
                        <div className="mt-2 text-center mt-2">
						<button type="submit" className="prp_btn">
							Submit
						</button>
						</div>
     </form>
      </div>
      <div className = "col-md-8 col-lg-7 col-sm-12">
      <img className="w-100 mt-5" src="/images/forgetpassword.svg" alt=""/>
      </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                   This link has been expired
                </Alert>
            </Snackbar>
             <Snackbar open={status} autoHideDuration={4000} onClose={handleStatusClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleStatusClose} severity="success" sx={{ width: '100%' }}>
                    User Password has been reset & login again
                </Alert>
            </Snackbar>

  </div>
      
  );
};

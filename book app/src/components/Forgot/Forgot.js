import axios from 'axios';
import React from 'react';
import { useFormik } from 'formik';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import config from '../../config'
import * as yup from 'yup';
import "./Forgetpassword.css";
export default function Forget_password() {
  const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);
    const [status,setStatus]= React.useState(false);
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
      email:''
    },
    onSubmit: (values) => {
      axios.post(`${config.authapi}/forgot-password`,{
        email:values.email
      })
      .then((res)=>{
        if(res.data.status === 404){
          handleOpen()
        }
        else if(res.data.status === 200)
        {
          handleStatus()
        }
      }).catch((err)=>{
      })
    },
validationSchema: yup.object().shape({
        email: yup.string()
            .email('Invalid Email Address')
            .required('Email cannot be empty'),
        }),
  });
return(
   <div className = "container mt-5" >
      <div className = "row">
          <div className = "col-md-12 col-lg-5 col-sm-12 text-center p-4 mt-4">
            <div className="mt-5 d-flex justify-content-center flex-column">
            <h2>Forgot Password</h2>
            </div>
      <form className="form_container" onSubmit={formik.handleSubmit}>
          <div className="mt-2 w-100">
              <input id="email" name="email" type="text" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Email" />
              {formik.errors.email && formik.touched.email ? <span className="text-danger">{formik.errors.email}</span> : null}
          </div>
          <div className="mt-2 text-center mt-2">
						<button id="btnfgpd" type="submit" className="prp_btn">
							Submit
						</button>
						</div>
                </form>
            </div>
            <div className = "col-md-8 col-lg-7 col-sm-12">
            <img className="w-100 mt-5" src="/images/forgetpassword.svg" alt=""/>
            </div>
            </div>
            <Snackbar id='fgr' open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    This email does not exists
                </Alert>
            </Snackbar>
             <Snackbar id='fg' open={status} autoHideDuration={6000} onClose={handleStatusClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleStatusClose} severity="success" sx={{ width: '100%' }}>
                    Please check your mail and reset your password
                </Alert>
            </Snackbar>
        </div>
    );
};

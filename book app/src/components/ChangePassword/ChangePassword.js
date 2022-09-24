import { useFormik } from 'formik';
import * as yup from 'yup';
import "./Resetpassword.css";
import React,{useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import config from '../../config'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import { Icon } from 'react-icons-kit';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AuthHoc from '../../AuthHoc';
function ChangePassword() {
    let {id} = useParams()
    const [type, setType]=useState('password');
    const [types, setTypes]=useState('password');
    const [typed,setTyped]=useState('password')
    const [icon, setIcon]=useState(eyeOff);
    const [icons, setIcons]=useState(eyeOff);
    const [iconss, setIconss]=useState(eyeOff);

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
  const handleToggle3=()=>{    
    if(typed==='password'){
      setIconss(eye);      
      setTyped('text');
    }
    else{
      setIconss(eyeOff);     
      setTyped('password');
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
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);
    const [status,setStatus]= React.useState(false);
    const [old,setOld]=React.useState(false);
    let navigate=useNavigate()
    const handleOpen = () => {
        setOpen(true);
    };
    const handleOld=()=>{
      setOld(true);
    }
    const handleOldClose=()=>{
      setOld(false);
    }
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
      oldpassword:'',
      newpassword:'',
      confirmpassword:''
    },
    onSubmit: (values) => {
        axios.put(`${config.authapi}/change-password/${id}`,{
        password:values.oldpassword,
        newpassword:values.confirmpassword
      })
      .then((res)=>{
        if(res.data.status === 400){
               handleOld()
            }
       else if(res.data.status === 200){
              handleStatus()  
             setTimeout(() => {
                navigate('/')
                 }, 3500)
             }
      }).catch((err)=>{
         if(err.response.status === 401){
                handleOpen()
            }
      })
    },
validationSchema: yup.object().shape({
        oldpassword:yup.string()
        .required('Old Password cannot be empty'),
        newpassword: yup.string()
        .required('New Password cannot be empty'),
        confirmpassword: yup.string()
        .required('Confirm Password cannot be empty')
        .test('confirmpassword', 'New Password & confirm password should be same', function(cpass){
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
            <h2>Change Password</h2>
            </div>
            <form className="form_container" onSubmit={formik.handleSubmit}>
            <div  style={{position:"relative"}} className="mt-2 w-100">
             <input id="oldpassword" name="oldpassword" type={type} value={formik.values.oldpassword} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Old Password" />
             <span onClick={handleToggle} className="password-toogle-icon"><Icon icon={icon} size={20}/></span>
             {formik.errors.oldpassword && formik.touched.oldpassword ? <span className="text-danger">{formik.errors.oldpassword}</span> : null}
            </div>
            <div  style={{position:"relative"}}className="mt-2 w-100">
               <input id="newpassword" name="newpassword" type={types} value={formik.values.newpassword} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="New Password" />
              <span onClick={handleToggle2} className="password-toogle-icon"><Icon icon={icons} size={20}/></span>
               {formik.errors.newpassword && formik.touched.newpassword ? <span className="text-danger">{formik.errors.newpassword}</span> : null}
            </div>
            <div style={{position:"relative"}} className="mt-2 w-100">
                <input id="confirmpassword" name="confirmpassword" type={typed} value={formik.values.confirmpassword} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Confirm Password" />
              <span onClick={handleToggle3} className="password-toogle-icon"><Icon icon={iconss} size={20}/></span>
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
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                   Please Check Your Current Password
                </Alert>
            </Snackbar>
        <Snackbar open={old} autoHideDuration={3000} onClose={handleOldClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleOldClose} severity="error" sx={{ width: '100%' }}>
                  Your Old Password & New Password are Same
                </Alert>
            </Snackbar>    
             <Snackbar open={status} autoHideDuration={4000} onClose={handleStatusClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleStatusClose} severity="success" sx={{ width: '100%' }}>
                    Your Password Change Successfully
                </Alert>
            </Snackbar>
    </div>
       );
};
export default AuthHoc(ChangePassword)
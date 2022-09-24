import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import styles from "./styles.module.css";
import { useNavigate } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:'15px'
};
export default function LoginAlert(props) {
  let navigate = useNavigate()
  const handleClose = () => props.main(false);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.state}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.state}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
            <i className="text-danger fa-solid fa-heart fa-4x d-flex justify-content-center " ></i> 
            </Typography>
            <Typography className="text-center fw-bold" id="transition-modal-description" sx={{ mt: 2 }}>
            Join Book App now to let you add the book to your favorite
            </Typography>
            <div className="mt-2 text-center mt-2">
		<button onClick={()=>navigate('/login')} className={styles.prp_btn}>
							Sign In
			</button>
       <button onClick={()=>navigate('/register')} className={styles.prp_btn}>
							Sign Up
			 </button>
			</div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

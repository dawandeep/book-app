import React from 'react';
import {
  MDBFooter,
  
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-left'>
       <div className='text-center p-3' style={{ backgroundColor: '#CD9CFF' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        
          Book App
       
      </div>
    </MDBFooter>
  );
}
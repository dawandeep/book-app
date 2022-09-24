import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Error = () => {
  return (
    <>
      <div className="container">
        <div className="row">
            <div className="col-md-12">
              <div className='col-md-12 col-lg-12 col-sm-12'>
                <img className='w-75 mx-auto' src='/images/404_not_found.svg' style={{height:"40vh" }} alt='NOT FOUND'></img>
                </div>
            </div>
        </div>

      </div>
    </>
  )
}

export default Error
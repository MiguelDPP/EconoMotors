import React from 'react';
import NotFoundImage from '@images/404NotFound.gif';

const NotFound = () => {
  return (
    <div className='bg-black vh-100 vw-100 d-flex justify-content-center align-items-center'>
      <div style={{maxWidth: 900}}>
        <img src={NotFoundImage.src} style={{width: '100%'}} alt="404 Not Found" />
      </div>
    </div>
  )
}

export default NotFound
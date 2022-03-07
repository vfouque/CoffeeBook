import React from 'react';
import './logoCB.css'

export default function LogoCB() {
    const goHome = ()=>{
        window.location.reload()
    }

    return (
        <div className='d-flex justify-content-center' onClick={goHome} type='button'>
            <img className="logo" src={process.env.PUBLIC_URL + `./images/iconeCB.png` } alt="Logo CoffeeBook"  />
        </div>
    )
}


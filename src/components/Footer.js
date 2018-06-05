import React from 'react'
import footerImg from '../assets/timeLike.jpg'
const Footer = () => {
    return(
        <footer className='component-footer'>
            <p> ©2018 TimeLike </p>
            <img src={footerImg}/> 
        </footer>
    )
}
export default Footer
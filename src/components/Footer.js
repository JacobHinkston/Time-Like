import React from 'react'
import footerImg from '../assets/timeLike.png'
const Footer = () => {
    return(
        <footer className='component-footer'>
            <p> ©2018 TimeLike </p>
            <img src={footerImg} alt='#'/> 
        </footer>
    )
}
export default Footer
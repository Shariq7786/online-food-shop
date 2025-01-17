import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <p>At Alhamd.com, we are passionate about delivering the finest products and services to our customers. Our journey began with a commitment to quality, innovation, and exceptional customer care. From our humble beginnings to becoming a trusted name, we strive to make every experience with us meaningful and memorable.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-647-010-4321</li>
                <li>alhamdfood@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright"> Copyright {new Date().getFullYear()} © Alhamd.com - All Rights Reserved. </p>

    </div>
  )
}

export default Footer

import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
function Footer() {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum optio omnis deleniti, sit nihil sunt. Minima dolorum impedit quae distinctio saepe hic quisquam eligendi molestias sapiente, aliquam dolores quod dicta molestiae similique? Pariatur qui sint illum ex provident, voluptatibus doloremque corrupti vero quos vel aspernatur numquam recusandae quasi possimus iste?</p>
            <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
            </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>home</li>
                    <li>about us</li>
                    <li>delivery</li>
                    <li>privice polity</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>get in touch</h2>
                <ul>
                    <li>+1-212-545-92892</li>
                    <li>contect@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            copyrights 2025 @ tomato.com
        </p>
    </div>
  )
}

export default Footer
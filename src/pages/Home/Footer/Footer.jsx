import React from 'react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { IoLogoTwitter } from 'react-icons/io';
const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-[#2E5077] text-white p-10">
  <aside>
   
    <div>
    <p className='text-4xl '>
      Follow Us On 
    </p>

    <div className="flex items-center  gap-4 mt-5">
             <button className='bg-white text-2xl rounded-full text-[#1877F2] cursor-pointer'>
              <FaFacebook></FaFacebook>
             </button>
                <button className=' text-2xl rounded-full text-[#1877F2] cursor-pointer'>
                <IoLogoTwitter />
                </button>
                <div className='flex items-center justify-center bg-white h-4 w-4'>
                <button className=' text-2xl    text-[#1877F2] cursor-pointer'>
                <FaLinkedin />
                </button>
                </div>
              </div>

    </div>
  </aside>
  <nav>
    <h6 className="footer-title">Categories</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Shopping</h6>
    <a className="link link-hover">Payments</a>
    <a className="link link-hover">Delivery options</a>
    <a className="link link-hover">Buyer protection</a>
    
  </nav>
  <nav>
    <h6 className="footer-title">Customer care</h6>
    <a className="link link-hover">Help center</a>
    <a className="link link-hover">Terms & Conditions</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Returns & refund</a>
    <a className="link link-hover">Survey & feedback</a>
  </nav>
  <nav>
    <h6 className="footer-title">Pages</h6>
    <a className="link link-hover">About Us</a>
    <a className="link link-hover">Contact Us</a>
    <a className="link link-hover">Services</a>
    <a className="link link-hover">Blog</a>
  </nav>
</footer>

<footer className="footer border-white border-t sm:footer-horizontal footer-center bg-[#2E5077] text-white p-4">
  <aside>
    <p>© 2025 Brainiacs Inc. All rights reserved </p>
  </aside>
</footer>
        </div>

    );
};

export default Footer;
import React from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { IoLogoTwitter } from 'react-icons/io';

const Footer = () => {
  return (
    <footer className="bg-[#2E5077] text-white pt-16 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-white/20">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Follow Us On</h2>
          <div className="flex space-x-4">
            {[
              { icon: <FaFacebookF />, color: 'bg-white text-[#1877F2]' },
              { icon: <IoLogoTwitter />, color: 'bg-white text-[#1DA1F2]' },
              { icon: <FaLinkedinIn />, color: 'bg-white text-[#0077B5]' },
            ].map((item, i) => (
              <button
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl hover:scale-110 transition ${item.color}`}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h6 className="uppercase font-bold mb-4 tracking-wide">Categories</h6>
          <ul className="space-y-2">
            <li><a className="hover:underline">Branding</a></li>
            <li><a className="hover:underline">Design</a></li>
            <li><a className="hover:underline">Marketing</a></li>
            <li><a className="hover:underline">Advertisement</a></li>
          </ul>
        </div>

        <div>
          <h6 className="uppercase font-bold mb-4 tracking-wide">Shopping</h6>
          <ul className="space-y-2">
            <li><a className="hover:underline">Payments</a></li>
            <li><a className="hover:underline">Delivery options</a></li>
            <li><a className="hover:underline">Buyer protection</a></li>
          </ul>
        </div>

        <div>
          <h6 className="uppercase font-bold mb-4 tracking-wide">Customer Care</h6>
          <ul className="space-y-2">
            <li><a className="hover:underline">Help center</a></li>
            <li><a className="hover:underline">Terms & Conditions</a></li>
            <li><a className="hover:underline">Privacy policy</a></li>
            <li><a className="hover:underline">Returns & refund</a></li>
            <li><a className="hover:underline">Survey & feedback</a></li>
          </ul>
        </div>

        <div>
          <h6 className="uppercase font-bold mb-4 tracking-wide">Pages</h6>
          <ul className="space-y-2">
            <li><a className="hover:underline">About Us</a></li>
            <li><a className="hover:underline">Contact Us</a></li>
            <li><a className="hover:underline">Services</a></li>
            <li><a className="hover:underline">Blog</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center py-4 text-sm text-white/70">
        © 2025 Brainiacs Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

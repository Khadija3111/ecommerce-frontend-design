'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    const v = email.trim();
    if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      alert("Please enter a valid email.");
      return;
    }
    try {
      localStorage.setItem("ecommerce_newsletter_email_v1", v);
    } catch (e) {
      /* ignore */
    }
    alert("Subscribed (demo). Thank you!");
    setEmail('');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .newsletter {
          background: #eff2f4;
          text-align: center;
          padding: 40px 16px;
          font-family: Inter, Arial, sans-serif;
        }

        .newsletter h3 {
          margin: 0 0 6px;
          font-size: 20px;
          color: #1c1c1c;
        }

        .newsletter p {
          margin: 0 0 14px;
          color: #606060;
          font-size: 14px;
        }

        .newsletter-form {
          width: 392px;
          max-width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 110px;
          gap: 8px;
        }

        .newsletter-form input {
          margin: 0;
          background: #fff;
          border: 1px solid #d9dfe6;
          border-radius: 6px;
          padding: 10px 12px;
          font-size: 13px;
          font-family: inherit;
        }

        .newsletter-form button {
          margin: 0;
          height: 40px;
          background: #0d6efd;
          color: #fff;
          border: 0;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .footer {
          background: #fff;
          padding-top: 40px;
          border-top: 1px solid #e6ebf0;
          font-family: Inter, Arial, sans-serif;
        }

        .container {
          width: 1180px;
          max-width: calc(100vw - 40px);
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: minmax(0, 2fr) repeat(4, minmax(0, 1fr)) minmax(120px, 150px);
          gap: 24px;
          padding-bottom: 64px;
          align-items: start;
        }

        .footer-brand-col {
          min-width: 0;
        }

        .footer-logo {
          display: inline-block;
          line-height: 0;
          margin-bottom: 10px;
        }

        .footer-logo img {
          display: block;
          height: 36px;
          width: auto;
          max-width: 200px;
          object-fit: contain;
          object-position: left center;
        }

        .footer h5 {
          margin: 0 0 12px;
          font-size: 15px;
          color: #1c1c1c;
        }

        .footer p {
          color: #606060;
          font-size: 13px;
          line-height: 1.5;
          max-width: 230px;
        }

        .footer a {
          display: block;
          margin-bottom: 8px;
          color: #606060;
          text-decoration: none;
          font-size: 13px;
        }

        .footer a:hover {
          color: #0d6efd;
        }

        .footer-social {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 14px;
        }

        .footer-social img {
          width: 22px;
          height: 22px;
          object-fit: contain;
        }

        .footer-getapp h5 {
          margin: 0 0 10px;
        }

        .footer-getapp-badges {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: flex-start;
        }

        .footer-getapp-badges img {
          height: 36px;
          width: auto;
          max-width: 120px;
          object-fit: contain;
        }

        .footer-bottom {
          background: #dee2e7;
          border-top: 1px solid #d3d9df;
        }

        .footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 52px;
          padding: 14px 0;
          font-size: 13px;
          color: #606060;
        }

        .footer-bottom-left {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .footer-bottom-flag {
          display: block;
          border-radius: 2px;
          object-fit: cover;
        }

        .footer-bottom-copy {
          color: #606060;
        }

        @media (max-width: 1200px) {
          .footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .footer-getapp {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 768px) {
          .container {
            width: 100%;
            padding: 0 16px;
          }
          .newsletter-form {
            grid-template-columns: 1fr;
            width: 100%;
          }
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            padding-bottom: 40px;
          }
          .footer-bottom-inner {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer h5 {
            margin-top: 10px;
          }
        }
      ` }} />
      
      <section className="newsletter">
        <h3>Subscribe on our newsletter</h3>
        <p>Get daily news on upcoming offers from many suppliers all over the world</p>
        <div className="newsletter-form">
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" onClick={handleSubscribe}>Subscribe</button>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand-col">
            <Link className="footer-logo" href="/"><img src="/logo-colored.png" alt="Brand" /></Link>
            <p>Best information about the company goes here but now lorem ipsum</p>
            <div className="footer-social" aria-label="Social">
              <Link href="#" aria-label="Facebook"><img src="/facebook3.png" alt="" /></Link>
              <Link href="#" aria-label="LinkedIn"><img src="/linkedin3.png" alt="" /></Link>
              <Link href="#" aria-label="Twitter"><img src="/twitter3.png" alt="" /></Link>
              <Link href="#" aria-label="Instagram"><img src="/instagram3.png" alt="" /></Link>
              <Link href="#" aria-label="YouTube"><img src="/youtube3.png" alt="" /></Link>
            </div>
          </div>
          <div>
            <h5>About</h5>
            <Link href="#">About us</Link>
            <Link href="#">Find store</Link>
            <Link href="#">Categories</Link>
            <Link href="#">Blogs</Link>
          </div>
          <div>
            <h5>Partnership</h5>
            <Link href="#">About us</Link>
            <Link href="#">Find store</Link>
            <Link href="#">Categories</Link>
            <Link href="#">Blogs</Link>
          </div>
          <div>
            <h5>Information</h5>
            <Link href="#">Help center</Link>
            <Link href="#">Money refund</Link>
            <Link href="#">Shipping</Link>
            <Link href="#">Contact us</Link>
          </div>
          <div>
            <h5>For users</h5>
            <Link href="#">Login</Link>
            <Link href="#">Register</Link>
            <Link href="#">Settings</Link>
            <Link href="#">My orders</Link>
          </div>
          <div className="footer-getapp">
            <h5>Get app</h5>
            <div className="footer-getapp-badges">
              <Link href="#" aria-label="Google Play"><img src="/google.png" alt="Google Play" /></Link>
              <Link href="#" aria-label="App Store"><img src="/app.png" alt="App Store" /></Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <span className="footer-bottom-left">
              <img src="/america.png" alt="" className="footer-bottom-flag" width="22" height="16" />
              <span>English</span>
            </span>
            <span className="footer-bottom-copy">© 2026 Ecommerce</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

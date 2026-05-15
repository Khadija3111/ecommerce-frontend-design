'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const goList = (q?: string) => {
    const url = new URL("/weblist", typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    if (q) url.searchParams.set("q", q);
    router.push(url.pathname + url.search);
  };

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const a = e.currentTarget;
    const href = a.getAttribute("href");
    if (href && href !== "#") return;
    
    e.preventDefault();
    const label = (a.textContent || "").trim().toLowerCase();
    const map: Record<string, string> = {
      automobiles: "electronics",
      "clothes and wear": "clothes",
      "home interiors": "home",
      "computer and tech": "electronics",
      "tools, equipments": "home",
      "sports and outdoor": "clothes",
      "animal and pets": "home",
      "machinery tools": "electronics",
      "more category": "all",
    };
    const cat = map[label] || "all";
    const url = new URL("/weblist", typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    if (cat !== "all") url.searchParams.set("cat", cat);
    router.push(url.pathname + url.search);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .container {
          width: 1180px;
          max-width: calc(100vw - 40px);
          margin: 0 auto;
        }

        .page {
          padding: 20px 0 0;
          background: #f7fafc;
          font-family: Inter, Arial, sans-serif;
        }

        .card {
          background: #fff;
          border: 1px solid #dee2e7;
          border-radius: 6px;
        }

        .hero {
          display: grid;
          grid-template-columns: 250px 1fr 200px;
          gap: 10px;
        }

        .left-menu {
          padding: 8px 0;
        }

        .left-menu a {
          display: block;
          padding: 11px 14px;
          font-size: 13px;
          color: #505050;
          text-decoration: none;
        }

        .left-menu a.active {
          background: #e6f0ff;
          color: #1b2d5b;
          font-weight: 600;
        }

        .hero-banner {
          min-height: 360px;
          border: 0;
          background-color: #dfe9e6;
          background-image: url("/m.png");
          background-size: cover;
          background-position: center right;
          background-repeat: no-repeat;
          position: relative;
          overflow: hidden;
        }

        .hero-text {
          position: absolute;
          left: 46px;
          top: 52px;
          z-index: 1;
          max-width: min(420px, 55%);
        }

        .hero-text p {
          margin: 0;
          font-size: 28px;
          line-height: 1.2;
          color: #1c1c1c;
        }

        .hero-text h1 {
          margin: 2px 0 14px;
          font-size: 33px;
          line-height: 1.2;
          color: #1c1c1c;
        }

        .hero-text button {
          height: 40px;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          padding: 0 16px;
          background: #fff;
          font-weight: 600;
          cursor: pointer;
        }

        .hero-right {
          display: grid;
          gap: 10px;
        }

        .profile-box {
          padding: 12px;
        }

        .profile-box p {
          margin: 0 0 10px;
          font-size: 14px;
          line-height: 1.35;
          color: #1c1c1c;
        }

        .profile-box button,
        .feature-card button {
          display: block;
          width: 100%;
          border: 0;
          border-radius: 6px;
          height: 30px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 8px;
          cursor: pointer;
        }

        .profile-box .primary {
          background: #0d6efd;
          color: #fff;
        }

        .profile-box .ghost {
          background: #fff;
          border: 1px solid #d9e0e7;
          color: #0d6efd;
        }

        .promo {
          padding: 14px 12px;
          color: #fff;
          font-size: 13px;
          line-height: 1.35;
        }

        .promo.orange {
          background: #f38332;
        }

        .promo.cyan {
          background: #5ab4c8;
        }

        .deals {
          margin-top: 20px;
          display: grid;
          grid-template-columns: 260px 1fr;
          padding: 0;
        }

        .deals-info {
          border-right: 1px solid #eef1f4;
          padding: 20px;
        }

        .deals-info h2 {
          margin: 0 0 6px;
          font-size: 20px;
          color: #1c1c1c;
        }

        .deals-info p {
          margin: 0 0 14px;
          color: #8b96a5;
          font-size: 14px;
        }

        .countdown {
          display: flex;
          gap: 6px;
        }

        .countdown span {
          width: 45px;
          height: 50px;
          background: #606060;
          color: #fff;
          border-radius: 4px;
          font-size: 11px;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .countdown b {
          font-size: 16px;
        }

        .deal-items {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
        }

        .deal-items article {
          padding: 16px 10px;
          border-right: 1px solid #eef1f4;
          text-align: center;
          cursor: pointer;
        }

        .deal-items img {
          width: 95px;
          height: 95px;
          object-fit: cover;
        }

        .deal-items p {
          margin: 8px 0;
          font-size: 13px;
          color: #1c1c1c;
        }

        .deal-items small {
          background: #ffe3e3;
          color: #eb001b;
          border-radius: 999px;
          padding: 4px 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .card-grid {
          margin-top: 20px;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          background: #fff;
          display: grid;
          grid-template-columns: 280px 1fr;
        }

        .feature-card {
          padding: 20px;
          min-height: 257px;
          background: url("/home.png") center / cover no-repeat;
        }

        .feature-card.electronics {
          background: url("/customer.png") center / cover no-repeat;
        }

        .feature-card h3 {
          margin: 0 0 14px;
          font-size: 24px;
          width: 80%;
          color: #1c1c1c;
        }

        .feature-card button {
          width: 120px;
          background: #fff;
          border: 1px solid #d4dde5;
        }

        .small-items {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .small-items article {
          min-height: 128px;
          border-left: 1px solid #eef1f4;
          border-bottom: 1px solid #eef1f4;
          padding: 12px;
        }

        .small-items p {
          margin: 0 0 6px;
          font-size: 15px;
          color: #1c1c1c;
        }

        .small-items small {
          color: #8b96a5;
        }

        .small-items article img {
          align-self: flex-end;
          margin-top: auto;
          width: 80px;
          height: 72px;
          max-width: 80px;
          object-fit: contain;
          object-position: right bottom;
          display: block;
        }

        .small-items-home article,
        .small-items-electronics article {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .inquiry {
          margin-top: 20px;
          min-height: 420px;
          border-radius: 6px;
          background: url("/bluebg.png") center / cover no-repeat;
          display: grid;
          grid-template-columns: 1fr 490px;
          align-items: start;
          gap: 24px;
          padding: 30px 40px;
          color: #fff;
        }

        .inquiry-left h2 {
          margin: 0 0 12px;
          width: 440px;
          font-size: 34px;
          line-height: 1.15;
        }

        .inquiry-left p {
          margin: 0;
          width: 390px;
          font-size: 16px;
          color: #d9efff;
        }

        .inquiry-form {
          padding: 20px;
          color: #1c1c1c;
        }

        .inquiry-form h3 {
          margin: 0 0 14px;
          font-size: 20px;
        }

        .inquiry-form input,
        .inquiry-form textarea,
        .inquiry-form select {
          width: 100%;
          border: 1px solid #d9dfe6;
          border-radius: 6px;
          margin-bottom: 10px;
          padding: 10px 12px;
          font-size: 13px;
          font-family: inherit;
        }

        .inquiry-form textarea {
          height: 72px;
          resize: none;
        }

        .inquiry-form .row {
          display: grid;
          grid-template-columns: 1fr 110px;
          gap: 8px;
        }

        .inquiry-form button {
          width: 128px;
          height: 40px;
          background: #0d6efd;
          color: #fff;
          border: 0;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .section-title h2 {
          margin: 24px 0 14px;
          font-size: 24px;
          color: #1c1c1c;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(5, 220px);
          gap: 20px;
          justify-content: space-between;
        }

        .product {
          background: #fff;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          padding: 14px 14px 16px;
          height: 310px;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
        }

        .product img {
          width: 100%;
          height: 170px;
          object-fit: contain;
          border-radius: 4px;
        }

        .product h4 {
          margin: 12px 0 6px;
          font-size: 16px;
          color: #1c1c1c;
        }

        .product p {
          margin: 0;
          color: #8b96a5;
          font-size: 13px;
          line-height: 1.35;
          flex: 1;
        }

        .services {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
        }

        .service.card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 200px;
        }

        .service-media {
          position: relative;
          flex: 1;
          height: 100%;
          overflow: hidden;
        }

        .service-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.22);
        }

        .service-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .service-caption {
          position: absolute;
          left: 14px;
          right: 52px;
          bottom: 14px;
          z-index: 2;
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.35;
          color: #fff;
        }

        .service-icon {
          position: absolute;
          right: 12px;
          bottom: 12px;
          z-index: 2;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #fff;
          color: #1c1c1c;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .suppliers-wrap {
          background: #f7fafc;
          padding: 8px 0 12px;
        }

        .suppliers {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 10px;
        }

        .suppliers span {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #1c1c1c;
        }

        .suppliers span img {
          width: 28px;
          height: 20px;
          object-fit: cover;
        }

        @media (max-width: 1200px) {
          .container { width: 100%; padding: 0 16px; }
          .hero { grid-template-columns: 200px 1fr; }
          .hero-right { display: none; }
          .deal-items, .product-grid, .services, .suppliers {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .inquiry { grid-template-columns: 1fr; }
        }

        @media (max-width: 1024px) {
          .hero { grid-template-columns: 1fr; }
          .left-menu { display: none; }
          .small-items { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 768px) {
          .deals { grid-template-columns: 1fr; }
          .deals-info { border-right: 0; border-bottom: 1px solid #eef1f4; }
          .card-grid { grid-template-columns: 1fr; }
          .feature-card { min-height: auto; padding-bottom: 40px; }
          .small-items { grid-template-columns: repeat(2, 1fr); }
          .inquiry-left h2 { width: 100%; font-size: 24px; }
          .inquiry-left p { width: 100%; }
          .product-grid { grid-template-columns: repeat(2, 1fr); }
          .services { grid-template-columns: repeat(2, 1fr); }
          .suppliers { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 480px) {
          .hero-text h1 { font-size: 24px; }
          .hero-text p { font-size: 18px; }
          .hero-text { left: 20px; top: 30px; }
          .deal-items { grid-template-columns: repeat(2, 1fr); }
          .small-items { grid-template-columns: 1fr; }
          .product-grid { grid-template-columns: 1fr; }
          .services { grid-template-columns: 1fr; }
        }
      ` }} />

      <main className="page">
        <section className="container hero">
          <aside className="left-menu card">
            <a className="active" href="#" onClick={handleCategoryClick}>Automobiles</a>
            <a href="#" onClick={handleCategoryClick}>Clothes and wear</a>
            <a href="#" onClick={handleCategoryClick}>Home interiors</a>
            <a href="#" onClick={handleCategoryClick}>Computer and tech</a>
            <a href="#" onClick={handleCategoryClick}>Tools, equipments</a>
            <a href="#" onClick={handleCategoryClick}>Sports and outdoor</a>
            <a href="#" onClick={handleCategoryClick}>Animal and pets</a>
            <a href="#" onClick={handleCategoryClick}>Machinery tools</a>
            <a href="#" onClick={handleCategoryClick}>More category</a>
          </aside>

          <div className="hero-banner card">
            <div className="hero-text">
              <p>Latest trending</p>
              <h1>Electronic items</h1>
              <button onClick={() => goList("electronics")}>Learn more</button>
            </div>
          </div>

          <aside className="hero-right">
            <div className="card profile-box">
              <p>Hi, user<br />let's get started</p>
              <button className="primary">Join now</button>
              <button className="ghost">Log in</button>
            </div>
            <div className="card promo orange">Get US $10 off with a new supplier</div>
            <div className="card promo cyan">Send quotes with supplier preferences</div>
          </aside>
        </section>

        <section className="container deals card">
          <div className="deals-info">
            <h2>Deals and offers</h2>
            <p>Hygiene equipments</p>
            <div className="countdown">
              <span><b>04</b>Days</span>
              <span><b>13</b>Hour</span>
              <span><b>34</b>Min</span>
              <span><b>56</b>Sec</span>
            </div>
          </div>
          <div className="deal-items">
            <article onClick={() => router.push("/webdetail?id=p11")}><img src="/watch.png" alt="Smart watches" /><p>Smart watches</p><small>-25%</small></article>
            <article onClick={() => router.push("/webdetail?id=p12")}><img src="/laptop.png" alt="Laptops" /><p>Laptops</p><small>-15%</small></article>
            <article onClick={() => router.push("/webdetail?id=p13")}><img src="/camera.png" alt="Cameras" /><p>GoPro cameras</p><small>-40%</small></article>
            <article onClick={() => router.push("/webdetail?id=p7")}><img src="/headphones.jpg" alt="Headphones" /><p>Headphones</p><small>-25%</small></article>
            <article onClick={() => router.push("/webdetail?id=p14")}><img src="/phone.png" alt="Smart phones" /><p>Smart phones</p><small>-25%</small></article>
          </div>
        </section>

        <section className="container showcase card-grid">
          <div className="feature-card">
            <h3>Home and outdoor</h3>
            <button onClick={() => goList("home")}>Source now</button>
          </div>
          <div className="small-items small-items-home">
            <article onClick={() => router.push("/webdetail?id=p15")}>
              <p>Soft chairs</p><small>From USD 19</small>
              <img src="/sofa.jpg" alt="" />
            </article>
            <article onClick={() => router.push("/webdetail?id=p16")}>
              <p>Sofa & chair</p><small>From USD 19</small>
              <img src="/lamp.png" alt="" />
            </article>
            <article onClick={() => router.push("/webdetail?id=p17")}>
              <p>Kitchen dishes</p><small>From USD 19</small>
              <img src="/light.png" alt="" />
            </article>
            <article onClick={() => router.push("/webdetail?id=p11")}>
              <p>Smart watches</p><small>From USD 19</small>
              <img src="/watch2.jpg" alt="" />
            </article>
            <article onClick={() => router.push("/webdetail?id=p18")}>
              <p>Kitchen mixer</p><small>From USD 100</small>
              <img src="/mixer.png" alt="" />
            </article>
            <article onClick={() => router.push("/webdetail?id=p19")}>
              <p>Blenders</p><small>From USD 39</small>
              <img src="/juicer.png" alt="" />
            </article>
            <article onClick={() => router.push("/webdetail?id=p20")}>
              <p>Home appliance</p><small>From USD 19</small>
              <img src="/hang.png" alt="" />
            </article>
            <article onClick={() => router.push("/webdetail?id=p9")}>
              <p>Coffee maker</p><small>From USD 10</small>
              <img src="/plant.png" alt="" />
            </article>
          </div>
        </section>

        <section className="container showcase card-grid">
          <div className="feature-card electronics">
            <h3>Consumer electronics and gadgets</h3>
            <button onClick={() => goList("electronics")}>Source now</button>
          </div>
          <div className="small-items small-items-electronics">
            <article onClick={() => router.push("/webdetail?id=p11")}>
              <p>Smart watches</p><small>From USD 19</small>
              <img src="/watch.png" alt="" />
            </article>
            <article onClick={() => router.push("/webdetail?id=p13")}>
              <p>Cameras</p><small>From USD 89</small>
              <img src="/camera.png" alt="" />
            </article>
            <article onClick={() => router.push("/webdetail?id=p7")}>
              <p>Headphones</p><small>From USD 10</small>
              <img src="/headphones.jpg" alt="" />
            </article>
            <article onClick={() => router.push("/webdetail?id=p11")}>
              <p>Smart watches</p><small>From USD 90</small>
              <img src="/watch2.jpg" alt="" />
            </article>
            <article onClick={() => router.push("/webdetail?id=p7")}>
              <p>Gaming set</p><small>From USD 35</small>
              <img src="/headphones2.jpg" alt="" />
            </article>
            <article onClick={() => router.push("/webdetail?id=p12")}>
              <p>Laptops & PCs</p><small>From USD 340</small>
              <img src="/laptop.png" alt="" />
            </article>
            <article onClick={() => router.push("/webdetail?id=p14")}>
              <p>Smartphones</p><small>From USD 200</small>
              <img src="/phone.png" alt="" />
            </article>
            <article onClick={() => router.push("/webdetail?id=p10")}>
              <p>Electric kettle</p><small>From USD 40</small>
              <img src="/jug.jpg" alt="" />
            </article>
          </div>
        </section>

        <section className="container inquiry">
          <div className="inquiry-left">
            <h2>An easy way to send requests to all suppliers</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
          </div>
          <form className="inquiry-form card">
            <h3>Send quote to suppliers</h3>
            <input type="text" placeholder="What item you need?" />
            <textarea placeholder="Type more details"></textarea>
            <div className="row">
              <input type="text" defaultValue="Quantity" />
              <select><option>Pcs</option></select>
            </div>
            <button type="button">Send inquiry</button>
          </form>
        </section>

        <section className="container section-title"><h2>Recommended items</h2></section>
        <section className="container product-grid">
          <Link href="/webdetail?id=p1" className="product"><img src="/bshirt.png" alt="" /><h4>$10.30</h4><p>T-shirt with multiple colors, for men</p></Link>
          <Link href="/webdetail?id=p2" className="product"><img src="/jacket.png" alt="" /><h4>$12.50</h4><p>Jacket for men blue color</p></Link>
          <Link href="/webdetail?id=p3" className="product"><img src="/suit.png" alt="" /><h4>$34.00</h4><p>Men suit set (jacket + pants)</p></Link>
          <Link href="/webdetail?id=p4" className="product"><img src="/wallet.png" alt="" /><h4>$9.99</h4><p>Leather wallet</p></Link>
          <Link href="/webdetail?id=p5" className="product"><img src="/bag.png" alt="" /><h4>$30.95</h4><p>Jeans bag for travel for men</p></Link>
          <Link href="/webdetail?id=p6" className="product"><img src="/pant.png" alt="" /><h4>$10.30</h4><p>Jeans pants for men blue color</p></Link>
          <Link href="/webdetail?id=p7" className="product"><img src="/headphones2.jpg" alt="" /><h4>$8.99</h4><p>Head set for gaming with mic</p></Link>
          <Link href="/webdetail?id=p8" className="product"><img src="/bag.png" alt="" /><h4>$30.95</h4><p>Travel bag for men</p></Link>
          <Link href="/webdetail?id=p9" className="product"><img src="/pot.jpg" alt="" /><h4>$10.30</h4><p> cooking pot</p></Link>
          <Link href="/webdetail?id=p10" className="product"><img src="/jug.jpg" alt="" /><h4>$12.50</h4><p>Water jug / kettle</p></Link>
        </section>

        <section className="container section-title"><h2>Our extra services</h2></section>
        <section className="container services">
          <article className="service card">
            <div className="service-media">
              <img src="/4.png" alt="" />
              <p className="service-caption">Source from industry hubs</p>
              <span className="service-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" /><path d="M21 21l-3-3" /><path d="M8 11h6" /><path d="M11 8v6" />
                </svg>
              </span>
            </div>
          </article>
          <article className="service card">
            <div className="service-media">
              <img src="/1.png" alt="" />
              <p className="service-caption">Customize your products</p>
              <span className="service-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M5.6 18.4l2.1-2.1M12 18v3M16.3 16.3l2.1 2.1M18 12h3M16.3 7.7l2.1-2.1" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </span>
            </div>
          </article>
          <article className="service card">
            <div className="service-media">
              <img src="/2.png" alt="" />
              <p className="service-caption">Fast, reliable shipping by ocean or air</p>
              <span className="service-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18h18M5 18V9l7-4 7 4v9" /><path d="M9 18v-6h6v6" />
                </svg>
              </span>
            </div>
          </article>
          <article className="service card">
            <div className="service-media">
              <img src="/3.png" alt="" />
              <p className="service-caption">Product monitoring and inspection</p>
              <span className="service-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </span>
            </div>
          </article>
        </section>

        <section className="container section-title"><h2>Suppliers by region</h2></section>
        <section className="suppliers-wrap" style={{ marginBottom: '24px' }}>
          <div className="container suppliers">
            <span><img src="/Emirates.png" alt="" width="28" height="20" /> Arab Emirates</span>
            <span><img src="/a.png" alt="" width="28" height="20" /> Australia</span>
            <span><img src="/america.png" alt="" width="28" height="20" /> United States</span>
            <span><img src="/russia.png" alt="" width="28" height="20" /> Russia</span>
            <span><img src="/italy.png" alt="" width="28" height="20" /> Italy</span>
            <span><img src="/denmark.png" alt="" width="28" height="20" /> Denmark</span>
            <span><img src="/france.png" alt="" width="28" height="20" /> France</span>
            <span><img src="/Emirates.png" alt="" width="28" height="20" /> Arabic Emirates</span>
            <span><img src="/c.png" alt="" width="28" height="20" /> China</span>
            <span><img src="/c.png" alt="" width="28" height="20" /> Great Britain</span>
          </div>
        </section>
      </main>
    </>
  );
}

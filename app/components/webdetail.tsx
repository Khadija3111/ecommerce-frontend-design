'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CATALOG = [
  { id: "p1", title: "T-shirt with multiple colors, for men", price: 10.3, img: "bshirt.png", category: "clothes", condition: "new", brand: "Nike", rating: 4.4, sold: 1240, reviews: 182 },
  { id: "p2", title: "Jacket for men blue color", price: 12.5, img: "jacket.png", category: "clothes", condition: "new", brand: "Generic", rating: 4.1, sold: 980, reviews: 96 },
  { id: "p3", title: "Men suit set (jacket + pants)", price: 34, img: "suit.png", category: "clothes", condition: "new", brand: "Generic", rating: 4.7, sold: 540, reviews: 210 },
  { id: "p4", title: "Leather wallet", price: 9.99, img: "wallet.png", category: "accessories", condition: "used", brand: "Generic", rating: 3.8, sold: 2100, reviews: 412 },
  { id: "p5", title: "Jeans bag for travel for men", price: 30.95, img: "bag.png", category: "accessories", condition: "new", brand: "Generic", rating: 4.2, sold: 760, reviews: 88 },
  { id: "p6", title: "Jeans pants for men blue color", price: 10.3, img: "pant.png", category: "clothes", condition: "new", brand: "Generic", rating: 4.0, sold: 1500, reviews: 134 },
  { id: "p7", title: "Head set for gaming with mic", price: 8.99, img: "headphones.jpg", category: "electronics", condition: "refurbished", brand: "Samsung", rating: 4.3, sold: 3200, reviews: 905 },
  { id: "p8", title: "Travel bag for men", price: 30.95, img: "bag.png", category: "accessories", condition: "new", brand: "Generic", rating: 4.6, sold: 430, reviews: 61 },
  { id: "p9", title: "Home plant pot", price: 10.3, img: "pot.jpg", category: "home", condition: "new", brand: "Generic", rating: 4.1, sold: 890, reviews: 72 },
  { id: "p10", title: "Water jug / kettle", price: 12.5, img: "jug.jpg", category: "home", condition: "new", brand: "Xiaomi", rating: 4.2, sold: 1205, reviews: 140 },
  { id: "p11", title: "Smart watches", price: 89, img: "watch2.jpg", category: "electronics", condition: "new", brand: "Apple", rating: 4.8, sold: 5600, reviews: 1204 },
  { id: "p12", title: "Laptops", price: 899, img: "laptop.png", category: "electronics", condition: "new", brand: "Samsung", rating: 4.6, sold: 980, reviews: 330 },
  { id: "p13", title: "GoPro cameras", price: 349, img: "camera.png", category: "electronics", condition: "refurbished", brand: "Apple", rating: 4.0, sold: 720, reviews: 201 },
  { id: "p14", title: "Smart phones", price: 599, img: "phone.png", category: "electronics", condition: "new", brand: "Xiaomi", rating: 4.4, sold: 4100, reviews: 880 },
  { id: "p15", title: "Soft chairs", price: 59, img: "sofa.jpg", category: "home", condition: "used", brand: "Generic", rating: 3.9, sold: 340, reviews: 44 },
  { id: "p16", title: "Sofa & chair", price: 129, img: "lamp.png", category: "home", condition: "new", brand: "Generic", rating: 4.2, sold: 510, reviews: 67 },
  { id: "p17", title: "Kitchen dishes", price: 24, img: "light.png", category: "home", condition: "new", brand: "Generic", rating: 4.1, sold: 2200, reviews: 310 },
  { id: "p18", title: "Kitchen mixer", price: 120, img: "mixer.png", category: "home", condition: "refurbished", brand: "Xiaomi", rating: 4.0, sold: 640, reviews: 92 },
  { id: "p19", title: "Blenders", price: 45, img: "juicer.png", category: "home", condition: "new", brand: "Xiaomi", rating: 4.3, sold: 1800, reviews: 240 },
  { id: "p20", title: "Electric kettle", price: 42, img: "jug.jpg", category: "home", condition: "new", brand: "Xiaomi", rating: 4.4, sold: 2600, reviews: 355 },
];

const SUPPLIERS = [
  { name: "EastBridge Trading Co.", country: "Shenzhen, CN", years: "8 yrs on platform", resp: "96% response rate", tags: ["Verified", "Top supplier"] },
  { name: "Northwind Wholesale LLC", country: "Los Angeles, US", years: "5 yrs on platform", resp: "92% response rate", tags: ["Verified", "Fast ship"] },
  { name: "BlueHarbor Goods Ltd.", country: "Istanbul, TR", years: "6 yrs on platform", resp: "94% response rate", tags: ["Verified"] },
  { name: "Silverline Components", country: "Hamburg, DE", years: "11 yrs on platform", resp: "98% response rate", tags: ["Verified", "Gold"] },
];

const CART_KEY = "ecommerce_cart_v1";
const SAVED_KEY = "ecommerce_saved_v1";

const Webdetail = () => {
  const [product, setProduct] = useState<any>(null);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Read product ID from URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const foundProduct = CATALOG.find(p => p.id === id) || CATALOG[0];
    setProduct(foundProduct);

    // Read saved items
    const saved = localStorage.getItem(SAVED_KEY);
    if (saved) setSavedItems(JSON.parse(saved));
  }, []);

  const supplier = useMemo(() => {
    if (!product) return null;
    let h = 0;
    for (let i = 0; i < product.id.length; i++) h += product.id.charCodeAt(i);
    return SUPPLIERS[h % SUPPLIERS.length];
  }, [product]);

  const discount = useMemo(() => {
    if (!product) return null;
    let h = 0;
    for (let j = 0; j < product.id.length; j++) h += product.id.charCodeAt(j);
    const pct = 10 + (h % 16);
    const was = product.price / (1 - pct / 100);
    return { pct, was };
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return CATALOG
      .filter(p => p.id !== product.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
  }, [product]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2200);
  };

  const toggleSave = () => {
    if (!product) return;
    let newSaved;
    if (savedItems.includes(product.id)) {
      newSaved = savedItems.filter(i => i !== product.id);
      showToast("Removed from saved.");
    } else {
      newSaved = [...savedItems, product.id];
      showToast("Saved to your items.");
    }
    setSavedItems(newSaved);
    localStorage.setItem(SAVED_KEY, JSON.stringify(newSaved));
  };

  const addToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    const existing = cart.find((i: any) => i.id === product.id);
    if (existing) existing.qty += 1;
    else cart.push({ id: product.id, qty: 1 });
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    showToast("Added to cart.");
  };

  const buyNow = () => {
    addToCart();
    router.push("/webcart");
  };

  const renderStars = (rating: number) => {
    const full = Math.round(rating);
    return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
  };

  const formatSold = (n: number) => {
    if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "k sold";
    return n + " sold";
  };

  if (!product) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading product details...</div>;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .detail-page { padding: 18px 0 44px; background: #f7fafc; min-height: 100vh; }
        .container { width: 1180px; max-width: calc(100vw - 40px); margin: 0 auto; font-family: Inter, Arial, sans-serif; }
        .detail-back { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: #0d6efd; text-decoration: none; margin-bottom: 14px; cursor: pointer; }
        .detail-back:hover { text-decoration: underline; }
        .detail-layout { display: grid; grid-template-columns: minmax(0, 440px) minmax(0, 1fr); gap: 22px; align-items: start; }
        .detail-col-left { display: flex; flex-direction: column; gap: 14px; }
        .detail-media { background: #fff; border: 1px solid #dee2e7; border-radius: 6px; padding: 18px; text-align: center; }
        .detail-media img { max-width: 100%; height: 360px; object-fit: contain; display: block; margin: 0 auto; }
        .detail-trust { background: #fff; border: 1px solid #dee2e7; border-radius: 6px; padding: 16px 18px; font-size: 13px; color: #505050; line-height: 1.55; }
        .detail-trust p { margin: 0 0 10px; }
        .detail-col-right { display: flex; flex-direction: column; gap: 14px; min-width: 0; }
        .supplier-card { background: #fff; border: 1px solid #dee2e7; border-radius: 6px; padding: 16px 18px; }
        .supplier-head { font-size: 12px; font-weight: 600; color: #8b96a5; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; }
        .supplier-name { font-size: 16px; font-weight: 600; color: #1c1c1c; margin-bottom: 6px; }
        .supplier-meta { font-size: 13px; color: #505050; line-height: 1.45; }
        .supplier-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
        .supplier-tag { font-size: 11px; padding: 4px 8px; border-radius: 999px; background: #f0f4f8; color: #505050; }
        .super-discount { display: flex; align-items: center; gap: 14px; background: linear-gradient(90deg, #fff4e6 0%, #fff 100%); border: 1px solid #ffd8a8; border-radius: 6px; padding: 14px 16px; }
        .super-discount-badge { min-width: 56px; height: 56px; border-radius: 8px; background: #f38332; color: #fff; font-weight: 700; font-size: 16px; display: flex; align-items: center; justify-content: center; }
        .super-discount-title { font-size: 15px; font-weight: 700; color: #1c1c1c; }
        .super-discount-sub { font-size: 12px; color: #8b96a5; margin-top: 4px; }
        .detail-card { background: #fff; border: 1px solid #dee2e7; border-radius: 6px; padding: 18px; }
        .detail-title { margin: 0 0 12px; font-size: 20px; font-weight: 600; color: #1c1c1c; line-height: 1.25; }
        .detail-rating-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 8px; }
        .detail-reviews-sold { font-size: 13px; color: #8b96a5; }
        .detail-stars-big { font-size: 22px; letter-spacing: 2px; color: #ff9017; line-height: 1; }
        .detail-meta { margin: 0 0 12px; color: #8b96a5; font-size: 13px; text-transform: capitalize; }
        .detail-price { margin: 0 0 14px; font-size: 22px; font-weight: 700; color: #1c1c1c; }
        .detail-desc { margin: 0 0 18px; color: #505050; font-size: 13px; line-height: 1.6; }
        .detail-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
        .btn-detail-primary, .btn-detail-ghost { height: 42px; border-radius: 6px; font-weight: 600; font-family: inherit; font-size: 13px; cursor: pointer; padding: 0 20px; }
        .btn-detail-primary { border: 0; background: #0d6efd; color: #fff; }
        .btn-detail-ghost { border: 1px solid #dee2e7; background: #fff; color: #1c1c1c; }
        .detail-secondary { display: flex; flex-wrap: wrap; gap: 10px; padding-top: 4px; border-top: 1px solid #eef1f4; }
        .btn-icon-text { display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 14px; border-radius: 6px; border: 1px solid #dee2e7; background: #fff; font-size: 13px; font-weight: 600; color: #1c1c1c; cursor: pointer; }
        .btn-icon-text.is-saved { border-color: #f5b5ba; color: #e31b23; background: #fff5f6; }
        .detail-toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: #1c1c1c; color: #fff; padding: 8px 16px; border-radius: 8px; font-size: 13px; z-index: 1000; }
        
        .related-section { margin-top: 32px; }
        .related-section h2 { margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #1c1c1c; }
        .related-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
        .related-card { background: #fff; border: 1px solid #dee2e7; border-radius: 6px; padding: 12px; display: flex; flex-direction: column; text-decoration: none; color: inherit; }
        .related-card img { width: 100%; height: 140px; object-fit: contain; margin-bottom: 10px; }
        .related-title { font-size: 13px; font-weight: 500; color: #505050; margin: 0 0 6px; line-height: 1.4; height: 2.8em; overflow: hidden; }
        .related-price { font-size: 15px; font-weight: 700; color: #1c1c1c; }

        @media (max-width: 992px) { 
          .container { width: 100%; padding: 0 16px; }
          .detail-layout { grid-template-columns: 1fr; } 
          .detail-media img { height: 320px; } 
          .related-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 600px) {
          .related-grid { grid-template-columns: repeat(2, 1fr); }
        }
      ` }} />

      <main className="detail-page">
        <div className="container">
          <Link className="detail-back" href="/weblist">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to listing
          </Link>

          <div className="detail-layout">
            <div className="detail-col-left">
              <div className="detail-media">
                <img src={"/" + product.img} alt={product.title} />
              </div>
              <div className="detail-trust">
                <p><strong>Price protection</strong> — If the price drops within 7 days after purchase, we will refund the difference.</p>
                <p><strong>Warranty</strong> — 12-month limited warranty against manufacturing defects. Terms apply.</p>
              </div>
            </div>

            <div className="detail-col-right">
              {supplier && (
                <aside className="supplier-card" aria-label="Supplier">
                  <div className="supplier-head">Supplier</div>
                  <div className="supplier-name">{supplier.name}</div>
                  <div className="supplier-meta">{supplier.country} • {supplier.years} • {supplier.resp}</div>
                  <div className="supplier-tags">
                    {supplier.tags.map(t => <span key={t} className="supplier-tag">{t}</span>)}
                  </div>
                </aside>
              )}

              {discount && (
                <div className="super-discount" aria-label="Promotion">
                  <div className="super-discount-badge">-{discount.pct}%</div>
                  <div>
                    <div className="super-discount-title">Super discount</div>
                    <div className="super-discount-sub">Was about ${discount.was.toFixed(2)} — save more when you buy today.</div>
                  </div>
                </div>
              )}

              <div className="detail-card">
                <h1 className="detail-title">{product.title}</h1>
                <div className="detail-rating-row">
                  <span className="detail-reviews-sold">{product.reviews} reviews · {formatSold(product.sold)}</span>
                  <div className="detail-stars-big" aria-label="Rating">{renderStars(product.rating)}</div>
                </div>
                <div className="detail-meta">{product.category} • {product.condition} • {product.brand}</div>
                <div className="detail-price">${product.price.toFixed(2)}</div>
                <p className="detail-desc">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <div className="detail-actions">
                  <button className="btn-detail-primary" type="button" onClick={buyNow}>Buy now</button>
                  <button className="btn-detail-ghost" type="button" onClick={addToCart}>Add to cart</button>
                </div>
                <div className="detail-secondary">
                  <button type="button" className={`btn-icon-text ${savedItems.includes(product.id) ? 'is-saved' : ''}`} onClick={toggleSave}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={savedItems.includes(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
                    Save
                  </button>
                  <button type="button" className="btn-icon-text" onClick={() => showToast("Saved for later.")}>Save for later</button>
                </div>
              </div>
            </div>
          </div>

          <section className="related-section">
            <h2>Related products</h2>
            <div className="related-grid">
              {relatedProducts.map(rp => (
                <Link key={rp.id} href={`/webdetail?id=${rp.id}`} className="related-card" onClick={() => {
                  setProduct(rp);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                  <img src={"/" + rp.img} alt={rp.title} />
                  <p className="related-title">{rp.title}</p>
                  <div className="related-price">${rp.price.toFixed(2)}</div>
                </Link>
              ))}
            </div>
          </section>
        </div>
        {toastMsg && <div className="detail-toast is-visible">{toastMsg}</div>}
      </main>
    </>
  );
};

export default Webdetail;

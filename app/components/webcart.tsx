'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

const CATALOG = [
  { id: "p1", title: "T-shirt with multiple colors, for men", price: 10.3, img: "/bshirt.png", category: "clothes" },
  { id: "p2", title: "Jacket for men blue color", price: 12.5, img: "/jacket.png", category: "clothes" },
  { id: "p3", title: "Men suit set (jacket + pants)", price: 34, img: "/suit.png", category: "clothes" },
  { id: "p4", title: "Leather wallet", price: 9.99, img: "/wallet.png", category: "accessories" },
  { id: "p5", title: "Jeans bag for travel for men", price: 30.95, img: "/bag.png", category: "accessories" },
  { id: "p6", title: "Jeans pants for men blue color", price: 10.3, img: "/pant.png", category: "clothes" },
  { id: "p7", title: "Head set for gaming with mic", price: 8.99, img: "/headphones.jpg", category: "electronics" },
  { id: "p8", title: "Travel bag for men", price: 30.95, img: "/bag.png", category: "accessories" },
  { id: "p9", title: "Cooking pot", price: 10.3, img: "/pot.jpg", category: "home" },
  { id: "p10", title: "Water jug / kettle", price: 12.5, img: "/jug.jpg", category: "home" },
  { id: "p11", title: "Smart watches", price: 89, img: "/watch.png", category: "electronics" },
  { id: "p12", title: "Laptops", price: 899, img: "/laptop.png", category: "electronics" },
  { id: "p13", title: "GoPro cameras", price: 349, img: "/camera.png", category: "electronics" },
  { id: "p14", title: "Smart phones", price: 599, img: "/phone.png", category: "electronics" },
  { id: "p15", title: "Soft chairs", price: 59, img: "/sofa.jpg", category: "home" },
  { id: "p16", title: "Sofa & chair", price: 129, img: "/lamp.png", category: "home" },
  { id: "p17", title: "Kitchen dishes", price: 24, img: "/light.png", category: "home" },
  { id: "p18", title: "Kitchen mixer", price: 120, img: "/mixer.png", category: "home" },
  { id: "p19", title: "Blenders", price: 45, img: "/juicer.png", category: "home" },
  { id: "p20", title: "Electric kettle", price: 42, img: "/jug.jpg", category: "home" },
];

const CART_KEY = "ecommerce_cart_v1";
const LATER_KEY = "ecommerce_cart_later_v1";

const Webcart = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [later, setLater] = useState<any[]>([]);
  const [checkoutMsg, setCheckoutMsg] = useState<string | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    const storedLater = localStorage.getItem(LATER_KEY);
    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedLater) setLater(JSON.parse(storedLater));
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LATER_KEY, JSON.stringify(later));
  }, [later]);

  const totals = useMemo(() => {
    let subtotal = 0;
    let units = 0;
    cart.forEach(item => {
      const p = CATALOG.find(x => x.id === item.id);
      if (p) {
        subtotal += p.price * item.qty;
        units += item.qty;
      }
    });
    const shipping = subtotal > 0 ? 8.0 : 0;
    const tax = subtotal > 0 ? subtotal * 0.05 : 0;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total, units };
  }, [cart]);

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const moveToLater = (id: string) => {
    const item = cart.find(x => x.id === id);
    if (!item) return;
    setCart(prev => prev.filter(x => x.id !== id));
    setLater(prev => {
      const existing = prev.find(x => x.id === id);
      if (existing) return prev.map(x => x.id === id ? { ...x, qty: x.qty + item.qty } : x);
      return [...prev, item];
    });
  };

  const moveToCart = (id: string) => {
    const item = later.find(x => x.id === id);
    if (!item) return;
    setLater(prev => prev.filter(x => x.id !== id));
    setCart(prev => {
      const existing = prev.find(x => x.id === id);
      if (existing) return prev.map(x => x.id === id ? { ...x, qty: x.qty + item.qty } : x);
      return [...prev, item];
    });
  };

  const handleCheckout = () => {
    setCheckoutMsg(`Demo only: your total would be $${totals.total.toFixed(2)} including shipping and tax.`);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .cart-page { padding: 18px 0 44px; background: #f7fafc; min-height: 100vh; }
        .container { width: 1180px; max-width: calc(100vw - 40px); margin: 0 auto; font-family: Inter, Arial, sans-serif; }
        .cart-grid { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 20px; align-items: start; }
        .cart-card { background: #fff; border: 1px solid #dee2e7; border-radius: 6px; }
        .cart-head { padding: 16px 18px; border-bottom: 1px solid #eef1f4; font-size: 16px; font-weight: 600; color: #1c1c1c; }
        .cart-count { font-weight: 500; color: #8b96a5; margin-left: 6px; }
        .cart-item { display: grid; grid-template-columns: 48px 90px minmax(0, 1fr) 120px; gap: 14px; align-items: start; padding: 16px 18px; border-bottom: 1px solid #eef1f4; }
        .cart-item:last-child { border-bottom: 0; }
        .cart-qty { font-size: 15px; font-weight: 600; color: #1c1c1c; align-self: center; text-align: center; }
        .cart-thumb img { width: 90px; height: 90px; object-fit: contain; border-radius: 6px; }
        .cart-body h4 { margin: 0 0 6px; font-size: 14px; font-weight: 600; }
        .cart-body p { margin: 0; font-size: 12px; color: #8b96a5; }
        .cart-actions { display: flex; gap: 8px; margin-top: 8px; }
        .cart-action { padding: 6px 10px; border: 1px solid #dee2e7; border-radius: 6px; background: #fff; font-size: 12px; font-weight: 500; color: #505050; cursor: pointer; }
        .cart-action--primary { color: #0d6efd; }
        .cart-price { text-align: right; font-size: 16px; font-weight: 700; color: #1c1c1c; }
        .cart-foot { padding: 16px 18px; border-top: 1px solid #eef1f4; }
        .cart-back { font-size: 14px; font-weight: 600; color: #0d6efd; text-decoration: none; }
        .cart-summary { background: #fff; border: 1px solid #dee2e7; border-radius: 6px; padding: 16px; position: sticky; top: 20px; }
        .cart-summary h3 { margin: 0 0 14px; font-size: 16px; font-weight: 600; }
        .sum-row { display: flex; justify-content: space-between; font-size: 13px; color: #505050; margin-bottom: 10px; }
        .sum-row.total { font-size: 16px; font-weight: 700; color: #1c1c1c; margin-top: 10px; padding-top: 10px; border-top: 1px solid #eef1f4; }
        .summary-checkout { width: 100%; margin-top: 16px; padding: 14px; border: none; border-radius: 8px; background: #00b517; color: #fff; font-size: 18px; font-weight: 500; cursor: pointer; }
        .summary-checkout:disabled { opacity: 0.5; cursor: not-allowed; }
        .checkout-feedback { margin-top: 10px; font-size: 13px; color: #505050; text-align: center; line-height: 1.4; }
        .saved-later-wrap { margin-top: 28px; }
        .saved-later-title { margin: 0 0 12px; font-size: 20px; font-weight: 600; }
        .saved-later-card { background: #fff; border: 1px solid #dee2e7; border-radius: 6px; padding: 20px; }
        .saved-later-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .saved-later-item { display: flex; flex-direction: column; }
        .saved-later-img-wrap { display: block; aspect-ratio: 1; border-radius: 6px; border: 1px solid #e9ecef; overflow: hidden; margin-bottom: 10px; }
        .saved-later-img-wrap img { width: 100%; height: 100%; object-fit: contain; }
        .saved-later-price { font-size: 18px; font-weight: 700; margin: 0 0 6px; }
        .saved-later-item-title { font-size: 14px; color: #505050; line-height: 1.45; margin-bottom: 12px; height: 3em; overflow: hidden; }
        .saved-later-move { display: flex; align-items: center; gap: 8px; padding: 9px 14px; border: 1px solid #dee2e7; border-radius: 6px; background: #fff; font-size: 15px; color: #0d6efd; cursor: pointer; align-self: flex-start; }
        .cart-empty { padding: 26px 18px; color: #8b96a5; font-size: 14px; }
        .summary-payments { display: flex; gap: 10px; margin-top: 14px; padding-top: 14px; border-top: 1px solid #eef1f4; }
        @media (max-width: 1100px) { 
          .container { width: 100%; padding: 0 16px; }
          .cart-grid { grid-template-columns: 1fr; } 
          .cart-summary { position: static; margin-top: 20px; } 
        }
        @media (max-width: 768px) {
          .cart-item { grid-template-columns: 40px 80px 1fr; grid-template-rows: auto auto; }
          .cart-price { grid-column: 3; grid-row: 1; text-align: left; }
          .cart-body { grid-column: 2 / 4; }
          .saved-later-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .cart-item { grid-template-columns: 1fr 1fr; }
          .cart-qty { grid-column: 1; grid-row: 1; }
          .cart-price { grid-column: 2; grid-row: 1; text-align: right; }
          .cart-thumb { grid-column: 1; grid-row: 2; }
          .cart-body { grid-column: 2; grid-row: 2; }
          .saved-later-grid { grid-template-columns: 1fr; }
        }
      ` }} />

      <main className="cart-page">
        <div className="container">
          <div className="cart-grid">
            <section className="cart-card">
              <div className="cart-head">
                My cart <span className="cart-count">({totals.units} {totals.units === 1 ? 'item' : 'items'})</span>
              </div>
              <div className="cart-items">
                {cart.length > 0 ? cart.map(item => {
                  const p = CATALOG.find(x => x.id === item.id);
                  if (!p) return null;
                  return (
                    <div key={item.id} className="cart-item">
                      <div className="cart-qty">{item.qty}</div>
                      <Link className="cart-thumb" href={`/webdetail?id=${p.id}`}>
                        <img src={p.img} alt={p.title} />
                      </Link>
                      <div className="cart-body">
                        <h4><Link href={`/webdetail?id=${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{p.title}</Link></h4>
                        <p>{p.category}</p>
                        <div className="cart-actions">
                          <button className="cart-action cart-action--primary" onClick={() => moveToLater(item.id)}>Save for later</button>
                          <button className="cart-action" onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                      </div>
                      <div className="cart-price">${(p.price * item.qty).toFixed(2)}</div>
                    </div>
                  );
                }) : (
                  <div className="cart-empty">
                    Your cart is empty. <Link href="/weblist" style={{ color: '#0d6efd', fontWeight: 600 }}>Continue shopping</Link>
                  </div>
                )}
              </div>
              <div className="cart-foot">
                <Link className="cart-back" href="/weblist">Back to shop</Link>
              </div>
            </section>

            <aside className="cart-summary">
              <h3>Summary</h3>
              <div className="sum-row"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
              <div className="sum-row"><span>Shipping</span><span>${totals.shipping.toFixed(2)}</span></div>
              <div className="sum-row"><span>Tax</span><span>${totals.tax.toFixed(2)}</span></div>
              <div className="sum-row total"><span>Total</span><span>${totals.total.toFixed(2)}</span></div>
              <button className="summary-checkout" disabled={cart.length === 0} onClick={handleCheckout}>Checkout</button>
              {checkoutMsg && <p className="checkout-feedback">{checkoutMsg}</p>}
              <div className="summary-payments">
                <img src="/bank1.svg" width="40" height="28" alt="Bank 1" />
                <img src="/bank2.svg" width="40" height="28" alt="Bank 2" />
                <img src="/bank3.svg" width="40" height="28" alt="Bank 3" />
                <img src="/bank4.svg" width="40" height="28" alt="Bank 4" />
              </div>
            </aside>
          </div>

          <section className="saved-later-wrap">
            <h2 className="saved-later-title">Saved for later</h2>
            <div className="saved-later-card">
              {later.length > 0 ? (
                <div className="saved-later-grid">
                  {later.map(item => {
                    const p = CATALOG.find(x => x.id === item.id);
                    if (!p) return null;
                    return (
                      <article key={item.id} className="saved-later-item">
                        <Link className="saved-later-img-wrap" href={`/webdetail?id=${p.id}`}>
                          <img src={p.img} alt={p.title} />
                        </Link>
                        <p className="saved-later-price">${p.price.toFixed(2)}</p>
                        <p className="saved-later-item-title">{p.title}</p>
                        <button className="saved-later-move" onClick={() => moveToCart(item.id)}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                          <span>Move to cart</span>
                        </button>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <p className="saved-later-empty">No items saved for later yet. Use “Save for later” on a cart line to move items here.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Webcart;

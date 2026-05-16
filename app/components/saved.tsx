'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CATALOG = [
  { id: "p1", title: "T-shirt with multiple colors, for men", price: 10.3, img: "/bshirt.png", category: "clothes", condition: "new", brand: "Nike", rating: 4.4, sold: 1240, reviews: 182 },
  { id: "p2", title: "Jacket for men blue color", price: 12.5, img: "/jacket.png", category: "clothes", condition: "new", brand: "Generic", rating: 4.1, sold: 980, reviews: 96 },
  { id: "p3", title: "Men suit set (jacket + pants)", price: 34, img: "/suit.png", category: "clothes", condition: "new", brand: "Generic", rating: 4.7, sold: 540, reviews: 210 },
  { id: "p4", title: "Leather wallet", price: 9.99, img: "/wallet.png", category: "accessories", condition: "used", brand: "Generic", rating: 3.8, sold: 2100, reviews: 412 },
  { id: "p5", title: "Jeans bag for travel for men", price: 30.95, img: "/bag.png", category: "accessories", condition: "new", brand: "Generic", rating: 4.2, sold: 760, reviews: 88 },
  { id: "p6", title: "Jeans pants for men blue color", price: 10.3, img: "/pant.png", category: "clothes", condition: "new", brand: "Generic", rating: 4.0, sold: 1500, reviews: 134 },
  { id: "p7", title: "Head set for gaming with mic", price: 8.99, img: "/headphones.jpg", category: "electronics", condition: "refurbished", brand: "Samsung", rating: 4.3, sold: 3200, reviews: 905 },
  { id: "p8", title: "Travel bag for men", price: 30.95, img: "/bag.png", category: "accessories", condition: "new", brand: "Generic", rating: 4.6, sold: 430, reviews: 61 },
  { id: "p9", title: "Home plant pot", price: 10.3, img: "/pot.jpg", category: "home", condition: "new", brand: "Generic", rating: 4.1, sold: 890, reviews: 72 },
  { id: "p10", title: "Water jug / kettle", price: 12.5, img: "/jug.jpg", category: "home", condition: "new", brand: "Xiaomi", rating: 4.2, sold: 1205, reviews: 140 },
  { id: "p11", title: "Smart watches", price: 89, img: "/watch2.jpg", category: "electronics", condition: "new", brand: "Apple", rating: 4.8, sold: 5600, reviews: 1204 },
  { id: "p12", title: "Laptops", price: 899, img: "/laptop.png", category: "electronics", condition: "new", brand: "Samsung", rating: 4.6, sold: 980, reviews: 330 },
  { id: "p13", title: "GoPro cameras", price: 349, img: "/camera.png", category: "electronics", condition: "refurbished", brand: "Apple", rating: 4.0, sold: 720, reviews: 201 },
  { id: "p14", title: "Smart phones", price: 599, img: "/phone.png", category: "electronics", condition: "new", brand: "Xiaomi", rating: 4.4, sold: 4100, reviews: 880 },
  { id: "p15", title: "Soft chairs", price: 59, img: "/sofa.jpg", category: "home", condition: "used", brand: "Generic", rating: 3.9, sold: 340, reviews: 44 },
  { id: "p16", title: "Sofa & chair", price: 129, img: "/lamp.png", category: "home", condition: "new", brand: "Generic", rating: 4.2, sold: 510, reviews: 67 },
  { id: "p17", title: "Kitchen dishes", price: 24, img: "/light.png", category: "home", condition: "new", brand: "Generic", rating: 4.1, sold: 2200, reviews: 310 },
  { id: "p18", title: "Kitchen mixer", price: 120, img: "/mixer.png", category: "home", condition: "refurbished", brand: "Xiaomi", rating: 4.0, sold: 640, reviews: 92 },
  { id: "p19", title: "Blenders", price: 45, img: "/juicer.png", category: "home", condition: "new", brand: "Xiaomi", rating: 4.3, sold: 1800, reviews: 240 },
  { id: "p20", title: "Electric kettle", price: 42, img: "/jug.jpg", category: "home", condition: "new", brand: "Xiaomi", rating: 4.4, sold: 2600, reviews: 355 },
];

const SAVED_KEY = "ecommerce_saved_v1";

const Saved = () => {
  const [savedProducts, setSavedProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadSaved = () => {
      try {
        const savedIds = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
        const filtered = CATALOG.filter(p => savedIds.includes(p.id));
        setSavedProducts(filtered);
      } catch (e) {
        setSavedProducts([]);
      }
    };

    loadSaved();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .saved-page { padding: 20px 0 40px; background: #f7fafc; min-height: 100vh; }
        .container { width: 1180px; max-width: calc(100vw - 40px); margin: 0 auto; font-family: Inter, Arial, sans-serif; }
        .saved-page h1 { margin: 0 0 16px; font-size: 22px; font-weight: 600; color: #1c1c1c; }
        .saved-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
        .saved-card { background: #fff; border: 1px solid #dee2e7; border-radius: 6px; padding: 14px; display: flex; flex-direction: column; }
        .saved-card img { width: 100%; height: 160px; object-fit: contain; display: block; border-radius: 4px; }
        .saved-body { margin-top: 10px; }
        .saved-title { display: block; font-size: 14px; font-weight: 500; color: #1c1c1c; text-decoration: none; line-height: 1.4; }
        .saved-title:hover { color: #0d6efd; }
        .saved-price { margin-top: 6px; font-weight: 700; font-size: 16px; color: #1c1c1c; }
        .saved-empty { background: #fff; border: 1px solid #dee2e7; border-radius: 6px; padding: 28px; color: #8b96a5; font-size: 14px; text-align: center; }
        
        @media (max-width: 768px) {
          .container { width: 100%; padding: 0 16px; }
        }
        @media (max-width: 600px) { 
          .saved-grid { grid-template-columns: repeat(2, 1fr); } 
        }
      ` }} />

      <main className="saved-page">
        <div className="container">
          <h1>Saved items</h1>
          {savedProducts.length > 0 ? (
            <div className="saved-grid">
              {savedProducts.map(p => (
                <article key={p.id} className="saved-card">
                  <Link href={"/webdetail?id=" + p.id}>
                    <img src={p.img} alt={p.title} />
                  </Link>
                  <div className="saved-body">
                    <Link className="saved-title" href={"/webdetail?id=" + p.id}>
                      {p.title}
                    </Link>
                    <div className="saved-price">${p.price.toFixed(2)}</div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="saved-empty">
              You have not saved any products yet. Tap the heart on a listing to save it here.
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default Saved;

'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const CATALOG = [
  { id: "p1", title: "T-shirt with multiple colors, for men", price: 10.3, img: "bshirt.png", category: "clothes", condition: "new", brand: "Nike", rating: 4.4, sold: 1240, reviews: 182, features: ["in-stock", "fast-delivery"] },
  { id: "p2", title: "Jacket for men blue color", price: 12.5, img: "jacket.png", category: "clothes", condition: "new", brand: "Generic", rating: 4.1, sold: 980, reviews: 96, features: ["in-stock"] },
  { id: "p3", title: "Men suit set (jacket + pants)", price: 34, img: "suit.png", category: "clothes", condition: "new", brand: "Generic", rating: 4.7, sold: 540, reviews: 210, features: ["best-seller", "in-stock"] },
  { id: "p4", title: "Leather wallet", price: 9.99, img: "wallet.png", category: "accessories", condition: "used", brand: "Generic", rating: 3.8, sold: 2100, reviews: 412, features: ["in-stock"] },
  { id: "p5", title: "Jeans bag for travel for men", price: 30.95, img: "bag.png", category: "accessories", condition: "new", brand: "Generic", rating: 4.2, sold: 760, reviews: 88, features: ["free-shipping", "in-stock"] },
  { id: "p6", title: "Jeans pants for men blue color", price: 10.3, img: "pant.png", category: "clothes", condition: "new", brand: "Generic", rating: 4.0, sold: 1500, reviews: 134, features: ["in-stock"] },
  { id: "p7", title: "Head set for gaming with mic", price: 8.99, img: "headphones.jpg", category: "electronics", condition: "refurbished", brand: "Samsung", rating: 4.3, sold: 3200, reviews: 905, features: ["fast-delivery", "in-stock"] },
  { id: "p8", title: "Travel bag for men", price: 30.95, img: "bag.png", category: "accessories", condition: "new", brand: "Generic", rating: 4.6, sold: 430, reviews: 61, features: ["best-seller", "free-shipping"] },
  { id: "p9", title: "Home plant pot", price: 10.3, img: "pot.jpg", category: "home", condition: "new", brand: "Generic", rating: 4.1, sold: 890, reviews: 72, features: ["in-stock"] },
  { id: "p10", title: "Water jug / kettle", price: 12.5, img: "jug.jpg", category: "home", condition: "new", brand: "Xiaomi", rating: 4.2, sold: 1205, reviews: 140, features: ["in-stock", "fast-delivery"] },
  { id: "p11", title: "Smart watches", price: 89, img: "watch2.jpg", category: "electronics", condition: "new", brand: "Apple", rating: 4.8, sold: 5600, reviews: 1204, features: ["best-seller", "free-shipping"] },
  { id: "p12", title: "Laptops", price: 899, img: "laptop.png", category: "electronics", condition: "new", brand: "Samsung", rating: 4.6, sold: 980, reviews: 330, features: ["in-stock", "free-shipping"] },
  { id: "p13", title: "GoPro cameras", price: 349, img: "camera.png", category: "electronics", condition: "refurbished", brand: "Apple", rating: 4.0, sold: 720, reviews: 201, features: ["in-stock"] },
  { id: "p14", title: "Smart phones", price: 599, img: "phone.png", category: "electronics", condition: "new", brand: "Xiaomi", rating: 4.4, sold: 4100, reviews: 880, features: ["best-seller", "fast-delivery"] },
  { id: "p15", title: "Soft chairs", price: 59, img: "sofa.jpg", category: "home", condition: "used", brand: "Generic", rating: 3.9, sold: 340, reviews: 44, features: ["in-stock"] },
  { id: "p16", title: "Sofa & chair", price: 129, img: "lamp.png", category: "home", condition: "new", brand: "Generic", rating: 4.2, sold: 510, reviews: 67, features: ["free-shipping"] },
  { id: "p17", title: "Kitchen dishes", price: 24, img: "light.png", category: "home", condition: "new", brand: "Generic", rating: 4.1, sold: 2200, reviews: 310, features: ["in-stock"] },
  { id: "p18", title: "Kitchen mixer", price: 120, img: "mixer.png", category: "home", condition: "refurbished", brand: "Xiaomi", rating: 4.0, sold: 640, reviews: 92, features: ["fast-delivery"] },
  { id: "p19", title: "Blenders", price: 45, img: "juicer.png", category: "home", condition: "new", brand: "Xiaomi", rating: 4.3, sold: 1800, reviews: 240, features: ["in-stock"] },
  { id: "p20", title: "Electric kettle", price: 42, img: "jug.jpg", category: "home", condition: "new", brand: "Xiaomi", rating: 4.4, sold: 2600, reviews: 355, features: ["free-shipping", "in-stock"] },
];

const STORAGE_KEY = "ecommerce_list_filters_v1";
const CART_KEY = "ecommerce_cart_v1";
const SAVED_KEY = "ecommerce_saved_v1";
const PAGE_SIZE = 6;

const WeblistContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State for View and Filters
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'all');
  const [conditionFilter, setConditionFilter] = useState('all');
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [minStarRating, setMinStarRating] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('best');
  const [currentPage, setCurrentPage] = useState(1);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({
    category: true,
    brands: false,
    features: false,
    rating: false,
    condition: false,
    price: false
  });

  // Initialization
  useEffect(() => {
    const saved = localStorage.getItem(SAVED_KEY);
    if (saved) setSavedItems(JSON.parse(saved));

    const rawState = localStorage.getItem(STORAGE_KEY);
    if (rawState) {
      try {
        const state = JSON.parse(rawState);
        if (state.view) setViewMode(state.view);
        if (state.condition) setConditionFilter(state.condition);
        if (state.priceMin) setPriceMin(state.priceMin);
        if (state.priceMax) setPriceMax(state.priceMax);
        if (state.minStarRating) setMinStarRating(state.minStarRating);
        if (state.brands) setSelectedBrands(state.brands);
        if (state.features) setSelectedFeatures(state.features);
        if (state.sort) setSortBy(state.sort);
      } catch (e) { /* ignore */ }
    }
  }, []);

  // Sync state with URL changes
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('cat');
    if (q !== null) setSearchQuery(q);
    else setSearchQuery('');
    
    if (cat !== null) setActiveCategory(cat);
    else setActiveCategory('all');
    
    setCurrentPage(1);
  }, [searchParams]);

  // Save state to localStorage when non-URL filters change
  useEffect(() => {
    const state = {
      view: viewMode,
      condition: conditionFilter,
      priceMin,
      priceMax,
      minStarRating,
      brands: selectedBrands,
      features: selectedFeatures,
      sort: sortBy
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [viewMode, conditionFilter, priceMin, priceMax, minStarRating, selectedBrands, selectedFeatures, sortBy]);

  // Filtering and Sorting logic
  const filteredAndSortedProducts = useMemo(() => {
    let list = CATALOG.filter(p => {
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (conditionFilter !== 'all' && p.condition !== conditionFilter) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (selectedFeatures.length && !selectedFeatures.every(f => p.features.includes(f))) return false;
      if (minStarRating > 0 && p.rating < minStarRating) return false;
      if (priceMin && parseFloat(priceMin) && p.price < parseFloat(priceMin)) return false;
      if (priceMax && parseFloat(priceMax) && p.price > parseFloat(priceMax)) return false;
      return true;
    });

    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'name') list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [activeCategory, conditionFilter, priceMin, priceMax, searchQuery, minStarRating, selectedBrands, selectedFeatures, sortBy]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedProducts.length / PAGE_SIZE));
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredAndSortedProducts.slice(start, start + PAGE_SIZE);
  }, [filteredAndSortedProducts, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  // Handlers
  const toggleFilter = (key: string) => {
    setOpenFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    setCurrentPage(1);
  };

  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures(prev => prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]);
    setCurrentPage(1);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2200);
  };

  const toggleSave = (id: string) => {
    let newSaved;
    if (savedItems.includes(id)) {
      newSaved = savedItems.filter(i => i !== id);
      showToast("Removed from saved.");
    } else {
      newSaved = [...savedItems, id];
      showToast("Saved to your items.");
    }
    setSavedItems(newSaved);
    localStorage.setItem(SAVED_KEY, JSON.stringify(newSaved));
  };

  const addToCart = (id: string) => {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    const existing = cart.find((i: any) => i.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id, qty: 1 });
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    showToast("Added to cart.");
  };

  const clearAllFilters = () => {
    setActiveCategory('all');
    setConditionFilter('all');
    setPriceMin('');
    setPriceMax('');
    setSelectedBrands([]);
    setSelectedFeatures([]);
    setMinStarRating(0);
    setSearchQuery('');
    setSortBy('best');
    setCurrentPage(1);
    router.push('/weblist');
    showToast("Filters cleared.");
  };

  const renderStars = (rating: number) => {
    const full = Math.round(rating);
    return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .list-page { padding: 16px 0 40px; background: #f7fafc; min-height: 100vh; }
        .container { width: 1180px; max-width: calc(100vw - 40px); margin: 0 auto; font-family: Inter, Arial, sans-serif; }
        .list-breadcrumb { font-size: 13px; color: #8b96a5; margin-bottom: 18px; }
        .list-breadcrumb a { color: #8b96a5; text-decoration: none; }
        .list-breadcrumb span.sep { margin: 0 6px; color: #c7cdd4; }
        .list-breadcrumb strong { color: #1c1c1c; font-weight: 600; }
        .list-layout { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 20px; align-items: start; }
        .filters { background: #fff; border: 1px solid #dee2e7; border-radius: 6px; padding: 18px 16px 20px; position: sticky; top: 20px; }
        .filters h3 { margin: 0 0 14px; font-size: 16px; font-weight: 600; color: #1c1c1c; }
        .filter-dd { border-bottom: 1px solid #eef1f4; }
        .filter-dd:last-child { border-bottom: 0; }
        .filter-dd-toggle { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border: 0; background: transparent; font-size: 14px; font-weight: 600; color: #1c1c1c; cursor: pointer; text-align: left; }
        .filter-dd-toggle::after { content: ""; width: 8px; height: 8px; border-right: 2px solid #8b96a5; border-bottom: 2px solid #8b96a5; transform: rotate(45deg); transition: transform 0.2s; }
        .filter-dd.is-open .filter-dd-toggle::after { transform: rotate(-135deg); }
        .filter-dd-panel { display: none; padding: 0 0 14px; }
        .filter-dd.is-open .filter-dd-panel { display: block; }
        .filter-link { width: 100%; text-align: left; border: 0; background: transparent; padding: 7px 0; font-size: 13px; color: #505050; cursor: pointer; }
        .filter-link.is-active { color: #1c1c1c; font-weight: 600; }
        .filter-check { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 13px; color: #505050; cursor: pointer; }
        .star-filter { display: flex; align-items: center; gap: 4px; }
        .star-filter-btn { border: 1px solid #dee2e7; background: #fff; border-radius: 6px; padding: 4px 8px; font-size: 12px; cursor: pointer; }
        .star-filter-btn.is-active { border-color: #0d6efd; color: #0d6efd; }
        .star-filter-star { font-size: 18px; cursor: pointer; color: #c7cdd4; background: none; border: none; padding: 0; }
        .star-filter-star.is-lit { color: #ff9017; }
        .condition-row { display: flex; gap: 6px; flex-wrap: wrap; }
        .condition-btn { border: 1px solid #dee2e7; background: #fff; border-radius: 6px; padding: 6px 10px; font-size: 12px; cursor: pointer; }
        .condition-btn.is-active { background: #0d6efd; color: #fff; border-color: #0d6efd; }
        .price-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
        .price-row input { width: 100%; height: 32px; border: 1px solid #d9dfe6; border-radius: 6px; padding: 0 8px; font-size: 12px; }
        .list-toolbar { display: flex; align-items: center; justify-content: space-between; background: #fff; border: 1px solid #dee2e7; border-radius: 6px; padding: 12px 16px; margin-bottom: 16px; }
        .list-toolbar-left { display: flex; align-items: center; gap: 12px; }
        .list-toolbar-left select { height: 32px; border: 1px solid #d9dfe6; border-radius: 6px; padding: 0 10px; font-size: 13px; }
        .products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .products-list { display: flex; flex-direction: column; gap: 16px; }
        .list-product { background: #fff; border: 1px solid #dee2e7; border-radius: 6px; padding: 16px; display: flex; flex-direction: column; position: relative; }
        .products-list .list-product { flex-direction: row; gap: 20px; }
        .product-thumb { display: block; border-radius: 6px; padding: 10px; text-align: center; }
        .product-thumb img { max-width: 100%; height: 180px; object-fit: contain; }
        .products-list .product-thumb img { width: 180px; height: 180px; }
        .wish { position: absolute; top: 12px; right: 12px; width: 36px; height: 36px; border: 1px solid #dee2e7; border-radius: 6px; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #8b96a5; }
        .wish.is-saved { color: #e31b23; border-color: #f5b5ba; background: #fff5f6; }
        .title { font-size: 14px; font-weight: 500; color: #1c1c1c; margin: 10px 0 6px; }
        .price { font-size: 16px; font-weight: 700; color: #1c1c1c; margin-bottom: 6px; }
        .stars { color: #ff9017; font-size: 13px; margin-right: 6px; }
        .rating-meta { font-size: 12px; color: #8b96a5; }
        .desc { font-size: 12px; color: #8b96a5; line-height: 1.5; margin: 10px 0; }
        .actions { margin-top: auto; display: flex; align-items: center; justify-content: space-between; }
        .view-detail { font-size: 13px; color: #0d6efd; text-decoration: none; font-weight: 600; }
        .add-to-cart { height: 32px; padding: 0 12px; border-radius: 6px; border: 1px solid #0d6efd; background: #fff; color: #0d6efd; font-size: 13px; font-weight: 600; cursor: pointer; }
        .view-toggle { display: flex; border: 1px solid #dee2e7; border-radius: 6px; overflow: hidden; }
        .view-toggle button { width: 36px; height: 32px; border: 0; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .view-toggle button.is-active { background: #e7f1ff; }
        .list-pagination { margin-top: 24px; display: flex; justify-content: flex-end; }
        .pagination-btns { display: flex; gap: 4px; }
        .pg-btn { min-width: 32px; height: 32px; border: 1px solid #dee2e7; background: #fff; border-radius: 6px; cursor: pointer; font-size: 13px; }
        .pg-btn.is-current { background: #0d6efd; color: #fff; border-color: #0d6efd; }
        .pg-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        #listToast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: #1c1c1c; color: #fff; padding: 8px 16px; border-radius: 8px; font-size: 13px; z-index: 1000; }
        @media (max-width: 992px) { 
          .container { width: 100%; padding: 0 16px; }
          .list-layout { grid-template-columns: 1fr; } 
          .filters { position: static; margin-bottom: 20px; } 
          .products-grid { grid-template-columns: repeat(2, 1fr); } 
        }
        @media (max-width: 768px) {
          .list-toolbar { flex-direction: column; align-items: stretch; gap: 10px; }
          .products-list .list-product { flex-direction: column; }
          .products-list .product-thumb img { width: 100%; height: auto; }
        }
        @media (max-width: 480px) {
          .products-grid { grid-template-columns: 1fr; }
          .list-toolbar-left b { display: none; }
        }
      ` }} />

      <main className="list-page">
        <div className="container">
          <nav className="list-breadcrumb">
            <Link href="/">Home</Link><span className="sep">›</span>
            <Link href="/weblist">All category</Link><span className="sep">›</span>
            <strong>Listing</strong>
          </nav>

          <div className="list-layout">
            <aside className="filters">
              <h3>Filters</h3>

              <div className={`filter-dd ${openFilters.category ? 'is-open' : ''}`}>
                <button type="button" className="filter-dd-toggle" onClick={() => toggleFilter('category')}>Category</button>
                <div className="filter-dd-panel">
                  {['all', 'clothes', 'electronics', 'home', 'accessories'].map(cat => (
                    <button 
                      key={cat} 
                      className={`filter-link ${activeCategory === cat ? 'is-active' : ''}`}
                      onClick={() => {
                        const url = new URL("/weblist", typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
                        if (cat !== 'all') url.searchParams.set('cat', cat);
                        router.push(url.pathname + url.search);
                      }}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`filter-dd ${openFilters.brands ? 'is-open' : ''}`}>
                <button type="button" className="filter-dd-toggle" onClick={() => toggleFilter('brands')}>Brands</button>
                <div className="filter-dd-panel">
                  {['Samsung', 'Apple', 'Xiaomi', 'Nike', 'Generic'].map(brand => (
                    <label key={brand} className="filter-check">
                      <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} /> {brand}
                    </label>
                  ))}
                </div>
              </div>

              <div className={`filter-dd ${openFilters.features ? 'is-open' : ''}`}>
                <button type="button" className="filter-dd-toggle" onClick={() => toggleFilter('features')}>Features</button>
                <div className="filter-dd-panel">
                  {[
                    { id: 'free-shipping', label: 'Free shipping' },
                    { id: 'in-stock', label: 'In stock' },
                    { id: 'fast-delivery', label: 'Fast delivery' },
                    { id: 'best-seller', label: 'Best seller' }
                  ].map(f => (
                    <label key={f.id} className="filter-check">
                      <input type="checkbox" checked={selectedFeatures.includes(f.id)} onChange={() => handleFeatureChange(f.id)} /> {f.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className={`filter-dd ${openFilters.rating ? 'is-open' : ''}`}>
                <button type="button" className="filter-dd-toggle" onClick={() => toggleFilter('rating')}>Rating</button>
                <div className="filter-dd-panel">
                  <div className="star-filter">
                    <button className={`star-filter-btn ${minStarRating === 0 ? 'is-active' : ''}`} onClick={() => setMinStarRating(0)}>Any</button>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star} 
                        className={`star-filter-star ${minStarRating >= star ? 'is-lit' : ''} ${minStarRating === star ? 'is-active' : ''}`}
                        onClick={() => setMinStarRating(star)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`filter-dd ${openFilters.condition ? 'is-open' : ''}`}>
                <button type="button" className="filter-dd-toggle" onClick={() => toggleFilter('condition')}>Condition</button>
                <div className="filter-dd-panel">
                  <div className="condition-row">
                    {['all', 'new', 'used', 'refurbished'].map(c => (
                      <button 
                        key={c} 
                        className={`condition-btn ${conditionFilter === c ? 'is-active' : ''}`}
                        onClick={() => setConditionFilter(c)}
                      >
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`filter-dd ${openFilters.price ? 'is-open' : ''}`}>
                <button type="button" className="filter-dd-toggle" onClick={() => toggleFilter('price')}>Price range</button>
                <div className="filter-dd-panel">
                  <div className="price-row">
                    <input type="number" placeholder="Min" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
                    <input type="number" placeholder="Max" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
                  </div>
                  <button type="button" className="add-to-cart" style={{ width: '100%' }} onClick={() => setCurrentPage(1)}>Apply</button>
                  <button type="button" className="filter-link" style={{ marginTop: '10px' }} onClick={clearAllFilters}>Clear all</button>
                </div>
              </div>
            </aside>

            <div className="list-main">
              <div className="list-toolbar">
                <div className="list-toolbar-left">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="best">Best match</option>
                    <option value="price-asc">Price: Low to high</option>
                    <option value="price-desc">Price: High to low</option>
                    <option value="name">Name A–Z</option>
                  </select>
                  <span className="rating-meta"><b>{filteredAndSortedProducts.length}</b> items found</span>
                </div>
                <div className="view-toggle">
                  <button className={viewMode === 'grid' ? 'is-active' : ''} onClick={() => setViewMode('grid')}>
                    <img src="/gridview.png" alt="Grid" width="18" height="18" />
                  </button>
                  <button className={viewMode === 'list' ? 'is-active' : ''} onClick={() => setViewMode('list')}>
                    <img src="/listview.png" alt="List" width="18" height="18" />
                  </button>
                </div>
              </div>

              <div className={viewMode === 'grid' ? 'products-grid' : 'products-list'}>
                {currentProducts.length > 0 ? currentProducts.map(p => (
                  <article key={p.id} className="list-product">
                    <button className={`wish ${savedItems.includes(p.id) ? 'is-saved' : ''}`} onClick={() => toggleSave(p.id)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={savedItems.includes(p.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
                    </button>
                    <Link href={`/webdetail?id=${p.id}`} className="product-thumb">
                      <img src={"/" + p.img} alt={p.title} />
                    </Link>
                    <div className="body">
                      <p className="title">{p.title}</p>
                      <div className="price">${p.price.toFixed(2)}</div>
                      <div className="rating-line">
                        <span className="stars">{renderStars(p.rating)}</span>
                        <span className="rating-meta">{p.rating} · {p.reviews} reviews</span>
                      </div>
                      <p className="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                      <div className="actions">
                        <Link href={`/webdetail?id=${p.id}`} className="view-detail">View detail</Link>
                        <button className="add-to-cart" onClick={() => addToCart(p.id)}>Add</button>
                      </div>
                    </div>
                  </article>
                )) : (
                  <div className="list-empty">No items match your filters.</div>
                )}
              </div>

              {totalPages > 1 && (
                <nav className="list-pagination">
                  <div className="pagination-btns">
                    <button className="pg-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button key={p} className={`pg-btn ${currentPage === p ? 'is-current' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
                    ))}
                    <button className="pg-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
                  </div>
                </nav>
              )}
            </div>
          </div>
        </div>
        {toastMsg && <div id="listToast">{toastMsg}</div>}
      </main>
    </>
  );
};

const Weblist = () => {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
      <WeblistContent />
    </Suspense>
  );
};

export default Weblist;

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const goList = (q?: string) => {
    // Note: Maintaining original behavior of navigating to weblist
    const url = new URL("/weblist", window.location.origin);
    if (q) url.searchParams.set("q", q);
    router.push(url.pathname + url.search);
  };

  const handleSearch = () => {
    goList(searchTerm.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .header-wrap {
          position: sticky;
          top: 0;
          z-index: 200;
          background: #fff;
          border-bottom: 1px solid #e3e8ee;
          box-shadow: 0 1px 0 rgba(15, 23, 42, 0.04);
          font-family: Inter, Arial, sans-serif;
        }

        .container {
          width: 1180px;
          max-width: calc(100vw - 40px);
          margin: 0 auto;
        }

        .topbar,
        .subbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .topbar {
          height: 86px;
          gap: 16px;
        }

        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          line-height: 0;
          text-decoration: none;
          flex-shrink: 0;
        }

        .brand-mark {
          display: block;
          height: 40px;
          width: auto;
          max-width: 180px;
          object-fit: contain;
          object-position: left center;
        }

        .search {
          flex: 1;
          max-width: 665px;
          border: 2px solid #0d6efd;
          border-radius: 6px;
          display: flex;
          align-items: stretch;
          overflow: hidden;
          background: #fff;
        }

        .search-field {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 6px;
          padding-left: 10px;
          min-width: 0;
          border-right: 1px solid #d8e1ea;
        }

        .search-input-icon {
          display: flex;
          flex-shrink: 0;
          opacity: 0.9;
        }

        .search-field input {
          border: 0;
          padding: 0 12px 0 0;
          height: 38px;
          font-size: 13px;
          flex: 1;
          min-width: 0;
          font-family: inherit;
          outline: none;
        }

        .search-select-wrap {
          display: flex;
          align-items: center;
          border-right: 1px solid #d8e1ea;
          background: #fff;
        }

        .search select {
          border: 0;
          padding: 0 28px 0 12px;
          height: 38px;
          font-size: 13px;
          width: 150px;
          font-family: inherit;
          background: #fff
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238B96A5' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")
            no-repeat right 10px center;
          appearance: none;
          cursor: pointer;
          outline: none;
          color: #1c1c1c;
        }

        .search-submit {
          border: 0;
          min-width: 100px;
          padding: 0 14px;
          background: #0d6efd;
          color: #fff;
          font-weight: 600;
          font-size: 13px;
          font-family: inherit;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
        }

        .search-submit svg {
          flex-shrink: 0;
        }

        .quick-links {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          flex-shrink: 0;
        }

        .nav-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 4px;
          min-width: 56px;
          padding: 2px 4px;
          color: #8b96a5;
          text-decoration: none;
          font-size: 11px;
          line-height: 1.2;
          text-align: center;
        }

        .nav-pill:hover {
          color: #0d6efd;
        }

        .nav-pill-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          color: inherit;
        }

        .nav-pill-icon img {
          width: 22px;
          height: 22px;
          object-fit: contain;
          display: block;
        }

        .nav-pill-label {
          color: #505050;
          font-size: 12px;
          font-weight: 400;
        }

        .nav-pill:hover .nav-pill-label {
          color: #0d6efd;
        }

        .menu-links,
        .lang-links {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .nav-control {
          width: 24px;
          height: 24px;
          object-fit: contain;
          flex-shrink: 0;
          margin-right: 2px;
        }

        .menu-links a {
          color: #1c1c1c;
          font-weight: 600;
          font-size: 13px;
          text-decoration: none;
        }

        .menu-links a:hover {
          color: #0d6efd;
        }

        .lang-links .lang-link {
          color: #1c1c1c;
          font-weight: 600;
          font-size: 13px;
        }

        .lang-flag {
          width: 20px;
          height: 14px;
          object-fit: cover;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .subbar {
          border-top: 1px solid #eef2f6;
          border-bottom: 1px solid #eef2f6;
        }

        .subbar-inner {
          height: 56px;
        }

        .lang-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          font-size: 13px;
          color: #1c1c1c;
          font-weight: 600;
        }

        .lang-links .lang-link:hover {
          color: #0d6efd;
        }

        .lang-link-icon {
          display: flex;
          color: #8b96a5;
        }

        .lang-links .lang-link:hover .lang-link-icon {
          color: #0d6efd;
        }

        .lang-link .chevron {
          display: flex;
          color: #8b96a5;
          margin-left: 2px;
        }

        .lang-links .lang-link:hover .chevron {
          color: #0d6efd;
        }

        @media (max-width: 1024px) {
          .container {
            width: 940px;
          }
          .search {
            max-width: 450px;
          }
        }

        @media (max-width: 768px) {
          .container {
            width: 100%;
            padding: 0 16px;
          }
          .topbar {
            height: auto;
            flex-wrap: wrap;
            padding: 12px 0;
          }
          .search {
            order: 3;
            max-width: 100%;
            width: 100%;
            margin-top: 10px;
          }
          .search select {
            width: 120px;
          }
          .nav-pill-label {
            display: none;
          }
          .nav-pill {
            min-width: 40px;
          }
          .subbar-inner {
            overflow-x: auto;
            justify-content: flex-start;
            gap: 20px;
          }
          .menu-links {
            white-space: nowrap;
          }
          .lang-links {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .search select {
            display: none;
          }
          .search-submit span {
            display: none;
          }
          .search-submit {
            min-width: 48px;
          }
          .brand-mark {
            height: 32px;
          }
        }
      ` }} />
      <header className="header-wrap">
        <div className="container topbar">
          <Link className="brand" href="/">
            <img className="brand-mark" src="/logo-colored.png" alt="Brand" />
          </Link>
          <div className="search" role="search">
            <span className="search-field">
              <span className="search-input-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3-3" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Search" 
                aria-label="Search products" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </span>
            <label className="search-select-wrap">
              <span className="visually-hidden">Category</span>
              <select>
                <option>All category</option>
              </select>
            </label>
            <button type="button" className="search-submit" onClick={handleSearch}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Search</span>
            </button>
          </div>
          <nav className="quick-links" aria-label="Account shortcuts">
            <Link className="nav-pill" href="#">
              <span className="nav-pill-icon" aria-hidden="true"><img src="/person.png" alt="" width="22" height="22" /></span>
              <span className="nav-pill-label">Profile</span>
            </Link>
            <Link className="nav-pill" href="#">
              <span className="nav-pill-icon" aria-hidden="true"><img src="/message.png" alt="" width="22" height="22" /></span>
              <span className="nav-pill-label">Message</span>
            </Link>
            <Link className="nav-pill" href="/saved">
              <span className="nav-pill-icon" aria-hidden="true"><img src="/heart.png" alt="" width="22" height="22" /></span>
              <span className="nav-pill-label">Saved</span>
            </Link>
            <Link className="nav-pill" href="/webcart">
              <span className="nav-pill-icon" aria-hidden="true"><img src="/cart.png" alt="" width="22" height="22" /></span>
              <span className="nav-pill-label">My cart</span>
            </Link>
          </nav>
        </div>
        <div className="subbar">
          <div className="container subbar-inner">
            <nav className="menu-links">
              <img className="nav-control" src="/navcontrol.png" alt="" width="24" height="24" />
              <Link href="/weblist">All category</Link>
              <Link href="#">Hot offers</Link>
              <Link href="/saved">Saved items</Link>
              <Link href="#">Projects</Link>
              <Link href="/weblist">Menu item</Link>
              <Link href="#">Help</Link>
            </nav>
            <div className="lang-links">
              <Link className="lang-link" href="#">
                <span className="lang-link-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
                <span>English, USD</span>
                <span className="chevron" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </Link>
              <Link className="lang-link" href="#">
                <span>Ship to</span>
                <img className="lang-flag" src="/america.png" alt="" width="20" height="14" />
                <span className="chevron" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;

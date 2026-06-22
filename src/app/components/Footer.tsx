import React, { useState } from 'react';

const socialLinks = [
  {
    label: 'Facebook',
    path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  },
  {
    label: 'Twitter',
    path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
  },
  {
    label: 'Instagram',
    path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11A.5.5 0 0118 7v10a.5.5 0 01-.5.5h-11A.5.5 0 016 17V7a.5.5 0 01.5-.5z',
  },
  {
    label: 'LinkedIn',
    path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
  },
];

const PinIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 16 16"
    fill="none"
    className="flex-shrink-0 text-[#D3D1C7]"
  >
    <path
      d="M8 2a4 4 0 014 4c0 3-4 8-4 8S4 9 4 6a4 4 0 014-4z"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#FAFAF8] border-t border-[#E8E6E0] font-sans text-[#2C2C2A]">

      {/* ── Newsletter Band ── */}
      <div className="bg-white border-b border-[#E8E6E0] py-10">
        <div className="max-w-[1140px] mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#D85A30] to-[#E8774D] flex items-center justify-center text-white text-[22px] font-serif flex-shrink-0">
                H
              </div>
              <div>
                <p className="m-0 font-serif text-[22px] text-[#2C2C2A] tracking-tight leading-none">
                  homez
                </p>
                <p className="m-0 text-[10px] text-[#B4B2A9] tracking-[0.06em] uppercase font-medium mt-0.5">
                  Real Estate Platform
                </p>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p className="m-0 mb-1 font-serif text-[18px] text-[#2C2C2A]">
                Stay in the loop
              </p>
              <p className="m-0 mb-3 text-[13px] text-[#888780]">
                Get the latest listings and market updates.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 px-4 py-3 bg-[#EAF3DE] rounded-xl text-[#3B6D11] text-sm font-medium">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8l3.5 3.5L13 4.5"
                      stroke="#3B6D11"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  You're subscribed — thanks!
                </div>
              ) : (
                <div className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 bg-[#FAFAF8] border border-[#E8E6E0] rounded-[14px]">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="flex-shrink-0 text-[#B4B2A9]"
                  >
                    <path
                      d="M1 4l11 8L23 4M1 4v14a1 1 0 001 1h20a1 1 0 001-1V4M1 4a1 1 0 011-1h20a1 1 0 011 1"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                    className="flex-1 bg-transparent border-none outline-none text-[13.5px] text-[#2C2C2A] placeholder-[#B4B2A9] min-w-0"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="flex-shrink-0 bg-[#D85A30] hover:bg-[#C04D26] text-white text-[13px] font-semibold px-5 py-2.5 rounded-[10px] border-none cursor-pointer transition-colors duration-200 whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Body ── */}
      <div className="max-w-[1140px] mx-auto px-10 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">

          {/* Brand Column */}
          <div>
            {/* Contact */}
            <div className="flex flex-wrap gap-10 mb-10">
              <div>
                <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#B4B2A9] mb-1">
                  Free customer care
                </p>
                <p className="text-[15px] font-medium text-[#2C2C2A]">
                  +(0) 123 050 945 02
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#B4B2A9] mb-1">
                  Live support
                </p>
                <p className="text-[15px] font-medium text-[#2C2C2A]">
                  hi@homez.com
                </p>
              </div>
            </div>

            {/* App Buttons */}
            <p className="font-serif text-[15px] text-[#2C2C2A] mb-3">
              Download the app
            </p>
            <div className="flex flex-wrap gap-2.5 mb-9">
              {[
                {
                  label: 'App Store',
                  sub: 'Download on',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2C10.14 2 8.5 3.16 7.7 4.8 6.46 4.44 5.12 4.9 4.34 6c-.78 1.08-.68 2.5.1 3.5C3.7 10.42 3.5 11.7 4 12.8c.5 1.12 1.6 1.82 2.76 1.86.38 1.04 1.08 1.86 2 2.32V19a1 1 0 001 1h4.48a1 1 0 001-1v-1.98c.94-.46 1.64-1.28 2-2.32C18.4 14.6 19.5 13.9 20 12.8c.5-1.1.3-2.38-.44-3.3.78-1 .88-2.42.1-3.5-.78-1.1-2.12-1.56-3.36-1.2C15.5 3.16 13.86 2 12 2z"
                        stroke="#5F5E5A"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  label: 'Google Play',
                  sub: 'Get it on',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4l16 8-16 8V4z"
                        stroke="#5F5E5A"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
              ].map(({ label, sub, icon }) => (
                <a
                  key={label}
                  href="#"
                  className="flex items-center gap-2.5 px-4 py-2.5 border border-[#E8E6E0] rounded-xl bg-white no-underline hover:border-[#D85A30] hover:-translate-y-px transition-all duration-200"
                >
                  {icon}
                  <div>
                    <p className="m-0 text-[10px] text-[#B4B2A9] leading-none">{sub}</p>
                    <p className="m-0 text-[13px] font-semibold text-[#2C2C2A] leading-snug">
                      {label}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social */}
            <p className="font-serif text-[15px] text-[#2C2C2A] mb-3">Follow us</p>
            <div className="flex gap-2">
              {socialLinks.map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-[38px] h-[38px] rounded-full border border-[#E8E6E0] bg-white flex items-center justify-center no-underline text-[#5F5E5A] hover:border-[#D85A30] hover:text-[#D85A30] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Popular Search */}
          <div>
            <p className="font-serif text-[15px] text-[#2C2C2A] tracking-[0.01em] mb-4">
              Popular search
            </p>
            <ul className="list-none p-0 m-0">
              {['Apartment for Rent', 'Affordable Listings', 'Offices for Sale', 'Offices for Rent', 'Studio Flats'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#888780] no-underline text-[13.5px] leading-loose inline-block hover:text-[#D85A30] transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-serif text-[15px] text-[#2C2C2A] tracking-[0.01em] mb-4">
              Quick links
            </p>
            <ul className="list-none p-0 m-0">
              {['Terms of Use', 'Privacy Policy', 'Pricing Plans', 'Our Services', 'Contact Support', 'Careers', 'FAQs'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#888780] no-underline text-[13.5px] leading-loose inline-block hover:text-[#D85A30] transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Discover */}
          <div>
            <p className="font-serif text-[15px] text-[#2C2C2A] tracking-[0.01em] mb-4">
              Discover
            </p>
            <ul className="list-none p-0 m-0">
              {['Miami', 'Los Angeles', 'Chicago', 'New York', 'San Francisco', 'Austin'].map(
                (city) => (
                  <li key={city}>
                    <a
                      href="#"
                      className="flex items-center gap-1.5 text-[#888780] no-underline text-[13.5px] leading-loose hover:text-[#D85A30] transition-colors duration-200"
                    >
                      <PinIcon />
                      {city}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-[#E8E6E0]">
        <div className="max-w-[1140px] mx-auto px-10 py-5 flex flex-wrap justify-between items-center gap-3">
          <p className="text-[13px] text-[#B4B2A9] font-normal">
            © Homez 2024 — All rights reserved
          </p>
          <div className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Sitemap'].map((link, i, arr) => (
              <React.Fragment key={link}>
                <a
                  href="#"
                  className="text-[13px] text-[#888780] no-underline hover:text-[#D85A30] transition-colors duration-200"
                >
                  {link}
                </a>
                {i < arr.length - 1 && (
                  <span className="text-[#D3D1C7] text-xs">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
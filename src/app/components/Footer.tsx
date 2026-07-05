import React, { useState } from 'react';
import { Check, Envelope, Facebook, GeoAlt, Instagram, Linkedin, Twitter } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import logo from "../../assets/win-realty-icon.png"




const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const socialLinks = [
    { label: t('social_link.facebook'), icon: <Facebook /> },
    { label: t('social_link.twitter'), icon: <Twitter /> },
    { label: t('social_link.instagram'), icon: <Instagram /> },
    { label: t('social_link.linkedin'), icon: <Linkedin /> },
  ];

  const menul_footer = [
    {
      title: t('footer.popular_search'),
      submenu: [
        t('footer.popular.apartment_for_rent'),
        t('footer.popular.affordable_listings'),
        t('footer.popular.offices_for_sale'),
        t('footer.popular.offices_for_rent'),
        t('footer.popular.studio_flats')
      ]
    },
    {
      title: t('footer.quick_link'),
      submenu: [
        t('footer.quick_links.terms_of_use'),
        t('footer.quick_links.privacy_policy'),
        t('footer.quick_links.pricing_plans'),
        t('footer.quick_links.our_services'),
        t('footer.quick_links.contact_support'),
        t('footer.quick_links.careers'),
        t('footer.quick_links.faqs')
      ]
    },
    {
      title: t('footer.discover'),
      submenu: [
        t('footer.discovers.miami'),
        t('footer.discovers.los_angeles'),
        t('footer.discovers.new_york'),
        t('footer.discovers.chicago'),
        t('footer.discovers.houston')
      ]
    }
  ]

  return (
    <footer className="w-full bg-[#FAFAF8] border-t border-[#E8E6E0] text-[#2C2C2A]">

      {/* ── Newsletter Band ── */}
      <div className="bg-white border-b border-[#E8E6E0] py-10">
        <div className="max-w-[1140px] mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-[14px] flex items-center justify-center text-white text-[22px] font-serif flex-shrink-0">
                <img src={logo} alt="" />
              </div>
              <div>
                <p className="m-0 font-serif text-[22px] text-[#2C2C2A] tracking-tight leading-none">
                  Win Realty
                </p>
                <p className="m-0 text-[10px] text-[#B4B2A9] tracking-[0.06em] uppercase font-medium mt-0.5">
                  {t('footer.platform')}
                </p>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p className="m-0 mb-1 text-[18px] text-[#2C2C2A]">
                {t('footer.stayInLoop')}
              </p>
              <p className="m-0 mb-3 text-[13px] text-[#888780]">
                {t('footer.getLatestListings')}
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 px-4 py-3 bg-[#EAF3DE] rounded-xl text-[#3B6D11] text-sm font-medium">
                  <Check size={25} />
                  {t('footer.subscribed')}
                </div>
              ) : (
                <div className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 bg-[#FAFAF8] border border-[#E8E6E0] rounded-[14px]">
                  <Envelope className="text-[#B4B2A9]"/>
                  <input type="email" placeholder={t('footer.placeholder_email')} value={email}
                    onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                    className="flex-1 bg-transparent border-none outline-none text-[13.5px] text-[#2C2C2A] placeholder-[#B4B2A9] min-w-0"
                  />
                  <button onClick={handleSubscribe}
                    className="flex-shrink-0 bg-blue-800 hover:bg-blue-900 text-white text-[13px] font-semibold px-5 py-2.5 rounded-[10px] border-none cursor-pointer transition-colors duration-200 whitespace-nowrap" >
                    {t('footer.subscribe')}
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
                  {t('footer.freeCustomerCare')}
                </p>
                <p className="text-[15px] font-medium text-[#2C2C2A]">
                  +(0) 123 050 945 02
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#B4B2A9] mb-1">
                  {t('footer.live_support')}
                </p>
                <p className="text-[15px] font-medium text-[#2C2C2A]">
                  hi@homez.com
                </p>
              </div>
            </div>

            {/* Social */}
            <p className="text-[15px] text-[#2C2C2A] mb-3">{t('footer.follow_us')}</p>
            <div className="flex gap-2">
              {socialLinks.map(({ label, icon }) => (
                <a key={label} href="#" aria-label={label} className="w-[38px] h-[38px] rounded-full border border-[#E8E6E0] bg-white flex items-center justify-center no-underline text-[#5F5E5A] hover:border-[#D85A30] hover:text-[#D85A30] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Popular Search */}
          {
            menul_footer.map((item,index)=>{
              return (
                <div key={index}>
                  <p className="text-[15px] text-[#2C2C2A] tracking-[0.01em] mb-4">
                    {item.title}
                  </p>
                  <ul className="list-none p-0 m-0">
                    {item.submenu.map((item, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-[#888780] no-underline text-[13.5px] leading-loose inline-block hover:text-[#D85A30] transition-colors duration-200"
                          title={item}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })
          }
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-[#E8E6E0]">
        <div className="max-w-[1140px] mx-auto px-10 py-5 flex flex-wrap justify-between items-center gap-3">
          <p className="text-[13px] text-[#B4B2A9] font-normal">
            © Homez 2024 — {t('footer.all_rights_reserved')}
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
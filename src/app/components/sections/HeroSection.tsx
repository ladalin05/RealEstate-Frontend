import React, { useState } from 'react';
import BACKGROUND_IMAGE_URL from '../../../assets/images/slider1.jpg';
import { Search  } from 'react-bootstrap-icons'; 
import { CustomSelect } from '../ui/CustomSelect';
import { useNavigate } from 'react-router-dom';

export const HeroSection = ({categories}: {categories: any[]}) => {

  const navigate = useNavigate();
  const [filters, setFilters] = useState({ search_address: "", category_id: "" });
  const PROPERTY_TYPES = categories.map(category => ({ label: category.name, value: category.id }));

  const handleFiltter = () => {
    navigate('/property', { state: { filters } })
  }

  return (
    <div className="flex items-center" 
         style={{ height: '120vh', backgroundImage: `url(${BACKGROUND_IMAGE_URL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      <div className="container">
        <div className="flex justify-center">
          <div className="text-center">
            <span className="rounded-full bg-white text-blue-500 mb-3 px-3 py-2 font-semibold text-[75%] shadow-xs">
              ✨ THE BEST WAY TO
            </span>
            <h1 className="text-7xl text-white font-bold my-12">Find Your <span className="text-sky-400">Dream Home</span></h1>
            <p className="text-lg text-gray-500 my-12">Explore over 2,000+ luxury properties with verified listings.</p>
            
            {/* Modern Search Bar */}
            <div className="max-w-[800px] bg-white/15 backdrop-blur-[10px] border border-white/20 p-3 rounded-xl shadow-lg mx-auto">
              <div className="flex gap-5">
                <div className="w-[50%]">
                  <input type="text" value={filters.search_address} onChange={(e) => setFilters({...filters, search_address: e.target.value})} className="w-full h-11 py-1.5 pr-3 pl-6 bg-white text-base text-black rounded-lg placeholder:text-gray-500 focus:outline-none sm:text-sm/6" placeholder="Location..." />
                </div>
                <div className="w-[38%] h-11">
                    <CustomSelect key={'category_id'} label={'Property Type'} className={"w-full bg-white rounded-sm"} options={PROPERTY_TYPES} value={filters.category_id} onChange={(value) => setFilters({...filters, category_id: value})} />
                </div>
                <button onClick={() => handleFiltter()} className="w-12 h-12 grid place-items-center bg-blue-500 text-white rounded-full">
                  <Search size={20} className="translate-x-0.5 translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

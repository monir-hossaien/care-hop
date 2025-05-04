import React from 'react';
import {Link} from "react-router-dom";

const SearchBanner = () => {
    return (
        <div className="bg-[#08376B]">
            <div className="w-full mx-auto space-y-5 py-18 text-center">
                <h5 className="text-[#00B092] uppercase tracking-widest font-medium">Search Hospitals</h5>
                <h1 className="text-white text-4xl font-bold">Find your Doctor or Hospital right now</h1>
                <p className="text-white text-sm py-2">Find Doctor, Find Hospital</p>
                <Link to="/search-doctor" className="px-8 py-3 bg-[#00B092] text-sm text-white rounded-md">Search Your Doctor</Link>
            </div>
        </div>
    );
};

export default SearchBanner;
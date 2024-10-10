import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-indigo-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <a href="#" className="text-white flex items-center space-x-2 px-4">
        <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        <span className="text-2xl font-extrabold">Event Manager</span>
      </a>
      <nav>
        <a href="events" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white">
          Events
        </a>
        <a href="kategoriAcara" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white">
          Kategori Acara
        </a>
        <a href="pendaftaran" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white">
          Pendaftaran
        </a>
        <a href="penyelenggara" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white">
          Penyelenggara
        </a>
        <a href="peserta" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white">
          Peserta
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
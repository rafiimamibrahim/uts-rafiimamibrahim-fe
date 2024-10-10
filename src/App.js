import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'; // Ganti Router dengan BrowserRouter
import EventManagement from './components/events/event';
import KategoriList from './components/kategori_acara/kategori';
import PendaftaranList from './components/pendaftaran/pendaftaran'; // Tambahkan import untuk PendaftaranList
import PenyelenggaraList from './components/penyelenggara/penyelenggara'; // Tambahkan import untuk PenyelenggaraList
import PesertaList from './components/peserta/peserta'; // Tambahkan import untuk PesertaList
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1">
          <BrowserRouter basename='/uts-rafiimamibrahim-fe'>
          <Routes> {/* Tambahkan komponen Routes */}
            <Route path="/events" element={<EventManagement />} /> {/* Ganti component dengan element */}
            <Route path="/kategoriAcara" element={<KategoriList />} /> {/* Tambahkan rute untuk kategori */}
            <Route path="/pendaftaran" element={<PendaftaranList />} /> {/* Tambahkan rute untuk pendaftaran */}
            <Route path="/penyelenggara" element={<PenyelenggaraList />} /> {/* Tambahkan rute untuk penyelenggara */}
            <Route path="/peserta" element={<PesertaList />} /> {/* Tambahkan rute untuk peserta */}
          </Routes> {/* Tutup komponen Routes */}
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default App;
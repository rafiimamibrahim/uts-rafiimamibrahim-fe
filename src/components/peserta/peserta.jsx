import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PesertaList = () => {
  const [pesertas, setPesertas] = useState([]);
  const [newPeserta, setNewPeserta] = useState({
    nama: '',
    email: '',
    noTelepon: '',
    alamat: '',
    tanggalLahir: '',
    jenisKelamin: ''
  });
  const [editingPeserta, setEditingPeserta] = useState(null);

  useEffect(() => {
    fetchPesertas();
  }, []);

  const fetchPesertas = async () => {
    try {
      const response = await axios.get('http://localhost:4000/peserta'); // Ganti dengan endpoint yang sesuai
      setPesertas(response.data);
    } catch (error) {
      console.error('Error fetching pesertas:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingPeserta) {
      setEditingPeserta({ ...editingPeserta, [name]: value });
    } else {
      setNewPeserta({ ...newPeserta, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newPeserta.nama || !newPeserta.email || !newPeserta.noTelepon || !newPeserta.alamat || !newPeserta.tanggalLahir || !newPeserta.jenisKelamin) {
      alert('Please fill in all the fields before adding a peserta.');
      return;
    }
    try {
      await axios.post('http://localhost:4000/peserta', newPeserta); // Ganti dengan endpoint yang sesuai
      setNewPeserta({ nama: '', email: '', noTelepon: '', alamat: '', tanggalLahir: '', jenisKelamin: '' });
      fetchPesertas(); 
    } catch (error) {
      console.error('Error adding peserta:', error);
    }
  };

  const handleEdit = (peserta) => {
    setEditingPeserta(peserta);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/peserta/${editingPeserta.id}`, editingPeserta); // Ganti dengan endpoint yang sesuai
      setEditingPeserta(null);
      fetchPesertas(); 
    } catch (error) {
      console.error('Error updating peserta:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/peserta/${id}`); // Ganti dengan endpoint yang sesuai
      fetchPesertas();
    } catch (error) {
      console.error('Error deleting peserta:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ backgroundColor: '#2B2D42', height: '100vh' }}>
      <h1 className="text-2xl font-bold mb-4 text-white">Peserta</h1>
      <form onSubmit={handleAdd} className="mb-4">
        <input
          type="text"
          name="nama"
          value={newPeserta.nama}
          onChange={handleInputChange}
          placeholder="Nama"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={newPeserta.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="noTelepon"
          value={newPeserta.noTelepon}
          onChange={handleInputChange}
          placeholder="No Telepon"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="alamat"
          value={newPeserta.alamat}
          onChange={handleInputChange}
          placeholder="Alamat"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="date"
          name="tanggalLahir"
          value={newPeserta.tanggalLahir}
          onChange={handleInputChange}
          placeholder="Tanggal Lahir"
          className="mr-2 p-2 border rounded"
        />
        <select
          name="jenisKelamin"
          value={newPeserta.jenisKelamin}
          onChange={handleInputChange}
          className="mr-2 p-2 border rounded"
        >
          <option value="">Jenis Kelamin</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Peserta</button>
      </form>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 rounded-lg">
              <th className="py-2 px-4 border-b rounded-lg">Nama</th>
              <th className="py-2 px-4 border-b rounded-lg">Email</th>
              <th className="py-2 px-4 border-b rounded-lg">No Telepon</th>
              <th className="py-2 px-4 border-b rounded-lg">Alamat</th>
              <th className="py-2 px-4 border-b rounded-lg">Tanggal Lahir</th>
              <th className="py-2 px-4 border-b rounded-lg">Jenis Kelamin</th>
              <th className="py-2 px-4 border-b rounded-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pesertas.map((peserta) => (
              <tr key={peserta.id} className="text-center rounded-lg">
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPeserta && editingPeserta.id === peserta.id ? (
                    <input
                      type="text"
                      name="nama"
                      value={editingPeserta.nama}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    peserta.nama
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPeserta && editingPeserta.id === peserta.id ? (
                    <input
                      type="email"
                      name="email"
                      value={editingPeserta.email}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    peserta.email
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPeserta && editingPeserta.id === peserta.id ? (
                    <input
                      type="text"
                      name="noTelepon"
                      value={editingPeserta.noTelepon}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    peserta.noTelepon
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPeserta && editingPeserta.id === peserta.id ? (
                    <input
                      type="text"
                      name="alamat"
                      value={editingPeserta.alamat}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    peserta.alamat
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPeserta && editingPeserta.id === peserta.id ? (
                    <input
                      type="date"
                      name="tanggalLahir"
                      value={editingPeserta.tanggalLahir}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    peserta.tanggalLahir
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPeserta && editingPeserta.id === peserta.id ? (
                    <select
                      name="jenisKelamin"
                      value={editingPeserta.jenisKelamin}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    >
                      <option value="">Jenis Kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  ) : (
                    peserta.jenisKelamin
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPeserta && editingPeserta.id === peserta.id ? (
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(peserta)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Edit</button>
                  )}
                  <button onClick={() => handleDelete(peserta.id)} className="bg-red-500 text-white px-2 py-1 rounded rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PesertaList;
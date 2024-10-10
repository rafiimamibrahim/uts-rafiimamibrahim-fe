import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KategoriList = () => {
  const [kategori, setKategori] = useState([]);
  const [newKategori, setNewKategori] = useState({
    nama: '',
    deskripsi: ''
  });
  const [editingKategori, setEditingKategori] = useState(null);

  useEffect(() => {
    fetchKategori();
  }, []);

  const fetchKategori = async () => {
    try {
      const response = await axios.get('http://localhost:4000/kategori-acara'); // Ganti dengan endpoint yang sesuai
      setKategori(response.data);
    } catch (error) {
      console.error('Error fetching kategori:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingKategori) {
      setEditingKategori({ ...editingKategori, [name]: value });
    } else {
      setNewKategori({ ...newKategori, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newKategori.nama || !newKategori.deskripsi) {
      alert('Please fill in all the fields before adding a category.');
      return;
    }
    try {
      await axios.post('http://localhost:4000/kategori-acara', newKategori); // Ganti dengan endpoint yang sesuai
      setNewKategori({ nama: '', deskripsi: '' });
      fetchKategori(); 
    } catch (error) {
      console.error('Error adding kategori:', error);
    }
  };

  const handleEdit = (kategori) => {
    setEditingKategori(kategori);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/kategori-acara/${editingKategori.id}`, editingKategori); // Ganti dengan endpoint yang sesuai
      setEditingKategori(null);
      fetchKategori(); 
    } catch (error) {
      console.error('Error updating kategori:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/kategori-acara/${id}`); // Ganti dengan endpoint yang sesuai
      fetchKategori();
    } catch (error) {
      console.error('Error deleting kategori:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ backgroundColor: '#2B2D42', height: '100vh' }}>
      <h1 className="text-2xl font-bold mb-4 text-white">Kategori</h1>
      <form onSubmit={handleAdd} className="mb-4">
        <input
          type="text"
          name="nama"
          value={newKategori.nama}
          onChange={handleInputChange}
          placeholder="Nama"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="deskripsi"
          value={newKategori.deskripsi}
          onChange={handleInputChange}
          placeholder="Deskripsi"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Kategori</button>
      </form>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 rounded-lg">
              <th className="py-2 px-4 border-b rounded-lg">ID</th>
              <th className="py-2 px-4 border-b rounded-lg">Nama</th>
              <th className="py-2 px-4 border-b rounded-lg">Deskripsi</th>
              <th className="py-2 px-4 border-b rounded-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {kategori.map((kategori) => (
              <tr key={kategori.id} className="text-center rounded-lg">
                <td className="py-2 px-4 border-b rounded-lg">{kategori.id}</td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingKategori && editingKategori.id === kategori.id ? (
                    <input
                      type="text"
                      name="nama"
                      value={editingKategori.nama}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    kategori.nama
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingKategori && editingKategori.id === kategori.id ? (
                    <input
                      type="text"
                      name="deskripsi"
                      value={editingKategori.deskripsi}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    kategori.deskripsi
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingKategori && editingKategori.id === kategori.id ? (
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(kategori)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Edit</button>
                  )}
                  <button onClick={() => handleDelete(kategori.id)} className="bg-red-500 text-white px-2 py-1 rounded rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KategoriList;
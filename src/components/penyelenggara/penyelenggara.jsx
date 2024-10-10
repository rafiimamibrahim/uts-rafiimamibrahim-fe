import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PenyelenggaraList = () => {
  const [penyelenggaras, setPenyelenggaras] = useState([]);
  const [newPenyelenggara, setNewPenyelenggara] = useState({
    nama: '',
    email: '',
    noTelepon: '',
    alamat: '',
    deskripsi: ''
  });
  const [editingPenyelenggara, setEditingPenyelenggara] = useState(null);

  useEffect(() => {
    fetchPenyelenggaras();
  }, []);

  const fetchPenyelenggaras = async () => {
    try {
      const response = await axios.get('http://localhost:4000/penyelenggara'); // Ganti dengan endpoint yang sesuai
      setPenyelenggaras(response.data);
    } catch (error) {
      console.error('Error fetching penyelenggaras:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingPenyelenggara) {
      setEditingPenyelenggara({ ...editingPenyelenggara, [name]: value });
    } else {
      setNewPenyelenggara({ ...newPenyelenggara, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newPenyelenggara.nama || !newPenyelenggara.email || !newPenyelenggara.noTelepon || !newPenyelenggara.alamat || !newPenyelenggara.deskripsi) {
      alert('Please fill in all the fields before adding a penyelenggara.');
      return;
    }
    try {
      await axios.post('http://localhost:4000/penyelenggara', newPenyelenggara); // Ganti dengan endpoint yang sesuai
      setNewPenyelenggara({ nama: '', email: '', noTelepon: '', alamat: '', deskripsi: '' });
      fetchPenyelenggaras(); 
    } catch (error) {
      console.error('Error adding penyelenggara:', error);
    }
  };

  const handleEdit = (penyelenggara) => {
    setEditingPenyelenggara(penyelenggara);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/penyelenggara/${editingPenyelenggara.id}`, editingPenyelenggara); // Ganti dengan endpoint yang sesuai
      setEditingPenyelenggara(null);
      fetchPenyelenggaras(); 
    } catch (error) {
      console.error('Error updating penyelenggara:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/penyelenggara/${id}`); // Ganti dengan endpoint yang sesuai
      fetchPenyelenggaras();
    } catch (error) {
      console.error('Error deleting penyelenggara:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ backgroundColor: '#2B2D42', height: '100vh' }}>
      <h1 className="text-2xl font-bold mb-4 text-white">Penyelenggara</h1>
      <form onSubmit={handleAdd} className="mb-4">
        <input
          type="text"
          name="nama"
          value={newPenyelenggara.nama}
          onChange={handleInputChange}
          placeholder="Nama"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={newPenyelenggara.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="noTelepon"
          value={newPenyelenggara.noTelepon}
          onChange={handleInputChange}
          placeholder="No Telepon"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="alamat"
          value={newPenyelenggara.alamat}
          onChange={handleInputChange}
          placeholder="Alamat"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="deskripsi"
          value={newPenyelenggara.deskripsi}
          onChange={handleInputChange}
          placeholder="Deskripsi"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Penyelenggara</button>
      </form>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 rounded-lg">
              <th className="py-2 px-4 border-b rounded-lg">ID</th>
              <th className="py-2 px-4 border-b rounded-lg">Nama</th>
              <th className="py-2 px-4 border-b rounded-lg">Email</th>
              <th className="py-2 px-4 border-b rounded-lg">No Telepon</th>
              <th className="py-2 px-4 border-b rounded-lg">Alamat</th>
              <th className="py-2 px-4 border-b rounded-lg">Deskripsi</th>
              <th className="py-2 px-4 border-b rounded-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {penyelenggaras.map((penyelenggara) => (
              <tr key={penyelenggara.id} className="text-center rounded-lg">
                <td className="py-2 px-4 border-b rounded-lg">{penyelenggara.id}</td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPenyelenggara && editingPenyelenggara.id === penyelenggara.id ? (
                    <input
                      type="text"
                      name="nama"
                      value={editingPenyelenggara.nama}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    penyelenggara.nama
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPenyelenggara && editingPenyelenggara.id === penyelenggara.id ? (
                    <input
                      type="email"
                      name="email"
                      value={editingPenyelenggara.email}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    penyelenggara.email
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPenyelenggara && editingPenyelenggara.id === penyelenggara.id ? (
                    <input
                      type="text"
                      name="noTelepon"
                      value={editingPenyelenggara.noTelepon}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    penyelenggara.noTelepon
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPenyelenggara && editingPenyelenggara.id === penyelenggara.id ? (
                    <input
                      type="text"
                      name="alamat"
                      value={editingPenyelenggara.alamat}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    penyelenggara.alamat
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPenyelenggara && editingPenyelenggara.id === penyelenggara.id ? (
                    <input
                      type="text"
                      name="deskripsi"
                      value={editingPenyelenggara.deskripsi}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    penyelenggara.deskripsi
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPenyelenggara && editingPenyelenggara.id === penyelenggara.id ? (
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(penyelenggara)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Edit</button>
                  )}
                  <button onClick={() => handleDelete(penyelenggara.id)} className="bg-red-500 text-white px-2 py-1 rounded rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PenyelenggaraList;
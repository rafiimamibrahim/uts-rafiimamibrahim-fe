import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PendaftaranList = () => {
  const [pendaftaran, setPendaftaran] = useState([]);
  const [newPendaftaran, setNewPendaftaran] = useState({
    nama: '',
    email: '',
    noTelepon: '',
    eventId: '',
    statusPendaftaran: ''
  });
  const [editingPendaftaran, setEditingPendaftaran] = useState(null);

  useEffect(() => {
    fetchPendaftaran();
  }, []);

  const fetchPendaftaran = async () => {
    try {
      const response = await axios.get('http://localhost:4000/pendaftaran'); // Ganti dengan endpoint yang sesuai
      setPendaftaran(response.data);
    } catch (error) {
      console.error('Error fetching pendaftaran:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingPendaftaran) {
      setEditingPendaftaran({ ...editingPendaftaran, [name]: value });
    } else {
      setNewPendaftaran({ ...newPendaftaran, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newPendaftaran.nama || !newPendaftaran.email || !newPendaftaran.noTelepon || !newPendaftaran.eventId || !newPendaftaran.statusPendaftaran) {
      alert('Please fill in all the fields before adding a registration.');
      return;
    }
    try {
      await axios.post('http://localhost:4000/pendaftaran', newPendaftaran); // Ganti dengan endpoint yang sesuai
      setNewPendaftaran({ nama: '', email: '', noTelepon: '', eventId: '', statusPendaftaran: '' });
      fetchPendaftaran(); 
    } catch (error) {
      console.error('Error adding registration:', error);
    }
  };

  const handleEdit = (pendaftaran) => {
    setEditingPendaftaran(pendaftaran);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/pendaftaran/${editingPendaftaran.id}`, editingPendaftaran); // Ganti dengan endpoint yang sesuai
      setEditingPendaftaran(null);
      fetchPendaftaran(); 
    } catch (error) {
      console.error('Error updating registration:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/pendaftaran/${id}`); // Ganti dengan endpoint yang sesuai
      fetchPendaftaran();
    } catch (error) {
      console.error('Error deleting registration:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ backgroundColor: '#2B2D42', height: '100vh' }}>
      <h1 className="text-2xl font-bold mb-4 text-white">Pendaftaran</h1>
      <form onSubmit={handleAdd} className="mb-4">
        <input
          type="text"
          name="nama"
          value={newPendaftaran.nama}
          onChange={handleInputChange}
          placeholder="Nama"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={newPendaftaran.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="noTelepon"
          value={newPendaftaran.noTelepon}
          onChange={handleInputChange}
          placeholder="No Telepon"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="eventId"
          value={newPendaftaran.eventId}
          onChange={handleInputChange}
          placeholder="Event ID"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="statusPendaftaran"
          value={newPendaftaran.statusPendaftaran}
          onChange={handleInputChange}
          placeholder="Status Pendaftaran"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Pendaftaran</button>
      </form>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 rounded-lg">
              <th className="py-2 px-4 border-b rounded-lg">ID</th>
              <th className="py-2 px-4 border-b rounded-lg">Nama</th>
              <th className="py-2 px-4 border-b rounded-lg">Email</th>
              <th className="py-2 px-4 border-b rounded-lg">No Telepon</th>
              <th className="py-2 px-4 border-b rounded-lg">Event ID</th>
              <th className="py-2 px-4 border-b rounded-lg">Status Pendaftaran</th>
              <th className="py-2 px-4 border-b rounded-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendaftaran.map((pendaftaran) => (
              <tr key={pendaftaran.id} className="text-center rounded-lg">
                <td className="py-2 px-4 border-b rounded-lg">{pendaftaran.id}</td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPendaftaran && editingPendaftaran.id === pendaftaran.id ? (
                    <input
                      type="text"
                      name="nama"
                      value={editingPendaftaran.nama}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    pendaftaran.nama
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPendaftaran && editingPendaftaran.id === pendaftaran.id ? (
                    <input
                      type="email"
                      name="email"
                      value={editingPendaftaran.email}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    pendaftaran.email
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPendaftaran && editingPendaftaran.id === pendaftaran.id ? (
                    <input
                      type="text"
                      name="noTelepon"
                      value={editingPendaftaran.noTelepon}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    pendaftaran.noTelepon
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPendaftaran && editingPendaftaran.id === pendaftaran.id ? (
                    <input
                      type="text"
                      name="eventId"
                      value={editingPendaftaran.eventId}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    pendaftaran.eventId
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPendaftaran && editingPendaftaran.id === pendaftaran.id ? (
                    <input
                      type="text"
                      name="statusPendaftaran"
                      value={editingPendaftaran.statusPendaftaran}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    pendaftaran.statusPendaftaran
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPendaftaran && editingPendaftaran.id === pendaftaran.id ? (
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(pendaftaran)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Edit</button>
                  )}
                  <button onClick={() => handleDelete(pendaftaran.id)} className="bg-red-500 text-white px-2 py-1 rounded rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendaftaranList;
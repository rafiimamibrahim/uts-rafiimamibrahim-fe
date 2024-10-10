import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    organizer: '',
    capacity: ''
  });
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/events'); // Ganti dengan endpoint yang sesuai
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, [name]: value });
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.location || !newEvent.organizer || !newEvent.capacity) {
      alert('Please fill in all the fields before adding an event.');
      return;
    }
    try {
      await axios.post('http://localhost:4000/events', newEvent); // Ganti dengan endpoint yang sesuai
      setNewEvent({ title: '', description: '', date: '', location: '', organizer: '', capacity: '' });
      fetchEvents(); 
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/events/${editingEvent.id}`, editingEvent); // Ganti dengan endpoint yang sesuai
      setEditingEvent(null);
      fetchEvents(); 
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/events/${id}`); // Ganti dengan endpoint yang sesuai
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ backgroundColor: '#2B2D42', height: '100vh' }}>
      <h1 className="text-2xl font-bold mb-4 text-white">Events</h1>
      <form onSubmit={handleAdd} className="mb-4">
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="description"
          value={newEvent.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          value={newEvent.location}
          onChange={handleInputChange}
          placeholder="Location"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="organizer"
          value={newEvent.organizer}
          onChange={handleInputChange}
          placeholder="Organizer"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="number"
          name="capacity"
          value={newEvent.capacity}
          onChange={handleInputChange}
          placeholder="Capacity"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Event</button>
      </form>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 rounded-lg">
              <th className="py-2 px-4 border-b rounded-lg">ID</th>
              <th className="py-2 px-4 border-b rounded-lg">Title</th>
              <th className="py-2 px-4 border-b rounded-lg">Description</th>
              <th className="py-2 px-4 border-b rounded-lg">Date</th>
              <th className="py-2 px-4 border-b rounded-lg">Location</th>
              <th className="py-2 px-4 border-b rounded-lg">Organizer</th>
              <th className="py-2 px-4 border-b rounded-lg">Capacity</th>
              <th className="py-2 px-4 border-b rounded-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="text-center rounded-lg">
                <td className="py-2 px-4 border-b rounded-lg">{event.id}</td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingEvent && editingEvent.id === event.id ? (
                    <input
                      type="text"
                      name="title"
                      value={editingEvent.title}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    event.title
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingEvent && editingEvent.id === event.id ? (
                    <input
                      type="text"
                      name="description"
                      value={editingEvent.description}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    event.description
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingEvent && editingEvent.id === event.id ? (
                    <input
                      type="date"
                      name="date"
                      value={editingEvent.date}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    new Date(event.date).toLocaleDateString()
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingEvent && editingEvent.id === event.id ? (
                    <input
                      type="text"
                      name="location"
                      value={editingEvent.location}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    event.location
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingEvent && editingEvent.id === event.id ? (
                    <input
                      type="text"
                      name="organizer"
                      value={editingEvent.organizer}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    event.organizer
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingEvent && editingEvent.id === event.id ? (
                    <input
                      type="number"
                      name="capacity"
                      value={editingEvent.capacity}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    event.capacity
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingEvent && editingEvent.id === event.id ? (
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(event)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Edit</button>
                  )}
                  <button onClick={() => handleDelete(event.id)} className="bg-red-500 text-white px-2 py-1 rounded rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventList;
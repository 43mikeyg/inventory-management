import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, []);

  const addItem = () => {
    axios.post('http://localhost:5000/items', { name, quantity, price })
      .then(response => setItems([...items, response.data]))
      .catch(error => console.error(error));
  };

  return (
    <div className="App">
      <h1>Inventory Management</h1>
      <div>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(Number(e.target.value))} />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name} - {item.quantity} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

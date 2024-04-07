const express = require('express');
const app = express();
app.use(express.json());

let users = [];

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get a specific user
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(user => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Create a new user
app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json(user);
});

// Update a user
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
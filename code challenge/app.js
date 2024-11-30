const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Simulated in-memory database
let products = [];
let users = [{ username: "admin", password: "admin", role: "admin" }, 
             { username: "user", password: "user", role: "user" }];

// Middleware for authentication
const checkAuth = (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.user = user;
    next();
  } else {
    res.redirect('/');
  }
};

// Routes
app.get('/', (req, res) => {
  res.render('index'); // Login page
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  const user = users.find(u => u.username === username);
  if (user.role === "admin") res.redirect('/admin');
  else if (user.role === "user") res.redirect('/user');
});

app.get('/admin', (req, res) => {
  res.render('admin', { products });
});

app.post('/admin/add-product', (req, res) => {
  const { name, id, price, category, mfgDate, expDate } = req.body;
  products.push({ name, id, price, category, mfgDate, expDate });
  res.redirect('/admin');
});

app.get('/user', (req, res) => {
  res.render('user', { products });
});

app.post('/user/search', (req, res) => {
  const { query } = req.body;
  const filteredProducts = products.filter(p => 
    p.name.includes(query) || p.category.includes(query)
  );
  res.render('user', { products: filteredProducts });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

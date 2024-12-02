const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the "public" folder
app.set('view engine', 'ejs');

let products = [
  { 
    name: 'Chair', 
    id: '001', 
    price: 50, 
    category: 'Furniture', 
    mfgDate: '2023-01-01', 
    expDate: '2025-01-01', 
    image: '/images/chair.jpg.jpg'
  },
  { 
    name: 'Laptop', 
    id: '002', 
    price: 999, 
    category: 'Electronics', 
    mfgDate: '2023-05-01', 
    expDate: '2025-05-01', 
    image: '/images/laptop.jpg.jpg'
  }
];

let users = [
  { username: "admin", password: "admin", role: "admin" }, 
  { username: "user", password: "user", role: "user" }
];

// Routes
app.get('/', (req, res) => {
  res.render('welcome'); // Welcome page where users can choose login type
});

app.get('/login/admin', (req, res) => {
  res.render('index', { role: 'admin' }); // Render login page for Admin
});

app.get('/login/user', (req, res) => {
  res.render('index', { role: 'user' }); // Render login page for User
});

app.post('/login', (req, res) => {
  const { username, password, role } = req.body;
  const user = users.find(u => u.username === username && u.password === password && u.role === role);
  
  if (user) {
    if (role === 'admin') {
      res.redirect('/admin');
    } else if (role === 'user') {
      res.redirect('/user');
    }
  } else {
    res.redirect('/');
  }
});

// Admin routes
app.get('/admin', (req, res) => {
  res.render('admin', { products });
});

app.post('/admin/add-product', (req, res) => {
  const { name, id, price, category, mfgDate, expDate } = req.body;
  products.push({ name, id, price, category, mfgDate, expDate });
  res.redirect('/admin');
});

// User routes
app.get('/user', (req, res) => {
  res.render('user', { products });
});

app.post('/user/search', (req, res) => {
  const { query } = req.body;
  
  // Filter products based on the query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  // Render the user page with the filtered products
  res.render('user', { products: filteredProducts });
});

// Logout route
app.post('/logout', (req, res) => {
  res.redirect('/');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

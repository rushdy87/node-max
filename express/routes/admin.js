const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

// admin/add-product => GET because in app.js app.use('/admin', adminRoutes)
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});
// admin/add-product => POST because in app.js app.use('/admin', adminRoutes)
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;

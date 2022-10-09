const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const userId = req.user;
  const product = new Product({ title, imageUrl, description, price, userId });
  product
    .save() //this method from mongoose
    .then((result) => {
      console.log('Create product');
      res.redirect('/admin/products');
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect('/');
  }
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
      });
    })
    .catch((error) => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, imageUrl, description, price } = req.body;

  Product.findById(id)
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.description = description;
      product.price = price;
      return product.save();
    })
    .then((result) => {
      console.log('updated product');
      res.redirect('/');
    })
    .catch((error) => console.log(error));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    // .select('title price -_id') // choose only title and price, don't show _id
    // .populate('userId', 'name') // populate userId, show only name
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Your Products',
        path: '/admin/products',
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postDeleteProduct = (req, res, nex) => {
  const { id } = req.body;
  Product.findByIdAndRemove(id)
    .then(() => {
      console.log('The product was deleted');
      res.redirect('/admin/products');
    })
    .catch((error) => console.log(error));
};

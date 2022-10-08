const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const errorsController = require('./controllers/errors');
// const User = require('./models/user');
const { mongodbPassword } = require('./dev');

const DB_URL = `mongodb+srv://maxNode:${mongodbPassword}@max-node.vwto5y6.mongodb.net/shop?retryWrites=true&w=majority`;
const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('633e64882f4f071225f65317')
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((error) => console.log(error));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404);

mongoose
  .connect(DB_URL)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Listenning to The Port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

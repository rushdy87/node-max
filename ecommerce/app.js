const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const errorsController = require('./controllers/errors');
const User = require('./models/user');
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

app.use((req, res, next) => {
  User.findById('63426d53b0f56d51dc8092e4')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => console.log(error));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404);

mongoose
  .connect(DB_URL)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Admin',
          email: 'admin@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(PORT, () => {
      console.log(`Listenning to The Port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

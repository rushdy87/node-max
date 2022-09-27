const path = require('path');

const express = require('express');

const errorsController = require('./controllers/errors');
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((error) => console.log(error));

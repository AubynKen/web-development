const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product.js');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/farmStand', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.log("Connection to MongoDB failed", err);
    });


const app = express();

const categories = ['fruit', 'vegetable', 'dairy'];

/* Middleware */
app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Routing */
app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', {
        products
    });
});

app.get('/products/new', (req, res) => {
    res.render('products/new', {
        categories
    });
});

app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.render('products/show', {
        product
    });
});

app.get('/products/:id/edit', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.render('products/edit', {
        product
    });
});

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect(`/products/${product._id}`);
});

app.put('/products/:id/edit', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOneAndUpdate(id, req.body, {runValidators: true,});
    res.redirect(`/products/${product._id}`);
});

app.delete('/products/:id', async (req, res) => {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
});

app.listen(3000, () => {
    console.log("Server up and running.");
});
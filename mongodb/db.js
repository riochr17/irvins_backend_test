const db_url = 'mongodb://localhost:27017/irvins_test_c';
const mongoose = require('mongoose');
mongoose.connect(
    db_url, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);

const ProductModel = require('./model/products.schema');

function createProduct(data) {
    return new Promise((resolve, reject) => {
        const _data = new ProductModel(data);
        _data
        .save()
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err.message);
        });
    });
}

function getProduct(id) {
    return new Promise((resolve, reject) => {
        ProductModel
        .findOne({_id: id})
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err.message);
        });
    });
}

function getAllProducts() {
    return new Promise((resolve, reject) => {
        ProductModel
        .find()
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err.message);
        });
    });
}

function updateProduct(id, data) {
    return new Promise((resolve, reject) => {
        ProductModel
        .findOneAndUpdate({
            _id: id
        }, data, {
            new: true,
            runValidators: true
        })
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err.message);
        });
    });
}

function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        ProductModel
        .findOneAndRemove({
            _id: id
        })
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err.message);
        });
    });
}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}

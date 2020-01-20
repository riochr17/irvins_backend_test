
module.exports = (db, app) => {
    app.get     ('/', (request, response) => {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({
            status: 'OK'
        }));
    });

    const productController = require('./controller/product')(db);
    app.get('/products', productController.getAllProduct);
    app.get('/products/:id', productController.getProduct);
    app.post('/products', productController.addProduct);
    app.put('/products/:id', productController.editProduct);
    app.delete('/products/:id', productController.deleteProduct);
}

const resHandler = require('./handler');

module.exports = (db) => {

    function addProduct(request, response) {
        // prepare data
        const data = {
            name: request.body.name,
            price: request.body.price,
            image: "http://s3-ap-southeast-1.amazonaws.com/s3.irvinsaltedegg.com/engineering-test/images/product-1.jpg"
        };
        db.createProduct(data).then(product => {
            resHandler.ok(response, product, 201);
        }).catch(error_message => {
            resHandler.error(response, error_message, 400);
        });
    }

    function getAllProduct(request, response) {
        db.getAllProducts().then(products => {
            resHandler.ok(response, products, 200);
        }).catch(error_message => {
            resHandler.error(response, error_message, 400);
        });
    }

    function getProduct(request, response) {

        if (!request.params.id) {
            const error_message = `id parameter is required`;
            resHandler.error(response, error_message, 400);
            return;
        }

        db.getProduct(request.params.id).then(product => {
            resHandler.ok(response, product, 200);
        }).catch(error_message => {
            resHandler.error(response, error_message, 400);
        });
    }

    function deleteProduct(request, response) {
        if (!request.params.id) {
            const error_message = `id parameter is required`;
            resHandler.error(response, error_message, 400);
        }

        db.deleteProduct(request.params.id).then(product => {
            resHandler.ok(response, [product._id], 200);
        }).catch(error_message => {
            resHandler.error(response, error_message, 400);
        });
    }

    function editProduct(request, response) {
        if (!request.params.id) {
            const error_message = `id parameter is required`;
            resHandler.error(response, error_message, 400);
        }

        db.updateProduct(request.params.id, request.body).then(product => {
            resHandler.ok(response, product, 200);
        }).catch(error_message => {
            resHandler.error(response, error_message, 400);
        });
    }

    return {
        getAllProduct,
        addProduct,
        getProduct,
        deleteProduct,
        editProduct
    }
}
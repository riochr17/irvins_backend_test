const uuidv4 = require('uuid/v4');
const resHandler = require('./handler');

module.exports = (db) => {

    function validateAdd(data) {
        if (!data.name) {
            return "name parameter is required";
        }
        if (!data.price) {
            return "name parameter is required";
        }

        return true;
    }

    function assignProductNewValues(product, data) {
        if (data.name) {
            product.name = data.name;
        }
        if (data.price) {
            product.price = data.price;
        }

        return product;
    }

    function getAllProduct(request, response) {
        const products = db.get('products')
            .value();
        
        resHandler.ok(response, products, 200);
    }

    function addProduct(request, response) {

        const validate_result = validateAdd(request.body);
        if (validate_result !== true) {
            resHandler.error(response, validate_result, 400);
            return;
        }

        // prepare data
        const data = {
            id: uuidv4(),
            name: request.body.name,
            price: request.body.price,
            image: "http://s3-ap-southeast-1.amazonaws.com/s3.irvinsaltedegg.com/engineering-test/images/product-1.jpg"
        };

        // insert data
        db.get('products')
            .unshift(data)
            .write();
        
        resHandler.ok(response, data, 201);
    }

    function getProduct(request, response) {

        if (!request.params.id) {
            const error_message = `id parameter is required`;
            resHandler.error(response, error_message, 400);
            return;
        }

        // data for single collection
        const product = db.get('products')
            .find(x => x.id == request.params.id)
            .value();
        
        if (!product) {
            const error_message = `product id = ${request.params.id} not found`;
            resHandler.error(response, error_message, 404);
            return;
        }

        resHandler.ok(response, product, 200);
    }

    function deleteProduct(request, response) {

        if (!request.params.id) {
            const error_message = `id parameter is required`;
            resHandler.ok(response, error_message, 400);
        }

        // data for single collection
        const product = db.get('products')
            .find(x => x.id == request.params.id)
            .value();
        
        if (!product) {
            const error_message = `product id = ${request.params.id} not found`;
            resHandler.ok(response, error_message, 404);
        }

        // write collection
        db.get('products')
            .remove({id: product.id})
            .write();
        
        resHandler.ok(response, [product.id], 200);
    }

    function editProduct(request, response) {

        if (!request.params.id) {
            const error_message = `id parameter is required`;
            resHandler.ok(response, error_message, 400);
        }

        // data for single collection
        let product = db.get('products')
            .find(x => x.id == request.params.id)
            .value();
        
        if (!product) {
            const error_message = `product id = ${request.params.id} not found`;
            resHandler.ok(response, error_message, 404);
        }

        // write collection
        db.get('products')
            .find(x => x.id == product.id)
            .assign(assignProductNewValues(product, request.body))
            .write();
        
        resHandler.ok(response, product, 200);
    }

    return {
        getAllProduct,
        addProduct,
        getProduct,
        deleteProduct,
        editProduct
    }
}
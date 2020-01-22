//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../index');
const db = require('./../data-manager');
const should = chai.should();
const dbmongo = require('./../mongodb/db');

chai.use(chaiHttp);

//Our parent block
describe('Products', () => {
    const product = { name: "P1", price: 2000 };
    let created_product_id;
    before((done) => {
        dbmongo.getAllProducts();
        db.set('products', []).write();
        done();
    });
    it('it should POST new product', (done) => {
        chai.request(server)
            .post('/products')
            .set('content-type', 'application/json')
            .send(product)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.an('object');
                res.body.should.have.property('data');
                res.body.data.should.be.an('object');
                res.body.data.should.have.property('_id');
                res.body.data.should.have.property('name').eql(product.name);
                res.body.data.should.have.property('price').eql(product.price);
                res.body.data.should.have.property('image');
                created_product_id = res.body.data._id;
                done();
            });
    });
    it('it should GET product', (done) => {
        chai.request(server)
            .get(`/products/${created_product_id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('data');
                res.body.data.should.be.an('object');
                res.body.data.should.have.property('_id');
                res.body.data.should.have.property('name').eql(product.name);
                res.body.data.should.have.property('price').eql(product.price);
                res.body.data.should.have.property('image');
                done();
            });
    });
    it('it should PUT new product name', (done) => {
        let new_name = "aaaaaaaa";
        chai.request(server)
            .put(`/products/${created_product_id}`)
            .set('content-type', 'application/json')
            .send({
                name: new_name
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('data');
                res.body.data.should.be.an('object');
                res.body.data.should.have.property('_id');
                res.body.data.should.have.property('name').eql(new_name);
                res.body.data.should.have.property('price').eql(product.price);
                res.body.data.should.have.property('image');
                done();
            });
    });
    it('it should DELETE product', (done) => {
        chai.request(server)
            .delete(`/products/${created_product_id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.be.a('string').eql(created_product_id);
                done();
            });
    });
});

import chai from 'chai'
import chaiHttp from 'chai-http';
import server from '../src/index';
const should = chai.should();
chai.use(chaiHttp);

import User from '../src/models/user';

describe('Authentication', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
            done();
        });
    });

    var signup = {
        "name": "Rakshan Shetty",
        "email": "shetty.raxx555@gmail.com",
        "password": "Rakshan1"
    }
    var token = ' ';
    it('it should not POST a url without Email field', (done) => {
        chai.request(server).post('/signup').end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.eql('Invalid Email');
            done();
        })
    });
    it('it should post and give token', (done) => {
        chai.request(server).post('/signup').send(signup).end((err, res) => {
            token = res.body.token;
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            done();
        });
    });
    it('it should not allow GET/POST without token', (done) => {
        chai.request(server).get('/').end((err, res) => {
            res.should.have.status(401);
            res.text.should.be.a('string');
            done();
        });
    });
});

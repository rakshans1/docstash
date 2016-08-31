import chai from 'chai'
import chaiHttp from 'chai-http';
import server from '../src/index';

const should = chai.should();

chai.use(chaiHttp);

describe('Shortner', () => {
  var url = {
       url: "http://google.com",
   }
  it('it should not POST a url without url field', (done) => {
     chai.request(server)
     .post('/short')
     .end((err, res) => {
       res.should.have.status(422);
       res.body.should.be.a('object');
       res.body.should.have.property('error');
       res.body.error.should.eql('Invalid Url');
       done();
     })
  });

  it('it should post', (done) => {
     chai.request(server)
     .post('/short')
     .send(url)
     .end((err, res) => {
      const id  = res.body.shortner
      url.url = id.substr(id.length - 8)
       res.should.have.status(200);
       res.body.should.be.a('object');
       res.body.should.have.property('shortner');
       done();
    });
   });
   it('it should redirect', (done) => {
     chai.request(server)
       .get(`/s/${url.url}`)
       .end((err, res) => {
         res.should.have.status(200);
         done();
       });
   });
});

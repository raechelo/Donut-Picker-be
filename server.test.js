const request = require('supertest');
const app = require('./server.js');
const bodyParser = require("body-parser")
const environment = process.env.NODE_ENV || 'test';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


describe('Server', () => {

app.use(bodyParser.json())

  beforeEach(async() => {
    await database.seed.run()
    app.use(bodyParser.json())
  })

 describe('GET /palettes', () => {

  it('should return all the palettes in the database', async () => {
    const expectedPalettes = await database('palettes').select();
    // console.log('exptected palettes', expectedPalettes)
    const res = await request(app).get('/api/v1/palettes/');
    console.log('res.body', res.body)
    const palettes = res.body;
    
    expect(palettes).toEqual(expectedPalettes);
  });
 });

 describe('GET /projects', () => {

  it('should return all the projects in the database', async () => {
    const expectedProjects = await database('projects').select();
    const res = await request(app).get('/api/v1/projects');
    const projects = res.body;

    expect(projects).toEqual(expectedProjects);
  });
 });
 
});

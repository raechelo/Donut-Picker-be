const request = require('supertest');
const app = require('./server.js');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


describe('Server', () => {


  beforeEach(async() => {
    await database.seed.run()
  })

  describe('GET /palettes', () => {

    it('should return all the palettes in the database', async () => {
      const expectedPalettes = await database('palettes').select();
      const res = await request(app).get('/api/v1/palettes');
      const palettes = res.body.name;
      
      expect(palettes).toEqual(expectedPalettes.name);
    });
 });

  describe('GET /projects', () => {

    it('should return all the projects in the database', async () => {
      const expectedProjects = await database('projects').select();
      const res = await request(app).get('/api/v1/projects');
      const projects = res.body.name;

      expect(projects).toEqual(expectedProjects.name);
    });
 });

  describe('GET /projects/:id', () => { 

    it('should get a single project from the database', async () => {
      const expectedProject = await database('projects').first();
      const id = expectedProject.id;
      const res = await request(app).get(`/api/v1/projects/${id}`);
      const result = res.body[0].name;
      expect(result).toEqual(expectedProject.name);
      });
  });

  describe('GET /palettes/:id', () => {

    it('should get a single palette from the database', async () => {
      const expectedPalette = await database('palettes').first();
      const id = expectedPalette.id;
      const res = await request(app).get(`/api/v1/palettes/${id}`);
      const result = res.body[0].name;
      expect(result).toEqual(expectedPalette.name);
    });
  });

  describe('POST /projects', () => {

    it('should post a new project to the database', async () => {
      const newProject = { name: 'sweets project' }
      const res = await request(app).post('/api/v1/projects').send(newProject)
      const projects = await database('projects').where('id', res.body.id).select()
      const project = projects[0]
      expect(res.status).toBe(201)
      expect(project.name).toEqual(newProject.name)
    });
  });

  describe('POST /palettes', () => {

  });

  describe('PUT /projects', () => {

    it('should update an existing project in the database', async () => {
      let projectToUpdate = await database('projects').first();
      const id = projectToUpdate.id;
      const name = 'Sweets Project';
      projectToUpdate = { ...projectToUpdate, name };

      const res = await request(app).put(`/api/v1/projects/${id}`);
      const project = await database('projects').where({ id: id }).first();
      expect(projectToUpdate.name).toEqual(name);
    });
  });

  describe('PUT /palettes', () => {

    it('should update an existing palettes in the database', async () => {
      let paletteToUpdate = await database('palettes').first()
      const id = paletteToUpdate.id;
      const name = 'Bubblegum Palette';
      paletteToUpdate = { ...paletteToUpdate, name };
      const res = await(app).put(`/api/v1/palettes/${id}`)
      const palette = await database('palettes').where({ id: id }).first();
      expect(paletteToUpdate.name).toEqual(name);
    });
  });


 
});

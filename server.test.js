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

    it('should post a new palette to the database', async () => {
      const newPalette = { name: 'Earth Tones',   color_1: '#FFD289', color_2: '#9B8816', color_3: '#9C6103', color_4: '#F98948', color_5: '#97CC04', color_6: '#729EA1' };
      const res = await request(app).post(`/api/v1/palettes`).send(newPalette);
      const palettes = await database('palettes').where('id', res.body.id).select();
      const palette = palettes[0];
      expect(res.status).toBe(201);
      expect(palette.name).toEqual(newPalette.name);
    })
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

  describe('DELETE /projects', () => {

    it.skip('should delete an existing project from the database', async () => {
      const project = await database('projects').first();
      const id = project.id;
      const res = await request(app).delete(`/api/v1/projects/${id}`);
      const deletedProject = database('projects').where({id:id})
      expect(deletedProject).toEqual(undefined);
    });
  });

  it.skip('should return the proper status code if there is no project with that id in the database', async () => {
    const res = await request(app).delete(`/api/v1/projects/10000`);
    const error = {error: `A project with that id does not exist, try again`};
    expect(res.status).toBe(422);
    expect(res.body).toBe(error)
  });

  describe('DELETE /palettes', () => {

    it.skip('should delete an existing palette from the database', async () => {
      const palette = await database('palettes').first();
      const id = palette.id;
      const res = await request(app).delete(`/api/v1/palettes/${id}`);
      const deletedPalette = database('palettes').where({id:id})
      expect(deletedPalette).toEqual(undefined);
      expect(res.status).toBe(204);
    });

    it('should return the proper status code is there is no palette with that id in the database', async () => {
      const res = await request(app).delete(`/api/v1/palettes/10000`);
      const error = 'Error! Could not delete, a palette with that id does not exist.';
      expect(res.status).toBe(422);
      expect(res.body).toBe(error);
    });
  });

 
});

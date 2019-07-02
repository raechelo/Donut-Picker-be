const projectsData = require('../data');

const createproject = (knex, project) => {
  return knex('projects').insert({
    name: project.name
  }, 'id')
  .then(projectId => {
    let palettePromises = [];
      project.palettes.forEach(palette => {
      palettePromises.push(
        createpalette(knex, {
          ...palette,
          projectId
        })
      )
    });
    return Promise.all(palettePromises);
  })
};

const createpalette = (knex, palette) => {
  return knex('palettes').insert({
    name: palette.name,
    color_1: palette.color_1,
    color_2: palette.color_2,
    color_3: palette.color_3,
    color_4: palette.color_4,
    color_5: palette.color_5,
    color_6: palette.color_6,
  
  });
};

exports.seed = (knex) => {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      let projectPromises = [];
      projectsData.forEach(project => {
        projectPromises.push(createproject(knex, project));
      });

      return Promise.all(projectPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
}; 
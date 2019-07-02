const projectsData = require("../data");

const createProjects = (knex, project) => {
  return knex("projects").insert(
    {
      name: project.name
    },
    "id"
  );
};

exports.seed = knex => {
  return knex("projects")
    .del()
    .then(() => {
      let projectPromises = [];
      projectsData.forEach(project => {
        projectPromises.push(createProjects(knex, project));
      });

      return Promise.all(projectPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};

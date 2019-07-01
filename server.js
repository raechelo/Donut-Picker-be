const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3001);

app.get('/api/v1/palettes', (req, res) => {
  database('palettes').select()
    .then(palettes => {
      res.status(200).json(palettes);
    })
    .catch(error => {
      res.status(500).json(`Sorry! There are currently no palettes available.`)
    });
});

app.get('/api/v1/palettes/:id', (req, res) => {
  database('palettes').where('id', req.params.id).select()
    .then(palettes => {
      if (palettes.length) res.status(200).json(palettes)
      else res.status(404).json({
        error: `Error! Could not find a palette with that id.`
      })
    })
    .catch(error => {
      res.status(500).json({error})
    })
})

app.get('/api/v1/projects', (req, res) => {
  database('projects').select()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json(`Sorry! There are currently no projects available.`)
    })
})

app.get('/api/v1/projects:/id', (req, res) => {
  databse('projects').where('id', req.params.id).select()
    .then(projects => {
      if (projects.length) res.status(200).json(projects)
      else res.status(500).json({
        error: `Error! Could not find project with that id`
      })
    })
})

app.listen(app.get('port'), () => {
  console.log(`🚀 App is running at http://localhost:${app.get('port')}`)
});
const express = require("express");
const bodyParser = require("body-parser")
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);
const app = express();
const PORT = process.env.PORT || 3001;


app.set('port', PORT);

app.use(bodyParser.json())

app.listen(app.get('port'), () => {
  console.log(`🚀 App is running at http://localhost:${app.get('port')}`)
});

app.get('/api/v1/palettes', (req, res) => {
  database('palettes').select()
    .then(palettes => {
      res.status(200).json(palettes);
    })
    .catch(error => {
      res.status(500).json({error})
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
      res.status(500).json({error})
    })
})

app.get('/api/v1/projects/:id', (req, res) => {
  database('projects').where('id', req.params.id).select()
    .then(projects => {
      if (projects.length) res.status(200).json(projects)
      else res.status(500).json({error})
    })
})

app.post('/api/v1/projects', (req, res) => {
  const project = req.body
  for (let requiredParam of ['name']){
    if(!project[requiredParam]){
      return res.status(422).send('nope')
    }
  }
  database('projects').insert(project, "id").then(project => {
    res.status(201).json({id: project[0]})
  })
})

app.post('/api/v1/palettes', (req, res) => {
  const palette = req.body
  for (let requiredParam of ['name', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5', 'color_6']) {
    if (!palette[requiredParam]) {
      return res.status(422).json(`Error! Required format of Name:<String> and Color:<String>. You're missing a required field of ${requiredParam}`)
    }
  }
  database('palettes').insert(palette, 'id').then(palette => {
    res.status(201).json({id: palette.id})
  })
})


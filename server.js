const express = require("express");
const bodyParser = require("body-parser")
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
app.set('port', PORT);
app.use(cors());
app.use(bodyParser.json())

app.listen(app.get('port'), () => {
  console.log(`🚀 App is running at http://localhost:${app.get('port')}`)
});

app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then(palettes => {
      response.status(200).json(palettes);
    })
    .catch(error => {
      response.status(500).json({error})
    });
});

app.get('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).select()
    .then(palettes => {
      if (palettes.length) response.status(200).json(palettes)
      else response.status(404).json({
        error: `Error! Could not find a palette with that id.`
      })
    })
    .catch(error => {
      response.status(500).json({error})
    })
})

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then(projects => {
      response.status(200).json(projects);
    })
    .catch(error => {
      response.status(500).json({error})
    })
})

app.get('/api/v1/projects/:id', (request, response) => {
  database('projects').where('id', request.params.id).select()
    .then(project => {
      if (project.length) response.status(200).json(project)
      else response.status(500).json({error})
    })
})

app.post('/api/v1/projects', (request, response) => {
  const project = request.body
  for (let requiredParam of ['name']){
    if(!project[requiredParam]){
      return response.status(422).send(`Error! required format of Name:<String>. You're missing a required field of ${requiredParam}`)
    }
  }
  database('projects').insert(project, "id").then(project => {
    response.status(201).json({id: project[0]})
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
    res.status(201).json({id: palette[0]})
  })
})


app.delete('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).delete()
    .then(palette => {
      if (!palette) response.status(422).json('Error! Could not delete, a palette with that id does not exist.')
      else response.status(200).json('Successfully deleted palette.')
    })
    .catch(error => {
      return response.status(500).json({error})
    })
})

app.put('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  const updatedPalette = request.body;

  database('palettes').where({ id })
  .update({ ...updatedPalette }, 'id')
  .then((id) => {
    if (!id.length) {
      response.status(404).json({ 
        error: 'Failed to update: Palette does not exist' 
      });
    } else response.status(200).send('Updated Palette!');
  })
  .catch(error => response.status(500).json({ error }))  
})


app.delete('/api/v1/projects/:id', (request, response) => { 
  const { id } = request.body;
  if (!id) return response.status(422).json({ error: `A project with that id does not exist, try again`}); 
  database('palettes').where('project_id', id).del() 
  .then(() => database('projects').where('id', id).del()) 
  .then(() => response.status(204).json(`A project with id of: ${id}, has been deleted, along with its associated palettes.`))  
  .catch(error => response.status(500).json({ error })); 
})

app.put('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params;
  const { name } = request.body;

  database('projects').where({ id }).update({ name }, 'id')
  .then((id) => {
    if (!id.length) {
      response.status(404).json({ 
        error: 'Failed to update: Project does not exist' 
      });
    } else response.status(202).send('Project updated!');
  })
  .catch(error => response.status(500).json({ error }))  

})


module.exports = app;
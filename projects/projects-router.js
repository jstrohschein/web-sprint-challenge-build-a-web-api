const express = require('express')
const router = express.Router()
const projects = require('../data/helpers/projectModel')
const { check, validationResult } = require('express-validator')
const shortid = require('shortid')


/**
 project = {
   id: 89898,
   name: '',
   description : '',
   completed: false
 }
 */


/***************** CREATE ****************************/
router.post('/', [

  check('name').isLength({ min: 1 }),
  check('description').isLength({ min: 1 })

],(req, res) => {

  const errors = validationResult(req)

  if(!errors.isEmpty()){
    res.status(400).json({ message: "Please provide a name and a description for the project" })
  }

  else{
    const project = req.body
    project.id = shortid.generate()
    projects.insert(project)
    res.status(201).json(project)
  }

})

/***************** READ ******************************/
router.get('/', (req, res) => {
  res.status(200).json(projects)
})

router.get('/:id', (req, res) => {
  const {id} = req.params
  const project = projects.get(id)

  if(project){
    res.status(200).json(project)
  }

  else{
    res.status(404).json({ message: 'The project with the specified ID does not exist' })
  }
})


/***************** UPDATE ******************************/

router.put('/:id', [
  check('id').isLength({ mid: 1 })
],(req, res) => {

  if(!errors.isEmpty()){
    res.status(400).json({ message: 'Please provide an id' })
  }

  else{
    const {id} = req.params
    const changes = req.body
    const project = projects.get(id)

    if(project){
      projects.update(id, changes)
      res.status(200).json({ message: `Project ${id} successfully updated` })
    }

    else{
      res.status(404).json({ message: `Project ${id} not found` })
    }
    
  }
  
})


/***************** DELETE ******************************/
router.delete('/:id', (req, res) => {
  const {id} = req.params
  const deleteItem = projects.get(id)

  if(deleteItem) {
    projects.remove(id)
    res.status(200).json({ message: `Project ${id} successfully removed` })
  }

  else{
    res.status(404).json({ message: `Could not find project ${id}` })
  }

})
















module.exports = router
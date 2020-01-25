//IMPORTS
const express = require('express');
const Db = require('./data/helpers/projectModel')
const ActionDb = require('./data/helpers/actionModel')
const router = express.Router();

//GET
router.get('/', (req,res)=> {
Db.get()
.then(projects => {
    res.status(200).json(projects);
})
.catch(err => {
    res.status(500).json({ message: "Projects could not be retrieved at this moment.", err })
})
})

router.get('/:id', (req,res)=> {
    Db.get(req.params.id)
    .then(projects => {
        if(projects) {
            res.status(200).json(projects)
        }
        else {
            res.status(404).json({ message: `The project with specified id, ${req.params.id} does not exist.`})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Project information could not be retrieved.", err })
    })
})

router.get('/:id/actions', (req, res)=> {
    ActionDb.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.status(500).json({ message: "Actions could not be retrieved at this moment.", err })
    })
})

//ADD
router.post('/', (req,res)=> {
    const projectDes = req.body
    Db.insert(projectDes)
    .then(projects => {
        if (!projectDes.name || !projectDes.description) {
            res.status(400).json({ message: "Enter name and description for this project." })
        }
        else {
            res.status(201).json(projects)
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Project could not be created.", err })
    })
})

router.post('/:id/actions', (req,res)=> {
    const actionDes = req.body
    actionDes.project_id = req.params.id
    ActionDb.insert(actionDes)
    .then(projects => {
        if (!actionDes.project_id || !actionDes.notes || !actionDes.description) {
            res.status(400).json({ message: "Enter project Id, notes and description for this project." })
        }
        else {
            res.status(201).json(projects)
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Project could not be created.", err })
    })

})

//UPDATE
router.put('/:id', (req,res)=> {
    const changes = req.body
    Db.update(req.params.id, changes)
    .then(projects => {
        if(!projects) {
            res.status(404).json({ message: `This project with the specific id, ${req.params.id} does not exist.` })
        }
        else if(!changes.name || !changes.description) {
            res.status(400).json({ errorMessage: "Please provide name and description." })
        }
        else {
            res.status(200).json(projects)
        }
    })
    .catch(err => {
        res.status(500).json({ message: "This project could not be updated.", err })
    })
})

router.put('/:id/actions/:id', (req,res)=> {
    const actionChanges = req.body
    ActionDb.update(req.params.id, actionChanges)
    .then(actions => {
        if(!actions) {
            res.status(404).json({ message: `This project with the specific id, ${req.params.id} does not exist.` })
        }
        else if(!actionChanges.project_id || !actionChanges.description || !actionChanges.notes) {
            res.status(400).json({ errorMessage: "Please provide project id, description, and notes." })
        }
        else {
            res.status(200).json(actions)
        }
    })
    .catch(err => {
        res.status(500).json({ message: "This project could not be updated.", err })
    })
})

//DELETE
router.delete('/:id', (req,res)=> {
    Db.remove(req.params.id)
    .then(projects => {
        if(!projects) {
            res.status(404).json({ message: `The project with the specified ID, ${req.params.id} does not exist.` })
        }
        else {
            res.status(200).json({ message: "The project has been removed."})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The project could not be removed", err })
    })
})

router.delete('/:id/actions/:id', (req,res)=> {
    ActionDb.remove(req.params.id)
    .then(actions => {
        if(!actions) {
            res.status(404).json({ message: `The action with the specified ID, ${req.params.id} does not exist.` })
        }
        else {
            res.status(200).json({ message: "The action has been removed."})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The action could not be removed", err })
    })
})

//EXPORT
module.exports = router
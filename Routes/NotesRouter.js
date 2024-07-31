const express= require('express')
const router = express.Router();
const notesController = require("../Controllers/NotesController");

const ROUTE_NAME = "notes";

// index
router.get('/', (request, response, next) => {
    notesController.index(request, response, next)
})

// show
router.get('/:id', (request, response, next) => {
    notesController.show(request, response, next)
})

// store
router.post('/', (request, response ,next) => {
    notesController.store(request, response, next)
})

// update
router.patch('/:id', (request, response ,next) => {
    notesController.update(request, response, next)
})

// delete
router.delete('/:id', (request, response ,next) => {
    notesController.destroy(request, response, next)
})

module.exports.router = router
module.exports.ROUTE_NAME = ROUTE_NAME


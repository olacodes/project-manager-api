const express = require('express');
const ProjectController = require('../../controllers/projects/projectController')


const router = express.Router();

router.route('/')
.get(ProjectController.getAllProjects)
.post(ProjectController.createProject)

router.route('/:id').get(ProjectController.getAProject)

module.exports = router

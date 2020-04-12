const express = require('express');
const ProjectController = require('../../controllers/projects/projectController')


const router = express.Router();

router.route('/')
.get(ProjectController.getAllProjects)
.post(ProjectController.createProject)

router.route('/:id').get(ProjectController.getAProject)
router.route('/adduser').post(ProjectController.addUserToProject)
router.route('/group-project/:id').get(ProjectController.getProjectWithUsers)

module.exports = router

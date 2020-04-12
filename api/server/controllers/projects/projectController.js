const ProjectService = require("../../Services/projectService");
const Util = require("../../utils/utils");

const util = new Util();

class ProjectControllers {
  /**
   *  Get all projects from the database
   * @param { Void } req
   * @param { Void } res
   * @return { object } - All available Projects
   */

  static async getAllProjects(req, res) {
    try {
      const allProjects = await ProjectService.getAllProjects();

      if (allProjects.length > 0) {
        util.setSuccess(200, "projects successfully retrieved", allProjects);
      } else {
        util.setSuccess(200, "No project found");
      }

      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  /**
   * Get A project from the database
   * @param { void } res
   * @param { Object } req -  The Project ID
   * @returns { Object } - A project
   */

  static async getAProject(req, res) {
    const { id } = req.params;
    
    if (!Number(id)) {
      util.setError(400, "provide an id of the project");
      util.send(res)
    } else {
      try {
        const project = await ProjectService.getProject(id);

        if (!project) {
          util.setError(404, "Project Not Found");
        } else {
          util.setSuccess(200, "success", project);
        }
        return util.send(res);
      } catch (error) {
        util.setError(400, error);
        return util.send(res);
      }
    }
    return util.send(res);
  }

  /**
   * Create a new Project
   * @param { Object } req - An object that contains Project information
   * @param { Object } res
   * @returns { Object } - A success or Error message and status
   */

  static async createProject(req, res) {
    const { projectName, createdBy } = req.body;

    try {
      if (!projectName && !createdBy) {
        util.setError(
          400,
          "Project name cannot be empty or createdBy (to be deleted)"
        );
      } else {
        const newProject = await ProjectService.createProject(req.body);
        util.setSuccess(201, "Project successfully created", newProject);
      }

      util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = ProjectControllers;

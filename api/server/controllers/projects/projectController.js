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
      util.send(res);
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
        util.setError(400, "Project name cannot be empty");
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

  /**
   * Add a User to an existing project
   * @param { Object } req - object containing userId and projectId
   * @param {*} res
   * @returns { Object } - success message or error message
   */

  static async addUserToProject(req, res) {
    const { userId, projectId } = req.body;

    if (!userId && !projectId) {
      util.setError(400, "User or project cannot be empty");
      return util.send(res);
    }
    try {
      const project = await ProjectService.getProject(projectId * 1);
      if (!project) {
        util.setError(400, "invalid project id");
        return util.send(res);
      }

      // check if user exist
      const projectUser = await project.addUser([userId]);
      const userPro = await project.getUser();
      console.log(userPro);

      util.setSuccess(
        200,
        "user successfully added to the project",
        projectUser
      );
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  /**
   * Get Project with all the users or contributor
   * @param { void } req
   * @param { void } res
   * @returns { Object } - object that contains a project and array or users
   */

  static async getProjectWithUsers(req, res) {
    const { id } = req.params;
    try {
      const groupProject = await ProjectService.getProjectWithUser(id);
      util.setSuccess(
        200,
        "project successfully retrieved with users",
        groupProject
      );
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = ProjectControllers;

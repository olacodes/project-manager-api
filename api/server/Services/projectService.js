const DB = require("../src/models");

class ProjectService {
  /**
   * Get all project
   * @returns { Object } projects Object or empty Object if no project found
   */
  static async getAllProjects() {
    try {
      const projects = await DB.Project.findAll();
      return projects;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new Project and save to database
   * @param { Object } newProject - { projectName: " ", projectDescription: " " }
   * @returns { object } new project
   */

  static async createProject(newProject) {
    try {
      return await DB.Project.create(newProject);
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {} id
   */

  static async getProject(id) {
    try {
      const project = await DB.Project.findOne({
        where: { id },
      });
      return project;
    } catch (error) {
      throw error;
    }
  }

  static async getProjectWithUser(id) {
    try {
      const projectWithUser = await DB.Project.findAll({
        where: { id },
        include: { model: DB.User, required: true, as: "user" },
      });

      return projectWithUser;
    } catch (error) {
      throw error;
    }
  }

  static async getUserProjects(id) {
    try {
      const userProject = await DB.User.findAll({
        where: { id },
        include: { model: DB.Project, required: true, as: "project" },
      });

      return userProject;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProjectService;

const DB = require("../src/models");

class ProjectService {
  static async getAllProjects() {
    try {        
      const projects =  await DB.Project.findAll();      
      return projects
    } catch (error) {
      throw error;
    }
  }

  static async createProject(newProject) {
    try {
      return await DB.Project.create(newProject);
    } catch (error) {
      throw error;
    }
  }

  static async getProject(id) {
    try {
        console.log('tuiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
        
      const project = await DB.Project.find({
        include: [
          {
            model: User,
            as: "users",
            required: false,
            attributes: ["id", "username", "email"],
            through: { 
                model: GroupProduct,
                as: 'groupProjects',
                attributes: [] 
            },
          },
        ],
        where: { id },
      });
      console.log(project);
      return project
      
    } catch (error) {
        console.log(error);
        
        throw error
    }
  }
}

module.exports = ProjectService;

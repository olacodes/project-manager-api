const DB = require('../src/models')
const AppError = require('../error/appError')


class UserService {
    static async getAllUsers() {
        try {
            return await DB.User.findAll()
        } catch (error) {
            throw error
        }
    }

    static async createUser(newUser) {
        try {
            return await DB.User.create(newUser)
        } catch (error) {
            throw error
        }
    }

    static async updateUser(id, updateUser){
        try {
            const userToUpdate = await DB.User.findOne({ where: { id: Number(id) } })

            if (userToUpdate) {
                await DB.User.update(updateUser, { where: {id: Number(id) } })
                return updateUser
            }
            return AppError('User not found', 404, 'Not found')
            
        } 
        catch (error) {
            throw error;
        }
    }

    static async getAUser(id) {
        try {
            const aUser = await DB.User.findOne({ where: { id: Number(id) } })
            if (!aUser) {
                return new AppError('User not found', 404, 'Not found')
            }
            return aUser
        } 
        catch (error) {
            throw error
        }
    }

    static async deleteUser(id){
        try {
            const userToDelete = await DB.User.findOne({ where: { id: Number(id) } })

            if (userToDelete) {
                await DB.User.destroy({ where: {id: Number(id) } })
                return userToDelete
            }
            return new AppError('User not found', 404, 'Not found')
        } 
        catch (error) {
            throw error;
        }
    }
}

module.exports = UserService
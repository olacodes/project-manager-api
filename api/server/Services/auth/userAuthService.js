const DB = require('../../src/models')
const AppError = require('../../error/appError')


class userAuthService {
    static async userLoginService() {
        try {
            
        } catch (error) {
            
        }
    }

    static async userRegisterService() {
        try {
            
        } catch (error) {
            
        }
    }

    static async userLogoutService() {
        try {
            
        } catch (error) {
            
        }
    }

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
}
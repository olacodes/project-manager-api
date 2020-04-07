const supertest = require('supertest');
const app = require('../../app')

describe("Testing the movies API", () => {

	it("tests the base route and returns true for status", async () => {

		const response = await supertest(app).get('/');

		expect(response.status).toBe(200);
		expect(response.body.status).toBe("success");

	});

});
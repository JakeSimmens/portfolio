const testServer = require("../index");
const request = require("supertest");

describe("index.js server", ()=>{
    afterAll(done => {
        testServer.server.close();
        done();
    });

    it("should start server", async () => {
        await request(testServer)
            .get("/")
            .expect(200);
    });
});
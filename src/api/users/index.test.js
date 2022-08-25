const config = require("../../../config");
const handlers = require("./index");

describe("Endpoints", () => {
  describe("Users", () => {
    describe("Get method", () => {
      it("return to user json", async () => {
        const axiosMock = {
          get: jest.fn().mockResolvedValue({ data: 1 }),
        };
        const res = {
          status: jest.fn().mockReturnThis(), // here need that return the same object. in this case, res. For that reason we use mockReturnThis()
          send: jest.fn(), // we need only to spy this. we don't need that return a specific value
        };

        await handlers({ config, axios: axiosMock }).get({}, res);

        /*
          In this case we need to validate that:

          - status: must be called called with 200
          - send: must be called called with 1
        */
        // Here we only use Spy. Checking that only status & send function were called with specific params
        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([[1]]);
        // here we are checking that axios.get was called with the right url (url set in config object)
        expect(axiosMock.get.mock.calls).toEqual([
          [`${config.ApiBaseURL}/users`],
        ]);
      });
    });
    describe("Post method", () => {
      it("create a resource", async () => {
        const axiosMock = {
          post: jest.fn().mockResolvedValue({ data: 1 }),
        };
        const res = {
          status: jest.fn().mockReturnThis(), // here need that return the same object. in this case, res. For that reason we use mockReturnThis()
          send: jest.fn(), // we need only to spy this. we don't need that return a specific value
        };
        const req = {
          body: "request body",
        };

        await handlers({ config, axios: axiosMock }).post(req, res);
        expect(res.status.mock.calls).toEqual([[201]]);
        expect(res.send.mock.calls).toEqual([[1]]);
        // here we are checking that axios.post was called with the right url (url set in config object)
        expect(axiosMock.post.mock.calls).toEqual([
          [`${config.ApiBaseURL}/users`, req.body],
        ]);
      });
    });
    describe("Put method", () => {
      it("update a resource", async () => {
        const axiosMock = {
          put: jest.fn().mockResolvedValue({ data: 1 }),
        };
        const res = {
          sendStatus: jest.fn(),
        };
        const req = {
          body: "request body",
          params: {
            id: 12,
          },
        };

        await handlers({ config, axios: axiosMock }).put(req, res);

        // here we are checking that axios.post was called with the right url (url set in config object)
        expect(axiosMock.put.mock.calls).toEqual([
          [`${config.ApiBaseURL}/users/12`, req.body],
        ]);
        expect(res.sendStatus.mock.calls).toEqual([[204]]);
      });
    });
    describe("Delete method", () => {
      it("update a resource", async () => {
        const axiosMock = {
          delete: jest.fn(),
        };
        const res = {
          sendStatus: jest.fn(),
        };
        const req = {
          params: {
            id: 54,
          },
        };

        await handlers({ config, axios: axiosMock }).delete(req, res);

        // here we are checking that axios.post was called with the right url (url set in config object)
        expect(axiosMock.delete.mock.calls).toEqual([
          [`${config.ApiBaseURL}/users/54`, req.body],
        ]);
        expect(res.sendStatus.mock.calls).toEqual([[204]]);
      });
    });
  });
});

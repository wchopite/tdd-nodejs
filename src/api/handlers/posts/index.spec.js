const config = require("../../../../config");
const postHandlers = require("./index");

describe("Endpoints", () => {
  describe("Post", () => {
    it("should create a post", async () => {
      const mockUsers = [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ];
      const post = {
        userId: 1,
        id: 1,
        title: "Titulo",
        body: "Cuerpo del post",
      };

      const req = {
        body: post,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const axios = {
        get: jest.fn().mockResolvedValue({ data: mockUsers }),
        post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
      };

      await postHandlers({ config, axios }).post(req, res);

      expect(res.status.mock.calls).toEqual([[201]]);
      expect(res.send.mock.calls).toEqual([[{ id: 1000 }]]);
      expect(axios.get.mock.calls).toEqual([[`${config.ApiBaseURL}/users`]]);
      expect(axios.post.mock.calls).toEqual([
        [`${config.ApiBaseURL}/posts`, post],
      ]);
    });
    it("should not create if userId doesn't exist", async () => {
      const mockUsers = [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ];
      const post = {
        userId: 3,
        title: "Titulo",
        body: "Cuerpo del post",
      };

      const req = {
        body: post,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        sendStatus: jest.fn(),
      };
      const axios = {
        get: jest.fn().mockResolvedValue({ data: mockUsers }),
        post: jest.fn(),
      };

      await postHandlers({ config, axios }).post(req, res);

      expect(axios.post.mock.calls).toEqual([]);
      expect(res.sendStatus.mock.calls).toEqual([[400]]);
    });
  });
});

const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("inspection service", async () => {
  let thisService;
  let inspectionCreated;
  let usersServiceResults;
  let users;

  const highwaysCreated = await app.service("highways").Model.create({"highway":"parentObjectId","name":"new value"});

  beforeEach(async () => {
    thisService = await app.service("inspection");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (inspection)");
  });

  describe("#create", () => {
    const options = {"highway":`${highwaysCreated._id}`,"name":"new value"};

    beforeEach(async () => {
      inspectionCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new inspection", () => {
      assert.strictEqual(inspectionCreated.highway.toString(), options.highway.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a inspection by ID", async () => {
      const retrieved = await thisService.Model.findById(inspectionCreated._id);
      assert.strictEqual(retrieved._id.toString(), inspectionCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"highway":`${highwaysCreated._id}`};

    it("should update an existing inspection ", async () => {
      const inspectionUpdated = await thisService.Model.findByIdAndUpdate(
        inspectionCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(inspectionUpdated.highway.toString(), options.highway.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a inspection", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("highways").Model.findByIdAndDelete(highwaysCreated._id);;

      const inspectionDeleted = await thisService.Model.findByIdAndDelete(inspectionCreated._id);
      assert.strictEqual(inspectionDeleted._id.toString(), inspectionCreated._id.toString());
    });
  });
});
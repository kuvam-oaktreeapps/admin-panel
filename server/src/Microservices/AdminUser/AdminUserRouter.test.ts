import chai, { expect } from "chai";
import * as sinon from "sinon";
import { faker } from "@faker-js/faker";
import chaiHttp from "chai-http";
import sinonTest from "sinon-test";
import express from "express";
import request from "superagent";
const test = sinonTest(sinon);
chai.use(chaiHttp);

import { AdminUserRouter } from "./AdminUserRouter";
import {
  AdminUserModel,
  IAdminUserEntity,
} from "../../Database/Entities/AdminUserEntity";
import { ApiUnitTestUtils } from "../../UnitTestUtils/ApiUnitTestUtil";
import { FakeModels } from "../../UnitTestUtils/FakeModels";
import { UnitTestHelper } from "../../UnitTestUtils/UnitTestHelper";
import { AdminUserLoginDto, AdminUserRegisterDto } from "./AdminUser.dto";
import { PasswordUtil } from "../../Security/PasswordUtil";

describe("AdminUserRouter Integration Test", () => {
  let api: ApiUnitTestUtils;
  let app: express.Application;
  let fakeModel: FakeModels;
  let adminUser: IAdminUserEntity;
  before(async () => {
    api = new ApiUnitTestUtils();
    app = await api.getApp(AdminUserRouter);
    fakeModel = new FakeModels();
    adminUser = fakeModel.adminUser();
  });

  describe("Register Admin API", () => {
    let request: () => request.SuperAgentRequest;
    let body: AdminUserRegisterDto;
    before(async () => {
      request = () => chai.request(app).post("/register");
      body = {
        emailId: faker.internet.email(),
        password: faker.internet.password(),
        userName: faker.internet.userName(),
      };
    });

    it("register Bad Request", async () => {
      api.assertBadRequest(await request().send({ ...body, emailId: "" }));
      api.assertBadRequest(await request().send({ ...body, password: "" }));
      api.assertBadRequest(await request().send({ ...body, userName: "" }));
    });

    it(
      "register Email Already Exists",
      test(async function (this: sinon.SinonStatic) {
        const findOne = this.stub(AdminUserModel(), "findOne").resolves({});
        const response = await request().send(body);
        expect(response.body.message).to.equal("This email already exists");
        expect(response.status).to.equal(400);
        expect(sinon.assert.calledOnce(findOne));
      })
    );

    it(
      "register Success",
      test(async function (this: sinon.SinonStatic) {
        const adminFindOne = this.stub(AdminUserModel(), "findOne").resolves(
          null
        );

        const adminSave = UnitTestHelper.mockSave(this.stub, AdminUserModel());

        const response = await request().send(body);
        api.assertSuccessResponse(response);

        expect(sinon.assert.calledOnce(adminFindOne));
        expect(sinon.assert.calledOnce(adminSave));
      })
    );
  });

  describe("Login Admin API", () => {
    let request: () => request.SuperAgentRequest;
    let body: AdminUserLoginDto;
    before(async () => {
      request = () => chai.request(app).post("/login");
      body = {
        emailId: adminUser.emailId,
        password: faker.internet.password(),
      };
    });

    it("Bad Request", async () => {
      api.assertBadRequest(await request().send({}));
      api.assertBadRequest(await request().send({ ...body, emailId: "" }));
      api.assertBadRequest(await request().send({ ...body, password: "" }));
    });

    it(
      "Email does not exists",
      test(async function (this: sinon.SinonStatic) {
        const findOne = this.stub(AdminUserModel(), "findOne").resolves(null);
        const response = await request().send(body);
        expect(response.body.message).to.equal("This user doesn't exist");
        expect(response.status).to.equal(400);
        expect(sinon.assert.calledOnce(findOne));
      })
    );

    it(
      "Incorrect Password",
      test(async function (this: sinon.SinonStatic) {
        const findOne = this.stub(AdminUserModel(), "findOne").resolves(
          adminUser
        );
        const checkHash = this.stub(PasswordUtil, "checkHash").resolves(false);

        const response = await request().send(body);
        expect(response.body.message).to.equal("Please check your password.");
        expect(response.status).to.equal(400);
        expect(sinon.assert.calledOnce(findOne));
        expect(sinon.assert.calledOnce(checkHash));
      })
    );

    it(
      "Success Login",
      test(async function (this: sinon.SinonStatic) {
        const findOne = this.stub(AdminUserModel(), "findOne").resolves(
          adminUser
        );
        const checkHash = this.stub(PasswordUtil, "checkHash").resolves(true);

        const response = await request().send(body);
        api.assertSuccessResponse(response);

        expect(sinon.assert.calledOnce(findOne));
        expect(sinon.assert.calledOnce(checkHash));
      })
    );
  });

  after(async () => {
    await api.after();
  });
});

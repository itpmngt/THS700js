/**
 * Created by itpmngt-joerosa on 26/02/2014.
 * Description: To test if Mocha is running
 */

"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

function hello(name, cb) {
  cb("hello " + name);
}

describe("test mocha-chai-sinon", function () {
  it("should call callback with correct greeting", function () {
    var cb = sinon.spy();

    hello("foo", cb);

    expect(cb).to.have.been.calledWith("hello foo");
  });
});
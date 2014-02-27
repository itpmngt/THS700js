/**
 * Created by itpmngt-joerosa on 26/02/2014.
 * Description: To test if Mocha is running
 */

/**
 * Node libraries
 *
 *   npm install mocha
 *   npm install chai
 *   npm install sinon
 *   npm install sinon-chai
 *
 * WebStorm 'Edit configurations...'
 *
 *   Run NODE -> Node.js - app.js
 *   Run MOCHA -> Mocha - test-directory
 *
 * WebStorm preferences in
 * 'Project settings'->Javascript->Libraries
 *
 *   Node.js dependencies
 *     Node.js Core Modules  '0.10' Project --> 'node-modules'
 *   DefinitelyTyped for
 *     mocha, chai, sinon, sinon-chai
 */

if (typeof chai == 'undefined') {
  var chai = require("chai");
  var sinon = require("sinon");
  var sinonChai = require("sinon-chai");
  var expect = chai.expect;
  chai.use(sinonChai);
}

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


/**
 * Created by itpmngt-joerosa on 26/02/2014.
 * Description: test if Karma-Jasmine is working
 *
 * Node libraries
 *
 *   npm install karma-jasmine
 *   npm install karma-coverage
 *   karma init karma.conf.js
 *
 * WebStorm 'Edit configurations...'
 *
 *   Run NODE -> Node.js - app.js
 *   Run KARMA -> Karma - karma.conf.js
 *
 * WebStorm preferences in
 * 'Project settings'->Javascript->Libraries
 *
 *   Node.js dependencies
 *     Node.js Core Modules  '0.10' Project --> 'node-modules'
 *
 *   Karma-Jasmine
 *     Attach file 'node-modules'->'karma-jasmine'->lib->jasmine.js
 */

// test Karma-Jasmine asynchronously
describe("Testing Karma-Jasmine", function () {

  var result = true;

//  // SetTimeout to time async calls
//  beforeEach( function (done) {
//    setTimeout( function (){
//      result = true;
//      done;
//    }, 2000);
//  });

  it("should return a spec with an expectation", function (done) {
    expect(result).toBe(true);
    done;
  });
});


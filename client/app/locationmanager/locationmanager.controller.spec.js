'use strict';

describe('Controller: LocationmanagerCtrl', function () {

  // load the controller's module
  beforeEach(module('pookyApp'));

  var LocationmanagerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LocationmanagerCtrl = $controller('LocationmanagerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

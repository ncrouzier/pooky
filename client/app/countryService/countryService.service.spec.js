'use strict';

describe('Service: countryService', function () {

  // load the service's module
  beforeEach(module('pookyApp'));

  // instantiate service
  var countryService;
  beforeEach(inject(function (_countryService_) {
    countryService = _countryService_;
  }));

  it('should do something', function () {
    expect(!!countryService).toBe(true);
  });

});

module.exports.withAuthentication = (request) =>
  request.set({
    /* Can be set to a random auth ID Token since auth is mocked, 
      which makes the authidtoken irrelevant. */
    authorization: 'Bearer authidtoken',
  });
module.exports.withAuthentication = (request) =>
  request.set({
    authorization: 'Bearer authidtoken',
  });

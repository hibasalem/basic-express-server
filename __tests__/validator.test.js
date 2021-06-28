'ust strict';

const validatorMiddleware = require('../src/middleware/validator');

describe('validator', () => {
  // const req = {};
  const res = {};
  const next = jest.fn();

  it('go to next if name proparity is in the query', () => {
    const query = 'hiba';
    const req = {
      query: { name: `${query}` },
    };
    validatorMiddleware(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('force error if name proparity is in not the query', () => {
    const req = {
      query: {},
    };
    validatorMiddleware(req, res, next);
    expect(next).toHaveBeenCalledWith('add name proparity');
  });
});

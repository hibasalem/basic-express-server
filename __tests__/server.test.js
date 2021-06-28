'use strict';

const server = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server.app);

describe('server tests ', () => {
  it('response with status 200 if the name is in the query string', async () => {
    const query = 'hiba';
    const response = await mockRequest.get(`/person?name=${query}`);
    expect(response.status).toBe(200);
  });
  it(' the output object is correct', async () => {
    const query = 'hiba';
    const response = await mockRequest.get(`/person?name=${query}`);
    expect(response.text).toEqual('{"name":"hiba"}');
  });
  it('response with status 500 if no name is in the query string', async () => {
    const query = '';
    const response = await mockRequest.get(`/person?name=${query}`);
    expect(response.status).toBe(500);
  });
  it('response with 404 on a bad request', async () => {
    const response = await mockRequest.get('/foo');
    expect(response.status).toEqual(404);
  });
  it('response with 200 on a correct request', async () => {
    const response = await mockRequest.get('/');
    expect(response.status).toEqual(200);
  });
  it('response with 404 on a bad method', async () => {
    const response = await mockRequest.put('/');
    expect(response.status).toEqual(404);
  });
});

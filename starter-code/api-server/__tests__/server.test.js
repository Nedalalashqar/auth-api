'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const {  response } = require('express');
const request = supertest(server.server);

describe('my server', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation();
    })
    it('get data from /food ', () => {
        const response = request.get('/food').then(response=>{
          expect(response.status).toEqual(200);
          expect(typeof response.body).toEqual('object'); 
        }); 
    });
    it('craete new', () => {
        const response = request.post('/food/1')
        .then((response)=>{ expect(response.status).toEqual(200)})
      });
      it('Update by id', () => {
        const updateRecord = request.put('/food/1')
        .then((response)=>{ expect(response.status).toEqual(200)})
      });
      it('Delete by id', () => {
        const updateRecord = request.delete('/food/1')
        .then((response)=>{ expect(response.status).toEqual(202)})
      });
});
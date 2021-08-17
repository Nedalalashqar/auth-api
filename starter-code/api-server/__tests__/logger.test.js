const logger = require('../src/middleware/logger');
describe('middleware ', ()=> { 
    let consoleSpy; 
    let req = {};
    let res = {};
    let next = jest.fn();
    beforeEach(()=> {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    })
    afterEach(()=> {
        consoleSpy.mockRestore();
    })
    it('logs some output', ()=> {
        logger(req, res, next);
        expect(consoleSpy).toHaveBeenCalled();
    })

    it('moves to the next', ()=> {
        logger(req, res, next);
        expect(next).toHaveBeenCalled()
    })
})

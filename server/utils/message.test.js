var expect = require('expect');
var {generateMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var response = generateMessage('andy','its hotdog time');

        expect(response.from).toBe('andy');
        expect(response.text).toBe('its hotdog time');
        expect(response.createdAt).toBeA('number');
    })
})
var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var response = generateMessage('andy','its hotdog time');

        expect(response.from).toBe('andy');
        expect(response.text).toBe('its hotdog time');
        expect(response.createdAt).toBeA('number');
    })
})

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var response = generateLocationMessage('andy',1,2);

        expect(response.from).toBe('andy');
        expect(response.url).toBe('https://www.google.com/maps?q=1,2');
        expect(response.createdAt).toBeA('number');
    })
})
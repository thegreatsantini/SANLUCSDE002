const expect = require('chai').expect;
const assert = require('chai').assert;
const request = require('request');
const fs = require('fs');
const getQuotes = require('../goodReads').getQuotes;
// const resolvePromise = require('../goodReads').resolvePromise;

const GOODREADS_QOUTES_ENDPONT = 'https://www.goodreads.com/author/quotes/1244.Mark_Twain'

describe('Testing GoodReads Qoutes link', function () {
    it('should return 200 status', (done) => {
        request(GOODREADS_QOUTES_ENDPONT, (err, res, body) => {
            expect(res.statusCode).to.equal(200)
            done()
        })
    })
    it("should should not be empty", (done) => {
        request(GOODREADS_QOUTES_ENDPONT, (err, res, body) => {
            expect(body).to.not.be.empty
            done()
        })
    })
});

describe('Testing Quotes retreival functionality', () => {
    it('clearing txt file', (done)=> {
        fs.truncate('quotes.txt', 0, ()=> console.log('truncated file'))
        done()
    })
    it('should be an empty text file before running', (done) => {
        const data = fs.readFileSync('quotes.txt', ()=> console.log('read empty file')).toString()
        expect(data).to.be.empty
        done()
    })
    it('should poplulate quotes.txt file after running', (done) => {
        getQuotes()
        const data = fs.readFileSync('quotes.txt', ()=> console.log('read populated file')).toJSON()
        expect(data).to.not.be.empty
        done()
    }).timeout(2000)
})

describe('Testing ')

// describe('Facebook post scraper', function () {
//     it('it sould not be empty', (done) => {
//         expect(getQuotes()).not.to.be.empty
//         done()
//     })
//     it('should be an array', (done) => {
//         expect(getQuotes()).to.be.an('array')
//         done()
//     })
//     it('should have objects with correct keys', (done) => {
//         done()
//     })
// })
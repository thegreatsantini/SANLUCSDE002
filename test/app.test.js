require('dotenv').config();
const expect = require('chai').expect;
const assert = require('chai').assert;
const request = require('request');
const fs = require('fs');
const getQuotes = require('../goodReads').getQuotes;
// const resolvePromise = require('../goodReads').resolvePromise;

const GOODREADS_ENDPOINT =  process.env.GOODREADS_ENDPOINT

const fetchData = fs.readFileSync('quotes.txt','utf8', () => {return 'read populated file'})
const parsed = JSON.parse(fetchData)

describe('Testing GoodReads Qoutes link', function () {
    it('should return 200 status', (done) => {
        request(GOODREADS_ENDPOINT, (err, res, body) => {
            expect(res.statusCode).to.equal(200)
            done()
        })
    })
    it("should should not be empty", (done) => {
        request(GOODREADS_ENDPOINT, (err, res, body) => {
            expect(body).to.not.be.empty
            done()
        })
    })
});

describe('Testing Quotes retreival functionality', () => {
    it('clearing txt file', (done) => {
        fs.truncate('quotes.txt', 0, () => {return 'truncated file'})
        done()
    })
    it('should be an empty text file before running', (done) => {
        const data = fs.readFileSync('quotes.txt', () => {return 'read empty file'}).toString()
        expect(data).to.be.empty
        done()
    })
    it('should poplulate quotes.txt file after running', (done) => {
        getQuotes()
        const data = fs.readFileSync('quotes.txt','utf8', () => {return 'read populated file'})
        console.log(JSON.parse(data))
        // expect(JSON.parse(data)).to.have.lengthOf(10)
        done()
    }).timeout(2000)
})

// describe('Testing quote retreival data', () => {
//     it('should return an array', (done) => {
//         const data = fs.readFileSync('quotes.txt', () => {return 'read populated file'}).toJSON()
//         // console.log(data)
//         done()
//     }).timeout(2000)
// })

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
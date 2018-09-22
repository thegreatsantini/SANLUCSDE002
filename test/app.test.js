require('dotenv').config();
const expect = require('chai').expect;
const assert = require('chai').assert;
const request = require('request');
const fs = require('fs');
const getQuotes = require('../goodReads').getQuotes;
// const resolvePromise = require('../goodReads').resolvePromise;

const GOODREADS_ENDPOINT = process.env.GOODREADS_ENDPOINT


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

describe('Testing data from qoutes.txt',  () => {
    const fetchData = fs.readFileSync('quotes.txt', 'utf8', () => { return 'read populated file' })
    const parsed = JSON.parse(fetchData)
    

    it('should be an array', (done) => {
        expect(parsed).to.be.an('array')
        done()
    })
    it('should be an array with 10 items', (done) => {
        expect(parsed).to.have.lengthOf(10)
        done()
    })
    it('should have objects each with quotes, tags and votes keys', (done) => {
        parsed.forEach(obj => {
            expect(obj).to.have.keys(['quote', 'tags', 'votes']);
        })
        done()
    })
})

describe('Facebook post scraper', function () {

    const fetchData = fs.readFileSync('facebook_posts.txt', 'utf8', () => { return 'read populated file' })
    const parsed = JSON.parse(fetchData)
    
    it('should be an array', (done) => {
        expect(parsed).to.be.an('array')
        done()
    })
    it('should have array length of 8', (done) => {
        expect(parsed).to.have.lengthOf(8)
        done()
    })
    it('should be an array of objects', (done)=> {
        parsed.forEach(val => {
            expect(val).to.be.an('object')
        })
        done()
    })
    it('should have objects with correct keys (title, text, timestamp', (done)=> {
        parsed.forEach(obj => {
            expect(obj).to.have.keys(['title', 'text', 'timestamp']);
        })
        done()
    })
})
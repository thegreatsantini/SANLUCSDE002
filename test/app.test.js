require('dotenv').config();
const expect = require('chai').expect;
const assert = require('chai').assert;
const request = require('request');
const fs = require('fs');
const getQuotes = require('../goodReads').getQuotes;
const chaiFiles = require('chai-files');
const chai = require('chai')
chai.use(chaiFiles);
const file = chaiFiles.file;

const execSync = require('child_process').execSync;

const GOODREADS_ENDPOINT = process.env.GOODREADS_ENDPOINT

describe('Testing GoodReads Qoutes link', () => {
    it('should return 200 status', (done) => {
        request(GOODREADS_ENDPOINT, (err, res, body) => {
            expect(res.statusCode).to.equal(200)
            done()
        })
    }).timeout(4000);
    it("should should not be empty", (done) => {
        request(GOODREADS_ENDPOINT, (err, res, body) => {
            expect(body).to.not.be.empty
            done()
        })
    }).timeout(4000)
});



describe('Testing data writen to qoutes.txt from getQuotes func', () => {

    let parsed;
    // Calling getQuotes to create the output file to be tested
    getQuotes().then(() => {
        // reading output and assining JSON to parsed var this data will be used by all the following tests in this test block
        const fetchData = fs.readFileSync('quotes.txt', 'utf8', () => { return 'read populated file' })
        parsed = JSON.parse(fetchData)
    })

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
    it('**Deleting output file**', (done) => {
        fs.unlinkSync('quotes.txt', (err) => {
            if (err) throw err;
            console.log('quotes.txt was deleted');
        });
        expect(file('quotes.txt')).to.not.exist;
        done()
    });
});

describe('Facebook post scraper', async () => {


    execSync('python3 get_posts.py');

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
    it('should be an array of objects', (done) => {
        parsed.forEach(val => {
            expect(val).to.be.an('object')
        })
        done()
    })
    it('should have objects with correct keys (title, text, timestamp', (done) => {
        parsed.forEach(obj => {
            expect(obj).to.have.keys(['title', 'text', 'timestamp']);
        })
        done()
    })
    it('**Deleting output file**', (done) => {
        fs.unlinkSync('facebook_posts.txt', (err) => {
            if (err) throw err;
            console.log('facebook_posts.txt was deleted');
        });
        expect(file('facebook_posts.txt')).to.not.exist;
        done()
    });
})
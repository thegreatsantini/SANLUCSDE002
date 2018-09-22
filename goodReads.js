require('dotenv').config();
const readline = require('readline');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const baseUrl = process.env.GOODREADS_ENDPOINT;


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



var recursiveAsyncReadLine = (loggedIn) => {
  if (loggedIn) {
    getQuotes(quote => { const quotesResult = quote })
    rl.close()
  }
  else {
    rl.question('Please enter your username: ', (username) => {
      rl.question('Please enter your password: ', async (password) => {
        const cleanUsername = escape(username);
        const cleanPassword = escape(password);
        await checkCredentials(false, cleanUsername, cleanPassword)
      }
      )
    });
  }
};
const checkCredentials = (authenticated, user, pass) => {
  setTimeout(() => {
    recursiveAsyncReadLine(true, null, null)
  }, 4000)
  // return false;
}
// recursiveAsyncReadLine(false);




const getQuotes = async (done) => {
  let data = [];

  const response = await axios.get(baseUrl)
  const $ = cheerio.load(response.data);

  for (let i = 0; i < 10; i++) {

    let currentQuote = {};
    // get Quote Text 
    const dirtyQuote = $('.quoteText').eq(i).text().replace(/&ldquo;|&rdquo;/g, '"').replace(/(-|Mark Twain|&#8213;)/g, '').trim()
    currentQuote.quote = dirtyQuote.slice(0, dirtyQuote.length - 6)

    // get Quote tags
    const dirtyTags = $(".greyText").eq(i).text().replace(/(tags:)|\s+/g, '').split(',')
    currentQuote.tags = dirtyTags

    // get votes
    const votes = $('.right').eq(i).text().replace(/(likes)/g, "").trim()
    currentQuote.votes = votes

    data.push(currentQuote)
  }

  fs.writeFileSync('quotes.txt', JSON.stringify(data, null, 2), (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;
    // success case, the file was saved
    console.log('Quotes saved!');
  });
  return done(data)
}
getQuotes(quote => {
  const quotesResult = quote
}).catch((err) => {
  console.log('err in getQuote', err)
  return err
})

module.exports = {
  getQuotes: getQuotes
}
# SANLUCSDE002

## Running the script

1) in your terminal run ``git clone https://github.com/thegreatsantini/SANLUCSDE002.git``
2) ``npm i``
2) cd to the directory and run ``node goodReads.js``
3) to run tests in the same directory run ``npm test``

### Creating my tests

Before writing my tests I took some time to think about what I was doing and what could be tested. I decided that the best way to test my web scrapping functions was to test the data that was written to the output file. Before testing the data I added some tests to the goodreads link, to make sure that we are getting a response with data. I thought this was important because if the API isn't working then the rest of the tests will fail but not because there is something wrong with the functions but the error started with the API response. After testing the endpoint, I moved to the output data, I tested the data using multiple tests starting very broad and gradually getting more specific. Before testing the output file I had to run the script before the tests and use node's file system to read the output file. This gave me some issues with asynchronicity because if I tried to read the output file after the guetQuotes declaration it would fail because node would try to read the file before the function finished running. I thought of two ways to solve this issue, the first was the read the output file within each test or to place a ".then" after the getQuotes function call, read the file then assign the data to a variable outside of the promise, I decided to do the later so that I was only running the getQuotes function once. I first tested if the data was an array and an array with a length of 10 because that was how many posts I was supposed to scrape. I then made sure each value in the array was an object with the expected keys because while the values will changes with each post all the objects should have the same keys. On After testing the getQuotes function I moved on to testing the Facebook script. I chose to follow a similar logic to test my Facebook scraping script, testing the shape of the data and making sure the objects have the correct keys. 

### CLI functinonality

My next step was to create the goodreads quotes scraping and command line prompt functionality. To create the prompt functionality I used Node's built in read line functionality. This function authenticates users to goodreads(not completed ), because the user might not have a profile or might input incorrect login information the function will have to re-run until the user is authenticated. I created this functionality using two separate functions. One function prompts the user to input login information, sanitizes the input and calls and authenticate function that calls the goodreads endpoint to authenticate the user. The original contains three arguments (authenticated <Bool>, username<String> and password <String>). The Boolean is used by the authenticate function so that when it recursively calls the prompt user function, it will send a Boolean letting it know if the user is authenticated or not. If the user is not authenticated it will reprompt the user and call authenticate user again with the new information. However, if the function is called with a true Boolean, the function with call getQuotes function and close the read line prompt method. I did not complete the CLI auth functionality because I wasn't able to find a way to leverage the Goodreads OAuth API in a way that didn't require me to deploy the application and cURL my own endpoint. With more time, I would deploy my application and use the RESTful API I created in problem #3 to get the CLI auth functionality working.

### Goodreads scrapper

getQuotes is the function I created to scrape goodreads for Mark Twains top quotes, to do this I used axios to make the request to goodreads to get the HTML and the cheerio package to parse the DOM for scraping and cheerio’s DOM transversal methods to grab the elements that I needed. I used cheerio because the way that they implemented DOM transversal is purposefully similar to jQuery, which is a very clean and easy to use. The logic I followed to scrape the quotes was to leverage the .eq() method that cheerio provides. Essentially this method will grab the HTML element in the index of the node-list for that selector. For example if there are 10 divs with a class of quotes and I where to select the element using class='quotes' I would get a node-list of length 10, and if I where to use .eq(5) I would grab the 4th div in that list (it is 0 indexed). I one reason I leveraged this method was because I only needed to scrape the top 10 quotes, so I simply used a for loop that counts from 0 to 9. In each loop I grabbed the corresponding quote, tags and votes for the node-list in that corresponding loop. At the start of the loop I instantiated an empty currentPost object and placed the three key value pairs in the object with the correct information then pushed it to the postsArray that will contain all the scrapped posts. Before placing it into the object I had to clean up the scraped data to take out extra space, new lines (\n), extra words and HTML encoded elements (e.g. &ldquo;, &#8213) for the quote text I also used regex to place right and left double quotes. Once the data had been gathered I uses Node's built in file creating and writing API to create the quotes.txt output file.
API Challenge
=============

In this exercise we will learn to:
- make an api call
- manipulate a large JSON object
- dynamically add content to the DOM using jQuery


### JSON REFRESHER

Take a look at js/mock_response.js.
- What is the structure of this object?
- How would you get the first item?
- How many items are there?
- Don't forget dot notation vs. bracket notation: response.data vs. response['data']

Right now this object is just hard coded, but eventually we'll be pulling in live data from reddit.


### TURN IT INTO HTML

Next, explore js/base.js.
- How are we using this object to populate the html?
- Note that we're only using the first item at the moment. Can you extend the renderLaughs function so that it loops over the entire object?

Building html strings in javascript is tricky!
- Make sure to be careful about using single or double quotes!
- It's helpful to indent your code like you would in the html, for example:

``` html
  var item_html = (
                    "<div class='item'>" +
                      "<img src='" + item_data.thumbnail + "'>" +
                      "<p>" + item_data.title + "</p>" +
                    "</div>"
                  )
```

Test it out! Can you get one item to render in the gallery? Can you get all of them?

Now we're ready for the real thing!


### REDDIT API

In your browser, navigate to: http://www.reddit.com/r/funny.json
- How do you think reddit uses this data?
Also take a look at: http://www.reddit.com/r/funny
- Notice anything familiar?

The json link above is the same as the "api endpoint" that we'll be using.

A lot of APIs require you to:
- sign up for an "api_key", a secret passphrase. (How to keep it concealed?)
- stay within certain limits (n requests per second), and under a daily/weekly cap.
And they will block you if you're not careful!

Reddit makes it super easy to access!

Let's make a real api call!


### MAKING API CALLS
To start with, let's make the api call directly from our chrome console.

``` javascript
  $.get("http://www.reddit.com/r/funny.json")
```

Once we're confident it's working, let's hook it up. First, comment out all the code inside of the getLaughs function. (Right now we're just using a hardcoded javascript object).

Next, insert the following code:

``` javascript
  var api_endpoint = "http://www.reddit.com/r/funny.json"
  $.get(api_endpoint)
   .success(renderLaughs)
   .fail(function(){
    alert("Wowa, major problemo with your api!")
   });
```


### USING QUERY PARAMETERS
Query parameters are a way of passing in additional data along with your request.
Navigate to http://www.reddit.com/r/funny again, and click on the "next page" button.
- How did the url change? (e.g. www.reddit.com/r/funny/?count=25&after=t3_2vlxu2)
- Can you describe what the extra data in the url is doing?
- What happens if you modify it?
- Can you describe the format/syntax? (What's the "?" doing? What about "&" and "="?)
- How would you build your own request using this format?
- Take a look at the Reddit API Documentation: http://www.reddit.com/dev/api


### HOMEWORK
- finish up what we did in class.

Stretch goals:
- Pagination: Add a "next page" button that pulls in the next page of data.
- Multiple views: Create a "detail" view, or a "carousel" view for individual items. Add a "next item" button. Bonus: figure out how to pull in comments and additional info about the specific item using the reddit api.
- Multiple reddits: Allow the user to toggle which subreddit to request. Bonus: let them type it in!
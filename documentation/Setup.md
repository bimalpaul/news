# Setup 💿
Pretty straightforward, I think. 🎳

* Clone the repo 
   * `git clone git@github.com:bimalpaul/news.git`, if using SSH
   * `git clone https://github.com/bimalpaul/news.git`, if using HTTPS
* cd into the repo 
   * `cd news`
* To install dependencies
   * Run `yarn install`, or `npm install`
* To start the app
   * Run `yarn start`, or `npm start`   

If you're having issues with the API, it's most likely because it's run out of allowed requests
* [Generate an API 🔑 on NewsAPI.org](https://newsapi.org/register)
* Edit the [fetch file](../src/getNews.js#L3) - line 3 with the new key
   * `const apiKey = '** your new key **';`

   




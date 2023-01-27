import { tweetsData } from "./data.js";
// console.log(tweetsData);
const tweetInput = document.getElementById("tweet-input");
const tweetBtn = document.getElementById("tweet-btn");

tweetBtn.addEventListener("click", function () {
  //   console.log("clicked!");

  // 4.1==> Have the eventListener's function log out the contents of the textarea when the Tweet button is clicked.
  console.log(tweetInput.value);
});

// 5. Tweet Boilerplate
// will iterate over the data & create html for each tweet using a boilerplate; getFeedHtml() will then save the html in a 'let' w/c can be logged out & eventually returned
// function getFeedHtml(tweets) {
function getFeedHtml() {
  // 6. Tweet Boilerplate Challenge
  /*
   Challenge:
   6.1==> Use a "for of" to iterate over the data and
      create HTML string for each tweet using the
      boilerplate below. Replace UPPERCASE text
      with data from the tweets.
   6.2==> Store this HTML in a let called "feedHtml".
   6.3==> Log out feedHtml.
   6.4==> Call getFeedHtml to check it's working.
   */

  // 8. Use forEach to build the html
  /*
   Challenge:
   1. Replace the for of with a forEach.
  */
  // 6.2==> Store this HTML in a let called "feedHtml".
  let feedHtml = "";
  // 11. Add some awesome icons
  /*
   Challenge:
   1. Inside each span that has a class of "tweet-detail",
      add an <i> tag.
   2. Give each <i> tag the classes it needs to render the
      correct icons next to the numbers.
      The classes you will need are:
      fa-regular, 
      fa-solid, 
      fa-comment-dots, 
      fa-heart, 
      fa-retweet
   */

  // 6.1==> Use a "for of" to iterate over the data and create HTML string for each  tweet using the boilerplate below. Replace UPPERCASE textwith data from the tweets.
  //   for (let tweet of tweetsData) {
  tweetsData.forEach(function (tweet) {
    feedHtml += `
       <div class="tweet">
       <div class="tweet-inner">
          <img src="${tweet.profilePic}" class="profile-pic">
          <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                   <span class="tweet-detail">
                      <i class="fa-regular fa-comment-dots"></i>
                      ${tweet.replies.length}
                   </span>
                   <span class="tweet-detail">
                      <i class="fa-solid fa-heart"></i>
                      ${tweet.likes}
                   </span>
                   <span class="tweet-detail">
                      <i class="fa-solid fa-retweet"></i>
                      ${tweet.retweets}
                   </span>
                </div>
             </div>
          </div>
       </div>
    `;
  });
  // 6.3==> Log out feedHtml.
  // console.log(feedHtml);
  return feedHtml;
}
// 6.4==> Call getFeedHtml to check it's working.
// console.log(getFeedHtml());

// 9. Render the tweets to the feed
function render() {
  /*
   Challenge:
   9.1. Take control of the ‘feed’ div.
   9.2. Render the HTML returned by the getFeedHtml 
      function to the 'feed' div. 
      See if you can do this with just one line of code!
   */
  //   const feed = document.getElementById("feed");
  //   feed.innerHTML = getFeedHtml();
  document.getElementById("feed").innerHTML = getFeedHtml();
}

// call render
render();

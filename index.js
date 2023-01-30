// <!-- IN PROGRESS -->

import { tweetsData } from "./data.js";
// console.log(tweetsData);

import { v4 as uuidv4 } from "https://jspm.dev/uuid";
// console.log(uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

// const tweetInput = document.getElementById("tweet-input");
// const tweetBtn = document.getElementById("tweet-btn");

// tweetBtn.addEventListener("click", function () {

//   console.log(tweetInput.value);
// });

// 30. Refactor the tweet btn
/*
Challenge:
1. Somewhere in index.js there is a line of code 
   we no longer need. Find it and delete it!
   ANSWER ==> const tweetBtn = document.getElementById("tweet-btn");
*/

// 17. Like a tweet part 3: addEventListener
document.addEventListener("click", function (e) {
  // console.log("like", e.target.dataset.like);

  // CONSOLE: when like(heart) icon is clicked
  // like 4b161eee-c0f5-4545-9c4b-8562944223ee
  // retweet undefined

  //   console.log("like", e.target.dataset.like);
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  }
  // 29. Replies 3: toggle hidden
  else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  }
});

function handleLikeClick(tweetId) {
  // 'tweetId' holds the uuid that has been liked
  //  console.log(tweetId);

  const targetTweetObj = tweetsData.filter(function (tweet) {
    // test to see if the uuid in tweetId is equal to the one in tweetsData, if it returns 'true', it will be saved in 'targetTweetObj'; if 'false', it will be filtered out instead; we will then end up w/ 1 obj since uuids are unique; this obj will always have a length of '1'
    // we can set up a const to
    return tweet.uuid === tweetId;
  })[0];
  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--;
    //  targetTweetObj.isLiked = false; //delete
  } else {
    targetTweetObj.likes++;
  }
  // if True, targetTweetObj.isLiked will be flipped to False & vice versa
  targetTweetObj.isLiked = !targetTweetObj.isLiked;
  // targetTweetObj.likes++;
  // 21. Like a tweet part 6: render the increment
  render();
  // const realTargetTweetObject = targetTweetObj[0];

  // LIKES INCREASED FR 27 TO 28 after adding 'targetTweetObj.likes++;', this is not yet rendered on the browser
  // {handle: '@TrollBot66756542 💎', profilePic: 'images/troll.jpg', likes: 28, retweets: 10, tweetText: 'Buy Bitcoin, ETH Make 💰💰💰 low low prices. \n    …  Guaranteed return on investment. HMU DMs open!!', …}

  // console: prev, w/o the [0] at the end of filter
  // [{handle: "@TrollBot66756542 💎", profilePic: "images/troll.jpg", likes: 27, retweets: 10, tweetText: "Buy Bitcoin, ETH Make 💰💰💰 low low prices. Guaranteed return on investment. HMU DMs open!!", replies: [], isLiked: false, isRetweeted: false, uuid: "4b161eee-c0f5-4545-9c4b-8562944223ee"}]
}

function handleRetweetClick(tweetId) {
  // 24.2==> Find the retweeted tweet's object in tweetsData
  // and save it to a const.
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];
  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--;
  } else {
    targetTweetObj.retweets++;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  //   24.4==> Call the render function.
  render();
}

function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

// 30. Refactor the tweet btn
function handleTweetBtnClick() {
  // console.log(tweetInput.value);

  // console.log(tweetInput.value);
  const tweetInput = document.getElementById("tweet-input");
  // if there is text in the textarea, this will run
  if (tweetInput.value) {
    tweetsData.unshift({
      handle: `@Scrimba`,
      profilePic: `images/scrimbalogo.png`,
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    });
    render();
    tweetInput.value = "";
  }
}

// function getFeedHtml(tweets) {
function getFeedHtml() {
  // 6.2==> Store this HTML in a let called "feedHtml".
  let feedHtml = "";

  tweetsData.forEach(function (tweet) {
    let likeIconClass = "";
    if (tweet.isLiked) {
      likeIconClass = "liked";
    }

    let retweetIconClass = "";
    if (tweet.isRetweeted) {
      retweetIconClass = "retweeted";
    }

    let repliesHtml = "";
    if (tweet.replies.length > 0) {
      // console.log(tweet.uuid);
      tweet.replies.forEach(function (reply) {
        repliesHtml += `
         <div class="tweet-reply">
            <div class="tweet-inner">
               <img src="${reply.profilePic}" class="profile-pic">
                  <div>
                     <p class="handle">${reply.handle}</p>
                     <p class="tweet-text">${reply.tweetText}</p>
                  </div>
            </div>
         </div>
         `;
      });
    }

    feedHtml += `
       <div class="tweet">
       <div class="tweet-inner">
          <img src="${tweet.profilePic}" class="profile-pic">
          <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                   <span class="tweet-detail">
                     <i class="fa-regular fa-comment-dots" 
                        data-reply="${tweet.uuid}">
                     </i>
                      ${tweet.replies.length}
                   </span>
                   <span class="tweet-detail">
                     <i class="fa-solid fa-heart ${likeIconClass}" 
                        data-like="${tweet.uuid}">
                     </i>
                      ${tweet.likes}
                   </span>
                   <span class="tweet-detail">
                     <i class="fa-solid fa-retweet ${retweetIconClass}" 
                        data-retweet="${tweet.uuid}">
                     </i>
                      ${tweet.retweets}
                   </span>
                </div>
             </div>
          </div>
          <div class="hidden" id="replies-${tweet.uuid}" >
            ${repliesHtml}
          </div>
       </div>
    `;
  });
  return feedHtml;
  //   return repliesHtml;
}
// 6.4==> Call getFeedHtml to check it's working.
// console.log(getFeedHtml());

// 9. Render the tweets to the feed
function render() {
  //   const feed = document.getElementById("feed");
  //   feed.innerHTML = getFeedHtml();
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();

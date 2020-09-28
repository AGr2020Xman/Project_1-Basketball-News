let year = 1979;
let till = 2020;
let options = "";
for (let y = year; y <= till; y++) {
  options += "<option>" + y + "</option>";
}
document.getElementById("year").innerHTML = options;

const buildNytQueryURL = (playerName) => {
  // url - filters - params
  // search term (playerString), startYear & endYear (Optional or separate form?)
  // sports desk - limit search to sporting data
  // return ining a URL with queryParameters included
  // if modeled on week 6 day 3 NYT - will need to consider an extra form with
  // user options - years of interest / playerName is SET by original search
  // api-key - included from beginning
  // need to figure out >>>> Pagination <<<<

  let queryNameUrl =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

  // will need a check box system, drop down system - i think a year Scroll
  //
  let queryParams = { "api-key": "PtvZGjOgu0wSTCEKz5XJcfMV0XhmAVP7" };

  queryParams.q = playerName;

  let startYear = $("#start-year").val().trim();
  if (parseInt(startYear)) {
    queryParams.begin_date = startYear + "0101";
  }
  //  TODO: startYear =  the option that a user selects from the drop down list

  let endYear;
  if (parseInt(endYear)) {
    queryParams.begin_date = endYear + "0101";
  }
  // TODO: as above - from dropdown list -OR default to current year

  // field/desk of news to search always
  const filterQuery = "=Sports";
  queryParams.fq = filterQuery;

  return queryNameUrl + $.param(queryParams);
  // return the constructed URL - when input into API call - will have our URL
};

// node query string (google)

const buildBallQueryURL = () => {
  let queryplayerURL = "https://balldontlie.io/api/v1/players";
  let queryParamPlayer = {};
  let playerName;
  const perPageVal = "150";

  // let queryplayerURL =
  // "https://balldontlie.io/api/v1/players?search=" + playerName;
  // No api key needed - fill object with key:val of player params
  // this is the spicy bit -
  // the player name will get passed into here - whether the FULL name, or PART OF. Min 3 chars.
  // how do i do this.explanation

  queryParams.per_page = perPageVal;

  if ($("#player-search").val().trim()) {
    playerName = $("#player-search").val().trim();
  }
  if ($("#player-search2").val().trim()) {
    playerName = $("#player-search2").val().trim();
  }

  if (playerName.length >= 3) {
    queryParamPlayer.search = playerName;
  }

  return queryplayerURL + $.param(queryParamPlayer);
  // const suggestionDisplay = () => {
  //   setTimeout(() => {

  //   }, 2500);
  // }
  // if ($("#player-search").val().trim().length >= 3)
};

const errorFeedback = () => {
  let errorDetected = $("#searchErrorNotice");

  if (error) {
    errorDetected.show().fadeOut(2500);
  }
};

// takes JSON obj to turn into page elements
// @param {object} BallData + NewsData containing API data
const updatePlayerProfile = (BallData) => {
  let searchOrder;

  searchOrder = 
};

const updatePlayerNews = (NewsData) => {
  let numberOfArticles;

  numberOfArticles = $("#article-count");

  for (i = 0; i < numberOfArticles; i++) {
    let article = NewsData.response.docs[i];
    let articleCount = i + 1;
    let $articleSection = $("<ul>");
    $articleSection.addClass("list-group");

    $("#article-section").append($articleSection);

    let headline = article.headline;
    let $articleSectionItems = $("<li>");
    $articleSectionItems.addClass("list-group-item articleHeadline");

    if (headline && headline.main) {
      $articleSectionItems.append(
        "<span class='label label-primary'>" +
          articleCount +
          "</span>" +
          "<strong> " +
          headline.main +
          "</strong>"
      );
    }

    let byline = article.byline;

    if (byline && byline.original) {
      $articleSectionItems.append("<h5>" + byline.original + "</h5>");
    }

    let section = article.section_name;
    if (section) {
      $articleSectionItems.append("<h5>Section: " + section + "</h5>");
    }

    let publicationDate = article.pub_date;
    if (publicationDate) {
      $articleSectionItems.append("<h5>" + article.pub_date + "</h5>");
    }

    $articleSectionItems.append(
      "<a href='" + article.web_url + "'>" + article.web_url + "</a>"
    );

    $articleSection.append($articleSectionItems);
  }
};

const clearArticles = () => {
  $("#article-section").empty();
};

const ballDontLieApiCall = (playerName) =>
  new Promise((resolve, reject) => {
    if (userInput.length >= 3) {
      $.ajax({
        url: queryplayerURL,
        method: "GET",
      }).then(function (response) {
        // i want to get player data here
        resolve({ playerData });
      });
    }
  });

const nytApiCall = () =>
  new Promise((resolve, reject) => {
    $.ajax({
      url: buildNytQueryURL(),
      method: "GET",
    }).then(function (response2) {
      resolve({ topArticles });
    });
  });

const searchPlayerOfInterest = async (playerName) => {
  playerName = playerName.toLowerCase().trim();
  $("searchNav", "searchMain").val("");
  try {
    const playerData = await ballDontLieApiCall(playerName);
    const topArticles = await nytApiCall(playerName);
  } catch (error) {
    // not modal - alert flash on 404
  }
};

const searchPlayer = (event) => {
  event.preventDefault();
  // check if |OR| works in jQuery select
  let playerName = $("#player-search" || "#player-search2");
  ballDontLieApiCall(playerName);
};

$(document).ready(function () {
  let allSearched = getFromLocalstorage();
  renderPlayerProfile(allSearched);
  renderNews(allSearched);
  let lastSearchedPlayer = Object.keys(previousPlayers).pop();
  if (typeof lastSearchedPlayer !== "undefined") {
    ballDontLieApiCall(lastSearchedPlayer);
  }
});

const getLastPlayerFromLocalStorage = () => {};

const saveLastSearchToLocalStorage = () => {};

const createLast3SearchEl = () => {};

const renderLast3SearchEl = () => {};

const saveSelectedProfileNewsState = () => {};

const getSelectedProfileNewsState = () => {};

const createNewsFromNytApi = () => {};

const renderNews = () => {};

const createPlayerProfileFromApi = () => {};

const renderPlayerProfile = () => {};

const clearCurrentPlayerProfileAndNews = () => {};

const clearPreviousSearchHistory = () => {};

$("#searchButton1", "#searchButton2").click();

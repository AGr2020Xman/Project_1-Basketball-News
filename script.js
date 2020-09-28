const createScrollBarYears = () => {
  let year = 1979;
  let till = 2021;
  let options = "";

  for(let y=year; y<=till; y++){
    options += "<option>"+ y +"</option>";
  }

document.getElementById("year").innerHTML = options;
};


const buildNytQueryURL = () => {
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

  queryParams.q = $("#player-search" || "#player-search2")
    .val()
    .trim();
    
    let startYear = $("#start-year").val().trim();
    if (parseInt(startYear)) {
      queryParams.begin_date = startYear + "0101"
    }
    //  TODO: startYear =  the option that a user selects from the drop down list
    
    let endYear;
    // TODO: as above - from dropdown list -OR default to current year 
  

    const filterQuery = "=Sports"
    queryParams.fq = 
    // data hard coded


    // if (startYear) {
    //   queryNameUrl + startYear
    // }
    // return the constructed URL - when input into API call - will have our URL 
    return queryNameUrl + startYear + endYear

  };



const buildBallQueryURL = () => {
  let queryplayerURL;
  let queryParamPlayer;
  // let queryplayerURL =
  // "https://balldontlie.io/api/v1/players?search=" + playerName;
  
  // No api key needed - fill object with key:val of player params 
  // this is the spicy bit - 
  // the player name will get passed into here - whether the FULL name, or PART OF. Min 3 chars. 
  // how do i do this.explanation
};

const nytApiCall = () =>
  new Promise((resolve, reject) => {
    $.ajax({
      url: buildNytQueryURL(),
      method: "GET",
    }).then(function (response2) {
      resolve({ topArticles });
    });
  });

  const ballDontLieApiCall = (playerString) =>
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



// node query string (google)

const searchPlayerOfInterest = async (playerString) => {
  playerString = playerString.toLowerCase().trim();
  $("searchNav", "searchMain").val("");
  try {
    const playerData = await ballDontLieApiCall(playerString);
    const topArticles = await nytApiCall(playerString);
  } catch (error) {
    // not modal - alert flash on 404
  }
};

const searchPlayer = (event) => {
  event.preventDefault();
  // check if |OR| works in jQuery select
  let playerString = $("#player-search" || "#player-search2");
  ballDontLieApiCall(playerString);
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

const getLastPlayersFromLocalStorage = () => {
  let playersSearchedStringified = localStorage.getItem("playersSearched");
  let playersSearched = JSON.parse(playersSearchedStringified);
  if (playersSearched == null) {
    return {};
  }
  let playerKeys = Object.keys(playersSearched);
  if (playersSearched.length > 3) {
    delete playersSearched[playerKeys[0]]
  }
  return playersSearched
};

const saveLastSearchToLocalStorage = () => {};

const createLast3SearchEl = () => {};

const renderLast3SearchEl = () => {};

const saveSelectedProfileNewsState = () => {
  
};

const getSelectedProfileNewsState = () => {

};

const createNewsFromNytApi = () => {

};

const renderNews = () => {};

const createPlayerProfileFromApi = () => {};

const renderPlayerProfile = () => {};

const clearCurrentPlayerProfileAndNews = () => {};

const clearPreviousSearchHistory = () => {};

$("#searchButton1", "#searchButton2").click();




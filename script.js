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

// if
// const buildNytQueryURL2 = () => {
//   let queryNameUrl =
//     "https://api.nytimes.com/svc/search/v2/articlesearch.json";

//   // will need a check box system, drop down system - i think a year Scroll
//   //
//   let queryParams = { "api-key": "PtvZGjOgu0wSTCEKz5XJcfMV0XhmAVP7" };

//   queryParams.q = playerName;

//   let startYear = $("#start-year").val().trim();
//   if (parseInt(startYear)) {
//     queryParams.begin_date = startYear + "0101";
//   }
//   //  TODO: startYear =  the option that a user selects from the drop down list

//   let endYear;
//   if (parseInt(endYear)) {
//     queryParams.begin_date = endYear + "0101";
//   }
//   // TODO: as above - from dropdown list -OR default to current year

//   // field/desk of news to search always
//   const filterQuery = "=Sports";
//   queryParams.fq = filterQuery;

//   return queryNameUrl + $.param(queryParams);
// }

// node query string (google)

const buildBallQueryURL = (playerName) => {
  let queryplayerURL = "https://balldontlie.io/api/v1/players?";
  let queryParamPlayer = {};
  const perPageVal = "10";

  // let queryplayerURL =
  // "https://balldontlie.io/api/v1/players?search=" + playerName;
  // No api key needed - fill object with key:val of player params
  // this is the spicy bit -
  // the player name will get passed into here - whether the FULL name, or PART OF. Min 3 chars.
  // how do i do this.explanation
  console.log("playerName", playerName);

  queryParamPlayer.search = playerName;
  queryParamPlayer.per_page = perPageVal;

  // if (playerName.length >= 3) {
  //   queryParamPlayer.search = playerName;
  // }
  console.log(queryParamPlayer);
  console.log("log me1", "\nURL: " + queryplayerURL + "\n");
  console.log("log me2", queryplayerURL + $.param(queryParamPlayer));
  console.log("log me3", $.param(queryParamPlayer));
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
// @param {object} playerData + topArticles containing API data

// THIS FUNCTION IS PART OF THE TYPEAHEAD (AUTOCOMPLETER) + DEBOUNCING of API
// const updatePlayerProfile = (playerData) => {
//   let searchOrder;

//   searchOrder =
// };

const updatePlayerNews = (topArticles) => {
  let numberOfArticles;

  numberOfArticles = $("#article-count");

  for (i = 0; i < numberOfArticles; i++) {
    let article = topArticles.response.docs[i];
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

// search.on("input", () => searchPlayer(search.value));

// const outputSuggestions = matches => {
//   if (matches.length > 0) {
//     // map through array, and join to stringify
//     matches.map(match => ``);
//   }
// }

// typeahead + debounce
// add event listener to the keyup/or down on the search box
// call the debounce function
// debounce function calls the API passing the search value through
// return list of top 10 players
// render players in dropdown list
// add a "listener" to those options to import there .textContent
// into the search box
// when below 3 characters, .clear() dropdown List

// const autocomplete = () => {
//   const search;
//   if ($("#player-search") !== "") {
//     search = $("#player-search").val().trim();
//     $("#player-search2").val("")
//   } else if ($("#player-search2") !== "") {
//     search = $("#player-search2").val().trim();
//     $("#player-search").val("")
//   }
//   const matchList = playerData.data[i].first_name || playerData.data[i].last_name;

//   // searches playerData(json) & filter

//   const searchPlayers = async searchText => {
//     const response = await ballDontLieApiCall(playerName);
//     const players = await response.json();

//     // Get matches to current text input
//     let matches = players.filter(player => {
//       const reg = new RegExp(`${searchText}`, "gi");
//       return player.name.match(reg)
//     });

//     if (searchText === 0) {
//       matches = [];
//     }

//     outputSuggestions(matches);
//   }

// }

const ballDontLieApiCall = (playerName) =>
  new Promise((resolve, reject) => {
    let playerData = [];
    $.ajax({
      url: buildBallQueryURL(playerName),
      method: "GET",
    }).then(function (response) {
      // collection of objects

      // rescalability
      // gua
      // console.log("pre pd", response);

      // conveniently cuts if there are less than 10 protecting the for loop
      const players = response.data.slice(0, 10);
      // eachplayer replaces response.data[i] in the for loop
      players.forEach(function (eachPlayer) {
        const currentPlayer = {};
        console.log("currentPlayer", currentPlayer);
        let playerFirstName = eachPlayer.first_name;
        let playerLastName = eachPlayer.last_name;
        let playerId = eachPlayer.id;
        let playerTeam = eachPlayer.team.full_name;
        let playerTeamAbbr = eachPlayer.team.abbreviation;
        console.log("players", players);
        currentPlayer.fullName = playerFirstName + " " + playerLastName;
        currentPlayer.id = playerId;
        currentPlayer.teamName = playerTeam;
        currentPlayer.playerTeamAbbr = playerTeamAbbr;
        console.log("playerData pre push", playerData);
        playerData.push(currentPlayer);
        console.log(currentPlayer);
      });
    });
    // i want to get player data here
    console.log("playerData post", playerData);
    resolve({ playerData });
  });

const buildSeasonAverageURL = () => {
  let seasonAverageURL = "https://www.balldontlie.io/api/v1/season_averages";
  let querySeasonParams = { season: "2020" };

  return seasonAverageURL + $.param(querySeasonParams);
};
const ballDontLieSeasonAverageCall = (playerData) =>
  new Promise((resolve, reject) => {
    $.ajax({
      url: buildSeasonAverageURL(),
      method: "GET",
    }).then(function (seasonAverages) {
      let seasonStats = {};

      let gamesPlayed = seasonAverages.games_played;
      let season = seasonAverages.season;
      let avgMinutesPlayed = seasonAverages.min;
      let fieldGoalMade = seasonAverages.fgm;
      let fieldGoalAttempt = seasonAverages.fga;
      let fieldGoal3Made = seasonAverages.fg3m;
      let fieldGoal3Attempt = seasonAverages.fg3a;
      let freeThrowMade = seasonAverages.ftm;
      let freeThrowAttempt = seasonAverages.fta;
      let offensiveRebound = seasonAverages.oreb;
      let defensiveRebound = seasonAverages.dreb;
      // let rebounds = seasonAverages.reb;
      let assists = seasonAverages.ast;
      let steals = seasonAverages.stl;
      let blocks = seasonAverages.blk;
      let turnovers = seasonAverages.turnover;
      let personalFouls = seasonAverages.pf;
      let points = seasonAverages.pts;
      let fieldGoalPct = (fieldGoalMade / fieldGoalAttempt) * 100;
      let fieldGoal3Pct = (fieldGoal3Made / fieldGoal3Attempt) * 100;
      let freeThrowPct = (freeThrowMade / freeThrowAttempt) * 100;

      seasonStats.gamesPlayed = gamesPlayed;
      seasonStats.season = season;
      seasonStats.avgMinutesPlayed = avgMinutesPlayed;
      seasonStats.fieldGoalMade = fieldGoalMade;
      seasonStats.fieldGoalAttempt = fieldGoalAttempt;
      seasonStats.fieldGoal3Made = fieldGoal3Made;
      seasonStats.fieldGoal3Attempt = fieldGoal3Attempt;
      seasonStats.freeThrowMade = freeThrowMade;
      seasonStats.freeThrowAttempt = gamesPlayed;
      seasonStats.offensiveRebound = offensiveRebound;
      seasonStats.defensiveRebound = defensiveRebound;
      seasonStats.assists = assists;
      seasonStats.steals = steals;
      seasonStats.blocks = blocks;
      seasonStats.turnovers = turnovers;
      seasonStats.personalFouls = personalFouls;
      seasonStats.points = points;
      seasonStats.fieldGoalPct = fieldGoalPct;
      seasonStats.fieldGoal3Pct = fieldGoal3Pct;
      seasonStats.freeThrowPct = freeThrowPct;

      resolve({ seasonStats });
    });
  });

const nytPlayerApiCall = (fullName) =>
  new Promise((resolve, reject) => {
    $.ajax({
      url: buildNytQueryURL(),
      method: "GET",
    }).then(updatePlayerNews);
  });

// FUTURE ADDITION
// const nytTeamApiCall = () =>
//   new Promise((resolve, reject) => {
//     $.ajax({
//       url: buildNytQueryURL2(),
//       method: "GET",
//     }).then(updateTeamNews);
//   });

// is meant to trigger on "SEARCH"
const searchPlayerOfInterest = async (playerName) => {
  console.log("b4 clear in search", playerName);
  $("#player-search").val("");
  console.log("after clear in search", playerName);
  try {
    const playerData = await ballDontLieApiCall(playerName);
    saveLastSearchToLocalStorage(playerName);
    const topArticles = await nytPlayerApiCall(
      playerData[1].currentPlayer.fullName
    );
  } catch (error) {
    console.log(error);
    // not modal - alert flash on 404
  }
};

// called when search button is clicked
const searchPlayer = (event) => {
  event.preventDefault();
  console.log(event);

  // check if |OR| works in jQuery select
  let playerName = $("#player-search").val().trim();
  console.log("on Clickadoo", playerName);
  searchPlayerOfInterest(playerName);
};

$(document).ready(function () {
  let errorDetected = $("#searchErrorNotice");
  errorDetected.hide();
  let previousPlayers = getSavedPlayersFromLocalStorage();
  renderPlayerProfile(previousPlayers);
  renderNews(previousPlayers);
  // these 3 lines may not be needed on load
  let lastSearchedPlayer = Object.keys(previousPlayers).pop();
  if (typeof lastSearchedPlayer !== "undefined") {
    ballDontLieApiCall(lastSearchedPlayer);
  }
});

const getSavedPlayersFromLocalStorage = () => {
  let previousPlayersStringified = localStorage.getItem("previousPlayers");
  let previousPlayers = JSON.parse(previousPlayersStringified);
  if (previousPlayers == null) {
    return {};
  }
  let playerKeys = Object.keys(previousPlayers);
  if (playerKeys.length > 3) {
    delete previousPlayers[playerKeys[0]];
  }
  return previousPlayers;
};

const saveLastSearchToLocalStorage = (playerName) => {
  if (!playerName) {
    return;
  }
  const previousPlayers = getSavedPlayersFromLocalStorage();
  const updatedPlayers = { ...previousPlayers, [playerName]: 1 };
  localStorage.setItem("previousPlayers", JSON.stringify(updatedPlayers));
  createLastPlayerSearchEl(updatedPlayers);
};

const createLastPlayerSearchEl = (previousPlayers) => {
  $("#playerSaved").empty();

  let playerKeys = Object.keys(previousPlayers);

  // refactor to forEach
  for (i = 0; i < playerKeys.length; i++) {
    let playerEntries = $("<button>");
    playerEntries.addClass(
      "list-group list-group-item list-group-item-action savedButtons"
    );

    let stringSplit = playerKeys[i].toLowerCase().split(" ");
    for (j = 0; j < stringSplit.length; j++) {
      stringSplit[j] =
        stringSplit[j].charAt(0).toUpperCase() + stringSplit[j].substring(1);
    }
    let playerUppercase = stringSplit.join(" ");
    playerEntries.text(playerUppercase);

    playerEntries.on("click", function () {
      let clickedPlayer = $(this).text();
      searchPlayerOfInterest(clickedPlayer);
    });
    $("#playerSaved").prepend(playerEntries);
  }
};

const getLastPlayersFromLocalStorage = () => {};

const renderLast3SearchEl = () => {};

const saveSelectedProfileNewsState = () => {};

const getSelectedProfileNewsState = () => {};

const createNewsFromNytApi = () => {};

const renderNews = () => {};

const createPlayerProfileFromApi = () => {};

const renderPlayerProfile = () => {};

const clearCurrentPlayerProfileAndNews = () => {};

const clearPreviousSearchHistory = () => {};

$("#submit-button").click(searchPlayer);

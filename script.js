$(function () {
  $("#player-search").autocomplete({
    source: async function (request, response) {
      playerOptions = await ballDontLieApiCall(request.term);
      console.log(playerOptions);
      let playerSuggestion = $.map(playerOptions, function (element) {
        return {
          label: element.fullName + " - " + element.playerTeamAbbr,
          value: element.fullName,
        };
      });
      response(playerSuggestion);
    },
    minLength: 3,
    select: function (event, ui) {
      console.log("Selected: " + ui.item.value + " aka " + ui.item.label);
    },
    _renderItem: function (ul, item) {
      console.log("item", item);
      return $("<li>")
        .attr({ "data-value": item.value, class: "list-group-item" })
        .append(item.label)
        .appendTo(ul);
    },
  });
  // need default to be BLANK
  let year = 2021;
  let till = 1979;
  let options = "<option value=''>any year</option>";
  for (let y = year; y >= till; y--) {
    options += "<option type='number'>" + y + "</option>";
  }
  document.getElementById("yearStart").innerHTML = options;
  document.getElementById("yearEnd").innerHTML = options;

  const buildNytQueryURL = (fullName) => {
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

    queryParams.q = fullName;

    let startYear = $("#yearStart").val();
    // let startYear = 2019;

    if (typeof startYear === "number") {
      queryParams.begin_date = startYear + "0101";
    }
    //  TODO: startYear =  the option that a user selects from the drop down list

    let endYear = $("#yearEnd").val();
    // let endYear = 2020;

    if (typeof endYear === "number") {
      queryParams.enddate = endYear + "0101";
    }
    // TODO: as above - from dropdown list -OR default to current year

    // field/desk of news to search always
    const filterQuery = "Sports";
    queryParams.fq = filterQuery;

    console.log(queryParams);
    console.log("NYT url", queryNameUrl + $.param(queryParams));

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
    let queryplayerURL = "https://www.balldontlie.io/api/v1/players?";
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
    console.log("log me3", $.param(queryParamPlayer));
    console.log("log me2", queryplayerURL + $.param(queryParamPlayer));
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
  const updatePlayerProfile = async (seasonStats, fullName, id) => {
    // if a row already exists for "thisPlayer", exit/end
    let tbody = $("#renderPlayers");
    if (tbody.find(`tr[data-player-id=${id}]`).length > 0) {
      return;
    }

    if ($("#renderPlayers").find("tr").length >= 5) {
      $("#renderPlayers").find("tr").last().remove();
    }

    let seasonAccess = seasonStats.seasonStats;

    let trow = $("<tr>");
    trow.attr("data-player-id", id);

    let td1 = $("<td>");
    let td2 = $("<td>");
    let td3 = $("<td>");
    let td4 = $("<td>");
    let td5 = $("<td>");
    let td6 = $("<td>");
    let td7 = $("<td>");
    let td8 = $("<td>");

    td1.attr("id", "playerNameRow");
    td2.attr("id", "pointsRow");
    td3.attr("id", "2ptsRow");
    td4.attr("id", "3ptsRow");
    td5.attr("id", "freeThrowRow");
    td6.attr("id", "2pts%Row");
    td7.attr("id", "3pts%Row");
    td8.attr("id", "freeThrow%Row");

    td1.html(fullName);
    td2.html(seasonAccess.points);
    console.log("season pts", seasonAccess.points);
    td3.html(seasonAccess.fieldGoalMade);
    td4.html(seasonAccess.fieldGoal3Made);
    td5.html(seasonAccess.freeThrowMade);
    td6.html(seasonAccess.fieldGoalPct);
    td7.html(seasonAccess.fieldGoal3Pct);
    td8.html(seasonAccess.freeThrowPct);

    trow.append(td1);
    trow.append(td2);
    trow.append(td3);
    trow.append(td4);
    trow.append(td5);
    trow.append(td6);
    trow.append(td7);
    trow.append(td8);

    tbody.prepend(trow);
  };

  const updatePlayerNews = (topArticles) => {
    $("#article-section").empty();
    let numberOfArticles;

    numberOfArticles = $("#article-count").val();
    console.log(numberOfArticles);
    // debugger;
    let i;
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

  // typeahead + debounce
  // add event listener to the keyup/or down on the search box
  // call the debounce function
  // debounce function calls the API passing the search value through
  // return list of top 10 players
  // render players in dropdown list
  // add a "listener" to those options to import there .textContent
  // into the search box
  // when below 3 characters, .clear() dropdown List

  const ballDontLieApiCall = (playerName) =>
    new Promise((resolve, reject) => {
      let playerData = [];

      $.ajax({
        url: buildBallQueryURL(playerName),
        method: "GET",
      }).then(function (response) {
        const players = response.data.slice(0, 10);

        // collection of objects

        // conveniently cuts if there are less than 10 protecting the for loop
        // eachplayer replaces response.data[i] in the for loop
        players.forEach(function (eachPlayer) {
          const currentPlayer = {};

          let playerFirstName = eachPlayer.first_name;
          let playerLastName = eachPlayer.last_name;
          let playerId = eachPlayer.id;
          let playerTeam = eachPlayer.team.full_name;
          let playerTeamAbbr = eachPlayer.team.abbreviation;

          currentPlayer.fullName = playerFirstName + " " + playerLastName;
          currentPlayer.id = playerId;
          currentPlayer.teamName = playerTeam;
          currentPlayer.playerTeamAbbr = playerTeamAbbr;

          playerData.push(currentPlayer);
        });

        resolve(playerData);
      });
    });

  const buildSeasonAverageURL = (id) => {
    let seasonAverageURL = "https://www.balldontlie.io/api/v1/season_averages?";
    let querySeasonParams = {};
    let playerID = id;

    querySeasonParams["player_ids[]"] = playerID;

    console.log(seasonAverageURL + $.param(querySeasonParams));

    return seasonAverageURL + $.param(querySeasonParams);
  };
  const ballDontLieSeasonAverageCall = (id) =>
    new Promise((resolve, reject) => {
      $.ajax({
        url: buildSeasonAverageURL(id),
        method: "GET",
      }).then(function (seasonAverages) {
        if (seasonAverages.data.length === 0) {
          resolve(false);
        } else {
          let seasonStats = {};

          let gamesPlayed = seasonAverages.data[0].games_played;
          let season = seasonAverages.data[0].season;
          let avgMinutesPlayed = seasonAverages.data[0].min;
          let fieldGoalMade = seasonAverages.data[0].fgm;
          let fieldGoalAttempt = seasonAverages.data[0].fga;
          let fieldGoal3Made = seasonAverages.data[0].fg3m;
          let fieldGoal3Attempt = seasonAverages.data[0].fg3a;
          let freeThrowMade = seasonAverages.data[0].ftm;
          let freeThrowAttempt = seasonAverages.data[0].fta;
          let offensiveRebound = seasonAverages.data[0].oreb;
          let defensiveRebound = seasonAverages.data[0].dreb;
          // let rebounds = seasonAverages.data[0].reb;
          let assists = seasonAverages.data[0].ast;
          let steals = seasonAverages.data[0].stl;
          let blocks = seasonAverages.data[0].blk;
          let turnovers = seasonAverages.data[0].turnover;
          let personalFouls = seasonAverages.data[0].pf;
          let points = seasonAverages.data[0].pts;
          let fieldGoalPct = ((fieldGoalMade / fieldGoalAttempt) * 100).toFixed(
            2
          );
          let fieldGoal3Pct = (
            (fieldGoal3Made / fieldGoal3Attempt) *
            100
          ).toFixed(2);
          let freeThrowPct = ((freeThrowMade / freeThrowAttempt) * 100).toFixed(
            2
          );

          seasonStats.gamesPlayed = gamesPlayed;
          seasonStats.season = season;
          seasonStats.avgMinutesPlayed = avgMinutesPlayed;
          seasonStats.fieldGoalMade = fieldGoalMade;
          seasonStats.fieldGoalAttempt = fieldGoalAttempt;
          seasonStats.fieldGoal3Made = fieldGoal3Made;
          seasonStats.fieldGoal3Attempt = fieldGoal3Attempt;
          seasonStats.freeThrowMade = freeThrowMade;
          seasonStats.freeThrowAttempt = freeThrowAttempt;
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

          console.log("season stats before resolve ----", seasonStats);
          resolve({ seasonStats });
        }
      });
    });

  const nytPlayerApiCall = (fullName) =>
    new Promise((resolve, reject) => {
      $.ajax({
        url: buildNytQueryURL(fullName),
        method: "GET",
      }).then(updatePlayerNews);
    });

  // is meant to trigger on "SEARCH"
  const searchPlayerOfInterest = async (playerName) => {
    playerName = playerName.toLowerCase();
    $("#player-search").val("");
    try {
      const playerData = await ballDontLieApiCall(playerName);
      saveLastSearchToLocalStorage(playerName);
      const seasonStats = await ballDontLieSeasonAverageCall(playerData[0].id);
      if (seasonStats) {
        updatePlayerProfile(
          seasonStats,
          playerData[0].fullName,
          playerData[0].id
        );
      } else if (!seasonStats) {
        $("#noCurrentSeasonStats").show().fadeOut(3000);
      }
      const topArticles = await nytPlayerApiCall(playerData[0].fullName);
    } catch (error) {
      $("#searchErrorNotice").show().fadeOut(2500);
    }
  };

  // called when search button is clicked
  const searchPlayer = (event) => {
    event.preventDefault();
    // check if |OR| works in jQuery select
    let playerName = $("#player-search").val().trim();
    searchPlayerOfInterest(playerName);
  };

  $(document).ready(function () {
    $("#player-search").val("");
    $("#noCurrentSeasonStats").hide();
    let errorDetected = $("#searchErrorNotice");
    errorDetected.hide();
    let previousPlayers = getSavedPlayersFromLocalStorage();
    createLastPlayerSearchEl(previousPlayers);
    // updatePlayerProfile(previousPlayers);

    // news persistence of last searched
    let lastSearchedPlayer = Object.keys(previousPlayers).pop();
    if (typeof lastSearchedPlayer !== "undefined") {
      nytPlayerApiCall(lastSearchedPlayer);
    }
  });

  const getSavedPlayersFromLocalStorage = () => {
    let previousPlayersStringified = localStorage.getItem("previousPlayers");
    let previousPlayers = JSON.parse(previousPlayersStringified);
    if (previousPlayers == null) {
      return {};
    }

    return previousPlayers;
  };

  const saveLastSearchToLocalStorage = (playerName) => {
    if (!playerName) {
      return;
    }
    const previousPlayers = getSavedPlayersFromLocalStorage();
    const updatedPlayers = { ...previousPlayers, [playerName]: 1 };
    let playerKeys = Object.keys(updatedPlayers);
    if (playerKeys.length > 5) {
      delete updatedPlayers[playerKeys[0]];
    }
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

  const clearCurrentPlayerProfileAndNews = () => {};

  const clearPreviousSearchHistory = () => {};

  $("#submit-button").click(searchPlayer);

  // $("#player-search").on("keyup", function (event) {
  //   event.preventDefault();
  //   if (event.code == "13") {
  //     $("#submit-button").click(searchPlayer);
  //   }
  // });

  //end of $ ready function
});

const broadSpectrumGet = () =>
  new Promise((resolve, reject) => {
    userInput = $("#search-input").val().trim();
    var queryplayerURL =
      "https://balldontlie-example.herokuapp.com/search?name=" + userInput;
    $.ajax({
      url: queryplayerURL,
      method: "GET",
    }).then(function (response) {
      // i want to get player data here
      resolve({ playerData });
    });
  });

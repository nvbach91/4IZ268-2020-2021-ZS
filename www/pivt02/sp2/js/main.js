var GoogleAuth;
var isAuthorized;
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const spreadsheetId = "1Y2Bvmysv6gdX958EJohAKXxUa5eEc80p-i4QKs7Zhak";

function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

function initClient() {
  var discoveryUrl =
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";

  gapi.client
    .init({
      apiKey: "AIzaSyDuViDmbJqnKjsBHoJOWH5nwubMiBWoCH4",
      clientId:
        "335042291556-a4kjdevtnr5konjcp7nih5argfejh5e2.apps.googleusercontent.com",
      discoveryDocs: [
        "https://sheets.googleapis.com/$discovery/rest?version=v4",
      ],
      scope: SCOPE,
    })
    .then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      GoogleAuth.isSignedIn.listen(updateSigninStatus);

      var user = GoogleAuth.currentUser.get();
      setSigninStatus();

      $("#sign-in-or-out-button").click(function () {
        handleAuthClick();
      });
      $("#revoke-access-button").click(function () {
        revokeAccess();
      });
    });
}

function handleAuthClick() {
  if (GoogleAuth.isSignedIn.get()) {
    GoogleAuth.signOut();
  } else {
    GoogleAuth.signIn();
  }
}
function revokeAccess() {
  GoogleAuth.disconnect();
}

function guestAcess() {
  isAuthorized = true;
}

function setSigninStatus() {
  var user = GoogleAuth.currentUser.get();
  isAuthorized = user.hasGrantedScopes(SCOPE);
  if (isAuthorized) {
    $("#sign-in-or-out-button").html("Sign out");
    $("#revoke-access-button").css("display", "inline-block");
    $("#auth-status").html(
      "You are currently signed in and have granted " + "access to this app."
    );
    $("#login-warning").css("display", "none");
    $(".planner").css("display", "inline-block");
    $("#revoke-access-button").css("display", "none");
    $(".sign-in").css("height", "200px");
    $("main").css("max-width", "1100px");
    $("#form").css("display", "block");
    getSumOfHours();
  } else {
    $("#form").css("display", "none");
    $("main").css("max-width", "500px");
    $(".sign-in").css("height", "200px");
    $("#login-warning").css("display", "inline-block");
    $(".planner").css("display", "none");
    $("#sign-in-or-out-button").html("Sign in with Google Account");
    $("#revoke-access-button").css("display", "none");
  }
}

function updateSigninStatus() {
  setSigninStatus();
}

function getSumOfHours() {
  var params = {
    spreadsheetId: spreadsheetId,
    range: "AD33:AF33",
    valueRenderOption: "FORMATTED_VALUE",
    dateTimeRenderOption: "FORMATTED_STRING",
  };

  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(
    function (response) {
      console.log(response.result);
      console.log(response.result.values[0]);
      insertSumOfHours(response.result.values[0]);
    },
    function (reason) {
      console.error("error: " + reason.result.error.message);
    }
  );
}

function insertSumOfHours(array) {
  $("#milan-hours").text(array[0]);
  console.log(array[0]);
  $("#tomas-hours").text(array[1]);
  console.log(array[1]);
  $("#vojtech-hours").text(array[2]);
  console.log(array[2]);
}

function getRowNumber() {
  var dates = [
    "01.02.2021",
    "02.02.2021",
    "03.02.2021",
    "04.02.2021",
    "05.02.2021",
    "06.02.2021",
    "07.02.2021",
    "08.02.2021",
    "09.02.2021",
    "10.02.2021",
    "11.02.2021",
    "12.02.2021",
    "13.02.2021",
    "14.02.2021",
    "15.02.2021",
    "16.02.2021",
    "17.02.2021",
    "18.02.2021",
    "19.02.2021",
    "20.02.2021",
    "21.02.2021",
    "22.02.2021",
    "23.02.2021",
    "24.02.2021",
    "25.02.2021",
    "26.02.2021",
    "27.02.2021",
    "28.02.2021",
  ];
  var index = dates.indexOf(parseDate());
  return (index + 4).toString();
}

function writeAllDayToSpreadsheet() {
  var sheetParams = {
    spreadsheetId: spreadsheetId,
  };
  var range;
  var breakValues;
  var employeeLetter = $("#employees").val().charAt(0);
  var dataValues = (employeeLetter + ("," + employeeLetter).repeat(19)).split(
    ","
  );
  console.log(dataValues);
  if (isWeekend()) {
    breakValues = [
      [
        "BREAK",
        "BREAK",
        "BREAK",
        "BREAK",
        "BREAK",
        "BREAK",
        "BREAK",
        "BREAK",
        "BREAK",
        "BREAK",
      ],
    ];
    range = "P" + getRowNumber() + ":Y" + getRowNumber();
  } else {
    breakValues = [["BREAK"]];
    range = "P" + getRowNumber();
  }
  var batchUpdateValuesRequestBody = {
    valueInputOption: "USER_ENTERED",
    data: [
      {
        majorDimension: "ROWS",
        range: "F" + getRowNumber() + ":Y" + getRowNumber(),
        values: [dataValues],
      },
      {
        majorDimension: "ROWS",
        range: range,
        values: breakValues,
      },
    ],
  };
  var request = gapi.client.sheets.spreadsheets.values.batchUpdate(
    sheetParams,
    batchUpdateValuesRequestBody
  );
  request.then(
    function (response) {
      console.log(response.result);
    },
    function (reason) {
      console.error("error: " + reason.result.error.message);
    }
  );
}

function writeSpecificTimeToSpreadsheet() {
  Array.from(document.querySelector("#time").options).forEach(function (
    option_element
  ) {
    let isOptionSelected = option_element.selected;
    if (isOptionSelected) {
      var sheetParams = {
        spreadsheetId: spreadsheetId,
      };
      var dataValues = [$("#employees").val().charAt(0)];
      var batchUpdateValuesRequestBody = {
        valueInputOption: "USER_ENTERED",
        data: [
          {
            majorDimension: "ROWS",
            range: option_element.value + getRowNumber(),
            values: [dataValues],
          },
        ],
      };
      var request = gapi.client.sheets.spreadsheets.values.batchUpdate(
        sheetParams,
        batchUpdateValuesRequestBody
      );
      request.then(
        function (response) {
          console.log(response.result);
        },
        function (reason) {
          console.error("error: " + reason.result.error.message);
        }
      );
    }
  });
}

function parseDate() {
  var datum = moment(document.getElementById("date").value);
  moment.locale();
  datum = datum.lang("cs").format("L");
  return datum.toString();
}

function isWeekend() {
  var date = new Date(document.getElementById("date").value);
  return date.getDay() === 6 || date.getDay() === 0;
}

$(document).ready(function () {
  $(document).on("click", "#specific-time", function () {
    if ($("#specific-time").is(":checked")) {
      $("#time").removeAttr("disabled");
    }
  });

  $(document).on("click", "#allday", function () {
    if ($("#allday").is(":checked")) {
      $("#time").attr("disabled", "");
    }
  });

  $("#date").change(function () {
    var arrayOfTimes = Array.from(document.querySelector("#time").options);
    if (isWeekend()) {
      arrayOfTimes.forEach(function (option_element) {
        if (
          option_element.value === "Q" ||
          option_element.value === "R" ||
          option_element.value === "S" ||
          option_element.value === "T" ||
          option_element.value === "U" ||
          option_element.value === "V" ||
          option_element.value === "W" ||
          option_element.value === "X" ||
          option_element.value === "Y"
        ) {
          $(option_element).attr("disabled", "");
        }
      });
    } else {
      arrayOfTimes.forEach(function (option_element) {
        $(option_element).removeAttr("disabled");
      });
    }
  });

  $(document).on("click", "#schedule", function () {
    if (document.getElementById("allday").checked) {
      writeAllDayToSpreadsheet();
    } else {
      writeSpecificTimeToSpreadsheet();
    }
    $("#gsheet").css("display", "hide");
    $("#gsheet").css("width", "0px");
    $("#gsheet").css("height", "0px");
    $(".planner img").css("display", "block");
    $("#sumOfHours").css("display", "none");
    setTimeout(function () {
      $("#gsheet").attr("src", $("#gsheet").attr("src"));
      getSumOfHours();
    }, 500);
    setTimeout(function () {
      $(".planner img").css("display", "none");
      $("#gsheet").css("display", "block");
      $("#gsheet").css("width", "");
      $("#gsheet").css("height", "670px");
      $("#sumOfHours").css("display", "block");
    }, 1000);
  });

  $(window).load(function () {
    setTimeout(function () {
      $("#loading").hide();
      $(".to-load").css("display", "block");
    }, 400);
  });
});

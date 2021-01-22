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
      const signInOutButton = $("#sign-in-or-out-button");
      const revokeButton = $("#revoke-access-button");
      GoogleAuth = gapi.auth2.getAuthInstance();

      GoogleAuth.isSignedIn.listen(updateSigninStatus);

      var user = GoogleAuth.currentUser.get();
      setSigninStatus();

      signInOutButton.click(function () {
        handleAuthClick();
      });
      revokeButton.click(function () {
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
  const signInOutButton = $("#sign-in-or-out-button");
  const loginWarning = $("#login-warning");
  const revokeButton = $("#revoke-access-button");
  const forms = $(".flexbox");
  const main = $("main");
  const planner = $(".planner");
  const signIn = $(".sign-in");
  var user = GoogleAuth.currentUser.get();
  isAuthorized = user.hasGrantedScopes(SCOPE);
  if (isAuthorized) {
    signInOutButton.html("Sign out");
    revokeButton.css("display", "inline-block");
    loginWarning.css("display", "none");
    planner.css("display", "inline-block");
    revokeButton.css("display", "none");
    signIn.css("height", "200px");
    main.css("max-width", "1100px");
    forms.css("display", "flex");
    getSumOfHours();
  } else {
    forms.css("display", "none");
    main.css("max-width", "500px");
    signIn.css("height", "200px");
    loginWarning.css("display", "inline-block");
    planner.css("display", "none");
    signInOutButton.html("Sign in with Google Account");
    revokeButton.css("display", "none");
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
      //console.log(response.result);
      insertSumOfHours(response.result.values[0]);
    },
    function (reason) {
     // console.error("error: " + reason.result.error.message);
    }
  );
}

function insertSumOfHours(array) {
  const milanHours = $("#milan-hours");
  const tomasHours = $("#tomas-hours");
  const vojtechHours = $("#vojtech-hours");
  milanHours.text(array[0]);
  vojtechHours.text(array[1]);
  tomasHours.text(array[2]);
}

function getRowNumber(dateId) {
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
  var index = dates.indexOf(parseDate(dateId));
  return (index + 4).toString();
}

function writeAllDayToSpreadsheet() {
  const employees = $("#employees");
  var sheetParams = {
    spreadsheetId: spreadsheetId,
  };
  var range;
  var breakValues;
  var employeeLetter = employees.val().charAt(0);
  var dataValues = (employeeLetter + ("," + employeeLetter).repeat(19)).split(
    ","
  );
  if (isWeekend("#date")) {
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
    range = "P" + getRowNumber("#date") + ":Y" + getRowNumber("#date");
  } else {
    breakValues = [["BREAK"]];
    range = "P" + getRowNumber("#date");
  }
  var batchUpdateValuesRequestBody = {
    valueInputOption: "USER_ENTERED",
    data: [
      {
        majorDimension: "ROWS",
        range: "F" + getRowNumber("#date") + ":Y" + getRowNumber("#date"),
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
      //console.log(response.result);
    },
    function (reason) {
      //console.error("error: " + reason.result.error.message);
    }
  );
}

function writeSpecificTimeToSpreadsheet() {
  Array.from(document.querySelector("#time").options).forEach(function (
  //Array.from($('#time option').forEach(function (
    option_element
  ) {
    const employees = $("#employees");
    let isOptionSelected = option_element.selected;
    if (isOptionSelected) {
      var sheetParams = {
        spreadsheetId: spreadsheetId,
      };
      var dataValues = [employees.val().charAt(0)];
      var batchUpdateValuesRequestBody = {
        valueInputOption: "USER_ENTERED",
        data: [
          {
            majorDimension: "ROWS",
            range: option_element.value + getRowNumber("#date"),
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
          //console.log(response.result);
        },
        function (reason) {
         // console.error("error: " + reason.result.error.message);
        }
      );
    }
  });
}

function clearSpreadsheet(){
  Array.from(document.querySelector("#clear-time").options).forEach(function (
    option_element
  ) {
    let isOptionSelected = option_element.selected;
    if (isOptionSelected) {
      var sheetParams = {
        spreadsheetId: spreadsheetId,
      };
      var dataValues =[""];
      var batchUpdateValuesRequestBody = {
        valueInputOption: "USER_ENTERED",
        data: [
          {
            majorDimension: "ROWS",
            range: option_element.value + getRowNumber("#date-clear"),
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

function parseDate(dateId) {
  var date = moment($(dateId).val());
  moment.locale();
  date= date.lang("cs").format("L");
  return date.toString();
}

function isWeekend(dateId) {
  var date = new Date($(dateId).val());
  return date.getDay() === 6 || date.getDay() === 0;
}

function disableWeekendTimes(dateSelector, timeSelector){
    var arrayOfTimes = Array.from(document.querySelector(timeSelector).options);
    if (isWeekend(dateSelector)) {
      arrayOfTimes.forEach(function (option_element) {
        if (
         ["Q","R","S","T","U","V","W","X","Y"].includes(option_element.value)
        ) {
          $(option_element).attr("disabled", "");
        }
      });
    } else {
      arrayOfTimes.forEach(function (option_element) {
        $(option_element).removeAttr("disabled");
      });
    }
}

function reloadSpreadsheet(){
  const spreadsheet = $("#gsheet");
  const loading = $(".planner img");
  const bottomTable = $("#sumOfHours");
    spreadsheet.css("display", "hide");
    spreadsheet.css("width", "0px");
    spreadsheet.css("height", "0px");
    loading.css("display", "block");
    bottomTable.css("display", "none");
    setTimeout(function () {
      spreadsheet.attr("src", spreadsheet.attr("src"));
      getSumOfHours();
    }, 500);
    setTimeout(function () {
      loading.css("display", "none");
      spreadsheet.css("display", "block");
      spreadsheet.css("width", "");
      spreadsheet.css("height", "670px");
      spreadsheet.css("display", "block");
    }, 1000);
}

$(document).ready(function () {
  const date = $("#date");
  const dateClear = $("#date-clear");
  const loading = $("#loading");
  const toLoad = $(".to-load");
  const time = $("#time");
  const allDay = $("#allday")
  $(document).on("click", "#specific-time", function () {
    if ($("#specific-time").is(":checked")) {
      time.removeAttr("disabled");
    }
  });

  $(document).on("click", "#allday", function () {
    if (allDay.is(":checked")) {
     time.attr("disabled", "");
    }
  });

  dateClear.change(function(){
    console.log();
    disableWeekendTimes("#date-clear", "#clear-time");
  })


  date.change(function () {
    disableWeekendTimes("#date", "#time");
  });

  $(document).on("click", "#clear", function () {
    clearSpreadsheet();
    reloadSpreadsheet();
  });

  $(document).on("click", "#schedule", function () {
    if (document.getElementById("allday").checked) {
      writeAllDayToSpreadsheet();
    } else {
      writeSpecificTimeToSpreadsheet();
    }
    reloadSpreadsheet();
  });

  $(window).load(function () {
    setTimeout(function () {
      loading.hide();
      toLoad.css("display", "block");
    }, 400);
  });
});


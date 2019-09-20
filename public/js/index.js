

// Get references to page elements
var $teamName = $("#teamData-name");
var $teamDescription = $("#teamData-description");
var $submitBtn = $("#submit");
var $teamDataList = $("#teamData-list");
var $joinTeam1 = $(".joinTeam1");
var $deleteMember1 = $("#deleteMember1");
var $deleteMember2 = $("#deleteMember2");
var $deleteMember3 = $("#deleteMember3");
var $deleteMember4 = $("#deleteMember4");
var $deleteMember5 = $("#deleteMember5");
var $deleteMember6 = $("#deleteMember6");


// The API object contains methods for each kind of request we'll make
var API = {
  saveTeam: function (teamData) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/TeamDatas",
      data: JSON.stringify(teamData)
    });
  },
  getTeams: function () {
    return $.ajax({
      url: "api/TeamDatas",
      type: "GET"
    });
  },
  deleteTeam: function (id) {
    return $.ajax({
      url: "api/TeamDatas/" + id,
      type: "DELETE"
    });
  },
  joinTeam: function (id) {
    return $.ajax({
      url: "/api/userData/" + id,
      type: "GET"
    })
  },
  deleteMember: function (id, member) {
    return $.ajax({
      url: "/api/deleteUserData/" + id + "/" + member,
      type: "GET"
    })
  }
};

// refreshTeamList gets new teams from the db and repopulates the list
var refreshTeamList = function () {
  API.getTeams().then(function (data) {
    var $teamData = data.map(function (teamData) {
      var $a = $("<a>")
        .text(teamData.teamName)
        .attr("href", "/teamData/" + teamData.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": teamData.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $teamDataList.empty();
    $teamDataList.append($teamData);
  });
};


// handleFormSubmit is called whenever we submit a new team
// Save the new team to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var teamData = {
    teamName: $teamName.val().trim(),
    teamDescription: $teamDescription.val().trim()
  };

  if (!(teamData.teamName && teamData.teamDescription)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveTeam(teamData).then(function () {
    refreshTeamList();
  });

  $teamName.val("");
  $teamDescription.val("");
};

// handleDeleteBtnClick is called when an team's delete button is clicked
// Remove the team from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this).parent().attr("data-id");
  API.deleteTeam(idToDelete).then(function () {
    refreshTeamList();
  });
};

var handleDeleteBtnClickMember = function () {
  var idToDelete = $(this).parent().attr("data-id");
  var memberToDelete = $(this).parent().attr("data-member")
  API.deleteMember(idToDelete, memberToDelete).then(function() {
    console.log("Deleted Member");
  })
  setTimeout(location.reload.bind(location), 1500);
}

var joinTeam1 = function () {
  var idToJoin = $(this).attr("data-id");
  API.joinTeam(idToJoin).then(function () {
    console.log("joined");
  })
  setTimeout(location.reload.bind(location), 1500);
}


// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$teamDataList.on("click", ".delete", handleDeleteBtnClick);
$joinTeam1.on("click", joinTeam1);
$deleteMember1.on("click", handleDeleteBtnClickMember);
$deleteMember2.on("click", handleDeleteBtnClickMember);
$deleteMember3.on("click", handleDeleteBtnClickMember);
$deleteMember4.on("click", handleDeleteBtnClickMember);
$deleteMember5.on("click", handleDeleteBtnClickMember);
$deleteMember6.on("click", handleDeleteBtnClickMember);

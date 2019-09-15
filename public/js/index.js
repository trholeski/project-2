// Get references to page elements
var $teamName = $("#teamData-name");
var $teamDescription = $("#teamData-description");
var $submitBtn = $("#submit");
var $teamDataList = $("#teamData-list");
var $joinTeam1 = $(".joinTeam1");
var $joinTeam2 = $(".joinTeam2");
var $joinTeam3 = $(".joinTeam3");
var $joinTeam4 = $(".joinTeam4");
var $joinTeam5 = $(".joinTeam5");
var $joinTeam6 = $(".joinTeam6");
var $closeJoinTeam = $(".closeJoinTeam");

// The API object contains methods for each kind of request we'll make
var API = {
  saveTeam: function(teamData) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/TeamDatas",
      data: JSON.stringify(teamData)
    });
  },
  getTeams: function() {
    return $.ajax({
      url: "api/TeamDatas",
      type: "GET"
    });
  },
  deleteTeam: function(id) {
    return $.ajax({
      url: "api/TeamDatas/" + id,
      type: "DELETE"
    });
  },
};

// refreshTeamList gets new teams from the db and repopulates the list
var refreshTeamList = function() {
  API.getTeams().then(function(data) {
    var $teamData = data.map(function(teamData) {
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
var handleFormSubmit = function(event) {
  event.preventDefault();

  var teamData = {
    teamName: $teamName.val().trim(),
    teamDescription: $teamDescription.val().trim()
  };

  if (!(teamData.teamName && teamData.teamDescription)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveTeam(teamData).then(function() {
    refreshTeamList();
  });

  $teamName.val("");
  $teamDescription.val("");
};

// handleDeleteBtnClick is called when an team's delete button is clicked
// Remove the team from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this).parent().attr("data-id");
  API.deleteTeam(idToDelete).then(function() {
    refreshTeamList();
  });
};

var joinTeam1 = function() {
  $("#joinTeamForm1").css("display", "block");
}
var joinTeam2 = function() {
  $("#joinTeamForm2").css("display", "block");
}
var joinTeam3 = function() {
  $("#joinTeamForm3").css("display", "block");
}
var joinTeam4 = function() {
  $("#joinTeamForm4").css("display", "block");
}
var joinTeam5 = function() {
  $("#joinTeamForm5").css("display", "block");
}
var joinTeam6 = function() {
  $("#joinTeamForm6").css("display", "block");
}

var closeJoinTeam = function() {
  $("#joinTeamForm1").css("display", "none");
  $("#joinTeamForm2").css("display", "none");
  $("#joinTeamForm3").css("display", "none");
  $("#joinTeamForm4").css("display", "none");
  $("#joinTeamForm5").css("display", "none");
  $("#joinTeamForm6").css("display", "none");
}


// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$teamDataList.on("click", ".delete", handleDeleteBtnClick);
$joinTeam1.on("click", joinTeam1);
$joinTeam2.on("click", joinTeam2);
$joinTeam3.on("click", joinTeam3);
$joinTeam4.on("click", joinTeam4);
$joinTeam5.on("click", joinTeam5);
$joinTeam6.on("click", joinTeam6);
$closeJoinTeam.on("click", closeJoinTeam);

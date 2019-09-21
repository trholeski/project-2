$(document).ready(function () {
    var platform = 'pc';

    var region = 'us';

    var battletag = localStorage.getItem('battletag');

    var queryURL = `https://ow-api.com/v1/stats/${platform}/${region}/${battletag}/profile`;

    $.ajax({
        url: queryURL,
        response: {
            format: 'json'
        },
        method: 'GET',
    }).then(function (response) {
        console.log(JSON.stringify(response));

        //see profile icon
        console.log(response.icon);

        //see battletag name
        console.log('battle tag:' + response.name);

        //see overwatch profile level
        console.log('profile level: ' + response.level);

        //see overwatch level icon
        console.log('level icon: ' + response.levelIcon);

        //see prestige level
        console.log('prestige level: ' + response.prestige);

        //see prestige icon
        console.log('prestige icon: ' + response.prestigeIcon);


        //get rating
        console.log('rating: ' + response.rating);

        //get rating icon
        console.log('rating icon: ' + response.ratingIcon);

        //rating icon
        $('#compPic').attr('src', response.ratingIcon);

        //games won overall
        console.log('games won: ' + response.gamesWon);

        //see quickplaystats
        console.log(response.quickPlayStats);

        //see awards for quickplay
        console.log(response.quickPlayStats.awards.medalsBronze);
        console.log(response.quickPlayStats.awards.medalsSilver);
        console.log(response.quickPlayStats.awards.medalsGold);

        //see competitive stats
        console.log(response.competitiveStats.games);

        //put battletag in heading
        $('#heading').append(`${response.name} Profile`);

        //change profile pic in profile page
        $('#profilePic').attr('src', response.icon);

        //append profile level to profile page
        $("#stats").append(`<li>Level: ${response.level}</li>`);

        //append prestige level
        $("#stats").append(`<li>Prestige Level: ${response.prestige}</li>`);

        //append overall games won
        $('#stats').append(`<li>Games Won: ${response.gamesWon}</li>`);

                //gold awards
        $('#stats').append(`<li>Gold Awards: ${response.quickPlayStats.awards.medalsGold}</li>`);

        //silver awards
        $('#stats').append(`<li>Silver Awards: ${response.quickPlayStats.awards.medalsSilver}</li>`);

        //bronze awards
        $('#stats').append(`<li>Bronze Awards: ${response.quickPlayStats.awards.medalsBronze}</li>`);


        //append competitive stats

        //append rating
        $("#compStats").append(`<li>Competitive Rating: ${response.rating}</li>`);

        //append games played
        $('#compStats').append(`<li>Games Played: ${response.competitiveStats.games.played}</li>`);

        //append competitive games won
        $('#compStats').append(`<li>Games Won: ${response.competitiveStats.games.won}</li>`);

        //append awards
        
        //gold awards
        $('#compStats').append(`<li>Gold Awards: ${response.competitiveStats.awards.medalsGold}</li>`);

        //silver awards
        $('#compStats').append(`<li>Silver Awards: ${response.competitiveStats.awards.medalsSilver}</li>`);

        //bronze awards
        $('#compStats').append(`<li>Bronze Awards: ${response.competitiveStats.awards.medalsBronze}</li>`);

        localStorage.removeItem('favoriteflavor');

    });
});
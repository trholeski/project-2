$(document).ready(function () {
    var platform = 'pc';

    var region = 'us';

    var battletag = 'Choihyobin-3336';

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





    });
});

//overwatch api
// {
//     "icon": "https://blzgdapipro-a.akamaihd.net/game/unlocks/0x025000000000114C.png",
//     "name": "cats",
//     "level": 100,
//     "levelIcon": "https://blzgdapipro-a.akamaihd.net/game/playerlevelrewards/0x0250000000000951_Border.png",
//     "prestige": 2,
//     "prestigeIcon": "https://blzgdapipro-a.akamaihd.net/game/playerlevelrewards/0x0250000000000951_Rank.png",
//     "rating": "1896",
//     "ratingIcon": "https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-2.png",
//     "gamesWon": 734,
//     "quickPlayStats": {
//         "eliminationsAvg": 11.77,
//         "damageDoneAvg": 5358,
//         "deathsAvg": 5.88,
//         "finalBlowsAvg": 5.6,
//         "healingDoneAvg": 1100,
//         "objectiveKillsAvg": 4.29,
//         "objectiveTimeAvg": "00:32",
//         "soloKillsAvg": 1.67,
//         "games": {
//             "played": 0,
//             "won": 716
//         },
//         "awards": {
//             "cards": 427,
//             "medals": 3487,
//             "medalsBronze": 1207,
//             "medalsSilver": 1186,
//             "medalsGold": 1094
//         }
//     },
//     "competitiveStats": {
//         "eliminationsAvg": 22.25,
//         "damageDoneAvg": 12056,
//         "deathsAvg": 9.76,
//         "finalBlowsAvg": 11.76,
//         "healingDoneAvg": 2392,
//         "objectiveKillsAvg": 9.82,
//         "objectiveTimeAvg": "01:10",
//         "soloKillsAvg": 2.53,
//         "games": {
//             "played": 39,
//             "won": 18
//         },
//         "awards": {
//             "cards": 17,
//             "medals": 108,
//             "medalsBronze": 40,
//             "medalsSilver": 36,
//             "medalsGold": 32
//         }
//     }
// }
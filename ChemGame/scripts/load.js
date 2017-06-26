var unlocked = 1;
var cookiesEnabled = true; // Set this to false if locally
                           // developing on chrome

$(document).ready(function() {
    if ((Cookies.get('surveyed') === undefined) && cookiesEnabled) {
        window.location.replace('pretest.html');
        return;
    }
    if (typeof Cookies.get('q1') !== 'undefined') {
        logPretestResults();
        cleanPretestCookies();
    }

    if (Cookies.get('unlocked') === undefined) {
        Cookies.set('unlocked', unlocked);
    } else {
        unlocked = parseInt(Cookies.get('unlocked'));
    }
    homeScreen();
});

function homeScreen() {
    $(document.body).empty();
    var $tutorialButton = $("<button>", {
        class:"index_button tutorial shadow",
        text:"Start",
        onClick:"stateModule.initializeLevel(1)"
    });

    var $startButton = $("<button>", {
        class:"index_button start shadow",
        text:"Levels",
        onClick: "showLevels()"
    });

    var $index_main = $("<div>", {class: "index_main"});
    $index_main.append("<img class='index_logo' src='img/logo.svg'>");
    $index_main.append($tutorialButton);
    $index_main.append($startButton);
    $(document.body).append($index_main);
}

function showLevels() {
    $(document.body).empty();
    $(".level_box").css("overflow", "scroll");
    var $levelMain = $("<div>", {class: "level_main"});
    $levelMain.append("<p>Choose a level to start from!</p>");

    var $levelBox = $("<div>", {class: "level_box"});
    console.log("unlocked: " + unlocked);
    
    for (var i = 1; i <= unlocked; i++) {
        $levelBox.append("<div class='pot_box_unlocked shadow' onClick='stateModule.initializeLevel(" 
                          + i + ")'>Lv." + i + "</div>");
    }
    
    var numLevels = 25;
    for (var i = unlocked+1; i <= numLevels; i++) {
        console.log(i);
        //$levelBox.append("<div class='pot_box'>Lv." + i + "</div>");
        $levelBox.append("<div class='pot_box'>.</div>");
    }

    $(document.body).append($levelMain);
    $(document.body).append($levelBox);
}

// ------------------------------------------------------
// Cookies and AJAX functions 
// -----------------------------------------------------
function endPretest() {
    var currentTimestamp = Math.floor(Date.now() / 1000);
    $.ajax({
        url:"https://gdiac.cs.cornell.edu/cs6360/fall2016/player_quest_end.php",
        data: {
            "dynamic_quest_id": Cookies.get('dynamic_quest_id'),
        },
        dataType: "jsonp",

        success: function(data) {
        },

        error: function() {
            console.log("Error ending pretest");
        },
    });
}

function logPretestResults() {
    var currentTimestamp = Math.floor(Date.now() / 1000);
    var actionDetail = {
        "q1": Cookies.get("q1"),
        "q1expl": Cookies.get("q1Exp"),
        "q2": Cookies.get("q2"),
        "q3": Cookies.get("q3"),
        // test 1 
        "t1_1": Cookies.get('t1_1'),
        "t1_2": Cookies.get('t1_2'),
        "t1_3": Cookies.get('t1_3'),
        // test 2
        "t2_1": Cookies.get('t2_1'),
        "t2_2": Cookies.get('t2_2'),
        "t2_3": Cookies.get('t2_3'),
        "t2_4": Cookies.get('t2_4'),
        // test 3
        "t3_1": Cookies.get('t3_1'),
        "t3_2": Cookies.get('t3_2'),
        "t3_3": Cookies.get('t3_3'),
        "t3_4": Cookies.get('t3_4'),
        // test 4
        "t4_1": Cookies.get('t4_1'),
        "t4_2": Cookies.get('t4_2'),
        "t4_3": Cookies.get('t4_3'),
        "t4_4": Cookies.get('t4_4'),
        // test 5
        "t5_1": Cookies.get('t5_1'),
        "t5_2": Cookies.get('t5_2'),
        "t5_3": Cookies.get('t5_3'),
        "t5_4": Cookies.get('t5_4'),
        // test 6
        "t6_1": Cookies.get('t6_1'),
        "t6_2": Cookies.get('t6_2'),
        "t6_3": Cookies.get('t6_3'),
        "t6_4": Cookies.get('t6_4'),
    };
    var dynamic_quest_id;
    $.ajax({
        url:"https://gdiac.cs.cornell.edu/cs6360/fall2016/player_action.php",
        data: {
            "game_id": 2,
            "client_timestamp": currentTimestamp,
            "quest_id": 0,
            "user_id": Cookies.get('user_id'),
            "action_id": 0,
            "session_seq_id": Cookies.get('session_seq_id'),
            "quest_seq_id": 0,
            "dynamic_quest_id": Cookies.get('dynamic_quest_id'),
            "action_detail": JSON.stringify(actionDetail),
        },
        dataType: "jsonp",

        success: function(data) {
            dynamic_quest_id = data["dynamic_quest_id"];
            Cookies.set('session_seq_id', parseInt(Cookies.get('session_seq_id')) + 1);
            endPretest();
        },

        error: function() {
            console.log("Error logging pretest data");
        },
    });
}

function cleanPretestCookies() {
    Cookies.remove('q1');
    Cookies.remove('q1expl');
    Cookies.remove('q2');
    Cookies.remove('q3');
    //test 1
    Cookies.remove('t1_1');
    Cookies.remove('t1_2');
    Cookies.remove('t1_3');
    // test 2
    Cookies.remove('t2_1');
    Cookies.remove('t2_2');
    Cookies.remove('t2_3');
    Cookies.remove('t2_4');
    // test 3
    Cookies.remove('t3_1');
    Cookies.remove('t3_2');
    Cookies.remove('t3_3');
    Cookies.remove('t3_4');
    // test 4
    Cookies.remove('t4_1');
    Cookies.remove('t4_2');
    Cookies.remove('t4_3');
    Cookies.remove('t4_4');
    // test 5
    Cookies.remove('t5_1');
    Cookies.remove('t5_2');
    Cookies.remove('t5_3');
    Cookies.remove('t5_4');
    // test 6
    Cookies.remove('t6_1');
    Cookies.remove('t6_2');
    Cookies.remove('t6_3');
    Cookies.remove('t6_4');
}

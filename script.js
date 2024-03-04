// Game Users
var user1 = "Player 1";
var user1Color = 'crimson';

var user2 = "Player 2";
var user2Color = 'blue';

// Query Selectors
var tbl_row = document.getElementsByTagName('tr'); // Selecting each individual row
var tbl_col = document.getElementsByTagName('td'); // Selecting each individual disc
const discs = document.querySelectorAll('.disc-slot'); // Updated to match the class name in HTML
var play_move = document.querySelector('.player-move-status'); // Updated to match the class name in HTML
const restart_button = document.querySelector('.restartButton'); // Updated to match the class name in HTML

// Setting current user to be player 1
var currentPlayer = 1;

// Starting game with player 1 making the first click
play_move.textContent = `${user1} Color is Red!`;

// Saving the table coordinates of the disc after every click
for (i = 0; i < tbl_col.length; i++) {
    tbl_col[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`);
    });
}

// Function to change color of the disc clicked according to player's color
function player_color_switch(e) {
    let column = e.target.cellIndex;
    let row = [];

    for (i = 5; i > -1; i--) {
        if (tbl_row[i].children[column].style.backgroundColor == 'white') {
            row.push(tbl_row[i].children[column]);

            if (currentPlayer === 1) {
                // Player 1's color and winning function strategies
                row[0].style.backgroundColor = 'crimson';
                if (hor_match() || ver_match() || diag_match() || anti_diag_match()) {
                    play_move.textContent = `${user1} WINS!!`;
                    play_move.style.color = user1Color;
                    return alert(`${user1} WINS!!`);
                } else if (draw_match()) {
                    play_move.textContent = 'DRAW!';
                    return alert('DRAW!');
                } else {
                    play_move.textContent = `${user2} Color is Blue!`
                    return currentPlayer = 2;
                }
            } else {
                // Player 2's color and winning function strategies
                row[0].style.backgroundColor = 'blue';
                if (hor_match() || ver_match() || diag_match() || anti_diag_match()) {
                    play_move.textContent = `${user2} WINS!!`;
                    play_move.style.color = user2Color;
                    return alert(`${user2} WINS!!`);
                } else if (draw_match()) {
                    play_move.textContent = 'DRAW!';
                    return alert('DRAW!');
                } else {
                    play_move.textContent = `${user1} Color is Red!`;
                    return currentPlayer = 1;
                }
            }
        }
    }
}

// Set all discs color to white for every new start of the game
// And applying change of color function to every disc clicked by the user
Array.prototype.forEach.call(tbl_col, (cell) => {
    cell.addEventListener('click', player_color_switch);
    cell.style.backgroundColor = 'white';
});

// Function to check matching of colors of 4 discs
function color_match(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
}

// Player win check function if 4 discs have matching colors horizontally
function hor_match() {
    for (let row = 0; row < tbl_row.length; row++) {
        for (let col = 0; col < 4; col++) {
            if (color_match(tbl_row[row].children[col].style.backgroundColor, tbl_row[row].children[col + 1].style.backgroundColor,
                tbl_row[row].children[col + 2].style.backgroundColor, tbl_row[row].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
}

// Player win check function if 4 discs have matching colors vertically
function ver_match() {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if (color_match(tbl_row[row].children[col].style.backgroundColor, tbl_row[row + 1].children[col].style.backgroundColor,
                tbl_row[row + 2].children[col].style.backgroundColor, tbl_row[row + 3].children[col].style.backgroundColor)) {
                return true;
            }
        }
    }
}

// Player win check function if 4 discs have matching colors diagonally
function diag_match() {
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 3; row++) {
            if (color_match(tbl_row[row].children[col].style.backgroundColor, tbl_row[row + 1].children[col + 1].style.backgroundColor,
                tbl_row[row + 2].children[col + 2].style.backgroundColor, tbl_row[row + 3].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
}

// Player win check function if 4 discs have matching colors anti-diagonally
function anti_diag_match() {
    for (let col = 0; col < 4; col++) {
        for (let row = 5; row > 2; row--) {
            if (color_match(tbl_row[row].children[col].style.backgroundColor, tbl_row[row - 1].children[col + 1].style.backgroundColor,
                tbl_row[row - 2].children[col + 2].style.backgroundColor, tbl_row[row - 3].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
}

// Function implemented to show draw game
function draw_match() {
    let filled_disc = []
    for (i = 0; i < tbl_col.length; i++) {
        if (tbl_col[i].style.backgroundColor !== 'white') {
            filled_disc.push(tbl_col[i]);
        }
    }
    if (filled_disc.length === tbl_col.length) {
        return true;
    }
}

// Event click in Restart button
restart_button.addEventListener('click', () => {
    discs.forEach(disc => {
        disc.style.backgroundColor = 'white';
    });
    play_move.style.color = 'white';
    return (currentPlayer === 1 ? play_move.textContent = `${user1} Color is Red!` : play_move.textContent = `${user2} color Blue!`);
});

// Event listeners for restart button mouse leave and mouse out
let restart_button_element = document.getElementById("restartButton"); // Updated to match the id in HTML
restart_button_element.addEventListener("mouseleave", function (event) {
    event.target.style.color = "red";
    setTimeout(function () {
        event.target.style.color = "";
    }, 3000);
}, false);

restart_button_element.addEventListener("mouseout", function (event) {
    event.target.style.color = "orange";
    setTimeout(function () {
        event.target.style.color = "";
    }, 1000);
}, false);

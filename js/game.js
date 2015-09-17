var field = [['', '', ''], ['', '', ''], ['', '', '']];
var used = {};

var checkWin = function (player) {
    var f = field;
    // Checking horizontal win
    for (var i = 0; i < 3; i++)
        if (f[i][0] == player && f[i][1] == player && f[i][2] == player)
            return true;
    // Checking vertical win
    for (var j = 0; j < 3; j++)
        if (f[0][j] == player && f[1][j] == player && f[2][j] == player)
            return true;
    // Checking diagonal wins
    if (f[0][0] == player && f[1][1] == player && f[2][2] == player)
        return true;
    if (f[0][2] == player && f[1][1] == player && f[2][0] == player)
        return true;
    return false;
};

var getAIMove = function () {
    while (true) {
        var id = Math.floor(Math.random() * 9);
        if (!(id in used)) {
            used[id] = true;
            return id;
        }
    }
};

var gameOver = function (winner) {
    if (winner == 'Player')
        alert('Player wins the game!');
    else if (winner == 'AI')
        alert('AI wins the game!');
    else
        alert('Tie!');

    location.reload();
};

var getWinner = function () {
    var playerWins = checkWin('x');
    var aiWins = checkWin('o');

    if (playerWins)
        return 'Player';
    else if (aiWins)
        return 'AI';
    else if (Object.keys(used).length == 9)
        return 'Tie';

    return false;
};

var move = function (mark, id) {
    used[id] = true;
    var i = Math.floor(id / 3);
    var j = id % 3;

    if (field[i][j])
        return;
    field[i][j] = mark;
    // Placing image in the cell
    document.getElementById(id).className = "cell " + mark;

    var winner = getWinner();
    if (winner) {
        gameOver(winner);
        return false;
    }
    return true;
};

var cells = document.getElementsByClassName("cell");
for (var i = 0; i < cells.length; i++)
    cells[i].onclick = function () {
        var shouldContinue = move('x', this.id);
        if (shouldContinue)
            move('o', getAIMove());
    };
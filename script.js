for (let i = 1; i <= 90; i++) {
    $('.box-div').append(`<div class="number-box" id="box${i}">${i}</div>`);
}


const gameBoardArray = [];

const ticketArray = [];

document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("winnerPopup").style.display = "none";
});

let clickBtn = 0;
let countdown;
let seconds = 15;
let currentNumber = 1;
document.querySelector('.random-button').addEventListener("click", () => {
    // ++clickBtn;
    // if (clickBtn == 1) {
    let uniqueNumber = generateRandomUniqueNumber(gameBoardArray);
    document.getElementById('random-display').innerHTML = uniqueNumber;
    console.log(uniqueNumber, "============Unique Number============");
    document.getElementById(`box${uniqueNumber}`).style.backgroundColor = "lightcoral";
    console.log(uniqueNumber, "=======Number Loop=======");
    // }
    // for (let i = 1; i <= 20; i++) {
    //     setTimeout(() => {
    //         let uniqueNumber = generateRandomUniqueNumber(gameBoardArray);
    //         document.getElementById('random-display').innerHTML = uniqueNumber;
    //         console.log(uniqueNumber, "============Unique Number============");
    //         document.getElementById(`box${uniqueNumber}`).style.backgroundColor = "lightcoral";
    //         console.log(uniqueNumber, "=======Number Loop=======");
    //     }, i * 3000);
    // }

    // document.querySelector('.random-button').style.display = "none";

    // if (countdown) {
    //     // If a countdown is already running, prevent starting a new one
    //     return;
    // }

    // const displayNumberAndStartCountdown = () => {
    //     let uniqueNumber = generateRandomUniqueNumber(gameBoardArray);
    //     document.getElementById('random-display').innerHTML = uniqueNumber;
    //     console.log(uniqueNumber, "============Unique Number============");
    //     document.getElementById(`box${uniqueNumber}`).style.backgroundColor = "lightcoral";
    //     console.log(uniqueNumber, "=======Number Loop======");
    //     startCountdown();
    // };

    // const startCountdown = () => {
    //     const countdownDisplay = document.getElementById('countdown-display');

    //     seconds = 15; // Reset the countdown timer to 15 seconds
    //     countdown = setInterval(() => {
    //         if (seconds <= 0) {
    //             clearInterval(countdown);
    //             countdown = null;
    //             countdownDisplay.textContent = "Time's up!";
    //             displayNumberAndStartCountdown();
    //         } else {
    //             // Update the countdown display and decrement the remaining time
    //             countdownDisplay.textContent = `Time Left: ${seconds} seconds`;
    //             seconds--;
    //         }
    //     }, 1000);
    // };

    // displayNumberAndStartCountdown();

});

let count = 0;
let first_five = false;
let upper_line = false;
let middle_line = false;
let lower_line = false;
let house_full = false;

function updateCountdown() {
    const countdownDisplay = document.getElementById('countdown-display');
    countdownDisplay.textContent = `Time Left: ${seconds} seconds`;

    if (seconds <= 0) {
        clearInterval(countdown);
        countdownDisplay.textContent = "Time's up!";
    } else {
        seconds--;
    }
}

document.querySelector('.ticket-button').addEventListener('click', () => {
    console.log(count, "========Count=========");
    const ticket = generateTicket();

    ticketArray.push(ticket);

    console.log(ticket, "=======Ticket=======");
    var player_name = `Player-${count + 1}`;
    $('.ticket-container').append(`
        <div class="ticket" id="player-${count}">
        <div class="player-name" id="player-name${count}">${player_name}</div>
            <div class="tambola-ticket" id="ticket-${count}"></div>
        </div>
    `)

    for (let i = 0; i < ticket.length; i++) {
        for (let j = 0; j < ticket[i].length; j++) {
            // console.log(i, j, ticket[i][j], "=======Ticket=======");
            $(`#ticket-${count}`).append(`<button class="tambola-number-box" id="number${i}${j}">${ticket[i][j]}</button>`);
        }
    }

    $(`#player-${count}`).append(`
        <div class="win-display" id="win-display${count}">
            <p>Fast Five: <span id="fast-five" class="fast-five">No</span></p>
            <p>Upper Line: <span id="upper-line" class="upper-line">No</span></p>
            <p>Lower Line: <span id="lower-line" class="lower-line">No</span></p>
            <p>Middle Line: <span id="middle-line" class="middle-line">No</span></p>
            <p>Full House: <span id="full-house" class="full-house">No</span></p>
        </div>
    `);

    const ticketBtn = document.getElementById(`ticket-${count}`);
    const numberBoxes = ticketBtn.querySelectorAll('.tambola-number-box');

    console.log(ticketBtn, "===================");

    checkForHouseFull(0);
    numberBoxes.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log(btn.id, "===================");
            const number = parseInt(btn.innerHTML);
            const parentDiv = btn.closest('.tambola-ticket');
            console.log(parentDiv.id, "=======Ticket Parent ID=======");

            // console.log(gameBoardArray.includes(number),  numberArray, "=======Number in Array=======");
            if (gameBoardArray.includes(number)) {
                let ticket_num = parseInt(parentDiv.id.charAt(parentDiv.id.length - 1));

                let i_index = parseInt(btn.id.charAt(btn.id.length - 2));
                let j_index = parseInt(btn.id.charAt(btn.id.length - 1));
                markTheNumber(ticket_num, i_index, j_index);

                let firstFive;
                let upperLine;
                let middleLine;
                let lowerLine;
                let houseFull;

                if (!house_full) {
                    houseFull = checkForHouseFull(ticket_num);
                }
                if (houseFull) {
                    house_full = true;
                    const playerScore = document.getElementById(`win-display${ticket_num}`);
                    playerScore.querySelector('.full-house').innerHTML = "Yes";
                    const winnerName = document.getElementById(`player-name${ticket_num}`).innerHTML;
                    const winnerText = document.getElementById("winnerText");
                    winnerText.textContent = `The winner of House Full is ${winnerName}.`;
                    document.getElementById("winnerPopup").style.display = "block";
                }

                if (!first_five) {
                    firstFive = checkFirstFive(ticket_num);
                }
                if (firstFive) {
                    first_five = true;
                    const playerScore = document.getElementById(`win-display${ticket_num}`);
                    playerScore.querySelector('.fast-five').innerHTML = "Yes";
                    const winnerName = document.getElementById(`player-name${ticket_num}`).innerHTML;
                    const winnerText = document.getElementById("winnerText");
                    winnerText.textContent = `The winner of fastest five is ${winnerName}.`;
                    document.getElementById("winnerPopup").style.display = "block";
                }


                if (!upper_line) {
                    upperLine = checkForRow(ticket_num, 0);
                }
                if (!middle_line) {
                    middleLine = checkForRow(ticket_num, 1);
                }
                if (!lower_line) {
                    lowerLine = checkForRow(ticket_num, 2);
                }


                if (upperLine) {
                    upper_line = true;
                    const playerScore = document.getElementById(`win-display${ticket_num}`);
                    playerScore.querySelector('.upper-line').innerHTML = "Yes";
                    const winnerName = document.getElementById(`player-name${ticket_num}`).innerHTML;
                    const winnerText = document.getElementById("winnerText");
                    winnerText.textContent = `The winner of Upper Line is ${winnerName}.`;
                    document.getElementById("winnerPopup").style.display = "block";
                }
                if (middleLine) {
                    middle_line = true;
                    const playerScore = document.getElementById(`win-display${ticket_num}`);
                    playerScore.querySelector('.middle-line').innerHTML = "Yes";
                    const winnerName = document.getElementById(`player-name${ticket_num}`).innerHTML;
                    const winnerText = document.getElementById("winnerText");
                    winnerText.textContent = `The winner of Middle Line is ${winnerName}.`;
                    document.getElementById("winnerPopup").style.display = "block";
                }
                if (lowerLine) {
                    lower_line = true;
                    const playerScore = document.getElementById(`win-display${ticket_num}`);
                    playerScore.querySelector('.lower-line').innerHTML = "Yes";
                    const winnerName = document.getElementById(`player-name${ticket_num}`).innerHTML;
                    const winnerText = document.getElementById("winnerText");
                    winnerText.textContent = `The winner of Lower Line is ${winnerName}.`;
                    document.getElementById("winnerPopup").style.display = "block";
                }

                // console.log(firstFive, upperLine, lowerLine, middleLine, "==========Game Wins=========");
                btn.style.backgroundColor = "lightgreen";
            } else {
                btn.style.backgroundColor = "lightcoral";
                setTimeout(() => {
                    btn.style.backgroundColor = "#f2f2f2";
                }, 400);
            }
        })
    })

    ++count;
})

// console.log(ticketArray, "========Ticket Array======");

function updateWinDisplay(ticketNum, type) {
    upper_line = true;
    const playerScore = document.getElementById(`win-display${ticketNum}`);
    playerScore.querySelector(`.${type}`).innerHTML = "Yes";
    const winnerName = "Deepak Woad";
    const winnerText = document.getElementById("winnerText");
    winnerText.textContent = `The winner of Upper Line is ${winnerName}.`;
    document.getElementById("winnerPopup").style.display = "block";
}

function generateTicket() {
    const numberArray = [];

    const ticket = [];

    for (let i = 0; i < 3; i++) {
        const line = [];
        for (let j = 0; j < 3; j++) {
            line.push(generateRandomUniqueNumber(numberArray));
        }
        ticket.push(line);
    }

    return ticket;
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 90) + 1;
}

function generateRandomUniqueNumber(numbersArray) {
    let uniqueNumber;
    do {
        uniqueNumber = generateRandomNumber();
    } while (numbersArray.includes(uniqueNumber))

    numbersArray.push(uniqueNumber);

    return uniqueNumber;
}

function markTheNumber(ticketNum, i, j) {
    ticketArray[ticketNum][i][j] = 'X';
    console.log(ticketArray[ticketNum], "=======Ticket====");
}

function checkForRow(ticketNum, rowNumber) {
    let isRowChecked;
    let isAllRowChecked = [];
    console.log(ticketArray[ticketNum][rowNumber], "===================");
    for (let i = 0; i < ticketArray[ticketNum][rowNumber].length; i++) {
        if (ticketArray[ticketNum][rowNumber][i] == 'X') {
            isAllRowChecked.push(true);
        } else {
            isAllRowChecked.push(false);
        }
    }
    isRowChecked = isAllRowChecked.every((value) => value);
    return isRowChecked;
}

function checkForHouseFull(ticketNum) {
    const flattenedArray = Array.from(ticketArray[ticketNum]).flat(2)
    // console.log(flattenedArray);
    return flattenedArray.every(element => element === 'X');
}

function checkFirstFive(ticketNum) {
    let isfiveChecked = false;
    let count = 0;

    for (let i = 0; i < ticketArray[ticketNum].length; i++) {
        for (let j = 0; j < ticketArray[ticketNum][i].length; j++) {
            console.log(ticketArray[ticketNum][i][j], "========Number========")

            if (ticketArray[ticketNum][i][j] == 'X') {
                count++
                if (count == 5) {
                    isfiveChecked = true;
                    break;
                }
            }
        }
    }

    return isfiveChecked;
}

// function checkForWin() {

// }



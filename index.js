const gameboard = document.getElementById('gameboard');
const arrOfCells = [...gameboard.getElementsByTagName('div')];
const winnerLabel = document.getElementById('winner');
const newGameButton = document.querySelector('button');


let overallCounter=0;
let crossCounter=0;
let noughtCounter=0;

arrOfCells.forEach(cell => {
    cell.onclick = playGame;
})

newGameButton.onclick = resetGame;

function resetGame(event) {
    window.location.reload(true);
}

function playGame(event) {
    overallCounter++
    console.log(overallCounter);
    if (overallCounter===0 ||overallCounter%2===0) {
        event.target.style.setProperty('background-color', 'cyan');
        noughtCounter++        
    } else {
        event.target.style.setProperty('background-color', 'red');
        crossCounter++;
    }
    event.target.onclick=null;

    localStorage.clear()
    if (overallCounter >=5) {        
        checkIfWinner();
        const winningColour = localStorage.getItem('Winner');
        if (winningColour){
            winner.textContent = `${winningColour} WON!`;
        } else {
            if (overallCounter === 9) {
                winner.textContent = `BOOO! no winner today!`;
            }
        }        
    }
}

function checkIfWinner () {
    let foundWinner;
    const arrObj = {};
    arrOfCells.forEach((element, idx) => {
        arrObj[idx] = element.style.getPropertyValue('background-color');
    });

    //TODO make this look nicer

    if (arrObj[0] === arrObj[1] && arrObj[1] === arrObj[2]) {            
        foundWinner = arrObj[0];
    } else if (arrObj[3] === arrObj[4] && arrObj[4] === arrObj[5]) {          foundWinner = arrObj[3];
    } else if (arrObj[6] === arrObj[7] && arrObj[7] === arrObj[8]) {          foundWinner = arrObj[6];
    } else if (arrObj[0] === arrObj[3] && arrObj[3] === arrObj[6]) {          foundWinner = arrObj[0];
    } else if (arrObj[0] === arrObj[4] && arrObj[4] === arrObj[8]) {          foundWinner = arrObj[0];
    } else if (arrObj[1] === arrObj[4] && arrObj[4] === arrObj[7]) {        foundWinner = arrObj[1];
    } else if (arrObj[2] === arrObj[5] && arrObj[5] === arrObj[8]) {          foundWinner = arrObj[2];
    } else if (arrObj[2] === arrObj[4] && arrObj[4] === arrObj[6]) {          foundWinner = arrObj[2];
    } else {
        foundWinner = null;
    }

    if (foundWinner) {
        arrOfCells.forEach(element => {
            element.onclick = null;            
        });
        localStorage.removeItem('Winner');
        localStorage.setItem('Winner', foundWinner);
        //console.log('winner!' + foundWinner)
        //winner.textContent = `Found winner!! ${foundWinner}`;        
    }
}

const gameboard = document.getElementById('gameboard');
const arrOfCells = [...gameboard.getElementsByTagName('div')];
const winnerLabel = document.getElementById('winner');
const newGameButton = document.querySelector('button');

const _winningCombinations = [[0,1,2], [0,3,6], [0,4,8], [3,4,5], [6,7,8], [1,4,7], [2,4,6], [2,5,8]];

localStorage.clear();

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
    if (overallCounter===0 ||overallCounter%2===0) {
        event.target.style.setProperty('background-color', 'cyan');
        noughtCounter++        
    } else {
        event.target.style.setProperty('background-color', 'red');
        crossCounter++;
    }
    event.target.onclick=null;

    if (overallCounter >=5) {        
        checkIfWinner();
        const winningColour = localStorage.getItem('Winner');
        if (winningColour){
            winnerLabel.style.setProperty('background-color', winningColour);
            winnerLabel.textContent = `${winningColour.toUpperCase()} WON!`;
        } else {
            if (overallCounter === 9) {
                winnerLabel.style.setProperty('background-color', 'orange');
                winnerLabel.textContent = `BOOO! No winner today!`;
            }
        }        
    }
}

function checkWinningCombo(cellColours) {
    const winningCombo = _winningCombinations.find(combo => {        
        return (
            cellColours[combo[0]] === cellColours[combo[1]] && 
            cellColours[combo[0]] === cellColours[combo[2]] &&
            cellColours[combo[0]] !== undefined
            );
    });
    return winningCombo
}

function checkIfWinner () {    
    const arrObj = {};
    arrOfCells.forEach((element, idx) => {
        //only check the coloured cells (need to ignore the white ones)
        if (element.onclick === null) {
            arrObj[idx] = element.style.getPropertyValue('background-color');
        }
    });
    const winningCombo = checkWinningCombo(arrObj); 
    let foundWinner=null;
    if (winningCombo) {
        foundWinner = arrObj[winningCombo[0]];
    } 

    if (foundWinner) {
        arrOfCells.forEach(element => {
            element.onclick = null;            
        });
        localStorage.removeItem('Winner');
        localStorage.setItem('Winner', foundWinner);    
    }
}

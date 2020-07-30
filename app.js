document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width = 10;
    let bombCount = 20;
    let isGameOver = false;
    let squares = [];

    //Create the board
    function createBoard() {
        //get shuffled bomb array in the board
        const bombArray = Array(bombCount).fill('bomb');
        const emptyArray = Array(width*width - bombCount).fill('safe');
        const gameArray = emptyArray.concat(bombArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
        //console.log(shuffledArray);

        for(let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', i);
            grid.appendChild(square);
            squares.push(square);
            square.classList.add(shuffledArray[i]);

            square.addEventListener('click', function(e) {
                click(square);
            })
        }

        for(let i = 0; i < squares.length; i++) {
            let total = 0;
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i % width === width - 1);
            if(squares[i].classList.contains('safe')) {
                if(i > 0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total++;
                if(i > 9 && !isRightEdge && squares[i+1 - width].classList.contains('bomb')) total++;
                if(i > 10 && squares[i-width].classList.contains('bomb')) total++;
                if(i > 11 && !isLeftEdge && squares[i-1-width].classList.contains('bomb')) total++;
                if(i < 98 && !isRightEdge && squares[i+1].classList.contains('bomb')) total++;
                if(i < 90 && !isLeftEdge && squares[i-1+width].classList.contains('bomb')) total++;
                if(i < 88 && !isRightEdge && squares[i+1+width].classList.contains('bomb')) total++;
                if(i < 89 && squares[i+width].classList.contains('bomb')) total++;
                squares[i].setAttribute('data', total);
                // console.log(squares[i]);
            }
        }
    }
createBoard();

function click(square) {
    let currentId = square.id;
    if(isGameOver) return;
    if(square.classList.contains('checked') || square.classList.contains('flag')) return;
    if(square.classList.contains('bomb')) {
        console.log('Game over');
    } else {
        let total = square.getAttribute('data');
        if(total != 0) {
        square.classList.add('checked');
        square.innerHTML = total;
        return;
        }
        checkSquare(square, currentId);             
    }
        square.classList.add('checked');
}

//check neiboring square once an empty square is clicked
function checkSquare(square, currentId) {
    const isLeftEdge = (currentId % width === 0);
    const isRightEdge = (currentId % width === 0);

    setTimeout(() => {
        if(currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
        }
        if(currentId > 9 && !isRightEdge) {
            const newId = squares[parseInt(currentId) + 1 - width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if(currentId > 10) {
            const newId = squares[parseInt(currentId) - width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if(currentId > 11 && !isLeftEdge) {
            const newId = squares[parseInt(currentId) - 1 - width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if(currentId < 98 && !isRightEdge) {
            const newId = squares[parseInt(currentId) + 1].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if(currentId < 90 && !isLeftEdge) {
            const newId = squares[parseInt(currentId) - 1 + width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if(currentId < 88 && !isRightEdge) {
            const newId = squares[parseInt(currentId) + 1 + width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if(currentId < 89) {
            const newId = squares[parseInt(currentId) + width].id;
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
    },10)
}

})
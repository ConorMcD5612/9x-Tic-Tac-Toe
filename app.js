window.addEventListener("DOMContentLoaded", () => {
  let gameBoards = Array.from(document.querySelectorAll(".game-board"));
  let alertBox = document.querySelector(".alert-container");
  let winnerText = document.querySelector(".winner");
  let gameContainer = document.querySelector(".game-container");
  let cells = Array.from(document.querySelectorAll(".cell"));
  cells = listToMatrix(cells, 9);

  let tieGame = false;
  let playerTurn = "X";
  let currentBoard = -1;
  const winComboArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let xArray = [[], [], [], [], [], [], [], [], []];
  let overAllXArray = [];

  let oArray = [[], [], [], [], [], [], [], [], []];
  let overAllOArray = [];

  cells.forEach((cell, boardIndex) =>
    cell.forEach((cell, index) =>
      cell.addEventListener("click", () =>
        clickFunction(cell, index, boardIndex)
      )
    )
  );

  function clickFunction(cell, index, boardIndex) {
    if (cell.textContent == "X" || cell.textContent == "O") {
    } else {
      if (
        (currentBoard == boardIndex || currentBoard == -1) &&
        !overAllXArray.includes(boardIndex)
      ) {
        if (
          !overAllOArray.includes(boardIndex) ||
          !xArray[boardIndex].concat(oArray[boardIndex]).length === 9
        ) {
          currentBoard = index;

          if (playerTurn === "X") {
            cell.textContent = "X";
            playerTurn = "O";
            xArray[boardIndex].push(index);
          } else {
            cell.textContent = "O";
            playerTurn = "X";
            oArray[boardIndex].push(index);
          }
          highlightNextGameboard(index, boardIndex);
          checkWin(boardIndex);
          checkBigWin();
          if (overAllXArray.includes(index) || overAllOArray.includes(index)) {
            currentBoard = -1;
          }
          tieBoard(index);
        }
      } else {
      }
    }
  }

  //https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript
  function checkWin(boardIndex) {
    for (let i = 0; i < winComboArr.length; i++) {
      let winCombo = winComboArr[i];

      if (winCombo.every((x) => xArray[boardIndex].includes(x))) {
        overAllXArray.push(boardIndex);
        highlightWinningBoard(boardIndex);
      }

      if (winCombo.every((x) => oArray[boardIndex].includes(x))) {
        overAllOArray.push(boardIndex);
        highlightWinningBoard(boardIndex);
      }
    }
  }

  function checkBigWin() {
    for (let i = 0; i < winComboArr.length; i++) {
      let winCombo = winComboArr[i];
      if (winCombo.every((x) => overAllXArray.includes(x))) {
        winningPopup();
      }

      if (winCombo.every((x) => overAllOArray.includes(x))) {
        winningPopup();
      }
    }
  }

  function listToMatrix(list, elementsPerSubArray) {
    var matrix = [],
      i,
      k;

    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }

      matrix[k].push(list[i]);
    }

    return matrix;
  }

  function highlightNextGameboard(index, boardIndex) {
    if (
      gameBoards[index].innerHTML == "O" ||
      gameBoards[index].innerHTML == "X" ||
      xArray[index].concat(oArray[index]).length == 9
    ) {
      //highlights all green if other boards are full
      for (let i = 0; gameBoards.length > i; i++) {
        gameBoards[i].style.border = ".2vw solid green";
        if (gameBoards[i].innerHTML == "O" || gameBoards[i].innerHTML == "X") {
          gameBoards[i].style.border = ".2vw solid black";
        }
      }
    } else {
      for (let i = 0; gameBoards.length > i; i++) {
        gameBoards[i].style.border = ".2vw solid black";
      }
      gameBoards[index].style.border = ".2vw solid green";
    }
  }

  function highlightWinningBoard(boardIndex) {
    // I think this is fine it might cause problems?
    if (overAllOArray.includes(boardIndex)) {
      gameBoards[boardIndex].innerHTML = "O";
    } else {
      gameBoards[boardIndex].innerHTML = "X";
    }
    gameBoards[boardIndex].style.backgroundColor = "white";
    gameBoards[boardIndex].classList.add("wonBoard");
  }

  function tieBoard(boardIndex) {
    if (xArray[boardIndex].concat(oArray[boardIndex]).length === 9) {
      currentBoard = -1;
      overAllXArray.push(-boardIndex);
    }

    overAllXArray = [...new Set(overAllXArray)];

    if (overAllOArray.concat(overAllXArray).length === 9) {
      tieGame = true;
      winningPopup();
    }
  }

  function winningPopup() {
    alertBox.style.display = "flex";
    gameContainer.style.display = "none";
    //opposite becuase change turns if before checkwin()
    if (tieGame) {
      winnerText.textContent = "No winner";
    } else if (playerTurn === "X") {
      winnerText.textContent = "O";
    } else {
      playerTurn === "X";
    }
  }
});

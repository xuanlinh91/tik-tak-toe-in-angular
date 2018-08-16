import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tiktaktoe',
  templateUrl: './tiktaktoe.component.html',
  styleUrls: ['./tiktaktoe.component.css']
})
export class TiktaktoeComponent implements OnInit {

  public huPlayer = 'X';
  public aiPlayer = 'O';
  public gameOver = false;
  public message = '';
  public tieMessage = 'Hết chỗ :v';
  public winMessage = 'You Win!';
  public loosMessage = 'You loose!';
  public cells = [];
  public displayCells = [];
  public winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  constructor() {
  }

  ngOnInit() {
    this.startGame();
  }

  turnClick(cell) {
    const id = cell.path[0].id;
    if (typeof this.cells[id] === 'number') {
      this.turn(id, this.huPlayer);
      console.log(this.cells);
      if (!this.checkTie(this.cells)) {
        this.turn(this.bestAiTurn(this.cells), this.aiPlayer);
      } else {
        this.message = this.tieMessage;
        this.endGame();
      }
    }
  }

  turn(id, player) {
    if (!this.gameOver) {
      this.cells[id] = player;
      this.displayCells[id] = player;
      const gameWon = this.checkWin(this.cells, player);
      console.log(gameWon);
      if (gameWon) {
        console.log(gameWon);
        this.message = gameWon === this.huPlayer ? this.winMessage : this.loosMessage;
        // console.log(gameWon.player + ' wins');
        this.endGame();
      }
    }
  }

  startGame() {
    this.gameOver = false;
    this.displayCells = [];
    this.cells = Array.from(Array(9).keys());
  }

  checkWin(board, player): string {
    const plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
    let result = '';
    if (this.winCombos.some(value => ((plays.indexOf(value[0]) > -1) && (plays.indexOf(value[1]) > -1) &&
      (plays.indexOf(value[2]) > -1)))) {
      result = player;
    }

    return result;
  }

  endGame() {
    this.gameOver = true;
    return false;
  }

  checkTie(currBoard) {
    if (this.emptyCells(currBoard).length < 1) {
      return true;
    } else {
      return false;
    }
  }

  bestAiTurn(currBoard) {
    return this.emptyCells(currBoard)[0];
  }

  emptyCells(currBoard) {
    return currBoard.filter(cell => typeof cell === 'number');
  }
}

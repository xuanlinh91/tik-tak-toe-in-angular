import {Component, OnInit} from '@angular/core';
import {forEach} from '../../../node_modules/@angular/router/src/utils/collection';

@Component({
  selector: 'app-tiktaktoe',
  templateUrl: './tiktaktoe.component.html',
  styleUrls: ['./tiktaktoe.component.css']
})
export class TiktaktoeComponent implements OnInit {

  public huPlayer = 'X';
  public aiPlayer = '0';
  public gameOver = false;
  public cells = new Array<string>(9);
  public winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
  ];

  constructor() {
  }

  ngOnInit() {
  }

  turnClick(cell) {
    this.turn(cell, this.huPlayer);
    this.checkTie();
    this.turn(this.bestAiTurn(), this.aiPlayer);
  }

  turn(cell, player) {
    if (!this.gameOver) {
      const id = cell.path[0].id;
      this.cells[id] = player;
      const gameWon = this.checkWin(this.cells, player);
      if (gameWon) {
        this.endGame();
      }
    }
  }

  startGame() {
    this.cells = [];
  }

  checkWin(board, player) {
    const plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);

    this.winCombos.forEach(function (value, index) {
      if ((plays.indexOf(value[0]) > -1) && (plays.indexOf(value[1]) > -1) && (plays.indexOf(value[2]) > -1)) {
        return {'index': index, 'player': player};
      }

    });

    return null;
  }

  endGame() {
    this.gameOver = true;
    return false;
  }

  checkTie() {

    return true;
  }

  bestAiTurn() {
    return 1;
  }
}

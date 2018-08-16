import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tiktaktoe',
  templateUrl: './tiktaktoe.component.html',
  styleUrls: ['./tiktaktoe.component.css']
})
export class TiktaktoeComponent implements OnInit {

  public message;
  public winMessage = 'Ngon, thắng rồi :))!';
  public loseMessage = 'Thua chặt, hông có cửa :v !';
  public tieMessage = 'Hoà, may mắn đấy! :v !';
  public endgame;
  public displayCells;
  public origBoard;
  public huPlayer = 'O';
  public aiPlayer = 'X';
  public winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ];

  constructor() { }

  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.endgame = false;
    this.origBoard = Array.from(Array(9).keys());
    this.displayCells = [];
  }

  turnClick(square) {
    const id = square.path[0].id;
    if (typeof this.origBoard[id] === 'number' && this.endgame === false) {
      this.turn(id, this.huPlayer);
      if (!this.checkWin(this.origBoard, this.huPlayer) && !this.checkTie()) { this.turn(this.bestSpot(), this.aiPlayer); }
    }
  }

  turn(squareId, player) {
    this.origBoard[squareId] = player;
    this.displayCells[squareId] = player;

    const gameWon = this.checkWin(this.origBoard, player);
    if (gameWon) { this.gameOver(gameWon); }
  }

  checkWin(board, player) {
    const plays = board.reduce((a, e, i) =>
      (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    // @ts-ignore
    if (this.winCombos.some(value => ((plays.indexOf(value[0]) > -1) && (plays.indexOf(value[1]) > -1) &&
      (plays.indexOf(value[2]) > -1)))) {
      gameWon = player;
    }
    return gameWon;
  }

  gameOver(gameWon) {
    this.declareWinner(gameWon.player === this.huPlayer ? this.winMessage : this.loseMessage);
  }

  declareWinner(who) {
    this.message = who;
    this.endgame = true;
  }

  emptySquares() {
    return this.origBoard.filter(s => typeof s === 'number');
  }

  bestSpot() {
    return this.minimax(this.origBoard, this.aiPlayer).index;
  }

  checkTie() {
    if (this.emptySquares().length === 0) {
      this.declareWinner(this.tieMessage);
      return true;
    }
    return false;
  }

  minimax(newBoard, player) {
    const availSpots = this.emptySquares();

    if (this.checkWin(newBoard, this.huPlayer)) {
      return {score: -10};
    } else if (this.checkWin(newBoard, this.aiPlayer)) {
      return {score: 10};
    } else if (availSpots.length === 0) {
      return {score: 0};
    }
    const moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      const move = {};
      // @ts-ignore
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;

      if (player === this.aiPlayer) {
        const result = this.minimax(newBoard, this.huPlayer);
        // @ts-ignore
        move.score = result.score;
      } else {
        const result = this.minimax(newBoard, this.aiPlayer);
        // @ts-ignore
        move.score = result.score;
      }

      // @ts-ignore
      newBoard[availSpots[i]] = move.index;

      moves.push(move);
    }

    let bestMove;
    if (player === this.aiPlayer) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }

}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract TicTacToe {
    enum GameState { WAITING, ACTIVE, FINISHED }
    enum Player { NONE, PLAYER1, PLAYER2 }
    
    struct Game {
        address player1;
        address player2;
        Player currentTurn;
        Player[9] board;
        GameState state;
        Player winner;
    }
    
    mapping(uint256 => Game) public games;
    uint256 public gameCount;
    
    event GameCreated(uint256 gameId, address player1);
    event GameJoined(uint256 gameId, address player2);
    event MoveMade(uint256 gameId, address player, uint8 position);
    event GameWon(uint256 gameId, address winner);
    event GameDrawn(uint256 gameId);
    
    function createGame() external returns (uint256) {
        uint256 gameId = gameCount;
        Game storage game = games[gameId];
        
        game.player1 = msg.sender;
        game.currentTurn = Player.PLAYER1;
        game.state = GameState.WAITING;
        
        emit GameCreated(gameId, msg.sender);
        
        gameCount++;
        return gameId;
    }
    
    function joinGame(uint256 gameId) external {
        Game storage game = games[gameId];
        
        require(game.state == GameState.WAITING, "Game is not waiting for players");
        require(game.player1 != msg.sender, "Cannot join your own game");
        
        game.player2 = msg.sender;
        game.state = GameState.ACTIVE;
        
        emit GameJoined(gameId, msg.sender);
    }
    
    function makeMove(uint256 gameId, uint8 position) external {
        Game storage game = games[gameId];
        
        require(position < 9, "Invalid position");
        require(game.state == GameState.ACTIVE, "Game is not active");
        require(game.board[position] == Player.NONE, "Position already taken");
        
        if (game.currentTurn == Player.PLAYER1) {
            require(msg.sender == game.player1, "Not your turn");
            game.board[position] = Player.PLAYER1;
            game.currentTurn = Player.PLAYER2;
        } else {
            require(msg.sender == game.player2, "Not your turn");
            game.board[position] = Player.PLAYER2;
            game.currentTurn = Player.PLAYER1;
        }
        
        emit MoveMade(gameId, msg.sender, position);
        
        Player winner = checkWinner(game.board);
        if (winner != Player.NONE) {
            game.state = GameState.FINISHED;
            game.winner = winner;
            emit GameWon(gameId, winner == Player.PLAYER1 ? game.player1 : game.player2);
        } else if (isBoardFull(game.board)) {
            game.state = GameState.FINISHED;
            emit GameDrawn(gameId);
        }
    }
    
    function checkWinner(Player[9] memory board) internal pure returns (Player) {
        // Check rows
        for (uint8 i = 0; i < 3; i++) {
            if (board[i*3] != Player.NONE && 
                board[i*3] == board[i*3 + 1] && 
                board[i*3] == board[i*3 + 2]) {
                return board[i*3];
            }
        }
        
        // Check columns
        for (uint8 i = 0; i < 3; i++) {
            if (board[i] != Player.NONE && 
                board[i] == board[i + 3] && 
                board[i] == board[i + 6]) {
                return board[i];
            }
        }
        
        // Check diagonals
        if (board[0] != Player.NONE && 
            board[0] == board[4] && 
            board[0] == board[8]) {
            return board[0];
        }
        
        if (board[2] != Player.NONE && 
            board[2] == board[4] && 
            board[2] == board[6]) {
            return board[2];
        }
        
        return Player.NONE;
    }
    
    function isBoardFull(Player[9] memory board) internal pure returns (bool) {
        for (uint8 i = 0; i < 9; i++) {
            if (board[i] == Player.NONE) {
                return false;
            }
        }
        return true;
    }
    
    function getGame(uint256 gameId) external view returns (
        address player1,
        address player2,
        uint8 currentTurn,
        Player[9] memory board,
        uint8 state,
        uint8 winner
    ) {
        Game storage game = games[gameId];
        return (
            game.player1,
            game.player2,
            uint8(game.currentTurn),
            game.board,
            uint8(game.state),
            uint8(game.winner)
        );
    }
}

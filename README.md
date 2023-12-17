# RPSLS Game

You can play the game here : https://call-hasher2.vercel.app/  
The Smart-Contract GitHub is here : https://github.com/Ewuly/Hasher-RPS

## How to play
### Player 1
- Click on Create a new game  
- Generate a new salt  
- Select your move and enter the address of your oponent
- Click on test to generate a hash
- Enter the ammount of token you want to send and click on 1st Move
### Player 2
- Click on Join Game
- Select your move and the game id
- Click on play
### Player 1
- Click on solve to find out who win

## Functions
### Init Game
This function is called by the player one to initialize the game, he will have connect his wallet and enter his move before to get a hash. This function will allow him to put as many eth as he wants in the game. This function will create a new instance of the game to allow multiple games to be played simultaneoustly.

### Play
This function is called by the player two. It will allow him to enter the game ID and to choose his move. The same amount of eth will be send to the contract.

### Solve
This function is called by the player 1 to determine the winner of the game. The contract will then send the eth to the winner.

### Get my eth back
This function can be either called by the player one or the player two if the other player as not played since 5 minutes to get their eth back.

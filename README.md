Hi there!

Welcome to Color Run - a multiplayer board game written in React and Node.js with Websocket communication.

The server-side is quite simple and contains the following components:

index.js: This file sets up server-client communication through CORS and Websocket.
A mock of users (which contains names, colors, and other player information).
An empty state where objects with all the necessary player information are stored. The unique socket.id of each newly connected browser is assigned to the next player that doesn't have an ID in data players-mock.js, and they are then added to the state.
server-helpers: This is a convenient place to store helper functions.
The client-side is divided into several components:

Header: This displays the title of the page.
Aside: This contains welcoming text and a description of the page.
Board: Implemented with a canvas element, it quickly renders all newly connected users and their movements. It sends movement events to the server, which calculates the new x and y positions of the players, saves them in the state, and then sends this information back to the frontend within each millisecond.
Chat: This component allows any user to send multiple messages, and each message will display the user's unique name at the top of the first message, along with a background color scheme. The last message in the array will always be visible.
Future features will include:

Diagonal movement.
Added game states "begin" and "finish" with a time limit.
In the "begin" state, connected users will be able to join the game.
The game will start 10 seconds after two players click "begin" and can accept more players during this time. Those who do not connect to the game will simply observe other players.
One player will be randomly chosen to be colorless, becoming the predator, hunting other players to infect them and make them lose their color. Once a player gets infected and loses their color, they will join the hunt for the remaining colorful players. Over time, the infected player's speed will increase. The last player who has not lost their color will be the winner.
A result dashboard for the game and the option to play again.

#my to do list:

<!-- - draw circle
- add event
- generate player (server) with his position, id, name, color other data
- (server send to front this info and front renders)
- clients sends info to server (direction of movement), then server calc coordinates of users and broadcast them back; -->
<!-- - do chat -->
<!-- - add event on Enter
- add if input.value === "" then return; -->
<!-- - add scroll in chat; -->
<!-- - add avatars -->
<!-- - improve circles styling text; -->
<!-- -improve project structure -->
<!-- - move functions out of main code area; -->

- add favicon;

<!-- Additional:
How to kill the server process when its blocking a port
lsof -i tcp:3001
kill -9 PID(e.g. 29743) -->

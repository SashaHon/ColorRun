"use strict";

module.exports = {
  calc_movement: function ({ data }) {
    console.log("i work");
    console.log({ data });
  },

  getPlayerFromState: function (stateArr, id) {
    return stateArr.find((el) => {
      if (el.id === id) {
        return el;
      }
    });
  },
  // createPlayer: function (playersMockArr, socket) {
  //   let player = assignNextPlayerId(playersMockArr, socket);
  //   state.players.push(player);
  //   return player.id;
  // },
};

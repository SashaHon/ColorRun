"use strict";

module.exports = {
  calc_movement: function ({ data }) {
    console.log("i work");
    console.log({ data });
  },
  getPlayerFromState: function (stateArr, id) {
    return stateArr.find((el, i) => {
      if (el.id === id) {
        return el;
      }
    });
  },
};

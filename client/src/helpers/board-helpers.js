import socket from "utils/socket";

function getCtx(canvasRefCurrent) {
  const canvas = canvasRefCurrent;
  return {
    canvas: canvas,
    ctx: canvas.getContext("2d"),
  };
}

function handleKeyDown(e) {
  const keyDirectionString = checkArrowDirection(e.key);
  if (!keyDirectionString) {
    return;
  }
  socket.emit(`is_moving`, {
    movingDirection: keyDirectionString,
  });
}

function handleKeyUp(e) {
  if (
    e.key !== "ArrowLeft" &&
    e.key &&
    "ArrowRight" &&
    e.key !== "ArrowUp" &&
    e.key !== "ArrowDown"
  ) {
    return;
  }
  socket.emit("end_moving", { message: "stop moving!" });
}

function checkArrowDirection(key) {
  if (key === "ArrowLeft") {
    return "ArrowLeft";
  } else if (key === "ArrowRight") {
    return "ArrowRight";
  } else if (key === "ArrowUp") {
    return "ArrowUp";
  } else if (key === "ArrowDown") {
    return "ArrowDown";
  } else return null;
}

export { getCtx, handleKeyDown, handleKeyUp };

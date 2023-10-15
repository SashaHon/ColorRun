import React from "react";
import "./Board.css";

export default class Board extends React.Component {
  canvas = React.createRef();

  componentDidMount() {
    // console.log(this.canvas.current);
    const canvas = this.canvas.current;
    let ctx = canvas.getContext("2d");
    console.log(ctx);
  }

  render() {
    return <canvas ref={this.canvas} id="board" />;
  }
}

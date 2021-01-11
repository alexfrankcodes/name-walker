import React, { Component, createRef } from "react";
import p5 from "p5";

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.myRef = createRef();
  }
  Sketch = (p) => {
    let x, y;

    let width = 600;
    let height = width;

    let stepSize = 1;
    let walkLength = this.props.walkLength;

    p.setup = () => {
      p.createCanvas(width, height);
      x = width / 2;
      y = height / 2;
      p.background(220);
      p.randomSeed(123456);
    };

    p.draw = () => {
      for (let i = 0; i < walkLength; i++) {
        let c = p.color(0, 0, 0);

        p.stroke(c);
        p.strokeWeight(1);

        p.noSmooth();
        p.point(x, y);

        let r = Math.floor(p.random() * 4);

        switch (r) {
          case 0:
            x += stepSize;
            break;
          case 1:
            x -= stepSize;
            break;
          case 2:
            y += stepSize;
            break;
          case 3:
            y -= stepSize;
            break;
          default:
            break;
        }
      }
      p.noLoop();
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

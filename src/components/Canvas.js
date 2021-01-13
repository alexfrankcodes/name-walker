import React, { Component, createRef } from "react";
import p5 from "p5";

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.myRef = createRef();
  }
  Sketch = (p) => {
    let width = 800;
    let height = width;

    let x = width / 2;
    let y = height / 2;

    let stepSize = 1;
    let walkLength = 250000;

    let navigationJump = 50;

    let name = "";
    let seed = 0;

    let userInput = p.createDiv();
    let nameLabel = p.createElement("p", "Name:");
    let nameField = p.createInput();
    let submitButton = p.createButton("Submit");

    let navigation = p.createDiv();
    let up = p.createButton("Up");
    let down = p.createButton("Down");
    let left = p.createButton("Left");
    let right = p.createButton("Right");

    let reverse = p.createDiv();
    let reverseButton = p.createButton("Reverse Controls");

    /* p5.js setup function */
    p.setup = () => {
      userInput.child(nameLabel);
      userInput.child(nameField);
      userInput.child(submitButton);

      submitButton.mousePressed(convertNameToSeed);
      p.randomSeed(seed);

      navigation.child(up);
      navigation.child(down);
      navigation.child(left);
      navigation.child(right);

      up.mousePressed(navigateUp);
      down.mousePressed(navigateDown);
      left.mousePressed(navigateLeft);
      right.mousePressed(navigateRight);

      reverse.child(reverseButton);
      reverseButton.mousePressed(reverseNavigationControls);

      p.createCanvas(width, height);
      p.pixelDensity(1);
    };

    function convertNameToSeed() {
      let counter = 0;
      name = nameField.value();
      for (let i = 0; i < name.length; i++) {
        counter += name.charCodeAt(i);
      }
      seed = counter;
      repaint();
    }

    function repaint() {
      p.clear();
      p.draw();
    }

    function navigateUp() {
      console.log("up");
      p.translate(0, navigationJump);
      p.draw();
    }

    function navigateDown() {
      console.log("up");
      p.translate(0, -navigationJump);
      p.draw();
    }

    function navigateLeft() {
      console.log("up");
      p.translate(navigationJump, 0);
      p.draw();
    }

    function navigateRight() {
      p.translate(-navigationJump, 0);
      p.draw();
    }

    function reverseNavigationControls() {
      navigationJump *= -1;
    }

    function staticRandomWalk() {
      x = width / 2;
      y = height / 2;

      p.background(220);
      p.randomSeed(seed);

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
    }

    // TODO: Animate through the walk
    //function realtimeRandomWalk() {}

    p.draw = () => {
      staticRandomWalk();
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return <div className="canvas" ref={this.myRef}></div>;
  }
}

import React, { Component, createRef } from "react";
import p5 from "p5";

export default class RandomWalkerSketch extends Component {
  constructor(props) {
    super(props);
    this.myRef = createRef();
  }

  Sketch = (p) => {
    // Responsive canvas size
    let width = Math.min(p.windowWidth / 1.2, 600);
    let height = width;

    // Starting point in center of canvas
    let x = width / 2;
    let y = height / 2;

    // Walk variables
    let stepSize = 1;
    let numberOfPoints = 125000;

    let name = "";
    let seed = 0;

    let navigationJump = 50;

    /* Canvas UI Elements */

    // Name input and submission
    let userInput = p.createDiv();
    let nameField = p.createInput();
    nameField.attribute("placeholder", "Enter your name...");
    let generateButton = p
      .createButton("Generate Walk")
      .class("generateButton btn waves-effect waves-light btn-large");

    let walkDisplay = p.createDiv();

    let navigation = p.createDiv().class("navigation");
    let up = p
      .createButton("Up")
      .class("btn waves-effect waves-light btn-large");
    let down = p
      .createButton("Down")
      .class("btn waves-effect waves-light btn-large");
    let left = p
      .createButton("Left")
      .class("btn waves-effect waves-light btn-large");
    let right = p
      .createButton("Right")
      .class("btn waves-effect waves-light btn-large");

    let reverse = p.createDiv();
    let reverseButton = p
      .createButton("Reverse Controls")
      .class("reverseButton btn waves-effect waves-light btn-large");

    /* p5.js setup function */
    p.setup = () => {
      userInput.child(nameField);
      userInput.child(generateButton);

      generateButton.mousePressed(convertNameToSeed);

      walkDisplay.child(p.createCanvas(width, height));

      reverse.child(reverseButton);
      reverseButton.mousePressed(reverseNavigationControls);

      reverse.child(reverseButton);
      reverseButton.mousePressed(reverseNavigationControls);

      navigation.child(up);
      navigation.child(down);
      navigation.child(left);
      navigation.child(right);

      up.mousePressed(navigateUp);
      down.mousePressed(navigateDown);
      left.mousePressed(navigateLeft);
      right.mousePressed(navigateRight);

      p.pixelDensity(1);
    };

    function convertNameToSeed() {
      let accumulator = 0;
      name = nameField.value();
      for (let i = 0; i < name.length; i++) {
        accumulator += name.charCodeAt(i);
      }
      seed = accumulator;
      p.redraw();
    }

    function navigateUp() {
      p.translate(0, -navigationJump);
      p.draw();
    }

    function navigateDown() {
      p.translate(0, navigationJump);
      p.draw();
    }

    function navigateLeft() {
      p.translate(-navigationJump, 0);
      p.draw();
    }

    function navigateRight() {
      p.translate(navigationJump, 0);
      p.draw();
    }

    function reverseNavigationControls() {
      navigationJump *= -1;
    }

    function staticRandomWalk() {
      x = width / 2;
      y = height / 2;

      p.background(229);
      p.randomSeed(seed);

      for (let i = 0; i < numberOfPoints; i++) {
        let c = p.color(0);

        p.stroke(c);
        p.strokeWeight(stepSize);

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
    p.windowResized = () => {
      if (p.windowWidth < 600) {
        p.resizeCanvas(p.windowWidth / 1.2, p.windowWidth / 1.2);
      } else {
        p.resizeCanvas(600, 600);
      }
    };

    p.draw = () => {
      staticRandomWalk();
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return <div className="sketch" ref={this.myRef}></div>;
  }
}

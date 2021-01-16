import "./App.css";
import RandomWalkerSketch from "./components/RandomWalkerSketch";

function App() {
  return (
    <div className="App">
      <h1>Name Walker</h1>
      <p className="intro">
        Name Walker generates a two-dimensional{" "}
        <a
          href="https://en.wikipedia.org/wiki/Random_walk"
          target="_blank"
          rel="noopener noreferrer"
        >
          random walk
        </a>{" "}
        using your name as a seed for the random function that drives the
        algorithm.
        <div className="space" />
        You can check out the code{" "}
        <a
          href="https://github.com/alexfrankcodes/name-walker"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
        <div className="space" /> Feel free to share with your results with me
        on Twitter{" "}
        <a
          href="https://twitter.com/alexfrankcodes"
          target="_blank"
          rel="noopener noreferrer"
        >
          @alexfrankcodes
        </a>
        !
      </p>
      <RandomWalkerSketch />
    </div>
  );
}

export default App;

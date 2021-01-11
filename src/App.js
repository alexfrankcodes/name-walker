import "./App.css";
import Canvas from "./components/Canvas";

function App() {
  return (
    <div className="App">
      <h1>Name Walker</h1>
      <Canvas className="canvas" walkLength={1000000} />
    </div>
  );
}

export default App;

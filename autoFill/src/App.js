import "./App.css";
import AutoFill from "./AutoFill";
import top100Films from "./top100flims";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AutoFill props={top100Films} />
      </header>
    </div>
  );
}

export default App;

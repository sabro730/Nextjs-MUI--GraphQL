import "./index.css";
import AutoFill from "./AutoFill";
import top100Films from "./top100flims";

function App() {
  return (
    <div className="container">
      <h3 className="text-center pt-4 text-4xl"> React autoFill Component in ES6</h3>
      <AutoFill props={top100Films} />
    </div>
  );
}

export default App;

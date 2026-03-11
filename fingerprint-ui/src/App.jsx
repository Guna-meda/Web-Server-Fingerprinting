import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [targets, setTargets] = useState([""]);
  const [results, setResults] = useState([]);

  const handleChange = (index, value) => {
    const updated = [...targets];
    updated[index] = value;
    setTargets(updated);
  };

  const addInput = () => {
    setTargets([...targets, ""]);
  };

  const scan = async () => {

    const filtered = targets.filter(t => t.trim() !== "");

    const res = await axios.post("http://localhost:5000/scan", {
      targets: filtered
    });

    setResults(res.data);
  };

  return (
    <div className="app">

      <div className="card">

        <h1 className="title">Web Server Fingerprinting Tool</h1>

        <div className="inputs">

          {targets.map((target, index) => (
            <input
              key={index}
              type="text"
              placeholder="Enter domain or IP address"
              value={target}
              onChange={(e) => handleChange(index, e.target.value)}
              className="input"
            />
          ))}

        </div>

        <div className="buttons">

          <button className="addBtn" onClick={addInput}>
            + Add Website
          </button>

          <button className="scanBtn" onClick={scan}>
            Scan Targets
          </button>

        </div>

      </div>

      <div className="resultsCard">

        <h2>Scan Results</h2>

        <table>

          <thead>
            <tr>
              <th>Target</th>
              <th>Protocol</th>
              <th>Server</th>
              <th>Version</th>
            </tr>
          </thead>

          <tbody>

            {results.map((r, i) => (
              <tr key={i}>
                <td>{r.target}</td>
                <td>{r.protocol}</td>
                <td>{r.server}</td>
                <td>{r.version}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default App;
import React, { useState } from "react";

const golfers = {
  "Stephen Markos": { mean: 5.06, std: 1.0 },
  "Robert Wiseman": { mean: 5.17, std: 0.98 },
  "Nick Cutro": { mean: 4.46, std: 0.75 },
  "Sean Farren": { mean: 3.94, std: 0.55 },
  "Andrej Erkelens": { mean: 4.34, std: 0.68 },
  "Nicholas Heflin": { mean: 4.47, std: 0.76 },
  "Cam Clark": { mean: 4.53, std: 0.78 },
  "Andrew Salzillo": { mean: 4.69, std: 0.83 }
};

const API_URL = "https://golf-simulator-api.vercel.app/simulate"; // replace this

function App() {
  const [golfer1, setGolfer1] = useState("Stephen Markos");
  const [golfer2, setGolfer2] = useState("Robert Wiseman");
  const [strokes, setStrokes] = useState(0);
  const [recipient, setRecipient] = useState("golfer2");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        golfer1_mean: golfers[golfer1].mean,
        golfer1_std: golfers[golfer1].std,
        golfer2_mean: golfers[golfer2].mean,
        golfer2_std: golfers[golfer2].std,
        strokes_given: strokes,
        stroke_recipient: recipient
      })
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>🏌️ Golf Match Simulator</h1>

      <label>Golfer 1: </label>
      <select value={golfer1} onChange={(e) => setGolfer1(e.target.value)}>
        {Object.keys(golfers).map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>

      <br /><br />

      <label>Golfer 2: </label>
      <select value={golfer2} onChange={(e) => setGolfer2(e.target.value)}>
        {Object.keys(golfers).map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>

      <br /><br />

      <label>Strokes Given: </label>
      <input type="number" value={strokes} onChange={(e) => setStrokes(Number(e.target.value))} />

      <br /><br />

      <label>Strokes Given To: </label>
      <select value={recipient} onChange={(e) => setRecipient(e.target.value)}>
        <option value="golfer1">Golfer 1</option>
        <option value="golfer2">Golfer 2</option>
      </select>

      <br /><br />
      <button onClick={handleSubmit}>Simulate Match</button>

      {result && (
        <div style={{ marginTop: 30 }}>
          <h2>📊 Results</h2>
          <p>{golfer1} Win %: {result.golfer1_win_pct}%</p>
          <p>{golfer2} Win %: {result.golfer2_win_pct}%</p>
        </div>
      )}
    </div>
  );
}
console.log("✅ App.js is running");

export default App;

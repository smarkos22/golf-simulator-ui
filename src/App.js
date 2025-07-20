import React, { useState } from "react";
import "./App.css";

const golfers = [
  "Sean Farren",
  "Andrej Erkelens",
  "Nick Cutro",
  "Nicholas Heflin",
  "Cam Clark",
  "Andrew Salzillo",
  "Stephen Markos",
  "Robert Wiseman"
];

const courses = [
  "Boyne Highlands - Heather",
  "Boyne Highlands - Hills (Arthur Hills)",
  "Belvedere Golf Club",
  "Forest Dunes (Championship Course)",
  "The Loop (Forest Dunes, tips average)"
];

// ✅ Updated API URL to live backend
const API_URL = "https://golf-simulator-backend.fly.dev/simulate";

function App() {
  const [golfer1, setGolfer1] = useState("Stephen Markos");
  const [golfer2, setGolfer2] = useState("Robert Wiseman");
  const [course, setCourse] = useState("Boyne Highlands - Heather");
  const [manualOverride, setManualOverride] = useState(false);
  const [strokes, setStrokes] = useState(0);
  const [recipient, setRecipient] = useState("golfer2");
  const [includeTies, setIncludeTies] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        golfer1_name: golfer1,
        golfer2_name: golfer2,
        course_name: course,
        manual_override: manualOverride,
        strokes_given: strokes,
        stroke_recipient: recipient,
        include_ties: includeTies
      })
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="app">
      <h1 className="title">5th Annual GTI – Northern Michigan 2025</h1>
      <div className="container">
        <div className="form-card">
          <label>Golfer 1:</label>
          <select value={golfer1} onChange={(e) => setGolfer1(e.target.value)}>
            {golfers.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>

          <label>Golfer 2:</label>
          <select value={golfer2} onChange={(e) => setGolfer2(e.target.value)}>
            {golfers.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>

          <label>Course:</label>
          <select value={course} onChange={(e) => setCourse(e.target.value)}>
            {courses.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={manualOverride}
              onChange={(e) => setManualOverride(e.target.checked)}
            />
            Enable Manual Stroke Override
          </label>

          {manualOverride && (
            <>
              <label>Strokes Given:</label>
              <input
                type="number"
                value={strokes}
                onChange={(e) => setStrokes(parseInt(e.target.value) || 0)}
                min={0}
                max={20}
              />

              <label>Strokes Given To:</label>
              <select value={recipient} onChange={(e) => setRecipient(e.target.value)}>
                <option value="golfer1">Golfer 1</option>
                <option value="golfer2">Golfer 2</option>
              </select>
            </>
          )}

          <label className="checkbox">
            <input
              type="checkbox"
              checked={includeTies}
              onChange={(e) => setIncludeTies(e.target.checked)}
            />
            Allow Tie as Betting Outcome
          </label>

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Simulating..." : "Simulate Match"}
          </button>
        </div>

        {result && (
          <div className="results-card">
            <h2>📊 Results</h2>
            <p>
              <b>{result.stroke_recipient === "golfer1" ? golfer1 : golfer2}</b> receives{" "}
              <b>{result.strokes_given}</b> strokes based on the course handicaps
            </p>
            <p>
              {golfer1} (Index: {result.golfer1_index}) Win %:{" "}
              {result.golfer1_win_pct}% | Odds: {result.golfer1_odds}
            </p>
            <p>
              {golfer2} (Index: {result.golfer2_index}) Win %:{" "}
              {result.golfer2_win_pct}% | Odds: {result.golfer2_odds}
            </p>
            {result.include_ties && (
              <p>
                Match Tied %: {result.tied_match_pct}% | Odds: {result.tie_odds}
              </p>
            )}

            <br />
            <p>🏌️ {golfer1} Course Handicap: {result.golfer1_course_handicap}</p>
            <p>🏌️ {golfer2} Course Handicap: {result.golfer2_course_handicap}</p>
            <br />
            <p>📍 Course Par: {result.course_par}</p>
            <p>📍 Course Rating: {result.course_rating}</p>
            <p>📍 Course Slope: {result.course_slope_used}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

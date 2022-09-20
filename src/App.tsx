import { useState } from "react";
import { FetchOnRender } from "./fetchers/FetchOnRender";
import "./App.css";
import { FetchThenRender } from "./fetchers/FetchThenRender";
import { RenderAsYouFetch } from "./fetchers/RenderAsYouFetch";

function App() {
  return (
    <div className="App">
      <h1>4Developers 2022 Katowice</h1>
      <div className="grid">
        <div className="card">
          <h2>Fetch-on-Render</h2>
          <FetchOnRender />
        </div>
        <div className="card">
          <h2>Fetch-then-Render</h2>
          <FetchThenRender />
        </div>
        <div className="card">
          <h2>Render-as-you-fetch</h2>
          <RenderAsYouFetch />
        </div>
      </div>
    </div>
  );
}

export default App;

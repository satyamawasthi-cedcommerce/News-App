import { Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import "@shopify/polaris/build/esm/styles.css";
import Singlelaunch from "./components/individualLaunch/Singlelaunch";
const LazyHome = React.lazy(() => import("./components/homeScreen/Homescreen"));
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback="Loading...">
              <LazyHome />
            </React.Suspense>
          }
        />
        <Route path="/individual/:id" element={<Singlelaunch />} />
      </Routes>
    </div>
  );
}

export default App;

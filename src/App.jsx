import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./utils/Routes";

const App = () => {
  return (
    <div>
      <Router>
      <Routes>
        {routes.map((route, index) => {
          if (route.children) {
            // Handle nested routes
            return (
              <Route key={index} path={route.path} element={route.element}>
                {route.children.map((child, childIndex) => (
                  <Route
                    key={childIndex}
                    path={child.path || ""}
                    index={child.index}
                    element={child.element}
                  />
                ))}
              </Route>
            );
          }

          // Handle non-nested routes
          return <Route key={index} path={route.path} element={route.element} />;
        })}
      </Routes>
    </Router>
    </div>
  );
};

export default App;

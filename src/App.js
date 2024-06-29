import React from 'react';
import Login from './Components/Login/Login';
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import DocumentEditor from './Components/DocumentEditor/DocumentEditor';
import { isLoggedIn } from './Utils/functions';

const App = () => {
  const loggedIn = isLoggedIn();

  return (
    <div>
      {
        loggedIn ?
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route path="/document/:id" element={<DocumentEditor />} />
            </Routes>
          </BrowserRouter> : <Login />
      }
    </div>
  );
};

export default App;

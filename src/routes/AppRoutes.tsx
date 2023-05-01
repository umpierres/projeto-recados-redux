import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Notes from '../pages/Notes';
import Favorites from '../pages/Favorites';
import DefaultLayout from '../config/styles/layout/DefaultLayout';
import LoggedLayout from '../config/styles/layout/LoggedLayout';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DefaultLayout mode="loggedOut" component={Home} />} />
      <Route path="/signup" element={<DefaultLayout mode="loggedOut" component={SignUp} />} />
      <Route path="/signin" element={<DefaultLayout mode="loggedOut" component={SignIn} />} />
      <Route path="/notes" element={<LoggedLayout mode="loggedIn" component={Notes} />} />
      <Route path="/favorites" element={<LoggedLayout mode="loggedIn" component={Favorites} />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

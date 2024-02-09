import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import RestaurantDetails from './RestaurantDetail';
import NotFound from './NotFound';
import AllPizzas from './AllPizzas';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:id" element={<RestaurantDetails />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/all-pizzas" element={<AllPizzas/>} /> 
      </Routes>
    </Router>
  );
};

export default App;

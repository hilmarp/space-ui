import React from 'react';
import { Box, Grommet } from 'grommet';
import { Routes, Route } from 'react-router-dom';
import { theme } from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Companies from './pages/Companies';
import Company from './pages/Company';
import Launches from './pages/Launches';
import PastLaunches from './pages/PastLaunches';
import Launch from './pages/Launch';
import Rockets from './pages/Rockets';
import Rocket from './pages/Rocket';
import Locations from './pages/Locations';
import Location from './pages/Location';
import Country from './pages/Country';
import Pad from './pages/Pad';
import State from './pages/State';

const App = () => {
  return (
    <Grommet theme={theme}>
      <Box fill background={'dark-1'}>
        <Navbar />
        <Box as={'main'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/company/:id" element={<Company />} />
            <Route path="/launches" element={<Launches />} />
            <Route path="/past-launches" element={<PastLaunches />} />
            <Route path="/launch/:id" element={<Launch />} />
            <Route path="/rockets" element={<Rockets />} />
            <Route path="/rocket/:id" element={<Rocket />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/location/:id" element={<Location />} />
            <Route path="/pad/:id" element={<Pad />} />
            <Route path="/country/:code" element={<Country />} />
            <Route path="/state/:code" element={<State />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Grommet>
  );
};

export default App;

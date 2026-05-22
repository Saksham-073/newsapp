import './App.css';
import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import Search from './Components/Search';
import Bookmarks from './Components/Bookmarks';
import LoadingBar from 'react-top-loading-bar';
import useTheme from './hooks/useTheme';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {

  const [progress, setprogress] = useState(0)
  const [dark, toggleTheme] = useTheme()
  const [country, setcountry] = useState(() => localStorage.getItem('news_country') || 'us')
  const pagesize = 6;
  const apikey = process.env.REACT_APP_NEWS_API;

  const handleCountryChange = (c) => {
    setcountry(c)
    localStorage.setItem('news_country', c)
  }

  return (
    <div>
      <Router>
        <Navbar dark={dark} toggleTheme={toggleTheme} country={country} onCountryChange={handleCountryChange} />
        <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setprogress(0)} />
        <Routes>
          <Route exact path="/" element={<News setprogress={setprogress} apikey={apikey} key={`general-${country}`} pagesize={pagesize} country={country} category="general" />}></Route>
          <Route exact path="/business" element={<News setprogress={setprogress} apikey={apikey} key={`business-${country}`} pagesize={pagesize} country={country} category="business" />}></Route>
          <Route exact path="/entertainment" element={<News setprogress={setprogress} apikey={apikey} key={`entertainment-${country}`} pagesize={pagesize} country={country} category="entertainment" />}></Route>
          <Route exact path="/health" element={<News setprogress={setprogress} apikey={apikey} key={`health-${country}`} pagesize={pagesize} country={country} category="health" />}></Route>
          <Route exact path="/science" element={<News setprogress={setprogress} apikey={apikey} key={`science-${country}`} pagesize={pagesize} country={country} category="science" />}></Route>
          <Route exact path="/sports" element={<News setprogress={setprogress} apikey={apikey} key={`sports-${country}`} pagesize={pagesize} country={country} category="sports" />}></Route>
          <Route exact path="/technology" element={<News setprogress={setprogress} apikey={apikey} key={`technology-${country}`} pagesize={pagesize} country={country} category="technology" />}></Route>
          <Route exact path="/search" element={<Search setprogress={setprogress} apikey={apikey} />}></Route>
          <Route exact path="/bookmarks" element={<Bookmarks />}></Route>
        </Routes>
      </Router>
    </div>
  )
}
export default App;
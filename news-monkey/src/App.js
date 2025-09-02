import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import Bookmarks from './components/Bookmarks';
import About from './components/About';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppWrapper = () => {
  const { background, text } = useTheme();
  
  return (
    <div className={`${background} ${text}`} style={{minHeight: '100vh'}}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/"><News key="home" pageSize={20} country="us" category="general" /></Route>
          <Route exact path="/business"><News key="business" pageSize={20} country="us" category="business" /></Route>
          <Route exact path="/entertainment"><News key="entertainment" pageSize={20} country="us" category="entertainment" /></Route>
          <Route exact path="/general"><News key="general" pageSize={20} country="us" category="general" /></Route>
          <Route exact path="/health"><News key="health" pageSize={20} country="us" category="health" /></Route>
          <Route exact path="/science"><News key="science" pageSize={20} country="us" category="science" /></Route>
          <Route exact path="/sports"><News key="sports" pageSize={20} country="us" category="sports" /></Route>
          <Route exact path="/technology"><News key="technology" pageSize={20} country="us" category="technology" /></Route>
          <Route exact path="/bookmarks"><Bookmarks /></Route>
          <Route exact path="/about"><About /></Route>
        </Switch>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </div>
  )
}

export default class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <AppWrapper />
      </ThemeProvider>
    )
  }
}
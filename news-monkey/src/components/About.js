import React from 'react'
import { useTheme } from '../context/ThemeContext'

const About = () => {
  const { text, isDarkMode } = useTheme()

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className={`card ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} shadow`}>
            <div className="card-body p-5">
              <h1 className={`text-center mb-4 ${text}`}>About NewsMonkey</h1>
              
              <div className="text-center mb-4">
                <span style={{ fontSize: '4rem' }}>🐵📰</span>
              </div>

              <p className={`lead text-center mb-4 ${text}`}>
                Your go-to source for the latest news from around the world!
              </p>

              <div className="row mt-5">
                <div className="col-md-4 mb-4">
                  <div className={`card h-100 ${isDarkMode ? 'bg-secondary' : 'bg-white'}`}>
                    <div className="card-body text-center">
                      <h5 className="card-title">📊 Categories</h5>
                      <p className="card-text">Browse news by Business, Entertainment, Health, Science, Sports & Technology</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className={`card h-100 ${isDarkMode ? 'bg-secondary' : 'bg-white'}`}>
                    <div className="card-body text-center">
                      <h5 className="card-title">❤️ Bookmarks</h5>
                      <p className="card-text">Save your favorite articles and access them anytime in your personal collection</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className={`card h-100 ${isDarkMode ? 'bg-secondary' : 'bg-white'}`}>
                    <div className="card-body text-center">
                      <h5 className="card-title">📋 Share & Copy</h5>
                      <p className="card-text">Instantly copy article links to share with friends or save for later reference</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <h5 className={text}>Features:</h5>
                <ul className="list-unstyled mt-3">
                  <li className="mb-2">🌙 Dark/Light theme toggle</li>
                  <li className="mb-2">📱 Responsive design</li>
                  <li className="mb-2">🔄 Real-time news updates</li>
                  <li className="mb-2">💾 Persistent bookmarks</li>
                  <li className="mb-2">🎯 Category-based filtering</li>
                </ul>
              </div>

              <hr className="my-4" />
              
              <div className="text-center">
                <p className={`mb-0 ${text}`}>
                  <small>Powered by NewsAPI • Built with React</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
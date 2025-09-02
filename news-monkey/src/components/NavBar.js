import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const NavBar = () => {
  const { isDarkMode, toggleTheme, navbar, navbarBg } = useTheme()
  const [bookmarkCount, setBookmarkCount] = useState(0)

  useEffect(() => {
    const updateBookmarkCount = () => {
      const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]')
      setBookmarkCount(bookmarks.length)
    }

    updateBookmarkCount()
    
    const handleStorageChange = () => {
      updateBookmarkCount()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('bookmarkUpdated', updateBookmarkCount)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('bookmarkUpdated', updateBookmarkCount)
    }
  }, [])

  return (
    <nav className={`navbar navbar-expand-lg sticky-top ${navbar}`} style={{backgroundColor: navbarBg}}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/images/default-news.png" alt="NewsMonkey" style={{width: '30px', height: '30px', marginRight: '8px'}} />
          NewsMonkey
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/business">Business</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/entertainment">Entertainment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/general">General</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/health">Health</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/science">Science</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sports">Sports</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/technology">Technology</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/bookmarks">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '5px' }}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>Bookmarks</span>
                {bookmarkCount > 0 && (
                  <span 
                    className="badge bg-danger rounded-pill ms-2" 
                    style={{
                      fontSize: '0.75em',
                      minWidth: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: 'pulse 0.5s ease-in-out'
                    }}
                  >
                    {bookmarkCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
          <button 
            className="btn btn-outline-secondary" 
            onClick={toggleTheme}
          >
            {isDarkMode ? 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              :
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            }
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
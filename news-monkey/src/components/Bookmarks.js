import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import { useTheme } from '../context/ThemeContext'

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([])
  const theme = useTheme()

  useEffect(() => {
    loadBookmarks()
  }, [])

  const loadBookmarks = () => {
    const savedBookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]')
    setBookmarks(savedBookmarks)
  }

  const clearAllBookmarks = () => {
    localStorage.setItem('newsBookmarks', JSON.stringify([]))
    setBookmarks([])
    window.dispatchEvent(new Event('bookmarkUpdated'))
  }

  const { text } = theme
  
  return (
    <div className="container my-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={`${text}`}>Your Bookmarked Articles</h2>
        {bookmarks.length > 0 && (
          <button 
            className={`btn ${theme.isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
            onClick={clearAllBookmarks}
          >
            Clear All Bookmarks
          </button>
        )}
      </div>
      
      {bookmarks.length === 0 ? (
        <div className={`text-center mt-5 ${text}`}>
          <h4>No bookmarks yet</h4>
          <p>Start bookmarking articles by clicking the heart icon on any news item!</p>
        </div>
      ) : (
        <div className='row'>
          {bookmarks.map((article) => (
            <div className='col-md-4' key={article.url}>
              <NewsItem 
                title={article.title ? (article.title.length > 45 ? article.title.slice(0, 45) + "..." : article.title) : ""} 
                description={article.description ? (article.description.length > 88 ? article.description.slice(0, 88) + "..." : article.description) : ""} 
                imageUrl={article.imageUrl}
                newsUrl={article.url}
                author={article.author}
                date={article.publishedAt}
                source={article.source.name}
                theme={theme}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookmarks
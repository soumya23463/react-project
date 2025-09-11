import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source, theme }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    checkBookmarkStatus()
  }, [])

  const checkBookmarkStatus = () => {
    const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]')
    const bookmarked = bookmarks.some(bookmark => bookmark.url === newsUrl)
    setIsBookmarked(bookmarked)
  }

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]')
    
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter(bookmark => bookmark.url !== newsUrl)
      localStorage.setItem('newsBookmarks', JSON.stringify(updatedBookmarks))
      setIsBookmarked(false)
      window.dispatchEvent(new Event('bookmarkUpdated'))
      toast.info('Bookmark removed')
    } else {
      const newBookmark = {
        title,
        description,
        imageUrl,
        url: newsUrl,
        author,
        publishedAt: date,
        source: { name: source },
        bookmarkedAt: new Date().toISOString()
      }
      bookmarks.push(newBookmark)
      localStorage.setItem('newsBookmarks', JSON.stringify(bookmarks))
      setIsBookmarked(true)
      window.dispatchEvent(new Event('bookmarkUpdated'))
      toast.success('Article bookmarked!')
    }
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(newsUrl).then(() => {
      toast.success('Article link copied to clipboard!')
    }).catch(() => {
      const textarea = document.createElement('textarea')
      textarea.value = newsUrl
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      toast.success('Article link copied to clipboard!')
    })
  }

  const cardClass = theme ? theme.card : 'bg-light text-dark'
  
  return (
    <div className="my-3">
      <div className={`card ${cardClass} h-100 shadow-sm border-0`} style={{borderRadius: '15px', overflow: 'hidden', transition: 'all 0.3s ease', backgroundColor: theme ? theme.cardBg : '#ffffff'}}>
        <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '10px', top: '10px', zIndex: 2}}>
          <span className="badge rounded-pill bg-danger shadow-sm" style={{fontSize: '0.75em', padding: '5px 10px'}}>{source}</span>
        </div>
        <div style={{position: 'relative', overflow: 'hidden'}}>
          <img 
            src={imageUrl ? imageUrl : "/images/default-news.png"} 
            className="card-img-top" 
            alt={title} 
            style={{height: "220px", objectFit: "cover", transition: 'transform 0.3s ease'}} 
            onMouseOver={e => e.target.style.transform = 'scale(1.05)'} 
            onMouseOut={e => e.target.style.transform = 'scale(1)'}
          />
          <div style={{position: 'absolute', bottom: '0', left: '0', right: '0', height: '60px', background: 'linear-gradient(transparent, rgba(0,0,0,0.3))'}}></div>
        </div>
        <div className="card-body" style={{padding: '1.5rem'}}>
          <h5 className={`card-title fw-bold mb-3 ${theme && theme.isDarkMode ? 'text-light' : ''}`} style={{fontSize: '1.1rem', lineHeight: '1.4'}}>{title}</h5>
          <p className={`card-text mb-3 ${theme && theme.isDarkMode ? 'text-light' : 'text-muted'}`} style={{fontSize: '0.9rem', lineHeight: '1.5'}}>{description}</p>
          <p className="card-text mb-3">
            <small className={`d-flex align-items-center ${theme && theme.isDarkMode ? 'text-light' : 'text-muted'}`} style={{fontSize: '0.8rem'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '5px'}}>
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              By {author ? author : "Unknown"} • {new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(Math.floor((new Date(date) - new Date()) / (1000 * 60 * 60 * 24)), 'day')}
            </small>
          </p>
          <div className="d-flex justify-content-between align-items-center pt-2" style={{borderTop: theme && theme.isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'}}>
            <a href={newsUrl} target="_blank" rel="noreferrer" className={`btn btn-sm ${theme && theme.isDarkMode ? 'btn-light' : 'btn-dark'} px-3 py-2`} style={{borderRadius: '25px', fontWeight: '500', fontSize: '0.85rem', textDecoration: 'none'}}>
              Read More
            </a>
            <div className="d-flex gap-2">
              <button 
                className={`bookmark-btn ${theme && theme.isDarkMode ? 'text-info' : 'text-info'}`}
                onClick={copyUrl}
                title="Copy article link"
                style={{
                  padding: '6px 10px',
                  borderRadius: '50%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
              </button>
              <button 
                className={`bookmark-btn ${isBookmarked ? 'text-danger' : (theme && theme.isDarkMode ? 'text-light' : 'text-muted')}`}
                onClick={toggleBookmark}
                title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                style={{
                  padding: '8px 12px',
                  borderRadius: '50%',
                  boxShadow: isBookmarked ? '0 2px 8px rgba(220, 53, 69, 0.3)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'transparent'
                }}
              >
                {isBookmarked ? 
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  :
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
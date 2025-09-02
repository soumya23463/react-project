import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { useTheme } from '../context/ThemeContext'

const BookmarksWrapper = (props) => {
  const theme = useTheme()
  return <Bookmarks {...props} theme={theme} />
}

class Bookmarks extends Component {
  state = {
    bookmarks: []
  }

  componentDidMount() {
    this.loadBookmarks();
  }

  loadBookmarks = () => {
    const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]');
    this.setState({ bookmarks });
  }

  clearAllBookmarks = () => {
    localStorage.setItem('newsBookmarks', JSON.stringify([]));
    this.setState({ bookmarks: [] });
    window.dispatchEvent(new Event('bookmarkUpdated'));
  }

  render() {
    const {text } = this.props.theme;
    
    return (
      <div className="container my-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className={`${text}`}>Your Bookmarked Articles</h2>
          {this.state.bookmarks.length > 0 && (
            <button 
              className={`btn ${this.props.theme.isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
              onClick={this.clearAllBookmarks}
            >
              Clear All Bookmarks
            </button>
          )}
        </div>
        
        {this.state.bookmarks.length === 0 ? (
          <div className={`text-center mt-5 ${text}`}>
            <h4>No bookmarks yet</h4>
            <p>Start bookmarking articles by clicking the heart icon on any news item!</p>
          </div>
        ) : (
          <div className='row'>
            {this.state.bookmarks.map((article) => {
              return (
                <div className='col-md-4' key={article.url}>
                  <NewsItem 
                    title={article.title ? (article.title.length > 45 ? article.title.slice(0, 45) + "..." : article.title) : ""} 
                    description={article.description ? (article.description.length > 88 ? article.description.slice(0, 88) + "..." : article.description) : ""} 
                    imageUrl={article.imageUrl}
                    newsUrl={article.url}
                    author={article.author}
                    date={article.publishedAt}
                    source={article.source.name}
                    theme={this.props.theme}
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}

export default BookmarksWrapper
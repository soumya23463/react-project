import React, { useState, useEffect, useCallback } from 'react'
import NewsItem from './NewsItem'
import SkeletonCard from './SkeletonCard'
import PropTypes from 'prop-types'
import { useTheme } from '../context/ThemeContext'

const News = ({ country = 'in', pageSize = 8, category = 'general' }) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const theme = useTheme()

  const updateNews = useCallback(async () => {
    setLoading(true)
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=6528f175defe4b0b8089715cbb89cb62&page=${page}&pageSize=${pageSize}`
    
    try {
      const data = await fetch(url)
      const parsedData = await data.json()
      
      // Preserve previous totalResults if API returns error or 0 results due to rate limiting
      let newTotalResults = totalResults
      if (parsedData.status !== 'error' && parsedData.totalResults > 0) {
        newTotalResults = parsedData.totalResults
      }
      
      setArticles(parsedData.articles || [])
      setTotalResults(newTotalResults)
    } catch (error) {
      console.error('Error fetching news:', error)
      setArticles([])
    } finally {
      setLoading(false)
    }
  }, [country, category, page, pageSize, totalResults])

  useEffect(() => {
    updateNews()
  }, [page])

  useEffect(() => {
    setPage(1)
    setTotalResults(0)
    updateNews()
  }, [category])

  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextClick = () => {
    if (page + 1 <= Math.ceil(totalResults / pageSize)) {
      setPage(page + 1)
    }
  }

  const { text } = theme

  return (
    <div className="container my-3">
      <h2 className={`text-center mb-4 ${text}`}>
        NewsMonkey - Top {category.charAt(0).toUpperCase() + category.slice(1)} Headlines
      </h2>
      
      <div className='row'>
        {loading ? (
          // Show skeleton cards while loading
          Array.from({ length: pageSize }).map((_, index) => (
            <div className='col-md-4' key={`skeleton-${index}`}>
              <SkeletonCard />
            </div>
          ))
        ) : (
          // Show actual news items when loaded
          articles && articles.map((element) => (
            <div className='col-md-4' key={element.url}>
              <NewsItem 
                title={element.title ? (element.title.length > 45 ? element.title.slice(0, 45) + "..." : element.title) : ""} 
                description={element.description ? (element.description.length > 88 ? element.description.slice(0, 88) + "..." : element.description) : ""} 
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
                theme={theme}
              />
            </div>
          ))
        )}
      </div>
      
      {!loading && (
        <div className="container d-flex justify-content-between">
          <button 
            disabled={page <= 1} 
            type="button" 
            className={`btn ${theme.isDarkMode ? 'btn-light' : 'btn-dark'}`}
            onClick={handlePrevClick}
          >
            &larr; Previous
          </button>
          <button 
            disabled={page + 1 > Math.ceil(totalResults / pageSize)} 
            type="button" 
            className={`btn ${theme.isDarkMode ? 'btn-light' : 'btn-dark'}`}
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  )
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
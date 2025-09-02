import React, { Component } from 'react'
import NewsItem from './NewsItem'
import SkeletonCard from './SkeletonCard'
import PropTypes from 'prop-types'
import { useTheme } from '../context/ThemeContext'

// Create a wrapper component to use hooks
const NewsWrapper = (props) => {
  const theme = useTheme()
  return <News {...props} theme={theme} />
}

class News extends Component {
  
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  state = {
    articles: [],
    loading: false,
    page: 1,
    totalResults: 0
  }

  async updateNews() {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6528f175defe4b0b8089715cbb89cb62&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    
    // Preserve previous totalResults if API returns error or 0 results due to rate limiting
    let newTotalResults = this.state.totalResults;
    if (parsedData.status !== 'error' && parsedData.totalResults > 0) {
      newTotalResults = parsedData.totalResults;
    }
    
    this.setState({
      articles: parsedData.articles || [],
      totalResults: newTotalResults,
      loading: false
    })
  }

  async componentDidMount() {
    this.updateNews();
  }

  async componentDidUpdate(prevProps) {
    if(prevProps.category !== this.props.category) {
      this.setState({ page: 1 }, () => {
        this.updateNews();
      });
    }
  }

  handlePrevClick = async () => {
    if (this.state.page <= 1) return;
    await this.setState({
      page: this.state.page - 1
    }, () => {
      this.updateNews();
    });
  }

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) return;
    await this.setState({
      page: this.state.page + 1
    }, () => {
      this.updateNews();
    });
  }

  render() {
    const { text } = this.props.theme;
    
    return (
      <div className="container my-3">
        <h2 className={`text-center mb-4 ${text}`}>NewsMonkey - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h2>
        
        <div className='row'>
          {this.state.loading ? (
            // Show skeleton cards while loading
            Array.from({ length: this.props.pageSize }).map((_, index) => (
              <div className='col-md-4' key={`skeleton-${index}`}>
                <SkeletonCard />
              </div>
            ))
          ) : (
            // Show actual news items when loaded
            this.state.articles && this.state.articles.map((element) => {
            return (
              <div className='col-md-4' key={element.url}>
                <NewsItem 
                  title={element.title ? (element.title.length > 45 ? element.title.slice(0, 45) + "..." : element.title) : ""} 
                  description={element.description ? (element.description.length > 88 ? element.description.slice(0, 88) + "..." : element.description) : ""} 
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                  theme={this.props.theme}
                />
              </div>
            )
          })
          )}
        </div>
        
        {!this.state.loading && (
          <div className="container d-flex justify-content-between">
            <button 
              disabled={this.state.page <= 1} 
              type="button" 
              className={`btn ${this.props.theme.isDarkMode ? 'btn-light' : 'btn-dark'}`}
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <button 
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} 
              type="button" 
              className={`btn ${this.props.theme.isDarkMode ? 'btn-light' : 'btn-dark'}`}
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default NewsWrapper
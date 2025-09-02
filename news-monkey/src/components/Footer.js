import React from 'react'

const Footer = () => {

  return (
    <footer className="mt-5 py-4" style={{backgroundColor: '#bca3a8', borderTop: '1px solid #ccc', color: 'black'}}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>NewsMonkey</h5>
            <p className="mb-0">Your trusted source for latest news from around the world.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-1">&copy; {new Date().getFullYear()} NewsMonkey. All rights reserved.</p>
            <p className="mb-0">
              <small className="text-muted">
                Powered by <a href="https://newsapi.org" target="_blank" rel="noreferrer" style={{color: 'black'}}>NewsAPI</a>
              </small>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
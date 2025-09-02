import React from 'react'
import { useTheme } from '../context/ThemeContext'

const SkeletonCard = () => {
  const theme = useTheme()
  const skeletonBg = theme.isDarkMode ? '#3d3d3d' : '#e0e0e0'
  const shimmerBg = theme.isDarkMode ? '#4d4d4d' : '#f0f0f0'
  
  return (
    <div className="my-3">
      <div 
        className={`card h-100 shadow-sm border-0`} 
        style={{
          borderRadius: '15px', 
          overflow: 'hidden',
          backgroundColor: theme.cardBg
        }}
      >
        {/* Image skeleton */}
        <div 
          className="skeleton-shimmer"
          style={{
            height: '220px',
            backgroundColor: skeletonBg,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="skeleton-shimmer-animation" style={{background: `linear-gradient(90deg, transparent, ${shimmerBg}, transparent)`}}></div>
        </div>
        
        {/* Card body skeleton */}
        <div className="card-body" style={{padding: '1.5rem'}}>
          {/* Title skeleton - 2 lines */}
          <div 
            className="skeleton-shimmer mb-3"
            style={{
              height: '20px',
              backgroundColor: skeletonBg,
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="skeleton-shimmer-animation" style={{background: `linear-gradient(90deg, transparent, ${shimmerBg}, transparent)`}}></div>
          </div>
          <div 
            className="skeleton-shimmer mb-3"
            style={{
              height: '20px',
              width: '75%',
              backgroundColor: skeletonBg,
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="skeleton-shimmer-animation" style={{background: `linear-gradient(90deg, transparent, ${shimmerBg}, transparent)`}}></div>
          </div>
          
          {/* Description skeleton - 3 lines */}
          <div 
            className="skeleton-shimmer mb-2"
            style={{
              height: '14px',
              backgroundColor: skeletonBg,
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="skeleton-shimmer-animation" style={{background: `linear-gradient(90deg, transparent, ${shimmerBg}, transparent)`}}></div>
          </div>
          <div 
            className="skeleton-shimmer mb-2"
            style={{
              height: '14px',
              backgroundColor: skeletonBg,
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="skeleton-shimmer-animation" style={{background: `linear-gradient(90deg, transparent, ${shimmerBg}, transparent)`}}></div>
          </div>
          <div 
            className="skeleton-shimmer mb-3"
            style={{
              height: '14px',
              width: '60%',
              backgroundColor: skeletonBg,
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="skeleton-shimmer-animation" style={{background: `linear-gradient(90deg, transparent, ${shimmerBg}, transparent)`}}></div>
          </div>
          
          {/* Author skeleton */}
          <div 
            className="skeleton-shimmer mb-3"
            style={{
              height: '12px',
              width: '40%',
              backgroundColor: skeletonBg,
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="skeleton-shimmer-animation" style={{background: `linear-gradient(90deg, transparent, ${shimmerBg}, transparent)`}}></div>
          </div>
          
          {/* Buttons skeleton */}
          <div className="d-flex justify-content-between align-items-center pt-2" style={{borderTop: theme.isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'}}>
            <div 
              className="skeleton-shimmer"
              style={{
                height: '32px',
                width: '80px',
                backgroundColor: skeletonBg,
                borderRadius: '25px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div className="skeleton-shimmer-animation" style={{background: `linear-gradient(90deg, transparent, ${shimmerBg}, transparent)`}}></div>
            </div>
            <div className="d-flex gap-2">
              <div 
                className="skeleton-shimmer"
                style={{
                  height: '36px',
                  width: '36px',
                  backgroundColor: skeletonBg,
                  borderRadius: '50%',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div className="skeleton-shimmer-animation" style={{background: `linear-gradient(90deg, transparent, ${shimmerBg}, transparent)`}}></div>
              </div>
              <div 
                className="skeleton-shimmer"
                style={{
                  height: '36px',
                  width: '36px',
                  backgroundColor: skeletonBg,
                  borderRadius: '50%',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div className="skeleton-shimmer-animation" style={{background: `linear-gradient(90deg, transparent, ${shimmerBg}, transparent)`}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
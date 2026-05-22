import React from 'react'

function SkeletonCard() {
  return (
    <div className="card mb-3 skeleton-card" style={{ width: 350 }}>
      <div className="skeleton skeleton-img" />
      <div className="card-body">
        <div className="skeleton skeleton-title mb-2" />
        <div className="skeleton skeleton-text mb-1" />
        <div className="skeleton skeleton-text mb-1" style={{ width: '70%' }} />
        <div className="skeleton skeleton-text mb-3" style={{ width: '50%' }} />
        <div className="d-flex gap-2 justify-content-center">
          <div className="skeleton skeleton-btn" />
          <div className="skeleton skeleton-btn" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard

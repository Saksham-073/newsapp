import React from 'react'

function ArticleModal({ article, onClose }) {
  if (!article) return null
  const { title, description, content, urlToImage, url, author, publishedAt, source } = article

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={onClose}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {urlToImage && (
              <img
                src={urlToImage}
                alt={title}
                className="img-fluid rounded mb-3 w-100"
                style={{ maxHeight: 300, objectFit: 'cover' }}
              />
            )}
            <p className="text-muted small mb-2">
              {source?.name} &bull; By {author || 'Unknown'} &bull; {new Date(publishedAt).toDateString()}
            </p>
            <p>{description}</p>
            {content && (
              <p className="text-muted">
                {content.replace(/\[\+\d+ chars\]$/, '').trim()}
                <span className="fst-italic"> [Preview only — full article at source]</span>
              </p>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary btn-sm" onClick={onClose}>Close</button>
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">
              Read full article ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleModal

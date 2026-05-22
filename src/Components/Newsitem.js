import React, { useState } from 'react'

const SOURCE_COLORS = ['#c0392b', '#2980b9', '#27ae60', '#8e44ad', '#d35400', '#16a085', '#1a252f', '#6d4c41']

const sourceColor = (name) => {
  if (!name) return SOURCE_COLORS[0]
  const hash = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return SOURCE_COLORS[hash % SOURCE_COLORS.length]
}

function Newsitem(props) {
  let { title, description, ImageUrl, newsurl, author, date, source, isBookmarked, onBookmark, isRead, onRead, onPreview, content } = props;
  const readTime = content ? Math.max(1, Math.ceil(content.split(/\s+/).length / 200)) : null
  const [copied, setcopied] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url: newsurl })
      } catch {}
    } else {
      await navigator.clipboard.writeText(newsurl)
      setcopied(true)
      setTimeout(() => setcopied(false), 2000)
    }
  }
  return (
    <div className="card text-center mb-3" style={{ width: 350, opacity: isRead ? 0.6 : 1, transition: 'opacity 0.3s' }}>
      <span
        className="position-absolute badge rounded-pill"
        title={source}
        style={{
          top: 10,
          left: 10,
          backgroundColor: sourceColor(source),
          maxWidth: 130,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: '0.72rem',
          letterSpacing: '0.04em',
          boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
        }}
      >
        {source}
      </span>
      <img src={!ImageUrl ? "https://cdn.ndtv.com/common/images/ogndtv.png" : ImageUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small>
          {readTime && <span className="badge bg-secondary ms-2">{readTime} min read</span>}
        </p>
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          {onPreview && (
            <button className="btn btn-outline-dark btn-sm" onClick={onPreview}>
              Preview
            </button>
          )}
          <a
            href={newsurl}
            target='_blank'
            rel="noreferrer"
            className="btn btn-dark btn-sm"
            onClick={() => onRead && onRead(newsurl)}
          >
            {isRead ? '✓ Read' : 'Read more'}
          </a>
          {onBookmark && (
            <button
              className={`btn btn-sm ${isBookmarked ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={onBookmark}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              {isBookmarked ? '★ Saved' : '☆ Save'}
            </button>
          )}
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={handleShare}
            title="Share article"
          >
            {copied ? '✓ Copied!' : '⎘ Share'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Newsitem

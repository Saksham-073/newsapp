import React from 'react'
import Newsitem from './Newsitem'
import useBookmarks from '../hooks/useBookmarks'

function Bookmarks() {
  const { bookmarks, remove, isBookmarked } = useBookmarks()

  if (bookmarks.length === 0) {
    return (
      <div className="container text-center my-5">
        <h2>Bookmarks</h2>
        <p className="text-muted mt-3">No saved articles yet. Hit ☆ Save on any article to bookmark it.</p>
      </div>
    )
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Bookmarks ({bookmarks.length})</h2>
      <div className="row">
        {bookmarks.map((el, i) => (
          <div className="col-md-4" key={el.url + i}>
            <Newsitem
              title={el.title}
              description={el.description ? el.description.slice(0, 120) + (el.description.length > 120 ? '...' : '') : ''}
              ImageUrl={el.urlToImage}
              newsurl={el.url}
              author={el.author}
              date={el.publishedAt}
              source={el.source?.name || 'Unknown'}
              isBookmarked={isBookmarked(el.url)}
              onBookmark={() => remove(el.url)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bookmarks

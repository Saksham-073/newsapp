import { useState } from 'react'

const KEY = 'news_bookmarks'

function useBookmarks() {
  const [bookmarks, setbookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || []
    } catch {
      return []
    }
  })

  const save = (article) => {
    const updated = [article, ...bookmarks.filter(a => a.url !== article.url)]
    setbookmarks(updated)
    localStorage.setItem(KEY, JSON.stringify(updated))
  }

  const remove = (url) => {
    const updated = bookmarks.filter(a => a.url !== url)
    setbookmarks(updated)
    localStorage.setItem(KEY, JSON.stringify(updated))
  }

  const isBookmarked = (url) => bookmarks.some(a => a.url === url)

  return { bookmarks, save, remove, isBookmarked }
}

export default useBookmarks

import { useState } from 'react'

const KEY = 'news_read'

function useReadArticles() {
  const [read, setread] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(KEY)) || [])
    } catch {
      return new Set()
    }
  })

  const markRead = (url) => {
    const updated = new Set(read)
    updated.add(url)
    setread(updated)
    localStorage.setItem(KEY, JSON.stringify([...updated]))
  }

  const isRead = (url) => read.has(url)

  return { markRead, isRead }
}

export default useReadArticles

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

function Search({ apikey, setprogress }) {
  const [searchParams] = useSearchParams()
  const [query, setquery] = useState(searchParams.get('q') || '')
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(false)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  const [searched, setsearched] = useState(false)
  const [error, seterror] = useState(null)

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setquery(q)
      runSearch(q, 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const runSearch = async (q, pg) => {
    setloading(true)
    setsearched(true)
    setpage(pg)
    const results = await fetchResults(q, pg)
    setarticles(results)
    setloading(false)
  }

  const fetchResults = async (q, pg) => {
    try {
      seterror(null)
      setprogress(10)
      let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${apikey}&page=${pg}&pageSize=6&sortBy=publishedAt`
      let data = await fetch(url)
      let parsed = await data.json()
      setprogress(100)
      if (parsed.status === 'error') {
        seterror(parsed.message)
        return []
      }
      settotalResults(parsed.totalResults || 0)
      return parsed.articles || []
    } catch {
      seterror('Failed to fetch results. Please try again.')
      setprogress(100)
      return []
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    await runSearch(query, 1)
  }

  const fetchMoreData = async () => {
    const next = page + 1
    setpage(next)
    const more = await fetchResults(query, next)
    setarticles(articles.concat(more))
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Search News</h2>
      <form onSubmit={handleSearch} className="d-flex gap-2 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for news topics, events, people..."
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <button type="submit" className="btn btn-dark px-4">Search</button>
      </form>

      {error && (
        <div className="alert alert-danger" role="alert">{error}</div>
      )}

      {loading && <Spinner />}

      {!loading && searched && articles.length === 0 && !error && (
        <p className="text-center text-muted">No results found for "{query}".</p>
      )}

      {articles.length > 0 && (
        <>
          <p className="text-muted mb-3">{totalResults.toLocaleString()} results for "{query}"</p>
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length < totalResults}
            loader={<Spinner />}
          >
            <div className="row my-2">
              {articles.map((el, i) => (
                <div className="col-md-4" key={el.url + i}>
                  <Newsitem
                    title={el.title}
                    description={el.description ? el.description.slice(0, 120) + (el.description.length > 120 ? '...' : '') : ''}
                    ImageUrl={el.urlToImage}
                    newsurl={el.url}
                    author={el.author}
                    date={el.publishedAt}
                    source={el.source.name}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </>
      )}
    </div>
  )
}

export default Search

import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import useBookmarks from '../hooks/useBookmarks'
import useReadArticles from '../hooks/useReadArticles'
import ArticleModal from './ArticleModal'
import SkeletonCard from './SkeletonCard'

function News(props) {
  const { isBookmarked, save, remove } = useBookmarks()
  const { isRead, markRead } = useReadArticles()
  const [selectedArticle, setselectedArticle] = useState(null)
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  const [sortBy, setsortBy] = useState('publishedAt')
  const [fromDate, setfromDate] = useState('')
  const [error, seterror] = useState(null)

  const captalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const buildUrl = (pg, sort, from) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${pg}&pageSize=${props.pagesize}`
    if (sort && sort !== 'publishedAt') url += `&sortBy=${sort}`
    if (from) url += `&from=${from}`
    return url
  }

  const updatenews = async (sort = sortBy, from = fromDate) => {
    try {
      seterror(null)
      props.setprogress(10);
      setloading(true)
      setpage(1)
      let data = await fetch(buildUrl(1, sort, from));
      let parseddata = await data.json()
      if (parseddata.status === 'error') {
        seterror(parseddata.message || 'Failed to fetch news.')
        setloading(false)
        props.setprogress(100)
        return
      }
      setarticles(parseddata.articles || []);
      settotalResults(parseddata.totalResults || 0);
      setloading(false)
      props.setprogress(100)
    } catch {
      seterror('Network error. Please check your connection and try again.')
      setloading(false)
      props.setprogress(100)
    }
  }

  useEffect(() => {
    updatenews();
  }, [])

  const fetchMoreData = async () => {
    let data = await fetch(buildUrl(page + 1, sortBy, fromDate))
    setpage(page + 1)
    let parseddata = await data.json()
    setarticles(articles.concat(parseddata.articles || []))
    settotalResults(parseddata.totalResults || 0)
  }

  return (
    <>
      <h2 className='text-center my-4'>News Daily - Top {captalizeFirstLetter(props.category)} Headlines</h2>

      <div className="container">
        <div className="d-flex flex-wrap gap-3 align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <label className="form-label mb-0 fw-semibold">Sort:</label>
            <select className="form-select form-select-sm" style={{ width: 'auto' }} value={sortBy}
              onChange={(e) => { setsortBy(e.target.value); updatenews(e.target.value, fromDate) }}>
              <option value="publishedAt">Newest first</option>
              <option value="popularity">Most popular</option>
              <option value="relevancy">Most relevant</option>
            </select>
          </div>
          <div className="d-flex align-items-center gap-2">
            <label className="form-label mb-0 fw-semibold">From:</label>
            <input type="date" className="form-control form-control-sm" style={{ width: 'auto' }} value={fromDate}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => { setfromDate(e.target.value); updatenews(sortBy, e.target.value) }} />
            {fromDate && <button className="btn btn-sm btn-outline-secondary" onClick={() => { setfromDate(''); updatenews(sortBy, '') }}>✕ Clear</button>}
          </div>
        </div>
      </div>

      {error && (
        <div className="container my-4 text-center">
          <div className="alert alert-danger d-inline-block px-5" role="alert">
            <h5>Something went wrong</h5>
            <p className="mb-2">{error}</p>
            <button className="btn btn-danger btn-sm" onClick={() => updatenews()}>↺ Retry</button>
          </div>
        </div>
      )}

      {loading && articles.length === 0 && (
        <div className="container">
          <div className="row my-4">
            {[1,2,3,4,5,6].map(i => (
              <div className="col-md-4" key={i}><SkeletonCard /></div>
            ))}
          </div>
        </div>
      )}

      <InfiniteScroll dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}>
        <div className="container">
          <div className="row my-4">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title}
                  description={element.description ? element.description.slice(0, 120) + (element.description.length > 120 ? "..." : "") : ""}
                  ImageUrl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                  isBookmarked={isBookmarked(element.url)}
                  onBookmark={() => isBookmarked(element.url) ? remove(element.url) : save(element)}
                  isRead={isRead(element.url)}
                  onRead={markRead}
                  onPreview={() => setselectedArticle(element)}
                  content={element.content} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
      <ArticleModal article={selectedArticle} onClose={() => setselectedArticle(null)} />
  </>
  )
}
News.defaultProps = {
  country: 'in',
  pagesize: '6',
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string
}

export default News
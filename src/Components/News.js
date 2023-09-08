import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

function News(props) {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)


  const captalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updatenews = async () => {
    props.setprogress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pagesize}`
    let data = await fetch(url);
    setloading(true)
    let parseddata = await data.json()
    setarticles(parseddata.articles);
    settotalResults(parseddata.totalResults);
    setloading(false)
    props.setprogress(100)
  }

  useEffect(() => {
    updatenews();
  }, [])



  // const handleNextclick = async () => {
  //   setpage(page+1)
  //   }

  // const handlePrevclick = async () => {
  //   setpage(page-1)
  //   updatenews()
  // }

  const fetchMoreData = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pagesize=${props.pagesize}`
    setpage(page + 1)
    let data = await fetch(url);
    let parseddata = await data.json()
    setarticles(articles.concat(parseddata.articles))
    settotalResults(parseddata.totalResults)
  }

  return (
    <>
      <h2 className='text-center my-4' >News daily - Top {captalizeFirstLetter(props.category)} Headlines</h2>
      {loading && <Spinner />}

      <InfiniteScroll dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}>
        <div className="container">
          <div className="row my-4">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title}
                  description={element.description ? element.description.slice(0, 60) : " "}
                  ImageUrl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button type="button" disabled={page <= 1} className="btn btn-outline-dark" onClick={handlePrevclick}>&laquo; Previous</button>
          <button type="button" disabled={(page + 1 > Math.ceil(totalResults / props.pagesize))} className="btn btn-outline-dark" onClick={handleNextclick}>Next &raquo;</button>
        </div> */}
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
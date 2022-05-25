import React, {useEffect, useState} from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  //for class based components
  // static defaultProps = {
  //   country: "in",
  //   pageSize: 5,
  //   category: "general",
  // };
  // static propsTypes = {
  //   country: PropTypes.string,
  //   pageSize: PropTypes.number,
  //   category: PropTypes.string,
  // };
  const  [articles , setArticles]= useState([])
  const [loading , setLoading] = useState(true)
  const [page , setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // constructor(props) {
  //   super(props);
  //   console.log("Hello i m a Constructor From News");
    // state = {
    //   articles: [],
    //   loading: true,
    //   page: 1,
    //   totalResults: 0,
    // };
    // document.title = `${capitalizeFirstLetter(
    //   props.category
    // )} - NewsMonkey`;
  // }
    const updateNews = async () =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // setState({ loading: true });
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    // setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    props.setProgress(100);
  }
  useEffect(() => {
    
    console.log("cdm");
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=b040ca59b9154fa9941546990b97029c&page=1&pageSize=${props.pageSize}`;
    // setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    document.title = `${capitalizeFirstLetter(
        props.category
      )} - NewsMonkey`
    updateNews();
    // eslint-disable-next-line
  }, [])
  // const componentDidMount = async () =>{
  //   console.log("cdm");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=b040ca59b9154fa9941546990b97029c&page=1&pageSize=${props.pageSize}`;
  //   // setState({ loading: true });
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
  //   // setState({
  //   //   articles: parsedData.articles,
  //   //   totalResults: parsedData.totalResults,
  //   //   loading: false,
  //   // });
  //   updateNews();
  // }
    // const handlePrevClick = async () => {
    // console.log("previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   props.country
    // }&category=${
    //   props.category
    // }&apikey=b040ca59b9154fa9941546990b97029c&page=${
    //   page - 1
    // }&pageSize=${props.pageSize}`;
    // setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // setState({
    //   page: page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    // setState({ page: page - 1 });
  //   setPage(page-1)
  //   updateNews();
  // };
  //   const handleNextClick = async () => {
  //   console.log("Next");
    // if (
    //   !(
    //     page + 1 >
    //     Math.ceil(totalResults / props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     props.country
    //   }&category=${
    //     props.category
    //   }&apikey=b040ca59b9154fa9941546990b97029c&page=${
    //     page + 1
    //   }&pageSize=${props.pageSize}`;
    //   setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   setState({
    //     page: page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
    // setState({ page: page + 1 });
  //   setPage(page+1)
  //   updateNews();
  // };

    const fetchMoreData = async () => {
    // setState({ page: page + 1 });
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    // setState({ loading: true });
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    // setState({
    //   articles: articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    // });
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };

    console.log("render");
    return (
      <>
        <h1 className="text-center" style={{ margin: "30px 0px" , marginTop: "90px" }}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container mb-3">
            <div className="row height">
              {/* {!loading &&
              articles.map((element) => */}
              {articles.map((element) => {
                return (
                  <div className="col md-4" key={element.url}>
                    <NewsItems
                      title={
                        element.description ? element.title.slice(0, 45) : ""
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      Imgurl={element.urlToImage}
                      Newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button
              disabled={page <= 1}
              type="button"
              className="btn btn-dark mb-3 my-3"
              onClick={handlePrevClick}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="btn btn-dark mb-3 my-3"
              onClick={handleNextClick}
              disabled={
                page + 1 >
                Math.ceil(totalResults / props.pageSize)
              }
            >
              Next &rarr;
            </button>
          </div> */}
      </>
    );
  }

News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general",
}
News.propsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}; 

export default News;

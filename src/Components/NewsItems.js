import React from "react";
import { Link } from "react-router-dom";

const NewsItems = (props) => {
    let { title, description, Imgurl, Newsurl, author, date, source } =
      props;
    return (
      <div className="my-2">
        <div className="card mb-3" style={{ width: "21rem", height: "29rem" }}>
          <div style={{display: 'flex' , justifyContent: 'flex-end' , right: 0 , position: 'absolute' , fontSize : 17}}>
            <span class="badge rounded-pill bg-danger">
              {source}
            </span>
          </div>
          <img
            style={{ height: "12rem" }}
            src={
              !Imgurl
                ? "https://images.news18.com/ibnlive/uploads/2021/12/delhi-market-lockdown-164069327216x9.jpg"
                : Imgurl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}... </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-danger">
                By {!author ? "Unknown" : author} On{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <Link to={Newsurl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </Link>
          </div>
        </div>
      </div>
    );

}

export default NewsItems;

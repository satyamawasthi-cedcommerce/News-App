import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Homescreen.css";
import moment from "moment";
import { Button } from "@shopify/polaris";
function Homescreen() {
  const [launchDetails, setLaunchDetails] = useState([]);
  const [sort, setSort] = useState("asc");
  const [limit, setLimit] = useState(9);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  // eslint-disable-next-line no-unused-vars
  let [searchParams, setSearchParams] = useSearchParams();
  // api Call
  useEffect(() => {
    fetch(
      `https://api.spacexdata.com/v3/launches?limit=${limit}&offset=${offset}`
    )
      .then((res) => res.json())
      .then((fetchedData) => {
        setLaunchDetails(fetchedData);
      });
  }, [limit, offset]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
      console.log("hello");
    setIsFetching(true);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // sorting the items
  const handleSubmit = (event) => {
    event.preventDefault();
    let params = sort;
    if (sort === "asc") {
      fetch(`https://api.spacexdata.com/v3/launches?order=asc`)
        .then((res) => res.json())
        .then((fetchedData) => {
          setLaunchDetails(fetchedData);
          setSearchParams({ order: params });
        });
    } else if (sort === "desc") {
      fetch(`https://api.spacexdata.com/v3/launches?order=desc`)
        .then((res) => res.json())
        .then((fetchedData) => {
          setLaunchDetails(fetchedData);
          setSearchParams({ order: params });
        });
    }
  };
  return (
    <>
      {/* section for select and cta */}
      <section className="actions-wrapper">
        <div className="actions">
          <form onSubmit={handleSubmit}>
            <span>
              <label htmlFor="sort">Sort:</label>
              <br />
              <select
                name="sort"
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </span>
            <span>
              <Button submit primary>
                Submit
              </Button>
            </span>
          </form>
          <div className="actions__launch-count">
            Total Results:{launchDetails.length}
          </div>
        </div>
      </section>
      {/* section for displaying the data fetched from api */}
      <section className="card-wrapper">
        {launchDetails.map((item, index) => {
          return (
            <Link
              to={`/individual/${item.flight_number}`}
              className="card"
              key={index}
            >
              <div className="card__details">
                <img
                  src={item.links.mission_patch}
                  alt="link_img"
                  className="card__image"
                />
                <h2>{item.mission_name}</h2>
                <p>{item.details}</p>
              </div>

              <div className="card__details-datetime">
                <p>{moment(item.launch_date_local).format("MMMM D,YYYY")}</p>
                <a href="/#">#{item.launch_site.site_name}</a>
              </div>
            </Link>
          );
        })}
        {isFetching && (
          <div className="loader">
            <h4>loading</h4>
          </div>
        )}
      </section>
    </>
  );
}

export default Homescreen;

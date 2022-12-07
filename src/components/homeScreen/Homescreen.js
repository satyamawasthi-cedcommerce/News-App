import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Homescreen.css";
import moment from "moment";
import { Button } from "@shopify/polaris";
function Homescreen() {
  const [launchDetails, setLaunchDetails] = useState([]);
  const [sort, setSort] = useState("asc");
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(9);
  const [offset, setOffset] = useState(0);
  // eslint-disable-next-line no-unused-vars
  let [searchParams, setSearchParams] = useSearchParams();
  // api Call
  useEffect(() => {
    fetch(
      `https://api.spacexdata.com/v3/launches?limit=${limit}&offset=${offset}`
    )
      .then((res) => res.json())
      .then((fetchedData) => {
        setLaunchDetails([...launchDetails, ...fetchedData]);
      });
  }, [limit, offset]);

  const scrollToEnd = () => {
    setOffset(offset + 9);
  };

  window.onscroll = function () {
    console.log(
      document.documentElement.scrollTop,
      " ",
      window.innerHeight,
      " ",
      document.documentElement.offsetHeight
    );
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      console.log("hello");
      scrollToEnd();
      return;
    }
  };
  // sorting the items
  const handleSubmit = (event) => {
    event.preventDefault();
    let params = sort;
    if (sort === "asc") {
      fetch(`https://api.spacexdata.com/v3/launches?order=asc&limit=${limit}`)
        .then((res) => res.json())
        .then((fetchedData) => {
          setLaunchDetails(fetchedData);
          setSearchParams({ order: params });
        });
    } else if (sort === "desc") {
      fetch(`https://api.spacexdata.com/v3/launches?order=desc&limit=${limit}`)
        .then((res) => res.json())
        .then((fetchedData) => {
          setLaunchDetails(fetchedData);
          setSearchParams({ order: params });
        });
    }
  };

  // last launch -> ref
  // check when is the element visible on screen
  // once visible increment offset
  // change in offset triggers the request

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
      </section>
    </>
  );
}

export default Homescreen;

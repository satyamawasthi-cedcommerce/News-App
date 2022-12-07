import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Homescreen.css";
import moment from "moment";
import { Button } from "@shopify/polaris";
function Homescreen() {
  const [launchDetails, setLaunchDetails] = useState([]);
  const [sort, setSort] = useState("");
  // api Call
  useEffect(() => {
    fetch(`https://api.spacexdata.com/v3/launches`)
      .then((res) => res.json())
      .then((fetchedData) => {
        setLaunchDetails(fetchedData);
        console.log(fetchedData);
      });
  }, []);
  // sorting the items
  const handleSubmit = (event) => {
    event.preventDefault();
    const misc = launchDetails;
    if (sort === "asc") {
      misc.sort((a, b) => {
        const miscA = a.mission_name.toUpperCase();
        const miscB = b.mission_name.toUpperCase();
        if (miscA < miscB) {
          return -1;
        }
        if (miscA > miscB) {
          return 1;
        }
        return 0;
      });
    } else if (sort === "desc") {
      misc.sort((a, b) => {
        const miscA = a.mission_name.toUpperCase();
        const miscB = b.mission_name.toUpperCase();
        if (miscA > miscB) {
          return -1;
        }
        if (miscA < miscB) {
          return 1;
        }
        return 0;
      });
    }

    setLaunchDetails([...misc]);
    console.log(misc);
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
                <option value="none">--select--</option>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </span>
            <span>
              {/* <input type="submit" value="Submit" className="actions__cta" /> */}
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
            <Link to={`/individual/${index}`} className="card" key={index}>
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

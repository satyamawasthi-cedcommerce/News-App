import React, { useEffect, useState } from "react";
import "./Homescreen.css";
import moment from "moment";
function Homescreen() {
  const [launchDetails, setLaunchDetails] = useState([]);
  const [sort , setSort] = useState("");
  // api Call
  useEffect(() => {
    fetch(`https://api.spacexdata.com/v3/launches`)
      .then((res) => res.json())
      .then((fetchedData) => {
        setLaunchDetails(fetchedData);
        console.log(fetchedData);
      });
  }, []);
  const handleSubmit = (event) =>{
    event.preventDefault();
    alert("hello");
  }
  return (
    <>
      {/* section for select and cta */}
      <section className="actions-wrapper">
        <div className="actions">
          <form onSubmit={handleSubmit}>
            <span>
              <label htmlFor="sort">Sort:</label>
              <br />
              <select name="sort" id="sort" onChange={(e) => setSort(e.target.value)}>
                <option value="none">--select--</option>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </span>
            <span>
              <input type="submit" value="Submit" className="actions__cta"/>
            </span>
          </form>
        </div>
      </section>
      {/* section for displaying the data fetched from api */}
      <section className="card-wrapper">
        {launchDetails.map((item, index) => {
          return (
            <div className="card" key={index}>
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
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Homescreen;

import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Homescreen.css";
import moment from "moment";
import { Button, Spinner } from "@shopify/polaris";
import { useQuery } from "react-query";
import { fetchLaunches } from "../../queryHook";
function Homescreen() {
  const [sort, setSort] = useState("asc");
  const [order, setOrder] = useState("");
  const [newData, setNewData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(9);
  const [offset, setOffset] = useState(0);
  // eslint-disable-next-line no-unused-vars
  let [searchParams, setSearchParams] = useSearchParams();
  const { data, status } = useQuery([limit, offset, order], fetchLaunches);

  const scrollToEnd = () => {
    setOffset(offset + 9);
  };
  
  useEffect(() => {
    if (data) setNewData([...newData, ...data]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setNewData([]);
  }, [order]);

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.scrollHeight
    ) {
      scrollToEnd();
    }
  };
  // sorting the items
  const handleSubmit = (event) => {
    event?.preventDefault();
    let params = sort;
    setOrder(sort);
    setSearchParams({ order: params });
  };

  return (
    <div className="container">
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
            <span className="actions__cta">
              <Button submit>Submit</Button>
            </span>
          </form>
          <div className="actions__launch-count">
            <i>Total Results:{newData?.length}</i>
          </div>
        </div>
      </section>
      {/* section for displaying the data fetched from api */}
      <section className="card-wrapper">
        {status === "loading" && (
         <Spinner size="large"/>
        )}
        {status === "error" && (
          <>
            <p>Error</p>
          </>
        )}
        {status === "success" && (
          <>
            {newData?.map((item, index) => {
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
                    <h2 className="card__title">{item.mission_name}</h2>
                    <p>{item.details}</p>
                  </div>

                  <div className="card__details-datetime">
                    <p>
                      {moment(item.launch_date_local).format("MMMM D,YYYY")}
                    </p>
                    <p>#{item.launch_site.site_name}</p>
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </section>
    </div>
  );
}

export default Homescreen;

import React, { useEffect, useState } from "react";
import styles from "./FeaturedProducts.module.css";
import axios, { AxiosHeaders } from "axios";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const [games, setGames] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  async function getGames() {
    setisLoading(true);

    let { data } = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );

    setGames(data);
    setisLoading(false);
  }
  useEffect(() => {
    getGames();
  }, []);
  return (
    <>
      <div className="container">
        <div className="d-flex  align-items-center">
          <i className="fas fa-robot mr-2  text-main fs-5 pb-2"></i>
          <h4 className="text-main">Personalized Recommendations</h4>
        </div>
        {!isLoading ? (
          <div className="row">
            {games.slice(0, 3).map((game) => (
              <div className="col-lg-4 col-md-6 col-sm-12 p-3" key={game.id}>
                <Link to={`/gameDetails/${game.id}`}>
                  <div className="card border-0 game">
                    <img
                      className="card-img-top"
                      src={game.thumbnail}
                      alt="Title"
                    />
                    <div className="card-body bg-main-light border-bottom-shadow d-flex justify-content-between align-items-center">
                      <h4 className="card-title text-main">{game.title}</h4>
                      <span className="text-white btn bg-blue">Free</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            {Array.apply(null, Array(3)).map((g,index) => (
              <div className="col-md-4 " key={index}>
                <div
                  className="card bg-main-light my-3  cursor-pointer  border-0 shadow rounded-2"
                  aria-hidden="true"
                >
                  <div
                    className={`card-img-top bg-main-light rounded-2 placeholder col-12 ${styles.img}`}
                  ></div>

                  <div className="card-body bg-main-light rounded-2">
                    <h5 className="card-title bg-main-light ">
                      <span
                        className={`placeholder bg-main-light col-12 ${styles.spanLoader}`}
                      ></span>
                      <span
                        className={`placeholder bg-main-light col-12 ${styles.spanLoader}`}
                      ></span>
                      <span
                        className={`placeholder bg-main-light col-12 ${styles.spanLoader}`}
                      ></span>
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

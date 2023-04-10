import React, { useContext, useEffect } from "react";
import styles from "./Games.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ApisContext } from "../../Context/ApisContext";
export default function Games({ Parames, k }) {
  const [games, setGames] = useState([]);
  const [numberOfGames, setnumberOfGames] = useState(20);
  const [isLoading, setisLoading] = useState(false);
  let { getApis } = useContext(ApisContext);
  async function getApiPlatforms(k, param) {
    setisLoading(true);
    let { data } = await getApis(k, param);
    setGames(data);
    if(data !== undefined){
      setisLoading(false);
    }
  }

  useEffect(() => {
    getApiPlatforms(k, Parames);
  }, []);

  function moreGames() {
    if (numberOfGames <= games.length) {
      setnumberOfGames(numberOfGames + 20);
    }
  }
  return (
    <>
      {!isLoading ? (
       
        <div className="container mt-5 pt-5">
          <div className="row">
            {games?.map((game, index) =>
              index < numberOfGames ? (
                <div className="col-lg-3 col-md-4 col-sm-6" key={game.id}>
                  <Link to={`/gameDetails/${game.id}`}>
                    <div className="card border-0 game my-3">
                      <img
                        className="card-img-top"
                        src={game.thumbnail}
                        alt="Title"
                      />
                      <div className="card-body bg-main-light border-bottom-shadow ">
                        <div className="d-flex justify-content-between align-items-center">
                          <h4 className="card-title text-main">
                            {game.title.slice(0, 12)}
                            {game.title.slice(0, 12).length !==
                            game.title.length
                              ? "..."
                              : null}
                          </h4>
                          <span className=" sm text-white  btn-blue bg-blue rounded-2 px-1">
                            FREE
                          </span>
                        </div>
                        <p className="text-muted">
                          {game.short_description.slice(0, 25)}...
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <i className="fas fa-plus-square text-main"></i>
                          <div className="">
                            <span className="badge  rounded-4 bg-secondary me-2 py-1 text-dark">
                              {game.genre}
                            </span>
                            {game.platform === "PC (Windows)" ? (
                              <i className="fab fa-windows text-muted stretched-link"></i>
                            ) : (
                              <i className="fas fa-window-maximize text-muted stretched-link"></i>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : null
            )}
          </div>
          {numberOfGames <= games?.length ? (
            <button
              onClick={moreGames}
              className="btn btn-outline-secondary m-auto my-5"
            >
              More Games
            </button>
          ) : null}
        </div>
      ) : (
        <div className="container mt-5 pt-5">
          <div className="row">
            {Array.apply(null, Array(8)).map((g,index) => (
              <div className="col-md-3 " key={index}>
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
        </div>
      )}
    </>
  );
}

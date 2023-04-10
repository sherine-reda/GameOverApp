import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./GameDetails.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function GameDetails() {
  const [productDetails, setproductDetails] = useState(null);
  const [MyBackgroundImage, setMyBackgroundImage] = useState("");
  const [videoGame, setvideoGame] = useState("");
  const [isLoading, setisLoading] = useState(false);
  let params = useParams();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
  };
  async function getProductDetails(id) {
    setisLoading(true);
    let { data } = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    setproductDetails(data);
    setMyBackgroundImage(data?.thumbnail?.replace("thumbnail", "background"));
    setvideoGame(
      data?.thumbnail?.replace("thumbnail.jpg", "videoplayback.webm")
    );

    setisLoading(false);
  }
  useEffect(() => {
    getProductDetails(params?.id);
  }, []);
  return (
    <>
      {!isLoading ? (
        <div
          className={styles.details}
          style={{
            backgroundImage: `url(${MyBackgroundImage})`,
            backgroundSize: "100% 100vh",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            marginTop: "50px",
          }}
        >
          <div className={styles.layer}>
            <div className="container">
              <div className="row pt-5">
                <div className="col-md-4">
                  <div className="media position-relative">
                    <video
                      className="w-100 top-0 rounded-2 position-relative"
                      src={videoGame}
                      autoPlay
                      loop
                      muted
                    />
                    <img
                      src={productDetails?.thumbnail}
                      alt=""
                      className={`w-100 rounded-2 position-absolute top-0  ${styles.gameThumbnail}`}
                    />
                  </div>
                  <div className="row mt-3 gx-5">
                    <div className="col-md-2">
                      <span className="text-main btn bg-main-light ">FREE</span>
                    </div>
                    <div className="col-md-10">
                      {" "}
                      <Link
                        to={productDetails?.freetogame_profile_url}
                        target="_blank"
                      >
                        <button className=" w-100 btn btn-blue  bg-blue text-white">
                          Play Now <i className="fas fa-sign-out-alt"></i>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-8 text-main">
                  <h2>{productDetails?.title}</h2>
                  <h5>About {productDetails?.title}</h5>
                  <p className={styles.des}>{productDetails?.description}</p>
                  {productDetails?.minimum_system_requirements !== undefined ? (
                    <>
                      <h5>Minimum System Requirements</h5>
                      <ul>
                        <li className="py-2">
                          <strong>OS :</strong>{" "}
                          {productDetails?.minimum_system_requirements?.os}
                        </li>
                        <li className="py-2">
                          <strong>Processor :</strong>{" "}
                          {
                            productDetails?.minimum_system_requirements
                              ?.processor
                          }
                        </li>
                        <li className="py-2">
                          <strong>Memory :</strong>{" "}
                          {productDetails?.minimum_system_requirements?.memory}
                        </li>
                        <li className="py-2">
                          <strong>Graphics :</strong>{" "}
                          {
                            productDetails?.minimum_system_requirements
                              ?.graphics
                          }
                        </li>
                        <li className="py-2">
                          <strong>Storage :</strong>{" "}
                          {productDetails?.minimum_system_requirements?.storage}
                        </li>
                      </ul>
                    </>
                  ) : null}
                  {productDetails?.screenshots !== undefined ? (
                    <>
                      <h4>Lost Ark Screenshots</h4>
                      <Slider {...settings}>
                        {productDetails?.screenshots?.map((img) => (
                          <img
                            src={img.image}
                            alt="img"
                            key={productDetails.id}
                          />
                        ))}
                      </Slider>
                    </>
                  ) : null}

                  <h2 className="my-3">Additional Information</h2>
                  <div className="row">
                    <div className="col-md-4">
                      <span className="text-muted">Title</span>
                      <p>{productDetails?.title}</p>
                    </div>
                    <div className="col-md-4">
                      <span className="text-muted">Developer</span>
                      <p>{productDetails?.developer}</p>
                    </div>
                    <div className="col-md-4">
                      <span className="text-muted">Publisher</span>
                      <p>{productDetails?.publisher}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <span className="text-muted">Release Date</span>
                      <p>{productDetails?.release_date}</p>
                    </div>
                    <div className="col-md-4">
                      <span className="text-muted">Genre</span>
                      <p>{productDetails?.genre}</p>
                    </div>
                    <div className="col-md-4">
                      <span className="text-muted">Platform</span>
                      <p>
                        {productDetails?.platform !== "Windows" ? (
                          <i className="fab fa-windows text-muted stretched-link me-2"></i>
                        ) : (
                          <i className="me-2 fas fa-window-maximize text-muted stretched-link"></i>
                        )}
                        {productDetails?.platform}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white mt-5 pt-5 text-center">Loading...</div>
      )}
    </>
  );
}

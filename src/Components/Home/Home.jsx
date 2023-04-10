import React from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <div className={styles.header}>
        <div className="text-main text-center">
          <h1>
            Find & track the best{" "}
            <span className="text-blue">free-to-play</span> games!
          </h1>
          <p className="text-muted">
            Track what you've played and search for what to play next! Plus get
            free premium loot!
          </p>
          <Link to="games/all" className=" btn btn btn-outline-secondary">
            Browse Games
          </Link>
        </div>
      </div>
     

      
       <FeaturedProducts/>
    </>
  );
}

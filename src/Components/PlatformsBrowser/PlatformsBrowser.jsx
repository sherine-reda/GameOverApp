import React, { useContext, useEffect, useState } from "react";
import styles from "./PlatformsBrowser.module.css";
import { PlatformsContext } from "../../Context/ApisContext";
import { useParams } from "react-router-dom";
import Games from "../Games/Games";
export default function PlatformsBrowser() {
  let params = useParams();
  let par = params?.platform
  return <><Games Parames={par} k="platform" /> </>;
}


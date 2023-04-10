import axios from "axios";

const { createContext } = require("react");

export let ApisContext = createContext();

export function ApisContextProvider(props) {
  async function getApis(key,platform) {
    return axios
      .get(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?${key}=${platform}`,
        {
          headers:{
            "X-RapidAPI-Key":"b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
            "X-RapidAPI-Host":"free-to-play-games-database.p.rapidapi.com",
          },
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
 
  return (
    <ApisContext.Provider value={{getApis}}>
      {props.children}
    </ApisContext.Provider>
  );
}

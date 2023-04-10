import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import GameDetails from "./Components/GameDetails/GameDetails";
import { ApisContextProvider } from "./Context/ApisContext";
import AllGames from "./Components/AllGames/AllGames";
import PlatformsPPC from "./Components/PlatformsPPc/PlatformsPPc";
import PlatformsBrowser from "./Components/PlatformsBrowser/PlatformsBrowser";
import SortedByReleaseDate from "./Components/SortedByReleaseDate/SortedByReleaseDate";
import SortedByPopularity from "./Components/SortedByPopularity/SortedByPopularity";
import SortedByAlphabetical from "./Components/SortedByAlphabetical/SortedByAlphabetical";
import SortedByRelevance from "./Components/SortedByRelevance/SortedByRelevance";
import CategoriesRacing from "./Components/CategoriesRacing/CategoriesRacing";
import CategoriesSports from "./Components/CategoriesSports/CategoriesSports";
import CategoriesSocial from "./Components/CategoriesSocial/CategoriesSocial";
import CategoriesShooter from "./Components/CategoriesShooter/CategoriesShooter";
import CategoriesOpenWorld from "./Components/CategoriesOpenWorld/CategoriesOpenWorld";
import CategoriesZombie from "./Components/CategoriesZombie/CategoriesZombie";
import CategoriesActionRpg from "./Components/CategoriesActionRpg/CategoriesActionRpg";
import CategoriesAction from "./Components/CategoriesAction/CategoriesAction";
import CategoriesFlight from "./Components/CategoriesFlight/CategoriesFlight";
import CategoriesBattleRoyale from "./Components/CategoriesBattleRoyale/CategoriesBattleRoyale";
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';

function App() {
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);

  const [userData, setUserData] = useState(null);
  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout setUserData={setUserData} userData={userData} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/all",
          element: (
            <ProtectedRoute>
              <AllGames />
            </ProtectedRoute>
          ),
        },

        {
          path: "games/Platforms/pc/:platform",
          element: (
            <ProtectedRoute>
              <PlatformsPPC />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/Platforms/browser/:platform",
          element: (
            <ProtectedRoute>
              <PlatformsBrowser />
            </ProtectedRoute>
          ),
        },

        {
          path: "games/sort-by/release-date/:sortBy",
          element: (
            <ProtectedRoute>
              <SortedByReleaseDate />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/sort-by/popularity/:sortBy",
          element: (
            <ProtectedRoute>
              <SortedByPopularity />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/sort-by/alphabetical/:sortBy",
          element: (
            <ProtectedRoute>
              <SortedByAlphabetical />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/sort-by/relevance/:sortBy",
          element: (
            <ProtectedRoute>
              <SortedByRelevance />
            </ProtectedRoute>
          ),
        },

        {
          path: "games/Categories/racing/:category",
          element: (
            <ProtectedRoute>
              <CategoriesRacing />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/Categories/sports/:category",
          element: (
            <ProtectedRoute>
              <CategoriesSports />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/Categories/social/:category",
          element: (
            <ProtectedRoute>
              <CategoriesSocial />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/Categories/shooter/:category",
          element: (
            <ProtectedRoute>
              <CategoriesShooter />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/Categories/open-world/:category",
          element: (
            <ProtectedRoute>
              <CategoriesOpenWorld />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/Categories/zombie/:category",
          element: (
            <ProtectedRoute>
              <CategoriesZombie />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/Categories/action-rpg/:category",
          element: (
            <ProtectedRoute>
              <CategoriesActionRpg />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/Categories/action/:category",
          element: (
            <ProtectedRoute>
              <CategoriesAction />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/Categories/flight/:category",
          element: (
            <ProtectedRoute>
              <CategoriesFlight />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/Categories/battle-royale/:category",
          element: (
            <ProtectedRoute>
              <CategoriesBattleRoyale />
            </ProtectedRoute>
          ),
        },

        {
          path: "gameDetails/:id",
          element: (
            <ProtectedRoute>
              <GameDetails />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "forgotPassword", element: <ForgotPassword /> },
        { path: "resetPassword", element: <ResetPassword saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  return (
    <ApisContextProvider>
      <RouterProvider router={routers}></RouterProvider>
    </ApisContextProvider>
  );
}

export default App;

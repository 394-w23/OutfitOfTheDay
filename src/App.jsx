import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header";
import BottomNav from "./components/navigation/BottomNav";
import Login from "./pages/auth/Login";
import Closet from "./pages/Closet";
import Outfits from "./pages/Outfits";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AddClothes from "./pages/AddClothes";
import getMockUser from "./utils/mockUser";
import Build from "./pages/Build";
import Suggest from "./pages/Suggest";
import { useDbData, useDbUpdate } from "./utils/firebase";
import getTodaysDate from "./utils/todayDate";
import { useProfile } from "./utils/userProfile";

const App = () => {
  //const [user] = useProfile();
  const user = getMockUser();
  const [closet] = useDbData("/closet");
  const [updateData] = useDbUpdate("/");

  useEffect(() => {
    if (closet) {
      if (closet[user.uid].todays) {
        if (closet[user.uid].lastWorn < getTodaysDate()) {
          updateData({
            ["/closet/" + user.uid + "/todays/"]: null,
          });
          updateData({
            ["/closet/" + user.uid + "/lastWorn"]: null,
          });
        }
      }
    }
  }, [closet]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/add"
          element={
            user ? (
              <>
                <Header />
                <AddClothes />
                <BottomNav />
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={
            user ? (
              <>
                <Header />
                <Home />
                <BottomNav />
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/build"
          element={
            user ? (
              <>
                <Header />
                <Build />
                <BottomNav />
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/suggest"
          element={
            user ? (
              <>
                <Header />
                <Suggest />
                <BottomNav />
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/outfits"
          element={
            user ? (
              <>
                <Header />
                <Outfits />
                <BottomNav />
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/view-profile"
          element={
            user ? (
              <>
                <Header />
                <Profile />
                <BottomNav />
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/closet"
          element={
            user ? (
              <>
                <Header />
                <Closet />
                <BottomNav />
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header";
import BottomNav from "./components/navigation/BottomNav";
import Login from "./pages/auth/Login";
import Closet from "./pages/Closet";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AddClothes from "./pages/AddClothes";
import getMockUser from "./utils/mockUser";
import Landing from "./pages/Landing";
import { useProfile } from "./utils/userProfile";

const App = () => {
  //const [user] = useProfile();
  const user = getMockUser();
  const [step, setStep] = useState(0);

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
              step === 0 ? (
                <>
                  <Header />
                  <Landing setStep={setStep} />
                  <BottomNav />
                </>
              ) : (
                <>
                  <Header />
                  <Home />
                  <BottomNav />
                </>
              )
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/favorites"
          element={
            user ? (
              <>
                <Header />
                <Favorites />
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

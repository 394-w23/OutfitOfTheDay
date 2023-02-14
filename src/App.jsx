import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header";
import BottomNav from "./components/navigation/BottomNav";
import Login from "./pages/auth/Login";
import Closet from "./pages/Closet";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import { useProfile } from "./utils/userProfile";

const App = () => {
  const [user] = useProfile();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
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

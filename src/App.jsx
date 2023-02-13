import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import { useProfile } from "./utils/userProfile";

const App = () => {
  const [user] = useProfile();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

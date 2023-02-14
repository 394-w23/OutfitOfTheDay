import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../utils/userProfile";
import { signInWithGoogle } from "../../utils/firebase";
import { Container } from "react-bootstrap";

const Login = () => {
  const [user] = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const SignInButton = () => (
    <button
      className="ml-5 p-2 w-75 btn login-button"
      onClick={signInWithGoogle}
    >
      SIGN IN
    </button>
  );

  return (
    <Container className="login-container">
      <Container className="login-info-container">
        <Container>
          <h1 className="login-title" data-cy="login-title">
            Outfit Of The Day
          </h1>

          <p className="login-info">
            OutfitOfTheDay is an app that allows you to catalog your closet and
            decide on an outfit for the day each morning. It will also keep
            track of your favorite outfits, which will be recommended more
            frequently.
          </p>
          <SignInButton />
        </Container>
      </Container>
    </Container>
  );
};

export default Login;

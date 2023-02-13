import { useEffect } from "react";
import { useAuthState, useDbData, useDbUpdate } from "./firebase";

export const useProfile = () => {
  const [user] = useAuthState();
  const [updateUser, resultUser] = useDbUpdate("/users/");
  const [updateCloset, resultCloset] = useDbUpdate("/closet/");
  const [users, error, loading] = useDbData("/users/");

  useEffect(() => {
    if (user && !error && !loading) {
      updateUser({
        [user.uid]: {
          displayName: user.displayName,
          email: user.email,
          profilePic: user.photoURL,
        },
      });

      updateCloset({
        [user.uid]: {
          id: user.uid,
          clothes: [],
          favorites: [],
          outfits: [],
        },
      });
    }
  }, [error, loading, user, updateUser, updateCloset]);

  return [user, error, loading];
};

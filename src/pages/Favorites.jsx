import React from "react";

import { useDbData } from "../utils/firebase";

const Favorites = () => {
  const [favs] = useDbData("/favourites");

  // if (!favs) return <h4 className="text-muted">Loading favourites...</h4>;

  const extractFavs = () => {
    // console.log(favs);
    let idx = 0;
    let dressList = Object.keys(favs).map(key => (
          Object.entries(favs[key]).map(([dressType, imgLink]) => (
            <div key={idx} className="dressList">
                <img
                  className="w-100 shadow-1-strong rounded mb-4"
                  src={imgLink}
                  alt={dressType}
                />
            </div>
          )
        )
      )
    );
      return dressList;
  }

  return <div>
    {favs && extractFavs(favs)}</div>;
};

export default Favorites;


import axios from "axios";
import React, { useEffect, useState } from "react";

export const SuperHeroesPage = () => {
  const [data, setdata] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes")
      .then((res) => {
        setdata(res.data);
        setIsLoding(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoding(false);
      });
  }, []);

  if (isLoding) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <div>
      {/* {isLoding && <h2>Loading...</h2>} */}
      <h2>SuperHeroesPage</h2>
      {data.map((hero) => {
        // console.log("hero", hero);
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </div>
  );
};

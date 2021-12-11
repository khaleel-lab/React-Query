import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const {
    isLoading: addHeroIsLoading,
    isError: addHeroIsError,
    error: addHeroError,
    mutate: addHero,
  } = useAddSuperHeroData();
  const handleFetchHero = () => {
    const hero = { name, alterEgo };

    // passing data mutate function
    addHero(hero);
  };

  const onSuccess = (data) => {
    console.log("after fetching the data", data);
  };
  const onError = (error) => {
    console.log("Error encountering", error);
  };

  // const { isLoading, isFetching, data, isError, error, refetch } = useQuery(
  //   "super-heroes",
  //   fetchSuperHeroes,
  //   // Note: The default cacheTime is 5mins and also the staleTime is 0
  //   // cacheTime means, it will fetch after the time over, but the isLoading make to false
  //   // staleTime means, it will stop fetch upto timeover - bechave fresh, after that the cache time overs again refetch in background
  //   // refetchOnMount - fetch the data on component mount
  //   // refetchOnWindowsFocus - fetch the data when come back to the same window
  //   // refetchInterval - fetch the data with an time decalration
  //   // refetchIntervalInBackground - fetch the data in background
  //   // enabled: false - when the component mount it will not fetch the data
  //   // select - We use for the data transformation
  //   {
  //     // cacheTime: 5000,
  //     // staleTime: 30000,
  //     // refetchOnMount: "always", // default true., other options false / 'always'
  //     // refetchOnWindowFocus: true, // default true., other options false / 'always'
  //     // refetchInterval: 2000, // default is false
  //     // refetchIntervalInBackground: true,
  //     // enabled: false,
  //     onSuccess: onSuccess,
  //     onError: onError,
  //     select: (data) => {
  //       const superHeroeNames = data.data.map((hero) => hero.name);
  //       return superHeroeNames;
  //     },
  //   }
  // );

  const properties = { onSuccess, onError };
  const { isLoading, isFetching, data, isError, error, refetch } =
    useSuperHeroesData(properties);

  console.log({ isLoading, isFetching });
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <h2>RQSuperHeroesPage</h2>
      <div>
        <input
          type="text"
          placeholder="Hero Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Hero AlterEgo"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleFetchHero}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}

      {/* The data only return heroName, bcz we used select on useQuery */}
      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};

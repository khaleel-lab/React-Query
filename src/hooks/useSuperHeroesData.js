import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { request } from "../utils/axios.utils";

const fetchSuperHeroes = () => {
  // return axios.get("http://localhost:4000/superheroes");
  return request({ url: "/superheroes" });
};

// The mutation function automatically recevies any argument you pass when you invoke mutate function in the component
const addSuperHero = (hero) => {
  // return axios.post("http://localhost:4000/superheroes", hero);
  return request({ url: "/superheroes", method: "post", data: hero });
};

export const useSuperHeroesData = ({ onSuccess, onError }) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroeNames = data.data.map((hero) => hero.name);
    //   return superHeroeNames;
    // },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // By using invalidate query - when you post the data it will refetch
    //   // queryClient.invalidateQueries("super-heroes");

    //   // To get rid of from the refetch network request
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },

    // Optimestic update callbacks
    onMutate: async (newHero) => {
      // while on mutation canceling the new network requestes
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};

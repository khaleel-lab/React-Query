import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

export const DependentQueriesPage = ({ email }) => {
  const fetchUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`);
  };
  const fetchCoursesById = (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`);
  };

  const {
    isLoading,
    error,
    isError,
    data: user,
  } = useQuery(["user", email], () => fetchUserByEmail(email));

  const channelId = user?.data.channelId;

  const {
    isLoading: channelLoading,
    error: channelError,
    isError: channelIsError,
    data: channel,
  } = useQuery(["channel", channelId], () => fetchCoursesById(channelId), {
    enabled: !!channelId,
  });

  return <div>Dependent Queries Page</div>;
};

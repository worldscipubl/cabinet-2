import { useGetUserQuery } from "../api/endpoints/UserApi";

const useGetAvatar = () => {
  const {
    data,
    error: errorUserId,
    isLoading: isLoadingUserId,
  } = useGetUserQuery();
  const { userId } = data;
  return { userId, errorUserId, isLoadingUserId };
};

export default useGetAvatar;

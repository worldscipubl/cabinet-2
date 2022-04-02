import { useGetUserQuery } from "../api/endpoints/UserApi";

const useGetAvatar = () => {
  const {
    data,
    error: errorAvatar,
    isLoading: isLoadingAvatar,
  } = useGetUserQuery();
  const { avatar } = data;
  return { avatar, errorAvatar, isLoadingAvatar };
};

export default useGetAvatar;

import { useGetUserFileByIdQuery } from "../api/endpoints/UserFilesApi";

const useGetPassport = (fileId) => {
  const {
    data: scan,
    error: errorScan,
    isLoading: isLoadingScan,
  } = useGetUserFileByIdQuery(fileId);
  return { scan, errorScan, isLoadingScan };
};

export default useGetPassport;

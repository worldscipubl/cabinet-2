import {useGetUserFileByIdQuery} from "../api/endpoints/UserFilesApi";

const useGetPassport = (fileId) => {
    const {data: scanFile, error: errorPage, isLoading: isLoadingPage} = useGetUserFileByIdQuery(fileId);
    return {scanFile, errorPage, isLoadingPage};
}

export default useGetPassport;
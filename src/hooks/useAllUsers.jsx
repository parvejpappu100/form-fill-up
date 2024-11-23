import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAllUsers = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: userInfo = [], refetch: infoRefetch } = useQuery({
        queryKey: ["userInfo", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure(`/users/${user?.email}`)
            return response.data;
        }
    });

    return [userInfo, infoRefetch]
};

export default useAllUsers;
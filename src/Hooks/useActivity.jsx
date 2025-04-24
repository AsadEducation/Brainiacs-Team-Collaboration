import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useActivity = () => {

    const axiosPublic = useAxiosPublic();
    const { currentUser } = useAuth(); //console.log(currentUser?.email);

    const email = currentUser?.email;

    const {data:activities=[],refetch} = useQuery({

        queryKey:['activities',email],

        queryFn:async()=>{
            try {
                const res = await axiosPublic.get(`/activity?email=${email}`); //console.log(res.data);
                return res.data;

            } catch (error) {
                console.log(error);
            }
        }
    })

    return {activities,refetch}
   
};

export default useActivity;
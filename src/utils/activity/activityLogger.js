import useAxiosPublic from "../../Hooks/useAxiosPublic";

// utils/activityLogger.js
const logActivity = (activityObject) => {

    console.log(activityObject);

    const axiosPublic = useAxiosPublic();

    axiosPublic.post('/activity',activityObject)
    .then(res=>{
        console.log('activity logged success in db ', res.data);
    })
  
};

export default logActivity;

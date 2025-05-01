import moment from "moment/moment";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";


const logActivity = (data) => {
  console.log("data from activity logger", data);


  return;

  let message = "";

  if(data?.entity=="Task"){
     // types of action can be done 1.add 2.update 3.move 4.delete
     if(data?.action=="Move"){
      message = `task ${data?.taskTittle} ${data?.action} from ${data?.columnBeforeMove} to ${data?.columnAfterMove}`
     }
  }

  const activityObject = {
    ...data,
    timeStamp: moment(),
    message,
  };

  console.log("object from activity logger", activityObject);

  const axiosPublic = useAxiosPublic();

  axiosPublic.post("/activity", activityObject)
    .then((res) => {
      console.log("activity logged success in db ", res.data);
    });
};

export default logActivity;

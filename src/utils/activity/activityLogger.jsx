import moment from "moment/moment";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

//Types of activity:   1. Task -> add , move , update ,delete , marked as done 
//                     2.Column--> add , update Name , delete
//                     3.Board --> add , update Name , delete , changing visibility (public/private),
//                     4.Board Member --> add , Remove,
//                     5.Task Assign


const logActivity = (data) => {

  console.log("data from activity logger", data);


  let message = "";

  if(data?.entity=="Task" && data?.action=="Add"){
      message = `Task ${data?.taskTittle} Added in ${data?.columnTittle}`
  }
  if(data?.entity=="Task" && data?.action=="Move"){
      message = `Task ${data?.taskTittle} moved from ${data?.columnBeforeMove} to ${data?.columnAfterMove}`
  }
  if(data?.entity=="Column" && data?.action=="Add"){
      message = `New column ${data?.columnTittle} Added`
  }
  if(data?.entity=="Column" && data?.action=="Delete"){
      message = `Deleted column ${data?.columnTittle}`
  }
  if(data?.entity=="ColumnName" && data?.action=="Update"){
      message = `Column name is updated to ${data?.columnTittle}`
  }
  if(data?.entity=="Board" && data?.action=="Add"){
      message = `A new board ${data?.boardTitle} added`
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

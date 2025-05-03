import React, { useMemo, useState, useEffect, useRef, act } from "react";
import { useParams, useLocation } from "react-router";
import axios from "axios";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import TaskManagementHeader from "./TaskManagementHeader";
import AddMemberModal from "./AddMemberModal";
import ColumnsSection from "./ColumnsSection";
import { useQuery } from "@tanstack/react-query";
import Modal from "react-modal";
import "./ModalStyles.css"; // Ensure this file exists and contains modal styles
import { useSensors, useSensor, PointerSensor } from "@dnd-kit/core"; // Add this import
import { arrayMove } from "@dnd-kit/sortable";
import logActivity from "../../utils/activity/activityLogger";

import Swal from "sweetalert2"; // Import SweetAlert2
import { toast } from "react-toastify"; // Import react-toastify
import { io } from "socket.io-client"; // Import socket.io-client
import useAuth from "../../Hooks/useAuth";

Modal.setAppElement("#root");

export default function NewTaskManagement() {
  const { id } = useParams();
  const location = useLocation();
  const [board, setBoard] = useState(null);
  const socket = useRef(null); // Initialize socket reference
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const searchTimeout = useRef(null);
  const axiosPublic = useAxiosPublic(); //using base url from useAxiosPublic hook
  const [currentColumns, setCurrentColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [isAddingList, setIsAddingList] = useState(false);
  const { currentUser } = useAuth();

  //activity object [asad]

  const activityObject = {
    currentUser,
    boardId: id,
  }


  // siam vai's code starts here
  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axiosPublic.get(`/boards/${id}`); // Use axiosPublic for consistent base URL
        setBoard(response.data);
        setMembers(response.data.members || []);
      } catch (error) {
        console.error("Error fetching board data:", error);

        if (error.response?.status === 404) {
          Swal.fire({
            icon: "error",
            title: "Board Not Found",
            text: "The requested board does not exist or has been deleted.",
          });
          setBoard(null); // Clear the board state
        } else if (error.response?.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Invalid Board ID",
            text: "The provided board ID is invalid. Please check and try again.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch board data. Please try again later.",
          });
        }
      }
    };

    fetchBoardData();
  }, [id]); // Ensure this runs whenever the `id` changes
  // siam vai's code ends here

  useEffect(() => {
    // Connect to WebSocket server
    socket.current = io(`${import.meta.env.VITE_API_URL}`, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection status logging
    socket.current.on("connect", () => {
      console.log("Socket connected");
    });

    socket.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // Identify the user to the server when connected
    socket.current.on("connect", () => {
      if (currentUser?.email) {
        socket.current.emit("identify", currentUser.email);
        console.log(`Identified as ${currentUser.email}`);
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [currentUser]);

  // this state contains the column lists
  const {
    refetch: columnRefetch,
    data: columns = [],
    isLoading,
  } = useQuery({
    queryKey: ["columns"],
    queryFn: async () => {
      const result = await axiosPublic.get("/columns");
      return result.data;
    },
  });
  useEffect(() => {
    if (!isLoading) {
      const boardColumns = columns.filter((column) => column.boardId == id);
      setCurrentColumns(boardColumns);
    }
  }, [columns]);

  // this state contains task lists
  const {
    refetch: taskRefetch,
    data: dbTasks = [],
    isLoading: taskLoading,
  } = useQuery({
    queryKey: ["dbTasks"],
    queryFn: async () => {
      const result = await axiosPublic.get("/tasks");
      return result.data;
    },
  });

  useEffect(() => {
    if (!taskLoading) {
      const boardTasks = dbTasks.filter((task) => task.boardId == id);
      setTasks(boardTasks);
    }
  }, [dbTasks]);

  // need to study about useMEMO
  const columnId = useMemo(
    () => currentColumns?.map((col) => col.id),
    [currentColumns]
  );

  // the below function is used to generate the id of new currentColumns
  const generateId = () => {
    // generate a random number between 0 and 1000
    return crypto.randomUUID()
  };

  // the below function adds new column to the column list 
  const createNewColumn = (e) => {
    e.preventDefault();
    const columnTittle = e.target.columnName.value;
    const columnId = generateId()
    const columnToAdd = {
      id: columnId,
      type: "Column",
      boardId: id,
      tittle: columnTittle || `Column ${currentColumns.length + 1}`,
    };
    // adding new column to local state 
    setCurrentColumns([...currentColumns, columnToAdd]);
    // adding new column to database
    axiosPublic.post("/columns", { ...columnToAdd, order: currentColumns.length + 1 })
      .then(res => {
        console.log("column post response", res.data)
        // logging activity after creating a new column
        logActivity({
          entity: "Column",
          action: 'Add',
          columnId,
          columnTittle,
          ...activityObject
        })
      })
      .catch(err => {
        console.log("Column post error", err)
      })
    setIsAddingList(false)

  }
  const updateColumn = (id, tittle) => {
    const columnInfo = { id, tittle }

    const newColumn = currentColumns.map(col => {
      if (col.id !== id) return col;
      return { ...col, tittle }
    })
    setCurrentColumns(newColumn)
    axiosPublic.put('/columnName', columnInfo)
      .then(res => {
        console.log("Column Name is updated", res)
        // logging the update of column
        logActivity({
          entity: "ColumnName",
          action: 'Update',
          columnId: id,
          columnTittle: tittle,
          ...activityObject
        })
      })
      .catch(err => {
        console.log("Column Name update Failed", err);
      })
  }
  const createTask = (e, columnId, columnTittle, setIsAddingTask) => {
    e.preventDefault();
    const tittle = e.target.taskTittle.value;
    const taskId = generateId();
    console.log(tittle, "tittle")
    const newTask = {
      id: taskId,
      type: "Task",
      boardId: id,
      columnId,
      columnTittle,
      taskTittle: tittle || `Task ${tasks.length + 1}`
    }
    // adding new task to local state
    setTasks([...tasks, newTask])
    // adding new task to database
    axiosPublic.post("tasks", { ...newTask, order: tasks.length + 1 })
      .then(res => {
        console.log("task post response", res.data)
        //logging the creation of new task
        logActivity({
          ...activityObject,
          entity: "Task",
          action: 'Add',
          taskId,
          taskTittle: tittle,
          columnId,
          columnTittle
        })
      })
      .catch(err => {
        console.log("task post error", err)
      })
    setIsAddingTask(false)
  }

  //   siam vai's code starts here
  const addMember = async (member) => {
    console.log("Sending join request with payload:", {
      boardId: id,
      boardName: board?.name,
      senderId: currentUser?._id,
      senderName: currentUser?.displayName,
      senderPhotoURL: currentUser?.photoURL,
      receiverName: member.displayName || member.name, // Correctly using receiverName
      receiverPhotoURL: member.photoURL, // Correctly using receiverPhotoURL
      receiverId: member.userId,
      receiverEmail: member.email,
    });

    try {
      const response = await axiosPublic.post("/join-requests", {
        boardId: id,
        boardName: board?.name,
        senderId: currentUser?._id,
        senderName: currentUser?.displayName,
        senderPhotoURL: currentUser?.photoURL,
        receiverName: member.displayName || member.name, // Correctly using receiverName
        receiverPhotoURL: member.photoURL, // Correctly using receiverPhotoURL
        receiverId: member.userId,
        receiverEmail: member.email,
      });

      const savedRequest = response.data;

      // Emit the join request event to the receiver
      socket.current.emit("join-request-sent", {
        receiverEmail: member.email,
        joinRequest: savedRequest,
      });

      toast.success(`Join request sent to ${member.name}.`);
    } catch (error) {
      console.error("Error sending join request:", error);
      toast.error("Failed to send join request. Please try again.");
    }
  };

  const fetchSuggestedUsers = async (query) => {
    try {
      const response = await axiosPublic.get(`/members/search`, {
        params: { query },
      });
      setSuggestedUsers(response.data);
    } catch (error) {
      console.error("Error fetching suggested users:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      if (query.trim()) {
        fetchSuggestedUsers(query);
      } else {
        setSuggestedUsers([]);
      }
    }, 300); // Debounce for 300ms
  };

  const handleUserSelect = (user) => {
    const normalizedUser = { ...user, id: user.id || user._id }; // Normalize id
    if (!selectedUsers.some((selected) => selected.id === normalizedUser.id)) {
      setSelectedUsers((prevSelectedUsers) => [
        ...prevSelectedUsers,
        normalizedUser,
      ]);
    }
  };

  const handleRemoveSelectedUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  const handleAddSelectedUsers = async () => {
    for (const user of selectedUsers) {
      if (!user.id) {
        console.error("Invalid user object:", user);
        alert(
          "One or more selected users have invalid data. Please try again."
        );
        continue;
      }

      await addMember({
        userId: user.id,
        name: user.name || user.displayName,
        email: user.email,
        photoURL: user.photoURL,

        role: "member", // Default role
      });
    }
    setSelectedUsers([]);
    setIsModalOpen(false);
  };

  //   siam vai's code ends  here


  const onDragStart = event => {
    console.log("event", event)
    setTimeout(() => {
      if (event.active.data.current?.type === "Column") {
        setActiveColumn({ id: event.active.data.current?.id, tittle: event.active.data.current?.tittle, type: "Column" })
      }
      if (event.active.data.current?.type === "Task") {
        setActiveTask({ id: event.active.data.current?.id, taskTittle: event.active.data.current?.taskTittle, type: "Task" })
      }
    }, 10)
  }
  const onDragEnd = event => {

    setActiveColumn(null)
    setActiveTask(null)
    const { active, over } = event; console.log('active task', active);
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId == overId) return;
    if (active.data.current?.type === "Column" && over.data.current?.type === "Column") {
      setCurrentColumns(currentColumns => {
        const activeColumnIndex = currentColumns.findIndex(col => col.id == activeId)
        const overColumnIndex = currentColumns.findIndex(col => col.id == overId)
        const updatedColumns = arrayMove(currentColumns, activeColumnIndex, overColumnIndex)
        axiosPublic.put("/columns", updatedColumns)
          .then(res => {
            console.log("column set update", res)
            columnRefetch();
          })
          .catch(err => {
            console.log("column swap error", err)
          })
        return updatedColumns;
      })
    }
    // console.log("current task", currentTask)
  }
  const onDragOver = event => {
    const { active, over } = event; //console.log('active task',active)
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";

    if (!isActiveTask) return;

    // Get the active task's original data BEFORE any modifications
    const activeTask = tasks.find(t => t.id === activeId);
    const activeTaskTitle = active?.data?.current?.taskTittle;

    // Scenario 1: Dropping a Task over another Task
    if (isActiveTask && isOverTask) {
      const overTask = tasks.find(t => t.id === overId);

      // Capture original and new columns BEFORE updating
      const columnBeforeMove = activeTask.columnTittle || "Backlog";
      const columnAfterMove = overTask.columnTittle || "Backlog";

      // Update the task's position and column
      const updatedTasks = tasks.map(task => {
        if (task.id === activeId) {
          return {
            ...task,
            columnId: overTask.columnId,
            columnTittle: overTask.columnTittle
          };
        }
        return task;
      });

      // Reorder tasks
      const activeIndex = tasks.findIndex(t => t.id === activeId);
      const overIndex = tasks.findIndex(t => t.id === overId);
      const newTaskArray = arrayMove(updatedTasks, activeIndex, overIndex);

      setTasks(newTaskArray);
      setTasks(newTaskArray);

      axiosPublic.put("/tasks", newTaskArray)
        .then((res) => {
          // console.log("successfully sent tasks to db", res);
          logActivity({
            entity: "Task",
            action: 'Move',
            taskId: active?.data?.current?.id,
            taskTittle: active?.data?.current?.taskTittle,
            columnBeforeMove,
            columnAfterMove,
            ...activityObject
          })
        })
        .catch(console.error);
    }

    // Scenario 2: Dropping a Task over a Column
    if (isActiveTask && isOverAColumn) {
      const columnBeforeMove = activeTask.columnTittle || "Backlog";
      const columnAfterMove = over.data.current?.tittle || "New Column";

      const updatedTasks = tasks.map(task => {
        if (task.id === activeId) {
          return {
            ...task,
            columnId: overId,
            columnTittle: over.data.current?.tittle
          };
        }
        return task;
      });

      setTasks(updatedTasks);

      axiosPublic.put("/tasks", updatedTasks)
        .then((res) => {
          logActivity({
            entity: "Task",
            action: 'Move',
            taskId: active?.data?.current?.id,
            taskTittle: active?.data?.current?.taskTittle,
            columnBeforeMove,
            columnAfterMove,
            ...activityObject
          });
        })
        .catch(console.error);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const handleColumnDelete = (column) => {
    console.log("column delete request for id :", column.id)
    console.log("checking column name before delete", column);
    setCurrentColumns(() => {
      const newCurrentColumn = currentColumns.filter(col => col.id != column.id)
      return newCurrentColumn;
    })
    axiosPublic.delete(`/columns?id=${column.id}`)
      .then(res => {
        console.log("Column Deleted", res)
        //logging the activity of column delete 
        logActivity({
          entity: "Column",
          action: 'Delete',
          columnId: column?.id,
          columnTittle: column?.tittle,
          ...activityObject
        })

      })
      .catch(err => {
        console.log("Column Delete Failed", err)
      })


  }
  return (
    <div
      style={{
        backgroundColor: board?.theme || location.state?.theme || "#f4f5f7",
        minHeight: "100vh",
      }}
      className="flex flex-col"
    >
      <TaskManagementHeader board={board} members={members} setIsModalOpen={setIsModalOpen} />
      <main className="flex-grow p-6 pb-2">
        <div className="container mx-auto">
          <ColumnsSection
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            columnId={columnId}
            currentColumns={currentColumns}
            updateColumn={updateColumn}
            createTask={createTask}
            tasks={tasks}
            isAddingList={isAddingList}
            setIsAddingList={setIsAddingList}
            createNewColumn={createNewColumn}
            activeColumn={activeColumn}
            activeTask={activeTask}
            handleColumnDelete={handleColumnDelete}
          />
        </div>
      </main>
      <AddMemberModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        suggestedUsers={suggestedUsers}
        handleSearchChange={handleSearchChange}
        handleUserSelect={handleUserSelect}
        selectedUsers={selectedUsers}
        handleRemoveSelectedUser={handleRemoveSelectedUser}
        handleAddSelectedUsers={handleAddSelectedUsers}
      />
    </div>
  );
}

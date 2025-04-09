import React, { useMemo, useState, useEffect, useRef } from "react";
import { FaUserPlus } from "react-icons/fa";
import ColumnContainer from "./ColumnContainer";
import { CiCirclePlus } from "react-icons/ci";
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { useParams, useLocation } from "react-router";
import axios from "axios";


import { useQuery } from "@tanstack/react-query";

import Modal from "react-modal";
import "./ModalStyles.css"; // Ensure this file exists and contains modal styles
import useAxiosPublic from "../../Hooks/useAxiosPublic";



// Set the app element for accessibility
Modal.setAppElement("#root"); // Ensure your app's root element has the id "root"

export default function NewTaskManagement() {
    const { id } = useParams();
    const location = useLocation();
    const [board, setBoard] = useState(null);
    const [members, setMembers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const searchTimeout = useRef(null);

    // siam vai's code starts here
    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/boards/${id}`);
                setBoard(response.data);
                setMembers(response.data.members || []);
            } catch (error) {
                console.error("Error fetching board data:", error);
            }
        };
        fetchBoardData();
    }, [id]);
    // siam vai's code ends here


    const axiosPublic = useAxiosPublic()
    // this state contains the column lists 
    const [currentColumns, setCurrentColumns] = useState([])
    const { refetch: columnRefetch, data: columns = [], isLoading } = useQuery({
        queryKey: ["columns"],
        queryFn: async () => {
            const result = await axiosPublic.get("/columns");
            return result.data;
        }
    })
    useEffect(() => {
        if (!isLoading) {
            const boardColumns = columns.filter(column => column.boardId == id)
            setCurrentColumns(boardColumns)
        }
    }, [columns]);



    // this state contains task lists 
    const [tasks, setTasks] = useState([]);

    const { refetch: taskRefetch, data: dbTasks = [], isLoading: taskLoading } = useQuery({
        queryKey: ["dbTasks"],
        queryFn: async () => {
            const result = await axiosPublic.get("/tasks");
            return result.data;
        }
    })


    useEffect(() => {
        if (!taskLoading) {
            const boardTasks = dbTasks.filter(task => task.boardId == id)
            setTasks(boardTasks)
        }
    }, [dbTasks]);


    const [activeColumn, setActiveColumn] = useState(null);
    const [activeTask, setActiveTask] = useState(null);
    const [isAddingList, setIsAddingList] = useState(false)


    // need to study about useMEMO 
    const columnId = useMemo(() => currentColumns.map(col => col.id), [currentColumns]);


    // the below function is used to generate the id of new currentColumns 
    const generateId = () => {
        // generate a random number between 0 and 1000
        return Math.floor(Math.random() * 10001);
    }

    // the below function adds new column to the column list 
    const createNewColumn = (e) => {
        e.preventDefault();
        const columnTittle = e.target.columnName.value;
        const columnToAdd = {
            id: columnTittle + generateId(),
            type: "Column",
            boardId: id,
            tittle: columnTittle || `Column ${currentColumns.length + 1}`,
        };
        // adding new column to local state 
        setCurrentColumns([...currentColumns, columnToAdd]);
        // adding new column to database
        axiosPublic.post("/columns", columnToAdd)
            .then(res => {
                console.log("column post response", res.data)
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
            })
            .catch(err => {
                console.log("Column Name update Failed", err);
            })
    }
    const createTask = (e, columnId, columnTittle, setIsAddingTask) => {
        e.preventDefault();
        const tittle = e.target.taskTittle.value;
        console.log(tittle, "tittle")
        const newTask = {
            id: tittle + generateId(),
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
            })
            .catch(err => {
                console.log("task post error", err)
            })
        setIsAddingTask(false)
    }

    //   siam vai's code starts here
    const addMember = (memberName) => {
        const newMember = {
            id: generateId(),
            name: memberName,
        };
        setMembers([...members, newMember]);
    };

    const fetchSuggestedUsers = async (query) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/users/search?query=${query}`
            );
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
        if (!selectedUsers.some((selected) => selected.id === user.id)) {
            setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
        }
    };

    const handleRemoveSelectedUser = (userId) => {
        setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
    };

    const handleAddSelectedUsers = () => {
        selectedUsers.forEach((user) => addMember(user.name));
        setSelectedUsers([]);
        setIsModalOpen(false);
    };

    //   siam vai's code ends  here


    const onDragStart = event => {
        console.log(event, "event")
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
        const { active, over } = event;
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
        console.log("current task", currentTask)
    }
    const onDragOver = event => {
        const { active, over } = event;
        console.log("active", active, "over", over)
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;
        if (activeId == overId) return;
        const isActiveTask = active.data.current?.type === "Task";
        const isOverTask = over.data.current?.type === "Task";
        if (!isActiveTask) return;
        // im dropping a task over another task
        if (isActiveTask && isOverTask) {

            const activeIndex = tasks.findIndex((t) => t.id === activeId)
            const overIndex = tasks.findIndex((t) => t.id === overId)
            tasks[activeIndex].columnId = tasks[overIndex].columnId;
            tasks[activeIndex].columnTittle = tasks[overIndex].columnTittle;
            const newTaskArray = arrayMove(tasks, activeIndex, overIndex)
            setTasks(newTaskArray);
            // currentTask = newTaskArray;
            axiosPublic.put("/tasks", newTaskArray)
                .then(res => {
                    console.log("task is updated", res)
                })
                .catch(err => {
                    console.log("task update error", err);
                })

        }

        const isOverAColumn = over.data.current?.type === "Column";
        // im dropping a task over a column
        if (isActiveTask && isOverAColumn) {

            const activeIndex = tasks.findIndex((t) => t.id === activeId)
            tasks[activeIndex].columnId = overId;
            tasks[activeIndex].columnTittle = over.data.current?.tittle;
            const newTaskArray = arrayMove(tasks, activeIndex, activeIndex)
            setTasks(newTaskArray);
            // currentTask = newTaskArray;
            axiosPublic.put("/tasks", newTaskArray)
                .then(res => {
                    console.log("task is updated", res)
                })
                .catch(err => {
                    console.log("task update error", err);
                })
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        })
    );

    return (
        <div
            style={{
                backgroundColor: board?.theme || location.state?.theme || "#f4f5f7",
                minHeight: "100vh",
            }}
            className="flex flex-col"
        >
            {/* Header Section */}
            <header className="bg-white/20 shadow-md px-4 py-3">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2" >
                        <h1 className="text-2xl font-bold text-white">
                            {board?.name || "Untitled Board"}
                        </h1>
                        <p className="text-base text-gray-50">
                            ({board?.visibility || "Public"})
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Members Section */}
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold text-gray-700">Members:</h2>
                            <ul className="flex flex-wrap gap-1 ">
                                {members.map((member) => (
                                    <li
                                        key={member.id}
                                        className="px-3 py-1 bg-gray-100 rounded shadow text-gray-700"
                                    >
                                        {member.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                        >
                            <FaUserPlus className="text-lg" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow p-6 pb-2">
                <div className="container mx-auto">


                    {/* Columns Section */}
                    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
                        <div className='m-auto flex min-h-[calc(100vh-110px)] w-full  overflow-x-auto overflow-y-hidden px-10 bg-gradient-to-bl from-secondary to-secondary/70  '>
                            <div className='mx-auto flex gap-4'>
                                <div className='flex gap-2 pb-2'>
                                    <SortableContext items={columnId}>
                                        {
                                            currentColumns.map((col, idx) => <ColumnContainer key={idx} column={col} updateColumn={updateColumn} createTask={createTask} tasks={tasks.filter(task => task.columnId === col.id)}></ColumnContainer>)
                                        }
                                    </SortableContext>
                                </div>
                                {
                                    isAddingList ?
                                        <div className=' h-[85px] px-3 w-60  rounded-lg bg-[#F1F2F4] text-[#172B4D] text-[12px] font-semibold ring-gray-500 hover:ring-2 flex items-center '>
                                            <form className='w-full flex flex-col gap-2' onSubmit={createNewColumn}  >
                                                <input autoFocus name='columnName' className='py-1 px-2 w-full rounded-sm bg-white outline-none' type="text" placeholder='Enter column name' />
                                                <div className='flex  gap-2'>
                                                    <button type='submit' className='bg-primary text-white px-6 py-1 cursor-pointer' >Add</button>
                                                    <button className='bg-primary text-white px-4 py-1 cursor-pointer' onClick={() => setIsAddingList(false)}>Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                        :
                                        <button onClick={() => setIsAddingList(true)} className='h-10 px-4 w-60 cursor-pointer rounded-lg bg-[#F1F2F4] text-[#172B4D] text-[12px] font-semibold ring-gray-500 hover:ring-1 flex gap-2 items-center '><CiCirclePlus className='text-xl'></CiCirclePlus>
                                            {
                                                (currentColumns.length < 1) ? "Add A List" : " Add Another List"
                                            }</button>
                                }
                            </div>
                        </div>


                        {createPortal(
                            <DragOverlay dropAnimation={{ duration: 200 }}>
                                {activeColumn && (
                                    <ColumnContainer key={activeColumn.id} column={activeColumn} updateColumn={updateColumn} tasks={tasks.filter(task => task.columnId === activeColumn.id)} createTask={createTask} />
                                )}
                                {activeTask && <TaskCard key={activeTask.id} task={activeTask} />}
                            </DragOverlay>,
                            document.body
                        )}
                    </DndContext>
                </div>
            </main>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Add Member Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2 className="text-lg font-semibold mb-4">Add Member</h2>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for users..."
                    className="w-full p-2 border rounded mb-4"
                />
                <ul>
                    {suggestedUsers.map((user) => (
                        <li
                            key={user.id}
                            className="p-2 border-b cursor-pointer hover:bg-gray-100"
                            onClick={() => handleUserSelect(user)}
                        >
                            <h6 className="text-lg">{user.name}</h6>
                            <p className="text-xs">({user.email})</p>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between items-center mt-4">
                    <h3 className="text-md font-semibold mt-4">Selected Users</h3>
                    <h3>({selectedUsers.length})</h3>
                </div>
                <ul>
                    {selectedUsers.map((user) => (
                        <li
                            key={user.id}
                            className="p-2 border-b flex justify-between items-center"
                        >
                            <span>
                                <h6 className="text-lg">{user.name}</h6>
                                <p className="text-xs">({user.email})</p>
                            </span>
                            <button
                                onClick={() => handleRemoveSelectedUser(user.id)}
                                className="text-red-500 text-sm"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleAddSelectedUsers}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
            </Modal>
        </div>
    );
}
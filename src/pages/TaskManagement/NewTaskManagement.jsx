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
import Modal from "react-modal";
import "./ModalStyles.css"; // Ensure this file exists and contains modal styles

// Set the app element for accessibility
Modal.setAppElement("#root"); // Ensure your app's root element has the id "root"

export default function NewTaskManagement() {
  const { id } = useParams();
  const location = useLocation();
  const [board, setBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const searchTimeout = useRef(null);

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

  const columnId = useMemo(() => columns.map((col) => col.id), [columns]);

  const generateId = () => Math.floor(Math.random() * 10001);

  const createNewColumn = () => {
    const columnToAdd = {
      id: generateId(),
      type: "Column",
      tittle: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const updateColumn = (id, tittle) => {
    const newColumn = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, tittle };
    });
    setColumns(newColumn);
  };

  const createTask = (columnId, columnTittle) => {
    const newTask = {
      id: generateId(),
      type: "Task",
      columnId,
      columnTittle,
      taskTittle: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };

  const addMember = (memberName) => {
    const newMember = {
      id: generateId(),
      name: memberName,
    };
    setMembers([...members, newMember]);
  };

  const addTaskToList = (taskTitle, columnId) => {
    const newTask = {
      id: generateId(),
      type: "Task",
      columnId,
      taskTittle: taskTitle,
    };
    setTasks([...tasks, newTask]);
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

  const onDragStart = (event) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn({
        id: event.active.data.current?.id,
        tittle: event.active.data.current?.tittle,
        type: "Column",
      });
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask({
        id: event.active.data.current?.id,
        taskTittle: event.active.data.current?.taskTittle,
        type: "Task",
      });
    }
  };

  const onDragEnd = (event) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId == overId) return;
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id == activeId);
      const overColumnIndex = columns.findIndex((col) => col.id == overId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId == overId) return;
    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    if (!isActiveTask) return;
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveTask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

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
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {board?.name || "Untitled Board"}
            </h1>
            <p className="text-sm text-gray-500">
              {board?.visibility || "Public"}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
          >
            <FaUserPlus className="mr-2" /> Add Member
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="container mx-auto">
          {/* Members Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Members</h2>
            <ul className="flex flex-wrap gap-4 mt-2">
              {members.map((member) => (
                <li
                  key={member.id}
                  className="px-4 py-2 bg-gray-100 rounded shadow text-gray-700"
                >
                  {member.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Columns Section */}
          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          >
            <div className="flex gap-4 overflow-x-auto">
              <SortableContext items={columnId}>
                {columns.map((col) => (
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    tasks={tasks.filter((task) => task.columnId === col.id)}
                    addTaskToList={addTaskToList}
                    className="bg-white shadow-md rounded p-4 w-72"
                  />
                ))}
              </SortableContext>
              <button
                onClick={createNewColumn}
                className="h-10 px-4 w-60 cursor-pointer rounded-lg bg-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-300 flex items-center justify-center"
              >
                <CiCirclePlus className="text-xl mr-2" /> Add Another List
              </button>
            </div>

            {createPortal(
              <DragOverlay>
                {activeColumn && (
                  <ColumnContainer
                    column={activeColumn}
                    updateColumn={updateColumn}
                    tasks={tasks.filter(
                      (task) => task.columnId === activeColumn.id
                    )}
                    createTask={createTask}
                  />
                )}
                {activeTask && <TaskCard task={activeTask} />}
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

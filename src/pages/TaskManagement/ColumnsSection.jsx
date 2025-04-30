import React from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable"; // Corrected import
import { createPortal } from "react-dom";
import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";
import ChatBox from "../../Component/Shared/ChatBox/ChatBox";

export default function ColumnsSection({
    sensors,
    onDragStart,
    onDragEnd,
    onDragOver,
    columnId,
    currentColumns,
    updateColumn,
    createTask,
    tasks,
    isAddingList,
    setIsAddingList,
    createNewColumn,
    activeColumn,
    activeTask,
    handleColumnDelete
}) {
    
    
    return (
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
            <div className="m-auto flex min-h-[calc(100vh-110px)] w-full overflow-x-auto overflow-y-hidden  bg-gradient-to-bl from-secondary to-secondary/70">
                <div className="mx-auto flex gap-4">
                    <div className="flex gap-2 pb-2">
                        <SortableContext items={columnId}>
                            {currentColumns?.map((col) => (
                                <ColumnContainer
                                    key={col.id}
                                    column={col}
                                    updateColumn={updateColumn}
                                    createTask={createTask}
                                    tasks={tasks.filter((task) => task.columnId === col.id)}
                                    handleColumnDelete={handleColumnDelete}
                                />
                            ))}
                        </SortableContext>
                    </div>
                    {isAddingList ? (
                        <div className="h-[85px] px-3 w-60 rounded-lg bg-[#F1F2F4] text-[#172B4D] text-[12px] font-semibold ring-gray-500 hover:ring-2 flex items-center">
                            <form className="w-full flex flex-col gap-2" onSubmit={createNewColumn}>
                                <input
                                    autoFocus
                                    name="columnName"
                                    className="py-1 px-2 w-full rounded-sm bg-white outline-none"
                                    type="text"
                                    placeholder="Enter column name"
                                />
                                <div className="flex gap-2">
                                    <button type="submit" className="bg-primary text-white px-6 py-1 cursor-pointer">
                                        Add
                                    </button>
                                    <button
                                        className="bg-primary text-white px-4 py-1 cursor-pointer"
                                        onClick={() => setIsAddingList(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsAddingList(true)}
                            className="h-10 px-4 w-60 cursor-pointer rounded-lg bg-[#F1F2F4] text-[#172B4D] text-[12px] font-semibold ring-gray-500 hover:ring-1 flex gap-2 items-center"
                        >
                            {
                                currentColumns?.length < 1 ?
                                    "Add A List" :
                                    "Add Another List"
                            }
                        </button>
                    )}
                </div>
                
                
            </div>
            {createPortal(
                <DragOverlay dropAnimation={{ duration: 200 }}>
                    {activeColumn && (
                        <ColumnContainer
                            key={activeColumn.id}
                            column={activeColumn}
                            updateColumn={updateColumn}
                            tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                            createTask={createTask}
                            handleColumnDelete={handleColumnDelete}
                        />
                    )}
                    {activeTask && <TaskCard key={activeTask.id} task={activeTask} />}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
}
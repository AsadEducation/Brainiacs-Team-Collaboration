import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";

const ColumnContainer = ({ column, updateColumn, createTask, tasks }) => {
    const taskIds=useMemo(()=>{
        return tasks.map(task=>task.id)
    },[tasks])
    const [editMode, setEditMode] = useState(false);
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: column,
        disabled: editMode,
    })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }
    // if(isDragging){
    //     return <div ref={setNodeRef} style={style} className=" h-fit w-72 p-20 bg-[#F1F2F4] rounded-xl  "></div>
    // }
    return (
        <div ref={setNodeRef} style={style} className=" h-fit w-72 p-2 bg-[#F1F2F4] rounded-xl ">
            <div  {...attributes} {...listeners}>
                {
                    !editMode ?
                        <h3 onClick={() => { setEditMode(true) }} className=" w-full px-4 text-start rounded-md  text-[12px] py-1 font-semibold flex items-center text-[#172B4D] hover:text-gray-90 cursor-pointer ">{column.tittle}</h3>
                        :
                        <>
                            <input defaultValue={column.tittle} autoFocus
                                onFocus={(e) => e.target.select()}
                                onBlur={() => setEditMode(false)}
                                onKeyDown={(e) => {
                                    if (e.key !== "Enter") return;
                                    setEditMode(false)
                                }}
                                onChange={(e) => updateColumn(column.id, e.target.value)}
                                className="border border-slate-400 outline-none focus:border-slate-600  text-slate-800 text-[12px] font-semibold mx-4" type="text" />
                        </>
                }
            </div>
            <div className="max-h-[calc(100vh-180px)] h-fit overflow-y-scroll  ">
                <div className=" flex flex-col items-center gap-2">
                    <SortableContext items={taskIds}>
                    {
                        tasks?.map((task,index) => (
                            // <div className="text-black">{task?.taskTittle}</div>
                            <TaskCard key={index} task={task}></TaskCard>
                        ))
                    }
                    </SortableContext>
                </div>
            </div>
            <button onClick={() => createTask(column.id,column.tittle)} className="hover:bg-[#D0D4DB] w-full px-4 text-start rounded-md mt-2 text-[12px] py-1 font-semibold flex items-center text-[#172B4D] hover:text-gray-900">+  Add a card</button>
        </div>
    );
};

export default ColumnContainer;
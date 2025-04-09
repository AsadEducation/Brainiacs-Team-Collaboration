import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";

const ColumnContainer = ({ column, updateColumn, createTask, tasks }) => {
    const [isAddingTask, setIsAddingTask] = useState(false)
    const taskIds = useMemo(() => {
        return tasks.map(task => task.id)
    }, [tasks])
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
            <div className="py-1"  {...attributes} {...listeners}>
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
            <div className="max-h-[calc(100vh-195px)] h-fit overflow-y-scroll overflow-x-hidden pb-2">
                <div className=" flex flex-col items-center gap-2">
                    <SortableContext items={taskIds}>
                        {
                            tasks?.map((task, index) => (
                                
                                <TaskCard key={index} task={task}></TaskCard>
                            ))
                        }
                    </SortableContext>
                </div>
            </div>
            {
                isAddingTask ?
                    <>
                        <div className=' h-[85px] px-3 w-full  rounded-lg bg-white text-[#172B4D] text-[12px] font-semibold border border-sky-500 flex items-center '>
                            <form className='w-full flex flex-col gap-2'  onSubmit={(e) => { createTask(e, column.id, column.tittle, setIsAddingTask) }}  >
                                <input autoFocus  name="taskTittle" className='py-1 px-2 w-full rounded-sm bg-white outline-none' type="text" placeholder='Enter task name' />
                                <div className='flex  gap-2'>
                                    <button type='submit' className='bg-primary text-white px-6 py-1 cursor-pointer' >Add</button>
                                    <button type="button" className='bg-primary text-white px-4 py-1 cursor-pointer' onClick={() => setIsAddingTask(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                        {/* <div className="bg-white rounded-md border border-sky-500">
                            <form onSubmit={(e) => { createTask(e, column.id, column.tittle, setIsAddingTask) }} className=" w-full px-4 text-start rounded-md mt-2 text-[12px] py-1 font-semibold flex items-center text-[#172B4D] hover:text-gray-900" >
                                <input type="text" name="taskTittle" />
                                <button type='submit' className='bg-primary text-white px-2 py-1 cursor-pointer' >Add</button>
                                <button>fasd</button>
                            </form>
                        </div> */}
                    </>
                    :
                    <div className="">
                        <button onClick={() => setIsAddingTask(true)} className="hover:bg-[#D0D4DB] w-full px-4 text-start rounded-md mt-2 text-[12px] py-1 font-semibold flex items-center text-[#172B4D] hover:text-gray-900">+  Add a card</button>
                    </div>
            }
        </div>
    );
};

export default ColumnContainer;





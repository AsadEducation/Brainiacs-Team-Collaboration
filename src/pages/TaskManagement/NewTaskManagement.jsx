import React, { useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import ColumnContainer from './ColumnContainer'
import { CiCirclePlus } from 'react-icons/ci'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import TaskCard from './TaskCard'
import { useParams } from 'react-router'


export default function NewTaskManagement() {
    const {id} =useParams()
    console.log(id);
    
    // this state contains the column lists 
    const [columns, setColumns] = useState([])
    const [tasks,setTasks]=useState([]);
    const [activeColumn, setActiveColumn] = useState(null);
    const [activeTask, setActiveTask] = useState(null);


    // need to study about useMEMO 
    const columnId = useMemo(() => columns.map(col => col.id), [columns]);


    // the below function is used to generate the id of new columns 
    const generateId = () => {
        // generate a random number between 0 and 1000
        return Math.floor(Math.random() * 10001);
    }

    // the below function adds new column to the column list 
    const createNewColumn = () => {
        const columnToAdd = {
            id: generateId(),
            type:"Column",
            tittle: `Column ${columns.length + 1}`,
        };
        setColumns([...columns, columnToAdd]);

    }
    const updateColumn=(id,tittle)=>{
        const newColumn=columns.map(col=>{
            if(col.id!==id)return col;
            return{...col,tittle}
        })
        setColumns(newColumn)
    }
    const createTask=(columnId,columnTittle)=>{
        const newTask={
          id:generateId(),
          type:"Task",
          columnId,
          columnTittle,
          taskTittle:`Task ${tasks.length+1}`
        }
        setTasks([...tasks,newTask])
    }
    const onDragStart = event => {
        console.log(event, "event")
        if (event.active.data.current?.type==="Column") {
            setActiveColumn({ id: event.active.data.current?.id, tittle: event.active.data.current?.tittle,type:"Column" })
        }
        if (event.active.data.current?.type==="Task") {
            setActiveTask({ id: event.active.data.current?.id, taskTittle: event.active.data.current?.taskTittle,type:"Task" })
        }
    }
    const onDragEnd=event=>{
        setActiveColumn(null)
        setActiveTask(null)
        const {active,over}=event;
        if(!over) return;
        const activeId=active.id;
        const overId=over.id;
        if(activeId==overId)return;
        setColumns(columns=>{
            const activeColumnIndex=columns.findIndex(col=>col.id==activeId)
            const overColumnIndex=columns.findIndex(col=>col.id==overId)
            return arrayMove(columns,activeColumnIndex,overColumnIndex)
        })
    }
    const onDragOver=event=>{
        const {active,over}=event;
        if(!over) return;
        const activeId=active.id;
        const overId=over.id;
        if(activeId==overId)return;
        const isActiveTask=active.data.current?.type==="Task";
        const isOverTask=over.data.current?.type==="Task";
        if(!isActiveTask)return;
        // im dropping a task over another task
        if(isActiveTask && isOverTask){
            setTasks((tasks)=>{
                const activeIndex=tasks.findIndex((t)=>t.id===activeId)
                const overIndex=tasks.findIndex((t)=>t.id===overId)
                tasks[activeIndex].columnId=tasks[overIndex].columnId;
                return arrayMove(tasks,activeIndex,overIndex)
            });
        }

        const isOverAColumn=over.data.current?.type==="Column";
        // im dropping a task over a column
        if(isActiveTask && isOverAColumn){
            setTasks((tasks)=>{
                const activeIndex=tasks.findIndex((t)=>t.id===activeId)
                tasks[activeIndex].columnId=overId;
                return arrayMove(tasks,activeIndex,activeIndex)
            });
        }
    }
    const sensors=useSensors(
        useSensor(PointerSensor,{
            activationConstraint:{
                distance:3,
            }
        })
    )
    return (
        <div className='bg-gradient-to-rb from-secondary/90 to-secondary/50'>

            <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
                <div className='m-auto flex min-h-screen w-full  overflow-x-auto overflow-y-hidden p-10 bg-gradient-to-bl from-secondary to-secondary/70  '>
                    <div className='mx-auto flex gap-4'>
                        <div className='flex gap-2'>
                            <SortableContext items={columnId}>
                                {
                                    columns.map(col => <ColumnContainer key={col.id} column={col} updateColumn={updateColumn} createTask={createTask} tasks={tasks.filter(task=>task.columnId===col.id)}></ColumnContainer>)
                                }
                            </SortableContext>
                        </div>
                        <button onClick={createNewColumn} className='h-10 px-4 w-60 cursor-pointer rounded-lg bg-[#F1F2F4] text-[#172B4D] text-[12px] font-semibold ring-gray-500 hover:ring-1 flex gap-2 items-center '><CiCirclePlus className='text-xl'></CiCirclePlus> Add Another List</button>
                    </div>
                </div>


                {createPortal(
                    <DragOverlay>
                        {activeColumn && (
                            <ColumnContainer column={activeColumn} updateColumn={updateColumn} tasks={tasks.filter(task=>task.columnId===activeColumn.id)} createTask={createTask  } />
                        )}
                        {activeTask && <TaskCard task={activeTask}/>}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    )
}

import { useState } from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BiFile, BiPlus, BiDotsVerticalRounded } from 'react-icons/bi'

const SortablePage = ({ id, title }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between p-2 hover:bg-neutral-800 rounded-lg cursor-pointer group"
    >
      <div className="flex items-center gap-2">
        <BiFile className="text-neutral-400" />
        <span className="text-neutral-200">{title}</span>
      </div>
      <BiDotsVerticalRounded className="text-neutral-400 opacity-0 group-hover:opacity-100" />
    </div>
  )
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [pages, setPages] = useState([
    { id: '1', title: 'Getting Started' },
    { id: '2', title: 'Project Ideas' },
    { id: '3', title: 'Tasks' },
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setPages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const newItems = [...items]
        const [removed] = newItems.splice(oldIndex, 1)
        newItems.splice(newIndex, 0, removed)

        return newItems
      })
    }
  }

  const addNewPage = () => {
    const newId = String(pages.length + 1)
    setPages([...pages, { id: newId, title: 'Untitled' }])
  }

  return (
    <div className={`bg-neutral-900 ${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden border-r border-neutral-800`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-neutral-200">Notion Clone</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-neutral-800 rounded text-neutral-400"
          >
            {isSidebarOpen ? '←' : '→'}
          </button>
        </div>
        
        <button
          onClick={addNewPage}
          className="mt-4 w-full text-left p-2 hover:bg-neutral-800 rounded flex items-center gap-2 text-neutral-400"
        >
          <BiPlus />
          New Page
        </button>

        <div className="mt-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={pages.map(page => page.id)}
              strategy={verticalListSortingStrategy}
            >
              {pages.map((page) => (
                <SortablePage key={page.id} id={page.id} title={page.title} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  )
}

export default Sidebar 
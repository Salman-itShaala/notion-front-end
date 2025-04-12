import { useState } from 'react'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex bg-neutral-900">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-12 border-b border-neutral-800 flex items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-neutral-800 rounded text-neutral-400"
              >
                ☰
              </button>
            )}
            <input
              type="text"
              placeholder="Untitled"
              className="text-xl font-semibold bg-transparent border-none outline-none text-neutral-200 placeholder-neutral-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-neutral-800 rounded text-neutral-400">Share</button>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-auto p-8 bg-neutral-900">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-neutral-200">Welcome to Notion Clone</h1>
            <p className="text-neutral-400">Select a page from the sidebar or create a new one to get started.</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

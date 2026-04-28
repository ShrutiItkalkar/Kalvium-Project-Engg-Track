"use client"

import { useState } from "react"
import { Check, Plus } from "lucide-react"

type Task = {
  id: number
  text: string
  completed: boolean
}

type Filter = "all" | "active" | "completed"

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputValue, setInputValue] = useState("")
  const [filter, setFilter] = useState<Filter>("all")

  const addTask = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return

    setTasks([...tasks, { id: Date.now(), text: trimmed, completed: false }])
    setInputValue("")
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  const remainingCount = tasks.filter((task) => !task.completed).length

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>

      {/* Add Task Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 justify-center">
        {(["all", "active", "completed"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <ul className="space-y-2 mb-6">
        {filteredTasks.length === 0 ? (
          <li className="text-center text-muted-foreground py-8">
            {tasks.length === 0 ? "No tasks yet. Add one above!" : "No tasks match this filter."}
          </li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer transition-colors hover:bg-secondary/50 ${
                task.completed ? "bg-secondary/30" : "bg-card"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  task.completed
                    ? "bg-primary border-primary"
                    : "border-muted-foreground"
                }`}
              >
                {task.completed && <Check size={12} className="text-primary-foreground" />}
              </div>
              <span
                className={`flex-1 ${
                  task.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {task.text}
              </span>
            </li>
          ))
        )}
      </ul>

      {/* Remaining Count */}
      <p className="text-center text-sm text-muted-foreground">
        {remainingCount} {remainingCount === 1 ? "task" : "tasks"} remaining
      </p>
    </div>
  )
}

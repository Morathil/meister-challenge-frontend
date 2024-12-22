interface Project {
  id: number
  name: string
  tasks: Task[]
}

interface Task {
  id: number
  name: string
  project: Project
}
import { Routes, Route } from "react-router-dom"
import Task from "../pages/Task"
import TaskCreate from "../pages/TaskCreate"
import TaskEdit from "../pages/TaskEdit"

function MyRouter() {
  return (
    <Routes>
        <Route path="/" element={<Task />} />
        <Route path="/tasks/create" element={<TaskCreate />} />
        <Route path="/tasks/:id/edit" element={<TaskEdit />} />
    </Routes>
  );
}

export default MyRouter;

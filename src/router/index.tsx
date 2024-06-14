import { Routes, Route } from "react-router-dom"
import Task from "../pages/Task"
import TaskEdit from "../pages/TaskEdit"

function MyRouter() {
  return (
    <Routes>
        <Route path="/" element={<Task />} />
        <Route path="/tasks/:id/edit" element={<TaskEdit />} />
    </Routes>
  );
}

export default MyRouter;

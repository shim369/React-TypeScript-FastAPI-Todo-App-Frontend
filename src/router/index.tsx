import { Routes, Route } from "react-router-dom";
import Task from "../pages/Task";

function MyRouter() {
  return (
    <Routes>
        <Route path="/" element={<Task />} />
    </Routes>
  );
}

export default MyRouter;

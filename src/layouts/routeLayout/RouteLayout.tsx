import { Route, Routes } from 'react-router-dom';
import Login from '../../pages/login/Login'; 
import Register from '../../pages/register/Register'; 
import People from '../../pages/people/People';
import Projects from '../../pages/projects/Projects';
import Create from '../../pages/create/Create';
import ProtectedRoute from '../../hooks/route/protectedRoute';
import Project from '../../pages/project/Project';
import CreateProject from '../../pages/createProject/CreateProject';
import CreateUser from '../../pages/createUser/CreateUser';
import EditUser from '../../pages/editUser/EditUser';
import Account from '../../pages/account/Accout';

const RouteLayout = () => {
  return (
        <Routes>
          {/* Non protected routes */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          {/* Protected routes */}
            <Route path="/" element={<ProtectedRoute element={<Projects/>}/>} />
            <Route path="/people" element={<ProtectedRoute element={<People/>}/>} />
            <Route path="/projects" element={<ProtectedRoute element={<Projects/>}/>} />
            <Route path="/projects/:projectId" element={<ProtectedRoute element={<Project/>}/>} />
            <Route path="/create" element={<ProtectedRoute element={<Create/>} allowedRoles={["admin", "manager"]}/>} />
            <Route path="/create/project" element={<ProtectedRoute element={<CreateProject/>} allowedRoles={["admin", "manager"]}/>} />
            <Route path="/create/user" element={<ProtectedRoute element={<CreateUser/>} allowedRoles={["admin"]}/>} />
            <Route path="/edit/user/:userId" element={<ProtectedRoute element={<EditUser/>} allowedRoles={["admin"]}/>} />
            
            <Route path="/account" element={<ProtectedRoute element={<Account/>} allowedRoles={["admin", "manager", "member"]}/>} />

        </Routes>
  )
}

export default RouteLayout;
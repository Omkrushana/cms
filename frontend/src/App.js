
import './App.css';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTaskPage from './components/AddTaskPage';
import HomePage from './components/HomePage';
import LoginEmployee from './components/LoginEmployee';
import AdminDashboard from './components/AdminDashboard';
import Tasklist from './components/Tasklist';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>

          <Route path='/admin' element={<LoginPage />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/employee' element={<LoginEmployee />} />
          <Route path="/employee/add-task" element={<AddTaskPage />}/>
          <Route path="/employee/tasklist" element={<Tasklist />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

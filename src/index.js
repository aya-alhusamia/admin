import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './i18n/i18n.js';
import App from './App';

// Pages
import Opinions from './pages/opinions/Opinions.jsx';
import Courses from './pages/courses/Courses.jsx';
import Categories from './pages/categories/Categories.jsx';
import Admin from './pages/admin/Admin.jsx';
import Instructors from './pages/instructors/Instructors.jsx';
import Trainees from './pages/trainees/Trainees.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={ <App /> }>
        <Route path='opinions' element={ <Opinions /> } />
        <Route path='courses' element={ <Courses /> } />
        <Route path='categories' element={ <Categories /> } />
        <Route path='admin' element={ <Admin /> } />
        <Route path='instructors' element={ <Instructors /> } />
        <Route path='trainees' element={ <Trainees /> } />
      </Route>
    </>
  )
);
 

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
);


 
import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Create from './components/Create'
import Update from './components/Update'
import Table from './components/Table'
import Read from './components/Read'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/'element={<Table/>}/>
      <Route path='/create'element={<Create/>}/>
      <Route path='/update/:id'element={<Update/>}/>
      <Route path='/read/:id'element={<Read/>}/>

    </Routes>

    </BrowserRouter>
     
      
    </>
  )
}

export default App

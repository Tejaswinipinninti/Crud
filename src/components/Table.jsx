import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';

const Table = () => {
    //useState for storing the user data
    let [data,setData]=useState([])

    //useEffect for fetching the data from the json server
    useEffect(()=>{
        async function getUser() {
            try {
              //Backend server url (Api-endpoint)
              const response = await axios.get('http://localhost:3000/users');
              setData(response.data)
            } catch (error) {
              console.error(error);
            }
          }
          getUser()//calling the function to fetch the data manually

        return ()=>{}//clean up or unmounting function

    },[])

    //function to handle the delete functionality
    let handleDelete=async(id)=>{
      let confirm=window.confirm("Are u sure to delete")
      if(confirm){
        try{
          let response=await axios.delete(`http://localhost:3000/users/${id}`)
          setData(prevdata=>prevdata.filter(item=>item.id!==id))
          toast.success("user delete successfully")
        }catch(error){
          console.log(error.message)
          toast.error("user failed delete")
        }
      }
    }


  return (
    <>
    <Link to={"/create"} className='btn btn-success'>Create</Link>
    <table className="table table-responsive">
    <thead>
    <tr>
      <th scope="col">Sno</th>
      <th scope="col">name</th>
      <th scope="col">email</th>
      <th scope="col">Mobile</th>
      <th scope="col">address</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    {/* second row for displaying the dynamic data */}
    
        {/* logic */}
        <tbody>
            {
                data.map((user)=>(
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>address</td>
                        <td>
                            <Link to={`/update/${user.id}`}className='btn btn-primary nav-link'>update</Link>
                            <Link to={`/read/${user.id}`}className='btn btn-primary nav-link'>read</Link>
                            <button onClick={(id)=>handleDelete(user.id)}>delete</button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    
    </table>
      
    </>
        )
    }

export default Table


import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom'

const Read = () => {
  const[data,setData]=useState([])
  console.log(data)//these are the values of the particular user
  const {address,name,phone,email}=data
  console.log(address)
  let firstcity=address?address.city:""


  let { id }=useParams()


  useEffect(()=>{
    const getUser=async()=>{

      try{
        //using the axios for updating the data in the server
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        console.log(response.data) 
        setData(response.data)

        //on successfull creation of the users we are notifying the user
        toast.success("user fetched successfully")
      }catch(error){
        console.log(error.name)
        toast.error("user fetched fail")

      }
    }
    getUser()

    return ()=>{}

  },[id])

  return (
    <div>
      <div className="card">
  <div className="card-body">
    <h5 className="card-title">Name:{name}</h5>
    <p className="card-text">Email:{email}</p>
    <p className="card-text">Mobile:{phone}</p>
    <p className="card-text">Address:{firstcity}</p>
    <a href="#" className="btn btn-primary">contact the user</a>
    <Link className="btn btn-primary"style={{marginLeft:"1rem"}}>Back</Link>
  </div>
</div>
      
    </div>
  )
}

export default Read

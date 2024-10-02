import React from 'react'
import {useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { useParams,useNavigate,Link } from 'react-router-dom'
import axios from 'axios';

const Update = () => {

  let [user,setUser]=useState(
    {
      name:"",
      email:"",
      phone:"",
      address:{
        city:""
      }

    }
  )

  let { id }=useParams()
  console.log(id)

  //useEffect for handling the side effects while updating the data in the server
  useEffect(()=>{

    const getUser=async()=>{

      try{
        //using the axios for updating the data in the server
        const response = await axios.get(`http://localhost:3000/users/${id}`,user);
        console.log(response.data)
        setUser(response.data)

        //on successfull creation of the users we are notifying the user
        toast.success("user updated successfully")
      }catch(error){
        console.log(error.name)
        toast.error("user updation fail")

      }
    }

    //calling the get user function
    getUser()

    return()=>{}



  },[id])

  //from chatgpt
  let navigate=useNavigate()
  //function to handle the data submitted by the user(creates the new user in the server)

  let handleUpdate=async(e)=>{
    e.preventDefault()//to avoid the form submission by default
    console.log("data is submitted")

    try{
      //using the axios to update the data in the server
      let response=await axios.put(`http://localhost:3000/users/${id}`,user)
      console.log(response)
      toast.success("user updated successfully")
      //navigate back to the table page after successfull creation of the user
      navigate("/")

    }catch(error){
      console.log(error.name)
      toast.error("failed to update the user")

    }

  }

  //chat gpt matter ends

  return (
    <div className="container">
        
    {/* form layout htmlFor creating the user details */}

    <form className='' onSubmit={handleUpdate}>
        {/* name,email,phone,address */}

        {/*Name */}

        <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" 
        placeholder="Enter your name"
        value={user.name}
        onChange={(e)=>setUser({...user,name:e.target.value})}/>
    </div>

    {/*Name ends*/}

    {/*Email starts*/}

    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="text" className="form-control" id="email"
        placeholder="Enter your email"
        value={user.email}
        onChange={(e)=>setUser({...user,email:e.target.value})}/>
        
    </div>

    {/*Email ends*/}
    {/*Phone starts*/}
    <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input type="tel" className="form-control" id="phone" 
        placeholder="Enter your phoneNumber"
        value={user.phone}
        onChange={(e)=>setUser({...user,phone:e.target.value})}/>
    </div>
    {/*Phone Ends*/}

    {/*Address starts*/}

    <div className="mb-3">
        <label htmlFor="phone" className="form-label">Address</label>
        <input type="text" className="form-control" id="address" 
        placeholder="Enter your address"
        value={user.address.city}
        onChange={(e)=>setUser({...user,address:{...user.address,city:e.target.value}})}/>
    </div>
    {/*Address Ends*/}

    {/*Button htmlFor navigate back to the table*/}

    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
<button type='submit' className="btn btn-primary">Submit</button>
<Link to={'/'} className="btn btn-primary">Back</Link>
</div>
</form>
  
</div>
  )
}

export default Update 


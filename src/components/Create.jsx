import { useState, useEffect }from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify'


const Create = () => {
  //this hook helps us to navigate back to the previous page on successfull creation of the user
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

  let navigate=useNavigate()
  //function to handle the data submitted by the user(creates the new user in the server)

  async function handleSubmit(e){
    e.preventDefault()//to avoid the form submission by default

    try{
      //using the axios to update the data in the server
      let response=await axios.post("http://localhost:3000/users",user)
      console.log(response)
      toast.success("user created successfully")
      //navigate back to the table page after successfull creation of the user
      navigate("/")

    }catch(error){
      console.log(error.name)
      toast.error("failed to create the user")

    }

  }
  return (
    <div className="container">
        
        {/* form layout htmlFor creating the user details */}

        <form className=''onSubmit={handleSubmit}>
            {/* name,email,phone,address */}

            {/*Name */}

            <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" 
            placeholder="Enter your name"
            onChange={(e)=>setUser({...user,name:e.target.value})}/>
        </div>

        {/*Name ends*/}

        {/*Email starts*/}

        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="text" className="form-control" id="email" 
            placeholder="Enter your email"
            onChange={(e)=>setUser({...user,email:e.target.value})}/>
            
        </div>

        {/*Email ends*/}
        {/*Phone starts*/}
        <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input type="tel" className="form-control" id="phone" 
            placeholder="Enter your phoneNumber"
            onChange={(e)=>setUser({...user,phone:e.target.value})}/>
        </div>
        {/*Phone Ends*/}

        {/*Address starts*/}

        <div className="mb-3">
            <label htmlFor="phone" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" 
            placeholder="Enter your address"
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

export default Create


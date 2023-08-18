import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { Input } from 'antd';
import { baseUrl } from 'config/Config';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AddEditCategory = ({open,editItem,closeIt,reloader}) => {
    const [value,setValue]=useState(editItem?editItem.name:"")
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        if(editItem){
            setValue(editItem.name)
        }else{
          setValue('')
        }
    }, [open])
    
    const handleAddEdit=async()=>{
        if(value=="" || value ==undefined){
            toast.error("Please Enter The Name")
            return
        }else{
          setLoading(true)
            console.log(value)
            if(editItem){
                const { data } = await axios.put(
                    `${baseUrl}/category/${editItem._id}`,
                    { name:value },
                    {
                      headers: { "Content-Type": "application/json" },
                    }
                  );
                  if(data.success){
                    closeIt()
                    reloader()
          setLoading(false)
                    toast.success(data.message)
                }else{
                  if(data.message){
          setLoading(false)
                      toast.error(data.message)
                  }else{
          setLoading(false)

                      toast.error('Something went wrong')
                  }
      
                }
            }else{
                const { data } = await axios.post(
                    `${baseUrl}/category`,
                    { name:value },
                    {
                      headers: { "Content-Type": "application/json" },
                    }
                  );
                  console.log(data)
                  if(data.success){
                    closeIt()
                    setLoading(false)
                    reloader()
                    toast.success(data.message)
                }else{
                  if(data.message){
                      toast.error(data.message)
          setLoading(false)

                  }else{
          setLoading(false)
                      toast.error('Something went wrong')
                  }
      
                }
            }
        
        
        }
        
    }
  return (
    <>
      <Modal
        title={editItem? `Edit ${editItem.name}`:"Add Category"}
        centered
        open={open}
        okText={editItem?"Update":"Create"}
        onOk={handleAddEdit}
        confirmLoading={loading}
        onCancel={()=>closeIt()}
      >
        <label>Please Enter Name</label>
      <Input value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Enter Name" />
      </Modal>
    </>
  )
}

export default AddEditCategory
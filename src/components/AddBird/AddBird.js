import { Input, Modal } from 'antd'
import React, { useState } from 'react'

const AddBird = ({open}) => {
  const [value,setValue]=useState('')
  const [loading,setLoading]=useState(false)
  const handleAddEdit=()=>{
    console.log("here we go")
  }
  return (
    <>
          <Modal
        title={"Add Bird"}
        centered
        open={open}
        okText={"Create"}
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

export default AddBird
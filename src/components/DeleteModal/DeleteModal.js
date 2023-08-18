import React, { useState } from 'react'
import { Modal } from 'antd'
import axios from 'axios'
import { baseUrl } from 'config/Config'
import { toast } from 'react-hot-toast'

const DeleteModal = ({name,deleteOpen,deleteClose,url,reloder}) => {
    const [loading,setLoading]=useState(false)
    const handleDelete=async()=>{
        setLoading(true)
        const { data } = await axios.delete(
            `${baseUrl}/${url}`
          );
          if(data.success){
              reloder()
        setLoading(false)
              deleteClose()
            toast.success("Deleted Successfully")
          }else{
        setLoading(false)
            toast.error(data.message)
          }
    }
  return (
    <>
         <Modal
        title={`Delete ${name}`}
        centered
        open={deleteOpen}
        okText="Delete"
        confirmLoading={loading}
        okButtonProps={{style:{backgroundColor:"red",color:"white"}}}
        onOk={handleDelete}
        onCancel={()=>deleteClose()}
      >
        Are You Sure You Want To Delete It
      </Modal>
    </>
  )
}

export default DeleteModal
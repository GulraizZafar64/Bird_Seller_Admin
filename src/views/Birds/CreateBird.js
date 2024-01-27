import { baseUrl } from 'config/Config';
import React, { useCallback, useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col
  } from "reactstrap";
  import './style.css'
  import Upload from "./svgexport-25.svg";
import fileIcon from "./svgexport-26.svg";
import { useDropzone } from 'react-dropzone';
import { IoCloseSharp } from "react-icons/io5";
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const CreateBird = () => {
    const [category,setCategory]=useState([])
    const [subCategory,setSubCategory]=useState([])
    const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [price, setPrice] = useState(0);
  const [images,setImages]=useState([])
  const history=useHistory()
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubcategoryIdChange = (event) => {
    setSubcategoryId(event.target.value);
  };
    const authtoken=localStorage.getItem('apiToken')

    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = () => {
        fetch(`${baseUrl}/categories`, {
            method: 'GET',
            headers: {
                Authorization: `${authtoken}`,
            },
        }).then(res => res.json())
            .then((data) => {
                setCategory(data)

            }).catch(err => {
                console.log(err)
            })
    }
    const onCategoryChange=(id)=>{
        console.log(id)
const filterData=  category.find((item)=>item._id==id)
console.log(filterData)
setSubCategory(filterData?.subcategories || [])
    }

    function kbToMb(kilobytes) {
        const bites= kilobytes / 1024; 
        return bites.toFixed(2)
      }
    const [selectedFile,setSelectedFile]=useState([])
    const onDrop = useCallback(acceptedFiles => {
        const files = Array.from(acceptedFiles);

        setImages([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
        setSelectedFile((pre)=>[...pre,...acceptedFiles])
      }, [])
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*', 
        multiple: true,    
      });

      const handleDelete = (index) => {
        const newItems = [...selectedFile];
        const newItems2 = [...images];
        newItems.splice(index, 1);
        newItems2.splice(index, 1);
        setSelectedFile(newItems);
        setImages(newItems2)
      };
      const handleSave=()=>{
     
       
  
      const myForm = new FormData();
  
      myForm.set("name",name);
      myForm.set("description",description);
      myForm.set("price",price);
      myForm.set("subcategory", subcategoryId);
      console.log(selectedFile)
  
      images.forEach((image) => {
        myForm.append("images", image);
      });
     
  
      fetch(`${baseUrl}/createBird`, {
          method: 'POST',
          body: myForm
        }).then(res => res.json()
          .then(data => {
        toast.success('Added Successfully')
        history.push('/admin/birds')
          })
    
        ).catch(err => {
          
        toast.error('SomeThing Went Wronge Please Try Again')
         console.log(err)
        })
     
      }
  return (
    <>
     <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <div className="mainheaderCategory">
               <div>
               <h3 tag="h4">Create Bird</h3>
               </div>
               <div>
               <button className="AddOn" onClick={handleSave}>Save</button>
               </div>
              </div>
              <div className="line"/>
              <CardBody style={{padding:"5px 30px"}}>
                <div className='row mt-4'>
                    <div className='col-md-5'>
                      <h2 style={{margin:0}}>Create Bird Listing...</h2>
                      <p>Please enter all fields  to create a new bird listing.</p>
                    </div>
                    <div className='col-md-7 mt-5'>
                        <div>
                            <label><b>Enter Name</b></label>
                            <input value={name} onChange={handleNameChange} className='form-control' placeholder='Please enter bird name'/>
                        </div>
                        <div className='mt-3'>
                            <label><b>Enter Description</b></label>
                            <div>
                            <textarea value={description} onChange={handleDescriptionChange} style={{height:"100px",width:"100%",background:"transparent",padding:"5px 10px",borderRadius:"10px",color:"white"}}  placeholder='Please enter bird description'/>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <label><b>Enter Price</b></label>
                            <input value={price} onChange={(e)=>setPrice(e.target.value)} type='number' className='form-control' placeholder='Please enter bird price'/>
                        </div>
                        <div className="mt-3">
                    <label>
                      <b>Select Category</b>
                    </label>
                    <div className="d-flex flex-column">
                      <select
                        style={{ height: 40,background:"transparent",padding:"5px 10px",borderRadius:"10px",color:"white"}}
                        className="form-select"
                        name="year_id"
                        aria-label="Default select example"
                        onChange={(e) => onCategoryChange(e.target.value)}
                      >
                        <option style={{color:"black"}} selected value="">
                          {" "}
                          Select Category
                        </option>
                        {category &&
                          category.map((item) => (
                            <option style={{color:"black"}} value={item._id}>{item.name}</option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label>
                      <b>Select Subcategory</b>
                    </label>
                    <div className="d-flex flex-column">
                      <select
                        style={{ height: 40,background:"transparent",padding:"5px 10px",borderRadius:"10px",color:"white"}}
                        className="form-select"
                        name="year_id"
                        aria-label="Default select example"
                        value={subcategoryId}
                        onChange={handleSubcategoryIdChange}
                      >
                        <option style={{color:"black"}} selected value="">
                          {" "}
                          Select Subcategory
                        </option>
                        {subCategory &&
                          subCategory.map((item) => (
                            <option style={{color:"black"}} value={item._id}>{item.name}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    
    <div className='mt-3'>
        <label><b>Upload Images</b></label>
    <div className='myDropper' {...getRootProps()}>
      <input {...getInputProps()}/>
                  <img height={150} src={Upload} alt='svg'/>
                  <h3>Drop or Select file</h3>
                  <p>Drop files here or click browse thorough your machine</p>
    </div>
    </div>
    {selectedFile.length ? 
    selectedFile.map((item,i)=>(
        <div className='my-file-preview'>
        <div>
        <img height={50} width={50} alt='file' src={URL.createObjectURL(item)}/>
        </div>
        <div>
        <h5>{item.name}</h5>
        <p>{kbToMb(item.size)} KB</p>
        </div>
        <div className='icon-container'>
            <IoCloseSharp  onClick={()=>handleDelete(i)} color='red'/>
        </div>
           
     </div>
    ))
  
            :''  } 
                  </div>
                    </div>

                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default CreateBird
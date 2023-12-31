
import { Divider, Tree } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './categories.css'
import { PlusOutlined, FolderOpenOutlined, SettingOutlined, UploadOutlined, FileOutlined, DeleteOutlined, FolderOutlined, RightOutlined, DownOutlined, EditOutlined, EyeOutlined,PlusCircleOutlined} from '@ant-design/icons'
import { baseUrl } from "config/Config";
import AddEditCategory from "components/AddEditCategory/AddEditCategory";
import DeleteModal from "components/DeleteModal/DeleteModal";
import AddEditSubCategory from "components/AddEditSubCategory/AddEditSubCategory";
function Category() {
    const [folderList, setFolderList] = useState([])
    
    const [folderModel, setfolderModel] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const fileInputRef = useRef(null);
    const [selectedObject, setSelectedObject] = useState({})
    const [deleteModal, setdeleteModal] = useState(false)
    const [subDeleteModal, setSubDeleteModal] = useState(false)
    const [uploadModel, setUploadModel] = useState(false)
    const [editFileModel, setEditFileModel] = useState(false)
    const [usersList, setusersList] = useState([])
    const [addEditCategory,setAddEditCategory]=useState(false)
    const [editCategory,setEditCategory]=useState({})
    const [addEditSubCategory,setAddEditSubCategory]=useState(false)
    const [editSubCategory,setEditSubCategory]=useState("")
    const [mainCategory,setMainCategory]=useState({})
    const [selectedFile, setselectedFile] = useState({})
    const [activeKey, setActiveKey] = useState('1')
    const [fileDeletetruer, setFileDeletetruer] = useState(false)
    const authtoken=localStorage.getItem('apiToken')
    useEffect(() => {
        getFolders()
    }, [])
    const tabRef = useRef()

    const getFolders = () => {
        fetch(`${baseUrl}/categories`, {
            method: 'GET',
            headers: {
                Authorization: `${authtoken}`,
            },
        }).then(res => res.json())
            .then((data) => {
                const newArray = addIsOpenProperty(data);
                setFolderList(newArray)

            }).catch(err => {
                console.log(err)
            })
    }
    function addIsOpenProperty(arr) {
        return arr.map(obj => {
            // Clone the original object to avoid modifying it directly
            const newObj = { ...obj };
            newObj.isOpen = false; // Add the 'isOpen' property to the new object
            return newObj;
        });
    }
    const Folder = (props) => {


        console.log("item", props.item)
        console.log("index", props.index)
        const { item } = props
        const { name, subcategories, id, isOpen } = item
        // const [isOpen, setIsOpen] = useState(true);

        const handleClick = () => {
            let arr = [...folderList]
            arr[props.index].isOpen = arr[props.index].isOpen ? false : true
            setFolderList(arr)
        };

        const handleClickTwo = () => {
            // setIsOpen(true);
        };

        const onEditClick = (item) => {
            setEditCategory(item)
            setAddEditCategory(true)
        };


        const onDeleteClick = item => {
          setEditCategory(item)
            setdeleteModal(true)
        }


        return (
            <div>
                {
                  

                    <>
                        <div className="folder">
                            {/* <div style={{ WebkitWritingMode: 'vertical-lr' }}><RightOutlined /></div> */}
                            <div onClick={handleClick} className='d-flex'>
                                <div className='mr-2'>{!isOpen ? <DownOutlined style={{color:"white"}} /> : <RightOutlined style={{color:"white"}} />}</div>
                                <div style={{color:"white",fontSize:"1.2rem"}} className=''>{name}</div>
                            </div>
                            <div className='d-flex'>
                                {
                                    <div title='Edit Category' onClick={() => onEditClick(item)}  className="icon ml-2"><EditOutlined className='plusicon' /></div>
                                }
                                {
                                    <div title="Delete Category" onClick={() => onDeleteClick(item)}  className="icon ml-2"><DeleteOutlined className='plusicon2' /></div>
                                }
                                {
                                    <div title={`Add Sub Category`} onClick={() =>{ 
                                      setMainCategory(item)
                                      setAddEditSubCategory(true)}} className="icon ml-2"><PlusCircleOutlined className='plusicon3' /></div>
                                }
                            </div>
                        </div>
                     { <TransitionGroup>
                            {isOpen && (
                                <CSSTransition classNames="folder-contents" timeout={300}>
                                   <div className="folder-contents">
                                        {subcategories && subcategories.map((file, index) => (
                                            <File handleClick={handleClickTwo} key={index} item={file} />
                                        ))}
                                    </div>
                                </CSSTransition>
                            )}
                        </TransitionGroup>}
                    </>
                }
            </div>
        );
    };

    const File = ({ item, handleClick }) => {
        const deleteSubCate = (item) => {
          setEditSubCategory(item)
          setSubDeleteModal(true)
        }
        const EditSub = (item) => {
          setEditSubCategory(item)
          setAddEditSubCategory(true)
        }
        return (
            <div
                className="file">
               <div>
               <span
               style={{color:"white",fontSize:"1.1rem"}}
                    onClick={() => {
                        setselectedFile(item)
                        setActiveKey('2')
                        // handleClick()
                    }}
                >{item.name}</span>
               </div>
                <div style={{paddingBottom:"3px"}} className='d-flex'>
                                {
                                    <div title='Edit Folder' onClick={() => EditSub(item)}  className="icon ml-2"><EditOutlined className='plusicon' /></div>
                                }
                                {
                                    <div title="Delete Folder" onClick={() => deleteSubCate(item)}  className="icon ml-2"><DeleteOutlined className='plusicon2' /></div>
                                }
                            </div>
                     {/* <span title='Edit File' onClick={() => fileEdit(item)}  className="icon ml-2 "><EditOutlined className='plusicon' /></span>

                     <span title="Delete File" onClick={() => fileDelete(item)} className="icon ml-2"><DeleteOutlined className='plusicon2' /></span> */}

                </div>
        );
    };
  
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <div className="mainheaderCategory">
               <div>
               <h3 tag="h4">Category</h3>
               </div>
               <div>
               <button className="AddOn" onClick={() =>{ 
                                      setEditCategory("")
                                      setAddEditCategory(true)}} >Add Category</button>
               </div>
              </div>
              <div className="line"/>
              <CardBody style={{padding:"5px 30px"}}>
                {/* <Table style={{overflow:"none"}} className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-center">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-center">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-center">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-center">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-center">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-center">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-center">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-center">$98,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-center">$98,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-center">$98,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-center">$98,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-center">$98,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-center">$98,615</td>
                    </tr>
                  </tbody>
                </Table> */}
      <div className='row'>
                        <div>
                                <div className="tree-view">
                                    {folderList.map((folder, index) => (
                                        <Folder index={index} key={index} item={folder} />
                                    ))}
                                </div>
                        </div>
                    </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      <AddEditCategory open={addEditCategory} reloader={()=>getFolders()} closeIt={()=>setAddEditCategory(false)} editItem={editCategory}/>
      <AddEditSubCategory open={addEditSubCategory} reloader={()=>getFolders()} closeIt={()=>setAddEditSubCategory(false)} editItem={editSubCategory} category={mainCategory}/>
      <DeleteModal name={`${editCategory.name}`} deleteOpen={deleteModal} deleteClose={()=>{
        setEditCategory("")
        setdeleteModal(false)}} url={`category/${editCategory._id}`} reloder={()=>getFolders()}/>
      <DeleteModal name={`${editSubCategory.name}`} deleteOpen={subDeleteModal} deleteClose={()=>{
        setEditSubCategory("")
        setSubDeleteModal(false)}} url={`sub-category/${editSubCategory._id}`} reloder={()=>getFolders()}/>
    </>
  );
}

export default Category;

import { baseUrl } from 'config/Config';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table
  } from "reactstrap";

const Birds = () => {
  const history=useHistory()
  useEffect(() => {
    getBirds()
}, [])
const authtoken=localStorage.getItem('apiToken')
const [birds,setBirds]=useState([])
const getBirds = () => {
    fetch(`${baseUrl}/getBirds`, {
        method: 'GET',
        headers: {
            Authorization: `${authtoken}`,
        },
    }).then(res => res.json())
        .then((data) => {
            console.log(data)
            setBirds(data.products)
        }).catch(err => {
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
               <h3 tag="h4">Birds</h3>
               </div>
               <div>
               <button className="AddOn" onClick={() =>{ 
                history.push('/admin/createBird')
                                      }}>Add Birds</button>
               </div>
              </div>
              <div className="line"/>
              <CardBody style={{padding:"5px 30px"}}>
              <Table>
      <thead>
        <tr>
          <th>SR.No</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Subcategory</th>
        </tr>
      </thead>
      <tbody>
       {birds && birds.map((item,i)=>(
        <tr>
          <td>{i+1}</td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.price}</td>
          <td>{item?.subcategory?.category?.name}</td>
          <td>{item?.subcategory?.name}</td>
        </tr>
       )) }
      </tbody>
    </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Birds
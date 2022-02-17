//import { render } from "@testing-library/react";
//import React from "react";
import React, {Component} from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import Table from "./components/Table.js"
//import Table from "./components/Table.js";
//import {getStudent} from "./components/db.js"
import {Input,FormGroup,Label,Modal,ModalHeader,ModalBody,ModalFooter,Table,Button,} from 'reactstrap';
//import Form from "./components/Form.js"
toast.configure()
  class Student extends Component{

    
       constructor(prpos){
         super()
        this.state = {
          student:[],
          addStudent:{
          name:"",
          sex:"",
          phoneNumber:"",
          totalMarks:""
          },
          editStudent:
          {
          name:"",
          sex:"",
          phoneNumber:"",
          totalMarks:""
          },
          addModal:false,
          editModal:false
        }
        
         /*this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSex  = this.onChangeSex.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeMarks = this.onChangeMarks.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.addStudent=this.addStudent.bind(this);*/
      }
        
    
    
  
    componentWillMount(){
      this.refreshData();
      //this is a call back function
      
    }
    toggleAddModal() {
      this.setState({
        addModal:!this.state.addModal
      })
    }
    toggleEditModal() {
      this.setState({
        editModal:!this.state.editModal
      })
    }
    
      refreshData(){
       axios.get('http://localhost:3004/student')
       .then(res =>{
       this.setState({student:res.data})
        
       })
       .catch(error => {
         console.log(error)
       });
       
        }
        
          

      
         
        /*onChangeSex(e){
          this.setState({sex:e.target.value})
    
        } 
        
        onChangePhone(e){
          this.setState({phoneNUmber:e.target.value})
    
        }
        onChangeMarks(e){
          this.setState({totalmarks:e.target.value})
    
        }
        
        
      
    
        onSubmit(e){
          e.preventDefault();
        }*/
         
         
          addStudent(){
          axios.post('http://localhost:3004/student',this.state.addStudent)
          .then( (res) => {
            let {student} = this.state;
            student.push(res.data);
          
          this.setState({student,addModal:false, addStudent:{
            name:"",
            sex:"",
            phoneNumber:"",
            totalMarks:""
          
          }});
        });
        
      }
        
      editStudent(id,name,sex,phoneNumber,totalMarks){
        this.setState({
        editStudent:{id,name,sex,phoneNumber,totalMarks },editModal:!this.state.editModal
     });
      }
      updateStudent(){
        let {name,sex,phoneNumber,totalMarks}=this.state.editStudent;
        axios.put('http://localhost:3004/student'+ this.state.editStudent.id,{
          name,sex,phoneNumber,totalMarks
        })
        .then((res) => {
          //let {student} = this.state;
        //[student]= (res.data);
        this.refreshData();
        this.setState({
       editModal:false,editStudent:{
          name:"",
          sex:"",
          phoneNumber:"",
          totalMarks:"" 
          }
        });
    
        });
      }
    
      handleDelete(id) {
         axios.delete('http://localhost:3004/student'+id)
        .then(res =>{
          //let {student} = this.state;
          //student=(res.data);
          this.refreshData(); 
          //console.log(student)
          //const students=this.state.student.filter(s => s.id !== student.id)
        //this.setState({student:students});
        //this method do use
        
    
        });
      
        
          
        toast("No",{position:toast.POSITION.BOTTOM_RIGHT})
        toast("yes",{position:toast.POSITION.BOTTOM_LEFT})
        //toast("hey man!you are deleted",{position:toast.POSITION.BOTTOM_RIGHT})
        //after delete show this message
        
        
        
        //console.log(student)
    
      }    
            
    
        

      
    

    
    

render(){
      
    return(
      <div>
        
          {/* <Form>
            changeName = {this.onChangeName}
            changeMarks={this.onChangeMarks}
            changeSex={this.onChangeSex}
            changePhone={this.onChangePhone} 
            Submit={this.onSubmit}
            name={this.state.name}
            sex={this.state.sex}
            phoneNUmber={this.state.phoneNUmber}
            totalMarks={this.state.totalMarks}
          </Form>  */}
          
          <div>
           
            <Table className="table">
            <thead className="thead-dark" >
              <tr>
               <React.Fragment>
                
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">sex</th>
                <th scope="col">phonenumber</th>
                <th scope="col">totalmarks</th>
                </React.Fragment> 
                
              </tr>
            </thead>
            <tbody> 
              {this.state.student.map(student => (
                
                  <tr key={student.id}>

                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.sex}</td> 
                  <td>{student.phoneNumber}</td>
                  <td>{student.totalMarks}</td>
                  <td><button type="button" className="btn btn-outline-danger" onClick={this.editStudent.bind(this,student.name,student.sex,student.phoneNUmber,student.totalMarks)}>Edit</button></td>
                 <td><button type="button" className="btn btn-outline-danger" onClick={this.handleDelete.bind(this,student.id)}> Delete</button></td>
                   </tr>
        
         ))
               } 
               
         </tbody>
          </Table>  
          </div>
          <button  className="my-3" color="primary"  onClick={this.toggleAddModal.bind(this)}>Add student</button>
          <Modal isOpen={this.state.addModal} toggle={this.toggleAddModal.bind(this)}>
            <ModalHeader toggle={this.toggleAddModal.bind(this)}>Add Student</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">name</Label>
                <Input id="name" type = "text" value={this.state.addStudent.name} onChange ={(e) => {
                    let {addStudent} = this.state;
                    addStudent.name=e.target.value;


                this.setState({addStudent});
                }} />
    
                  
              </FormGroup>
             
              <FormGroup>
                <Label for="sex">sex</Label>
                <Input id="sex" type="text" value={this.state.addStudent.sex} onChange ={(e) => {
                    let {addStudent} = this.state;
                    addStudent.sex=e.target.value;
                    this.setState({addStudent});
                }} />
    
              </FormGroup>
              <FormGroup>
                <Label for="phoneNumber">phoneNUmber</Label>
                <Input id="phoneNumber" type="number" value={this.state.addStudent.phoneNumber} onChange={(e) => { 
                    let {addStudent} = this.state;
                    addStudent.phoneNumber=e.target.valueAsNumber;
                this.setState({addStudent});
                }} />
    
                  
              </FormGroup>
              <FormGroup>
                <Label for="totalMarks">totalMarks</Label>
                <Input id="totalMarks" type="number" value={this.state.addStudent.totalMarks} onChange ={(e) => {
                    let {addStudent} = this.state;
                    addStudent.totalMarks=e.target.valueAsNumber;
                this.setState({addStudent});
                }} />
    
                  
              </FormGroup>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addStudent.bind(this)}>addStudent</Button>
              <Button color="primary" onClick={this.toggleAddModal.bind(this)}>cancel</Button>
            </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
            <ModalHeader toggle={this.toggleEditModal.bind(this)}>EditStudent</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">name</Label>
                <Input id="name" type="text" value={this.state.editStudent.name} onChange ={(e) => {
                    let {editStudent} = this.state;
                    editStudent.name=e.target.value;
                this.setState({editStudent});
                }} />
    
                  
              </FormGroup>
             
              <FormGroup>
                <Label for="sex">sex</Label>
                <Input id="sex" type="text" value={this.state.editStudent.sex} onChange ={(e) => {
                    let {editStudent} = this.state;
                    editStudent.name=e.target.value;
                this.setState({editStudent});
                }} />
    
              </FormGroup>
              <FormGroup>
                <Label for="phoneNumber">phoneNUmber</Label>
                <Input id="phoneNumber" type="number" value={this.state.editStudent.phoneNUmber} onChange ={(e) => {
                    let {editStudent} = this.state;
                    editStudent.phoneNUmber=e.target.valueAsNumber;
                this.setState({editStudent});
                }} />
    
                  
              </FormGroup>
              <FormGroup>
                <Label for="totalMarks">totalMarks</Label>
                <Input id="totalMarks" type="number" value={this.state.editStudent.totalMarks} onChange ={(e) => {
                    let {editStudent} = this.state;
                    editStudent.totalMarks=e.target.valueAsNumber;
                this.setState({editStudent});
                }} />
    
                  
              </FormGroup>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateStudent.bind(this)}>updateStudent</Button>
              <Button color="primary" onClick={this.toggleEditModal.bind(this)}>cancel</Button>
            </ModalFooter>
          </Modal>

          
          

        </div>

    )
    
}
}


export default Student;

 
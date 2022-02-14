//import { render } from "@testing-library/react";
//import React from "react";
import React, {Component} from "react";
import axios from "axios";
import Table from "./components/Table.js"
//import Table from "./components/Table.js";
//import {getStudent} from "./components/db.js"
import Form from "./components/Form.js"

  class Student extends Component{
    
       
        state = {
          student:[],
          addStudent:{
          name:"",
          sex:"",
          phoneNUmber:"",
          totalMarks:""
          },
          editStudent:
          {
          name:"",
          sex:"",
          phoneNUmber:"",
          totalMarks:""
          }
          
        }
        /* this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSex  = this.onChangeSex.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeMarks = this.onChangeMarks.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.addStudent=this.addStudent.bind(this);
        */
          
    
    
  
    componentWillMount(){
      this.refreshData();
      //this is a call back function
      
    }
    
      refreshData(){
       axios.get('http://localhost:3000/student')
       .then(res =>{
       this.setState({student:res.data})
        
       })
       .catch(error => {
         console.log(error)
       });
       
        }
        
          

      
         onChangeName(e){
          this.setState({name:e.target.value})
    
        } 
        onChangeSex(e){
          this.setState({sex:e.target.value})
    
        } 
        
        onChangePhone(e){
          this.setState({phoneNUmber:e.target.value})
    
        }
        onChangeMarks(e){
          this.setState({totalmarks:e.target.value})
    
        }
        onSubmit(e){
          e.preventDefault()
        
        }
      
    
          
          
           addStudent(){
          axios.post('http://localhost:3000/student',this.state.addStudent)
          .then( (res) => {
            let {student} = this.state;
            student.push(res.data);
          
          this.setState({student,addStudent:{
            name:"",
            sex:"",
            phoneNUmber:"",
            totalMarks:""
          
          }});
        });
        
      };
      editStudent(name,sex,phoneNUmber,totalMarks){
        this.setState({
        editStudent:{
          name,
          sex,
          phoneNUmber,
          totalMarks
        }
        })
      }
      updateStudent(){
        axios.put('http://localhost:3000/student',this.state.editStudent)
        .then((res) =>{
          //let {student} = this.state;
        //[student]= (res.data);
        this.refreshData();
        this.setState({
          name:"",
          sex:"",
          phoneNUmber:"",
          totalMarks:"" 
    
        });
    
        });
      }
      
      delete(id){
        axios.delete('http://localhost:3000/student'+id)
        .then((res) =>{
          //let {student} = this.state;
          //student=(res.data);
          this.refreshData();
    
        });
    
      }    
        
    
        //console.log(Student);

      
    

    
    

render(){
      
    return(
        <div>
          <Form>
             ChangeName = {this.onChangeName}
            ChangeMarks={this.onChangeMarks}
            ChangeSex={this.onChangeSex}
            ChangePhone={this.onChangePhone} 
            Submit={this.onSubmit}
            name={this.state.name}
            sex={this.state.sex}
            phoneNUmber={this.state.phoneNUmber}
            totalMarks={this.state.totalMarks}
          </Form>
          

         {/*  <Table>
            student={this.state.student}
          </Table> */}


          
            <table className="table">
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
                  <td><button type="button" className="btn btn-outline-danger" onClick={()=>this.editStudent(student.name,student.sex,student.phoneNUmber,student.totalMarks)}>Edit</button></td>
                        
                  <td><button type ="button" className="btn btn-outline-danger"onClick={()=>this.updateStudent()}>update</button></td>  
                  <td><button type="button" className="btn btn-outline-danger" onClick={()=>this.delete(student.id)}> Delete</button></td>
                   </tr>
        
         ))
               } 
               
         </tbody>
          </table>  
          

        </div>

    )
    
}
}


export default Student;

 
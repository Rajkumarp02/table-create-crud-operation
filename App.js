//import logo from './logo.svg';
import './App.css';
//import React from 'react';
import axios from 'axios';
import React, {Component} from 'react';

class App extends Component {
  constructor(){
    super()
    this.state={
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
      },
      
    }
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSex  = this.onChangeSex.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeMarks = this.onChangeMarks.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.addStudent=this.addStudent.bind(this);
    
      

}
componentWillUnmount(){
  this.refreshData();
  //this is a call back function
  
}

  refreshData(){
   axios.get('http://localhost:3004/student')
   .then(res =>{
     this.setState({student:res.data})
     .then (res => console.log(res))
   });
   
    };
  
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

      /*const userObject={
        name:this.state.name,
        sex:this.state.sex,
        phoneNUmber:this.state.phoneNUmber,
        totalMarks:this.state.totalMarks
      };*/
      addStudent(){
      axios.post('http://localhost:3004/student',this.state.addStudent)
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
    axios.put('http://localhost:3004/student',this.state.editStudent)
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
    axios.delete('http://localhost:3004/student'+id)
    .then((res) =>{
      //let {student} = this.state;
      //student=(res.data);
      this.refreshData();

    })

  }
  
    render(){
      return(
        
        <div>
          <table className="table">
            <thead>
              <tr>
                
                <th>id</th>
                <th>name</th>
                <th>sex</th>
                <th>phonenumber</th>
                <th>totalmarks</th>
                
              </tr>
            </thead>
            
            <tbody> 
              { this.state.student.map(student => (
                  <tr key={student.id}>
                 <th>student.id</th>
                  <td>student.name</td>
                  <td>student.sex</td>
                  <td>student.phoneNumber</td>
                  <td>student.totalMarks</td>
                  <td><button onClick={this.editStudent.bind(this.student.name,student.sex,student.phoneNUmber,student.totalMarks)}>edit</button></td>
                  <td><button onClick={this.updateStudent.bind(this)}>update</button></td>  
                  <td><button onClick={this.delete.bind(this,student.id)}> Delete</button></td>
                  
            </tr>
              ))
    }
          

            </tbody>
          </table>
          
           
          <form onSubmit={this.onSubmit}>
          
            <input type="text" name="name" value={this.state.name} onChange={this.onChangeName}/>
            <input type="text" name="sex" value={this.state.name} onChange={this.onChangeSex}/>
            <input type="text" name="phoneNumber" value={this.state.name} onChange={this.onChangePhone}/>
            <input type="text" name="totalMarks" value={this.state.name} onChange={this.onChangeMarks}/>
            <input type="submit" value="Add" onClick={this.addStudent}>Add student</input>
            
          </form>  
        </div>
        
        
        
      )
  }    
          
  }


export  default App


  
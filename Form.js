import React from "react";

const Form = props => {
    return(
      <React.Fragment>

        
          <form onSubmit={props.Submit}>
          
  <input type="text" name="name" className="form-control" placeholder="Name" value={props.name} id="formGroupExampleInput"   onChange={props.ChangeName}/>
           
  <input type="text" name="sex" className="form-control" placeholder="Sex"  value={props.sex} id="formGroupExampleInput"  onChange={props.ChangeSex}/>
         
  <input type="text" name="phoneNumber" className="form-control"  placeholder="PhoneN0" value={props.phoneNumber} id="formGroupExampleInput" onChange={props.ChangePhone}/>
        
  <input type="text" name="totalMarks" className="form-control" placeholder="Marks" value={props.totalMarks} id="formGroupExampleInput" onChange={props.ChangeMarks}/>
          
         <button type="submit" className="btn btn-primary" value="submit" onClick={()=>this.addStudent()}>Add student</button>
         
         
          
        </form>  

        
        </React.Fragment>
    )
}
export default Form;
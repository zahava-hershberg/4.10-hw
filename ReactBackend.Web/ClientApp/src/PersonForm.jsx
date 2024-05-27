import React from "react";
function PersonForm({firstName, lastName, age, onTextChange, isEditing, onAddClick, onUpdateClick, onCancelClick}){
    return <div className="row p-5 rounded">
        <div className="col-md-3">
            <input value={firstName} onChange={onTextChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
        </div>
        <div className="col-md-3">
            <input value={lastName} onChange={onTextChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
        </div>
        <div className="col-md-3">
            <input value={age} onChange={onTextChange} name='age' type="text" className="form-control" placeholder="Age" />
        </div>
        {!isEditing &&
        <div className="col-md-3">
            <button onClick={onAddClick} className='btn btn-primary w-100'>Add</button>
        </div>
        }   
        {isEditing &&
         <div className="col-md-3">
        <button onClick={onUpdateClick} className='btn btn-warning w-100'>Update</button>
        <button onClick={onCancelClick} className='btn btn-dark w-100 mt-2'>Cancel</button>
        </div>}
        

    </div>
}
export default PersonForm;
import React from 'react';
function PersonRow({ person, onEditClick, onDeleteClick, isChecked, onCheckChange }) {
    const {id, firstName, lastName, age } = person;
    return (
        <tr>
            <td> <div className='d-flex justify-content-center align-items-center'>
                <input className="form-check-input mt-2" type="checkbox" 
                onChange={onCheckChange} 
                checked={isChecked}
                style={{ transform: 'scale(1.5)' }} /> </div></td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td><button onClick={onEditClick} className='btn btn-warning'>Edit</button>,
                <button onClick={onDeleteClick} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    )
}

export default PersonRow;
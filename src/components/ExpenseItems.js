import React from 'react'
import {MdEdit,MdDelete} from 'react-icons/md'

const ExpenseItems = ({expense,handleEdit,handleDelete}) => {
  const {charge,amount,id} = expense

  return (
  <li className="item">
    <div className="info"> 
    <span className="expense">{charge} </span>
    <span className="amount">${amount}</span>
    </div>

    <div>
    <button className="edit-btn"
        aria-label="edit button"
        onClick={()=>handleEdit(id)}> <MdEdit/> 
    </button>

  <button className="clear-btn"
  aria-label="clear button" 
  onClick={()=>handleDelete(id)}>
  <MdDelete/>
</button>

    </div>
  </li>
  )
}
export default ExpenseItems
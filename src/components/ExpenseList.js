import React from 'react'
import Items from './ExpenseItems'
import {MdDelete} from 'react-icons/md'

const ExpenseList = ({expenses,clearItems,handleEdit,handleDelete}) => {
return(
  <>
  {expenses.map(expense => <Items key={expense.id} expense={expense} handleEdit={handleEdit} handleDelete={handleDelete}/>)}
  {expenses.length > 0 &&  
  <button className="btn" onClick={clearItems} >clearList <MdDelete className="btn-icon"/>
  </button>}
  </>
)
}
export  default ExpenseList
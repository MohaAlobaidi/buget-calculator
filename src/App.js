import React,{useState,useEffect} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Alert from './components/Alert'
import { v4 as uuidv4 } from 'uuid'

// const initialExpanse = [
//   {id:uuidv4(),charge:"rent",amount:200},
//   {id:uuidv4(),charge:"car",amount:400},
//   {id:uuidv4(),charge:"food",amount:200}
// ]

const initialExpanse = localStorage.getItem('expenses')? JSON.parse(localStorage.getItem('expenses')) :[]





function App() {
  // ****************** state values *******************
  const[expenses,setExpenses] = useState(initialExpanse)

  const [charge,setCharge] = useState('')
  
  const [amount,setAmount] = useState('')

  const [alert ,setAlert] = useState({show:false})

  //  ******************** useEffect ***************
  useEffect(()=>{
    console.log('we called useeffect')
    localStorage.setItem('expenses',JSON.stringify(expenses))
  },[expenses])



  // ****************** functionality *******************
//                       handle Charge
const handelCharge = (e)=>{
  setCharge(e.target.value)
}
//                      handle amount
const handleAmount = (e)=>{
  setAmount(e.target.value)
}
//                      handle Alert
const handleAlert = ({type,text})=>{
  setAlert({show:true,type,text})
  setTimeout (()=>{ setAlert({show:false}) },3000)
}

//                    handle submit 
const handleSubmit = (e)=>{
  e.preventDefault();
  if(charge !== '' && amount > 0){

    if (edit){
    let tempExpenses =expenses.map(item=> {
      return item.id ===id ? {...item,charge,amount} :item  })
      setExpenses(tempExpenses)
      setEdit(false)
      handleAlert({type:'success',text:'item edited'})
    }else{
      const singleExpense = {id:uuidv4(),charge,amount}
      setExpenses([...expenses,singleExpense]);
      handleAlert({type:'success',text:'item added'})
    }

      setCharge('');
      setAmount('')
  }else{
  handleAlert({type:'danger',text:'please fill all fields'})
  }
}


//        clear Items
const clearItems = ()=>{
  setExpenses([])
  handleAlert({type:'danger',text:" all items deleted"})

}

//        handle delete
const handleDelete = (id)=> {
console.log(`handleDelete : ${id}`)
// let tempExpenses = [...expenses.filter(expense=> expense.id !== id)]
let tempExpenses =expenses.filter(expense=> expense.id !== id)
setExpenses(tempExpenses)
handleAlert({type:'danger',text:"item deleted"})
}


//edit
const [edit,setEdit] = useState(false)


//edit item   edit id
const [id,setId] = useState(0)


//        handle edit
const handleEdit =(id)=>{
  let expense = expenses.find(item=> item.id === id)
  let {charge,amount} = expense
  setCharge(charge)
  setAmount(amount)
  setEdit(true)
  setId(id)
 

}



  return (
    <>
    { alert.show && <Alert type={alert.type} text={alert.text}/> }
    <h1>budget calculator</h1>
    <main className="App">
 
    <ExpenseForm charge={charge} amount={amount} handleAmount={handleAmount} handelCharge={handelCharge} handleSubmit={handleSubmit} edit={edit}/>

    <ExpenseList expenses={expenses} clearItems={clearItems} handleDelete={handleDelete} handleEdit={handleEdit}/>
    </main>
    <h1>
      total spending : <span className="total">
        ${expenses.reduce((acc,curr)=>{
          return (acc += parseInt(curr.amount))
        },0)}

      </span>
    </h1>
    </>
  );
}

export default App;

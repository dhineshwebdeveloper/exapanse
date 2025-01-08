import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Cards from '../components/Cards'
// import { Modal } from 'antd'
import AddExpenseModal from '../components/Modals/AddExpense'
import AddIncomeModal from '../components/Modals/AddIncome'
import {query, addDoc, collection, getDocs } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import moment from 'moment'
import TransactionsTable from '../components/Transactionstable'
import ChartComponent from '../components/charts'
import NoTransaction from '../components/NoTransaction'
const Dashboard = () => {

  const [transaction, setTransaction] = useState([])
  const [loading, setLoading] = useState(false)
  const [user] = useAuthState(auth);
  const [isExpenseModalvisibe, setIsExpenseModalvisibe] = useState(false)
  const [isIncomeModalvisibe, setIsIncomeModalvisibe] = useState(false)
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setToalBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalvisibe(true);
  }
  const showIncomeModal = () => {
    setIsIncomeModalvisibe(true)
  }
  const handleExpenseCancel = () => {
    setIsExpenseModalvisibe(false)
  }
  const handleIncomeCancel = () => {
    setIsIncomeModalvisibe(false)
  }

  const onFinish = (value, type) => {
    const newTransaction = {
      type: type,
      date:moment(value.date).format('DD-MM-YYYY'),
      amount: parseFloat(value.amount),
      category: value.category,
      name: value.name
    };
    addTransaction(newTransaction)
    setIsIncomeModalvisibe(false)
    setIsExpenseModalvisibe(false)
  }

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with Id ", docRef.id);
      if(!many) toast.success("Transaction added successfully");
  
      // Update the transaction state immutably
      setTransaction((prevTransactions) => [...prevTransactions, transaction]);
    } catch (e) {
      console.error("Error adding document: ", e);
      if(!many)  toast.error("Could not add transaction");
    }
  }
  

  useEffect(() => {
    // Get all transacion
    fetchTransaction();
  }, [user]);
  
  useEffect(() => {
    if (transaction.length > 0) {
      calculateBalance();
    }
  }, [transaction]);
  
  const calculateBalance = () => {
    if (!Array.isArray(transaction)) {
      console.error('Transaction data is not an array.');
      return;
    }
  
    let incomeTotal = 0;
    let expenseTotal = 0;
  
    transaction.forEach((tran) => {
      const amount = parseFloat(tran.amount) || 0; // Safely handle non-numeric values
      if (tran.type === "Income") {
        incomeTotal += amount;
      } else if (tran.type === "expense") {
        expenseTotal += amount;
      }
    });
  
    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setToalBalance(incomeTotal - expenseTotal); // Fixed typo
  };
  

async function fetchTransaction() {
  setLoading(true);
  try {
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push({ ...doc.data(), id: doc.id });
      });
      setTransaction(transactionsArray); // Updates the state
      console.log("Transactions Array", transactionsArray);
      toast.success("Transaction fetched successfully");
    }
  } catch (error) {
    console.error("Error fetching transactions: ", error);
    toast.error("Could not fetch transactions");
  }
  setLoading(false);
}

let sortedtransaction = transaction.sort((a,b) => {
return new Date(a.date)- new Date(b.date);
})
  return (
    <>
      <Header />
      {loading ?
        (<h1>loading ...</h1>) :
        (
          <>
            <Cards
              income={income}
              expense={expense}
              totalBalance={totalBalance}
              showExpenseModal={showExpenseModal}
              showIncomeModal={showIncomeModal}
            />
            
           {transaction.length!=0 ? <ChartComponent sortedtransaction={sortedtransaction}/> : <NoTransaction/>} 
           <AddIncomeModal
              isIncomeModalvisibe={isIncomeModalvisibe}
              handleIncomeCancel={handleIncomeCancel}
              onFinish={onFinish}
            />

            <AddExpenseModal
              isExpenseModalvisible={isExpenseModalvisibe}
              handleExpenseCancel={handleExpenseCancel}
              onFinish={onFinish}
            />

            <TransactionsTable 
            transaction={transaction} 
            addTransaction={addTransaction}
            fetchTransaction={fetchTransaction}
            />
          </>
        )
      }

    </>
  )
}

export default Dashboard
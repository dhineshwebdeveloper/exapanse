import React from 'react'
import './styles.css'
import { Row, Card } from 'antd'
import Button from '../Button/index'
const Cards = ({showExpenseModal, showIncomeModal, income, expense, totalBalance}) => {
  return (
    <div>
      <Row className='my-row'>
        <Card className='my-Cart' title="Current Balance" >
          <p>₹{totalBalance}</p> 
          <Button text="Reset Balance" blue={true}/>
        </Card>
        <Card className='my-Cart' title="Total Income" onClick={showIncomeModal}>
          <p>₹{income}</p> 
          <Button text="Add Income" blue={true}/>
        </Card>
        <Card className='my-Cart' title="Total Expenses" onClick={showExpenseModal}>
          <p>₹{expense}</p> 
          <Button text="Add Expenses" blue={true}/>
        </Card>
      </Row>

    </div>
  )
}

export default Cards
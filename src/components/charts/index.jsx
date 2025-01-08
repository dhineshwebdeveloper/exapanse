import React from 'react';
import { Line, Pie } from '@ant-design/charts';
import './styles.css'; // Add a CSS file for custom styles

const ChartComponent = ({ sortedtransaction }) => {
  const data = sortedtransaction.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedtransaction.filter((transaction) => {
    return transaction.type === 'expense';
  });

  let finalSpending = spendingData.reduce((acc, obj) => {
    let key = obj.category;
    if (!acc[key]) {
      acc[key] = { category: obj.category, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});

  const config = {
    data: data,
    xField: 'date',
    yField: 'amount',
    smooth: true, // Adds smoothness to the line chart
    height: 300,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 2000,
      },
    },
  };

  const spendingConfig = {
    data: Object.values(finalSpending),
    angleField: 'amount',
    colorField: 'category',
    radius: 1,
    height: 300,
    animation: {
      appear: {
        animation: 'scale-in-x',
        duration: 2000,
      },
    },
  };

  return (
    <div className="chart-wrapper">
      <div className="chart-box">
        <h2 className="chart-title">Your Analytics</h2>
        <Line {...config} />
      </div>
      <div className="chart-box">
        <h2 className="chart-title">Your Spending</h2>
        <Pie {...spendingConfig} />
      </div>
    </div>
  );
};

export default ChartComponent;

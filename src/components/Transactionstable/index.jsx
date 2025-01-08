import React, { useState } from 'react'
import { Table, Select, Radio, Button } from 'antd';
import searchIcon from "../../assets/img/icons8-search.svg"
import './styles.css'
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';
// import { Option } from 'antd/es/mentions';
// import 'antd/dist/antd.css';
const TransactionsTable = ({ transaction, addTransaction, fetchTransaction }) => {
    const { Option } = Select;
    const [search, setSearch] = useState("")
    const [typeFilter, setTypeFilter] = useState('')
    const [shortKey, setShortkey] = useState("")
    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'date',
            dataIndex: 'date',
            key: 'date',
        },
    ];
    let filteredTransaction = transaction.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
    );

    let sortedTransactions = filteredTransaction.sort((a, b) => {
        if (shortKey === "date") {
            // Convert DD-MM-YYYY to a comparable Date object
            const dateA = new Date(a.date.split('-').reverse().join('-'));
            const dateB = new Date(b.date.split('-').reverse().join('-'));
            return dateA - dateB;
        } else if (shortKey === "amount") {
            return a.amount - b.amount;
        } else {
            return 0;
        }
    });

    function exportcsv() {
        try {
            // Convert transactions to CSV format
            const csv = unparse({
                fields: ["name", "type", "category", "date", "amount"],
                data: transaction.map((tran) => [
                    tran.name,
                    tran.type,
                    tran.category,
                    tran.date,
                    tran.amount,
                ]),
            });

            // Create a Blob and trigger the download
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
            const url = URL.createObjectURL(blob);

            // Create an anchor element for downloading
            const link = document.createElement("a");
            link.href = url;
            link.download = "transaction.csv";
            document.body.appendChild(link);
            link.click();

            // Clean up the URL and the DOM
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error exporting CSV:", error);
            alert("Something went wrong while exporting the CSV.");
        }
    }

    function importFromcsv(event) {
        event.preventDefault();
        try {
            parse(event.target.files[0], {
                header: true,
                complete: async function (results) {
                    for (const transaction of results.data) {
                        console.log("transaction", transaction);
                        const newTransaction = {
                            ...transaction,
                            amount: parseFloat(transaction.amount), // Ensure only the amount is parsed as a number
                        };
                        await addTransaction(newTransaction, true);
                    }
                }
            });
            toast.success("All Transactions Added");
            fetchTransaction();
        } catch (e) {
            toast.error(e.message);
        }
    }

    return (
        <div className="transactions-container">
            {/* Row 1: Search Box and Filter Group */}
            <div className="header-section">
                <div className="search-box">
                    <div className="input-flex">
                        <img src={searchIcon} alt="Search Icon" width="16" />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search By Name"
                        />
                    </div>
                </div>

                <div className="filter-group">
                    <Select
                        className="select-input"
                        onChange={(value) => setTypeFilter(value)}
                        value={typeFilter}
                        placeholder="Filter"
                        allowClear
                    >
                        <Option value="">All</Option>
                        <Option value="Income">Income</Option>
                        <Option value="expense">Expense</Option>
                    </Select>

                    <Radio.Group
                        className="input-radio"
                        onChange={(e) => setShortkey(e.target.value)}
                        value={shortKey}
                    >
                        <Radio.Button value="">No Sort</Radio.Button>
                        <Radio.Button value="date">Sort by Date</Radio.Button>
                        <Radio.Button value="amount">Sort by Amount</Radio.Button>
                    </Radio.Group>
                </div>
            </div>

            {/* Row 2: Title and Buttons */}
            <div className="title-action-section">
                <h3 className="section-title">My Transactions</h3>
                <div className="action-buttons">
                    <Button onClick={exportcsv} type="primary" className="export-btn">
                        Export to CSV
                    </Button>
                    <Button type="default" className="import-btn">
                        <label htmlFor="file-csv" style={{ cursor: "pointer", margin: 0 }}>
                            Import CSV File
                        </label>
                        <input
                            type="file"
                            id="file-csv"
                            accept=".csv"
                            required
                            onChange={importFromcsv}
                            style={{ display: "none" }}
                        />
                    </Button>
                </div>
            </div>

            {/* Table Section */}
            <Table
                dataSource={sortedTransactions}
                columns={columns}
                scroll={{ x: 800 }}
                className="transactions-table"
            />
        </div>
    )

}

export default TransactionsTable
import React from 'react';
import { Button, Modal, Form, Input, Select  } from 'antd';

function AddIncomeModal({
    isIncomeModalvisibe,
    handleIncomeCancel,
    onFinish,
}) {
    const [form] = Form.useForm(); // Correct way to use `Form.useForm`

    return (
        <Modal
            style={{ fontWeight: 600 }}
            title="Add Income"
            visible={isIncomeModalvisibe} // Updated `visible` to `open`
            onCancel={handleIncomeCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={(value) => {
                    onFinish(value, 'Income');
                    form.resetFields();
                }}
            >
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Please input the name of the transaction' },
                    ]}
                >
                    <Input className="custom-input" />
                </Form.Item>

                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Amount"
                    name="amount"
                    rules={[
                        { required: true, message: 'Please input the amount' },
                    ]}
                >
                    <Input type="number" className="custom-input" />
                </Form.Item>

                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Date"
                    name="date"
                    rules={[
                        { required: true, message: 'Please select a date' },
                    ]}
                >
                    <Input type="date" className="custom-input" />
                </Form.Item>

                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Category"
                    name="category"
                    rules={[
                        { required: true, message: 'Please select a category' },
                    ]}
                >
                    <Select className="custom-select" placeholder="Select a category">
                        <Select.Option value="salary">Salary</Select.Option>
                        <Select.Option value="investment">Investment</Select.Option>
                        <Select.Option value="freelance">Freelance</Select.Option>
                    </Select>
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" className="submit-button">
                        Add Income
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddIncomeModal;

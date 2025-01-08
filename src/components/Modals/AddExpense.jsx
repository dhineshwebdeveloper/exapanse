import React from 'react';
import { Button, Modal, Form, Input } from 'antd';

function AddExpenseModal({
  isExpenseModalvisible,
  handleExpenseCancel,
  onFinish,
}) {
  const [form] = Form.useForm(); // Correct way to use `Form.useForm`

  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      visible={isExpenseModalvisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(value) => {
          onFinish(value, 'expense');
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
            { required: true, message: 'Please input the category' },
          ]}
        >
          <Input className="custom-input" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpenseModal;

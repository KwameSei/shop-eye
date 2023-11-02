import React, { useState } from 'react';
import { Button, Input, Table } from 'antd';
import { Column } from '@ant-design/plots';
import { SearchOutlined } from '@ant-design/icons';

const Refund = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const orders = [
    {
      _id: "34723hef88773bbq98384",
      orderItems: [
        {
          name: "Nike Slim Shirt",
          qty: 1,
          image: "/images/p1.jpg",
          price: 120,
          product: "5f7b6d7e8e8d9f7b6d7e8e8d"
        },
        {
          name: "Adidas Fit Shirt",
          qty: 1,
          image: "/images/p2.jpg",
          price: 100,
          product: "5f7b6d7e8e8d9f7b6d7e8e8d"
        },
      ],
      shippingAddress: {
        fullName: "John Doe",
        address: "Sample Address",
        city: "Sample City",
        postalCode: "12345",
        country: "Sample Country",
      },
      paymentMethod: "PayPal",
      totalPrice: 220,
      shippingPrice: 0,
      taxPrice: 34,
      orderStatus: "Processing",
      isPaid: true,
      paidAt: "2020-10-05T14:48:00.000Z",
      isDelivered: false,
    }
  ];

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Items',
      dataIndex: 'itemsQty',
      key: 'itemsQty',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      key: 'paid',
    },
    {
      title: 'Delivered',
      dataIndex: 'delivered',
      key: 'delivered',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const data = orders.map((order, index) => ({
    key: index,
    id: order._id,
    status: order.orderStatus,
    itemsQty: order.orderItems.length,
    total: order.totalPrice,
    paid: order.isPaid,
    delivered: order.isDelivered,
    action: (
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          history.push(`/order/${params.getValue(params.id, "id")}`);
        }}
      >
        Details
      </Button>
    ),
  }));

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex)
  }

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('')
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Button
          type='primary'
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size='small'
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size='small'
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? 'red' : '#1890ff' }} />,
    onFilter: (value, record) => {
      return record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : ''
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          // this.searchInput.select();
        });
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Column>{text}</Column>
      ) : (
          text
        ),
  });

  return (
    <div className='all-orders'>
      <div className='all-orders-inner'>
        <div className='all-orders-inner-top'>
        </div>
        <div className='all-orders-inner-bottom'>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{ y: 300 }}
          />
        </div>
      </div>
    </div>
  )
}

export default Refund;
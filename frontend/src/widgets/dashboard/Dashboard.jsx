import React, { useState } from 'react'
import { TrendingDown, TrendingUp } from '@mui/icons-material';
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';

import '../Common.scss';
import './Dashboard.scss';

// CHARTS
const data = [
  {
    type: 'Jan',
    sales: 38,
  },
  {
    type: 'feb',
    sales: 52,
  },
  {
    type: 'Mar',
    sales: 61,
  },
  {
    type: 'Apr',
    sales: 145,
  },
  {
    type: 'May',
    sales: 48,
  },
  {
    type: 'Jun',
    sales: 38,
  },
  {
    type: 'Jul',
    sales: 25,
  },
  {
    type: 'Aug',
    sales: 105,
  },
  {
    type: 'Sep',
    sales: 82,
  },
  {
    type: 'Oct',
    sales: 64,
  },
  {
    type: 'Nov',
    sales: 90,
  },
  {
    type: 'Dec',
    sales: 150,
  },
];

const config = {
  data,
  xField: 'type',
  yField: 'sales',
  color: ({ type }) => {
    if (type === '10-30' || type === '30+') {
      return paletteSemanticRed;
    }
    return "#ffd591";
  },
  label: {
    position: 'middle',
    // 'top', 'bottom', 'middle',
    style: {
      fill: '#000',
      opacity: 0.9,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  meta: {
    type: {
      alias: 'Month of Year',
    },
    sales: {
      alias: 'Sales',
    },
  },
};

// TABLE
const columns = [
  {
    title: 'Order ID',
    dataIndex: 'orderId',
    key: 'orderId',
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];

const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    orderId: `ODR-000${i}`,
    customer: `Customer ${i}`,
    date: `2021-09-0${i}`,
    amount: `₵ ${i}00`,
    status: 'Pending',
    action: <Button>View</Button>,
  });
}

const Dashboard = () => {
  const [selectionType, setSelectionType] = useState('checkbox');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);

    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setSelectedRows([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log('selectedRows changed: ', selectedRows);
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const onSelectionChange = (selectedRowKeys, selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log('selectedRows changed: ', selectedRows);
  };

  return (
    <div className="main">
      <h3>Dashboard</h3>
      <div className='-container'>
        <div className='container-cards'>
          <div>
            <p>Total sales</p>
            <h4>₵ 1000</h4>
          </div>
          <div className='card-items'>
            <h4><TrendingDown />32%</h4>
            <p>Compared to April 2022</p>
          </div>
        </div>
        <div className='container-cards'>
          <div>
            <p>Total sales</p>
            <h4>₵ 1000</h4>
          </div>
          <div className='card-items'>
            <h4 className='red'><TrendingDown />32%</h4>
            <p>Compared to April 2022</p>
          </div>
        </div>
        <div className='container-cards'>
          <div>
            <p>Total sales</p>
            <h4>₵ 1000</h4>
          </div>
          <div className='card-items'>
            <h4 className='green'><TrendingDown />32%</h4>
            <p>Compared to April 2022</p>
          </div>
        </div>
      </div>
      {/* CHART */}
      <div className='container-chart'>
        <h3>Sales Stats</h3>
        <Column {...config} />
      </div> 
    {/* TABLE */}
    <div className="orders">
      <h3>Recent Orders</h3>
      <div className="table">
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data1}
          onChange={onSelectionChange}
        />

        <div className="table-footer">
          <div className="table-footer-left">
            <Button
              type="primary"
              onClick={start}
              disabled={!hasSelected}
              loading={loading}
            >
              Reload
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected
                ? `Selected ${selectedRowKeys.length} items`
                : ''}
            </span>
          </div>
          <div className="table-footer-right">
            <span style={{ marginRight: 8 }}>
              {hasSelected
                ? `Selected ${selectedRowKeys.length} items`
                : ''}
            </span>
            <Button type="primary">Delete</Button>
            <Button type="primary">View</Button>
            <Button type="primary">Edit</Button>
            <Button type="primary">Print</Button>
            <Button type="primary">Export</Button>
            <Button type="primary">Add</Button>
            <Button type="primary">Refresh</Button>
            <Button type="primary">Filter</Button>
            <Button type="primary">Search</Button>
            <Button type="primary">Settings</Button>
            <Button type="primary">More</Button>
          </div>
        </div>
      </div>
    </div>
   </div> 
  )
}

export default Dashboard
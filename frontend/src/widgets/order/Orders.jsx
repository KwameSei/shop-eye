import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Input, Table } from 'antd';
import { Column } from '@ant-design/plots';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { setOrder } from '../../State/product/productSlice';
// import 'antd/dist/antd.css';

import '../../widgets/Common.scss';

const Orders = () => {
  const [ data, setData ] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [selectionType, setSelectionType] = useState('checkbox');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(null);
  const [filterInput, setFilterInput] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // FOR DROPDOWN SEARCH
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();

  const serverURL = import.meta.env.VITE_SERVER_URL;

  // Fetch orders from the database
  const getOrders = async () => {
    try {
      const response = await axios.get(`${serverURL}/api/orders/get-orders`)
      .then((response) => {
        console.log(response.data);

        const orders = response.data.orders;
        const products = response.data.products;
        const users = response.data.users;

         // Calculate total stock by summing up the stock of all orders
        const totalStock = orders.reduce((accumulator, order) => { return accumulator + parseInt(order.stock, 10) }, 0);
        // Calculate total unit price by summing up the unit price of all orders
        const totalUnitPrice = orders.reduce((accumulator, order) => { return accumulator + parseInt(order.unit_price, 10) }, 0);
        const totalCartonPrice = orders.reduce((accumulator, order) => { return accumulator + parseInt(order.carton_price, 10) }, 0);

        const fetchedOrders = response.data.orders
        .map((order) => {
          return {
            key: order._id,
            user: order.user,
            image: order.image,
            name: order.name,
            stock: order.stock,
            totalStock: totalStock,
            unit_price: order.unit_price,
            totalUnitPrice: totalUnitPrice,
            carton_price: order.carton_price,
            totalCartonPrice: totalCartonPrice,
            carton_size: order.carton_size,
            product: order.product,
            sold: order.sold,
            brand: order.brand,
            action: <Button><Link>View</Link></Button>,
          };
        });

        // setData(fetchedOrders);
        dispatch(setOrder(fetchedOrders));
        setProducts(products);
        setUsers(users);
      }
    );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const columns = [
    {
      title: 'order Image',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      padding: '10px',
      textWrap: 'word-break',
      render: (image) => (
        <img
          src={image.url} // Assuming 'url' contains the image URL
          alt="order"
          style={{ maxWidth: '100px' }} // Adjust the styling as needed
        />
      ),
    },
    {
      title: 'order Name',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
        return (
          <div style={{ padding: 8 }}>
            <input 
              autoFocus 
              placeholder="Search..." 
              onChange={handleSearch}
              value={searchQuery}
              // onKeyDown={e => {
              //   if (e.key === 'Enter') {
              //     setSelectedKeys(filterInput ? [filterInput] : [])
              //     confirm();
              //   }
              // }}
              // onBlur={() => {
              //   setSelectedKeys(filterInput ? [filterInput] : [])
              //   confirm();
              // }}
            ></input>
  
            <Button type="primary" onClick={() => {confirm()}} style={{ marginRight: 8 }}>
              Search
            </Button>
            <Button type='danger' onClick={() => {clearFilters()}}>Reset</Button>
          </div>
        );
      },
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
      width: 200,
      font: 'bold',
      backgroundColor: {},
      textWrap: 'word-break',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Total Stock',
      dataIndex: 'totalStock',
      key: 'totalStock',
    },
    {
      title: 'Price',
      dataIndex: 'unit_price',
      key: 'unit_price',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalUnitPrice',
      key: 'totalUnitPrice',
    },
    {
      title: 'Carton Price',
      dataIndex: 'carton_price',
      key: 'carton_price',
    },
    {
      title: 'Total Carton Price',
      dataIndex: 'totalCartonPrice',
      key: 'totalCartonPrice',
    },
    {
      title: 'Carton Size',
      dataIndex: 'carton_size',
      key: 'carton_size',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Sold',
      dataIndex: 'sold',
      key: 'sold',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  
  const dataSet = [];
  
  const totalOrders = dataSet.length;
  // const totalStock = data.reduce((accumulator, order) => { return accumulator + parseInt(order.stock, 10) }, 0);
  // const totalSold = data.reduce((total, order) => total + order.sold, 0);
  // const totalRemainingStock = data.reduce((total, order) => total + order.remaining_stock, 0);
  // const totalCartonPrice = data.reduce((total, order) => total + order.carton_price, 0);
  // const totalUnitPrice = data.reduce((total, order) => total + order.unit_price, 0);
  // const totalCartonSize = data.reduce((total, order) => total + order.carton_size, 0);
  // const totalCategories = data.reduce((total, order) => total + order.category, 0);
  // const totalBrands = data.reduce((total, order) => total + order.brand, 0);
  // const totalImages = data.reduce((total, order) => total + order.image, 0);
  // const totalActions = data.reduce((total, order) => total + order.action, 0);
  // const totalName = data.reduce((total, order) => total + order.name, 0);
  // const total = data.reduce((total, order) => total + order, 0);
  // const totalData = data.reduce((total, order) => total + order, 0);
  
  for (let i = 0; i < totalOrders; i++) {
    dataSet.push({
      key: i,
      image: `Image ${i}`,
      name: `order ${i}`,
      stock: `${i}00`,
      totalStock: totalStock,
      unit_price: `₵ ${i}00`,
      totalUnitPrice: totalUnitPrice,
      carton_price: `₵ ${i}00`,
      totalCartonPrice: totalCartonPrice,
      carton_size: `${i}00`,
      category: `Category ${i}`,
      sold: `Sold ${i}`,
      brand: `Brand ${i}`,
      action: <Button>View</Button>,
    });
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    const query = value.toLowerCase();
    
    // Filter the data based on the search input
    const filteredData = data.filter((order) => {
      return order.name.toLowerCase().includes(query);
    });
    setFilteredData(filteredData);
    setSearchQuery(value);
  };

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      {
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          setSelectedRowKeys([...Array(dataSet.length).keys()]);
          setSelectedRows(data);
        },
      },
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          let newSelectedRows = [];
          for (let i = 0; i < dataSet.length; i++) {
            if (i % 2 !== 0) {
              newSelectedRowKeys.push(i);
              newSelectedRows.push(dataSet[i]);
            }
          }
          setSelectedRowKeys(newSelectedRowKeys);
          setSelectedRows(newSelectedRows);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          let newSelectedRows = [];
          for (let i = 0; i < dataSet.length; i++) {
            if (i % 2 === 0) {
              newSelectedRowKeys.push(i);
              newSelectedRows.push(data[i]);
            }
          }
          setSelectedRowKeys(newSelectedRowKeys);
          setSelectedRows(newSelectedRows);
        },
      },
    ],
  };

  const start = () => {
    setLoading(true);

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleVieworder = (order) => {
    console.log('View order:', order);
    // dispatch(setorder(order));
    // navigate('/app/orders/display');
  };

  const handleEditorder = (order) => {
    console.log('Edit order:', order);
    // dispatch(setorder(order));
    // navigate('/app/orders/edit');
  };

  const handlePrintorder = (order) => {
    console.log('Print order:', order);
    // dispatch(setorder(order));
    // navigate('/app/orders/print');
  }

  const handleDeleteorder = (order) => {
    console.log('Delete order:', order);
    // dispatch(setorder(order));
    // navigate('/app/orders/delete');
  }

  const handleAddorder = () => {
    // navigate('/app/orders/create');
  }

  const handlePrintTable = () => {
    console.log('Print Table');
  }

  return (
    <div className="order-list main">
      <div className="order-list__header">
        <div className="order-list__header__title">
          <h2>order List</h2>
        </div>
        <div className="order-list__header__action">
          <Button onClick={handleAddorder}>Add order</Button>
          <Button
              type="primary"
              onClick={start}
              disabled={!hasSelected}
              loading={loading}
            >
              Reload
            </Button>
          <Button onClick={handlePrintTable}>Print Table</Button>
          <Button onClick={handlePrintorder}>Print order</Button>
          <Button onClick={handleDeleteorder}>Delete order</Button>
          <Button onClick={handleEditorder}>Edit order</Button>
          <Button onClick={handleVieworder}>View order</Button>
        <br />
          <span style={{ marginLeft: 8 }}>
              {hasSelected
                ? `Selected ${selectedRowKeys.length} items`
                : ''}
            </span>
        </div>
      </div>
      <div className="order-list__table">
        <div style={{ overflowX: 'auto'}}>
          <Table className='table'
            loading={loading}
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={filteredData.length > 0 ? filteredData : data}
            size='large'
            pagination={{
              // current: 1, 
              pageSize: 50,
              position: ['bottomCenter'],
              // showSizeChanger: true,
              // pageSizeOptions: ['10', '20', '30', '40', '50', '100', '200', '500', '1000'],
               
            }}
            scroll={{ y: 240, x: 800 }}
            onChange={onSelectChange}
          />
        </div>
      </div>
      <div className='container-chart'>
        <h3>order List Stats</h3>
        {/* <Column {...config} /> */}
      </div> 
      <div className="order-list__chart">
        <Column
          data={data}
          xField="name"
          yField="stock"
          xAxis={{
            visible: true,
            label: {
              autoHide: true,
              autoRotate: false,
            },
          }}
          yAxis={{
            visible: true,
            label: {
              formatter: (v) => `${v} name`,
            },
          }}
          meta={{
            stock: {
              alias: 'Stock',
              formatter: (v) => `${v} name`,
            },
          }}
        />
      </div>
    </div>
  );
};

export default Orders;
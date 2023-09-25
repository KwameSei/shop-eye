import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Input, Table } from 'antd';
import { Column } from '@ant-design/plots';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { setProduct } from '../../../State/product/productSlice';
// import 'antd/dist/antd.css';

import '../../../widgets/Common.scss';

const ProductList = () => {
  const [ data, setData ] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [selectionType, setSelectionType] = useState('checkbox');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(null);
  const [filterInput, setFilterInput] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // FOR DROPDOWN SEARCH
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();

  const serverURL = import.meta.env.VITE_SERVER_URL;

  // Fetch products from the database
  const getProducts = async () => {
    try {
      const response = await axios.get(`${serverURL}/api/products/get-products`)
      .then((response) => {
        console.log(response.data);

        const products = response.data.products;
        const categories = response.data.categories;

         // Calculate total stock by summing up the stock of all products
        const totalStock = products.reduce((accumulator, product) => { return accumulator + parseInt(product.stock, 10) }, 0);
        // Calculate total unit price by summing up the unit price of all products
        const totalUnitPrice = products.reduce((accumulator, product) => { return accumulator + parseInt(product.unit_price, 10) }, 0);
        const totalCartonPrice = products.reduce((accumulator, product) => { return accumulator + parseInt(product.carton_price, 10) }, 0);

        const fetchedProducts = response.data.products
        .map((product) => {
          return {
            key: product._id,
            image: product.image,
            name: product.name,
            stock: product.stock,
            totalStock: totalStock,
            unit_price: product.unit_price,
            totalUnitPrice: totalUnitPrice,
            carton_price: product.carton_price,
            totalCartonPrice: totalCartonPrice,
            carton_size: product.carton_size,
            category: product.category.name,
            sold: product.sold,
            brand: product.brand,
            action: <Button><Link>View</Link></Button>,
          };
        });

        setData(fetchedProducts);
        setCategories(categories);
      }
    );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const columns = [
    {
      title: 'Product Image',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      padding: '10px',
      textWrap: 'word-break',
      render: (image) => (
        <img
          src={image.url} // Assuming 'url' contains the image URL
          alt="Product"
          style={{ maxWidth: '100px' }} // Adjust the styling as needed
        />
      ),
    },
    {
      title: 'Product Name',
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
  
  const totalProducts = dataSet.length;
  // const totalStock = data.reduce((accumulator, product) => { return accumulator + parseInt(product.stock, 10) }, 0);
  // const totalSold = data.reduce((total, product) => total + product.sold, 0);
  // const totalRemainingStock = data.reduce((total, product) => total + product.remaining_stock, 0);
  // const totalCartonPrice = data.reduce((total, product) => total + product.carton_price, 0);
  // const totalUnitPrice = data.reduce((total, product) => total + product.unit_price, 0);
  // const totalCartonSize = data.reduce((total, product) => total + product.carton_size, 0);
  // const totalCategories = data.reduce((total, product) => total + product.category, 0);
  // const totalBrands = data.reduce((total, product) => total + product.brand, 0);
  // const totalImages = data.reduce((total, product) => total + product.image, 0);
  // const totalActions = data.reduce((total, product) => total + product.action, 0);
  // const totalName = data.reduce((total, product) => total + product.name, 0);
  // const total = data.reduce((total, product) => total + product, 0);
  // const totalData = data.reduce((total, product) => total + product, 0);
  
  for (let i = 0; i < totalProducts; i++) {
    dataSet.push({
      key: i,
      image: `Image ${i}`,
      name: `Product ${i}`,
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
    const filteredData = data.filter((product) => {
      return product.name.toLowerCase().includes(query);
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

  const handleViewProduct = (product) => {
    console.log('View Product:', product);
    // dispatch(setProduct(product));
    // navigate('/app/products/display');
  };

  const handleEditProduct = (product) => {
    console.log('Edit Product:', product);
    // dispatch(setProduct(product));
    // navigate('/app/products/edit');
  };

  const handlePrintProduct = (product) => {
    console.log('Print Product:', product);
    // dispatch(setProduct(product));
    // navigate('/app/products/print');
  }

  const handleDeleteProduct = (product) => {
    console.log('Delete Product:', product);
    // dispatch(setProduct(product));
    // navigate('/app/products/delete');
  }

  const handleAddProduct = () => {
    // navigate('/app/products/create');
  }

  const handlePrintTable = () => {
    console.log('Print Table');
  }

  return (
    <div className="product-list main">
      <div className="product-list__header">
        <div className="product-list__header__title">
          <h2>Product List</h2>
        </div>
        <div className="product-list__header__action">
          <Button onClick={handleAddProduct}>Add Product</Button>
          <Button
              type="primary"
              onClick={start}
              disabled={!hasSelected}
              loading={loading}
            >
              Reload
            </Button>
          <Button onClick={handlePrintTable}>Print Table</Button>
          <Button onClick={handlePrintProduct}>Print Product</Button>
          <Button onClick={handleDeleteProduct}>Delete Product</Button>
          <Button onClick={handleEditProduct}>Edit Product</Button>
          <Button onClick={handleViewProduct}>View Product</Button>
        <br />
          <span style={{ marginLeft: 8 }}>
              {hasSelected
                ? `Selected ${selectedRowKeys.length} items`
                : ''}
            </span>
        </div>
      </div>
      <div className="product-list__table">
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
        <h3>Product List Stats</h3>
        {/* <Column {...config} /> */}
      </div> 
      <div className="product-list__chart">
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

export default ProductList;
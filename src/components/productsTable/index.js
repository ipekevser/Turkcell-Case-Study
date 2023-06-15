import { Table, Button, Rate } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchProductsListData,
  fetchFilteredProductsListData,
} from "../../store/list-actions";
import ProductActionModal from "../productActionModal";
import { listActions } from "../../store/list-slice";

const ProductsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [open, setOpen] = useState(false);
  const [deleteParams, setDeleteParams] = useState({
    isDelete: false,
    id: "",
  });

  const dispatch = useDispatch();
  const list = useSelector((state) => state.list.items);
  const selectedCategory = useSelector((state) => state.list.selectedCategory);

  const columns = [
    {
      title: "Title",
      render: (_, record) => {
        return (
          <div className="p-titleColumn">
            <img className="p-thumbnail" src={record.thumbnail} />
            <div>
              <Link to={`/products/${record.id}`}>
                {record.title.toUpperCase()}
              </Link>
            </div>
          </div>
        );
      },
      width: "22%",
    },
    {
      title: "Brand",
      sorter: true,
      render: (record) => record.toUpperCase(),
      dataIndex: "brand",
      width: "15%",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (record) => `$ ${record}`,
      sorter: true,
      width: "15%",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (record) => {
        return (
          <div>
            <Rate disabled allowHalf value={record} />
          </div>
        );
      },
      sorter: true,
      width: "15%",
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (record) => record.toUpperCase(),
      width: "15%",
    },
    {
      title: "Actions",
      width: "18%",
      render: (_, record) => {
        return (
          <>
            <Button
              className="p-actionButton"
              type="primary"
              size={"medium"}
              onClick={() => handleEdit(record.id)}
            >
              EDIT
            </Button>
            <Button
              className="p-actionButton"
              type="primary"
              size={"medium"}
              onClick={() => handleDelete(record.id)}
            >
              DELETE
            </Button>
          </>
        );
      },
    },
  ];

  const handleEdit = (id) => {
    setOpen(true);
    dispatch(listActions.setSelectedProductId(id));
  };

  const handleDelete = (id) => {
    setOpen(true);
    setDeleteParams({
      isDelete: true,
      id: id,
    });
  };

  const onClose = () => {
    setOpen(false);
    setDeleteParams((prev) => ({
      ...prev,
      isDelete: false,
    }));
  };

  useEffect(() => {
    setLoading(true);
    if (!selectedCategory) {
      dispatch(
        fetchProductsListData(
          (tableParams.pagination.current - 1) * 10,
          tableParams.pagination.pageSize
        )
      );
    } else {
      dispatch(
        fetchFilteredProductsListData(
          selectedCategory,
          (tableParams.pagination.current - 1) * 10,
          tableParams.pagination.pageSize
        )
      );
    }
  }, [tableParams.pagination.current]);

  useEffect(() => {
    setData(list.products);
    setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: list.total,
      },
    });
  }, [list]);

  const handleTableChange = (pagination, filter,  sorter) => {
    
    // `reset data when `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }

    setTableParams({
      pagination,
      ...sorter,
    });

    if (sorter.field === "price" && sorter.order === "ascend") {
      const _data = [...data];
      setData(_data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
    } else if (sorter.field === "price" && sorter.order === "descend") {
      const _data = [...data];
      setData(_data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
    } else if (sorter.field === "rating" && sorter.order === "ascend") {
      const _data = [...data];
      setData(
        _data.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating))
      );
    } else if (sorter.field === "rating" && sorter.order === "descend") {
      const _data = [...data];
      setData(
        _data.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      );
    } else if (sorter.field === "brand" && sorter.order === "ascend") {
      const _data = [...data];
      setData(
        _data.sort((a, b) =>
          a.brand.toLowerCase() < b.brand.toLowerCase()
            ? -1
            : b.brand.toLowerCase() > a.brand.toLowerCase()
            ? 1
            : 0
        )
      );
    } else if (sorter.field === "brand" && sorter.order === "descend") {
      const _data = [...data];
      setData(
        _data.sort((a, b) =>
          a.brand.toLowerCase() > b.brand.toLowerCase()
            ? -1
            : b.brand.toLowerCase() < a.brand.toLowerCase()
            ? 1
            : 0
        )
      );
    } else {
      setData(list.products);
    }
  };

  return (
    <>
      <Table
        className="comp-productTable"
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      {open && (
        <ProductActionModal
          open={open}
          onClose={onClose}
          from={"edit"}
          deleteParams={deleteParams}
        />
      )}
    </>
  );
};
export default ProductsTable;

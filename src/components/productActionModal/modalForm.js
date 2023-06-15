import { useState, useEffect } from "react";
import { Form, Input, InputNumber, Select, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import UploadImages from "../upload";
import { v4 as uuidv4 } from "uuid";

import {
  fetchProductDetailData,
  updateProduct,
  createProduct,
} from "../../store/list-actions";
import { listActions } from "../../store/list-slice";

const { TextArea } = Input;

const ModalForm = ({ from, isSubmit, onClose }) => {
  const [inputValues, setInputValues] = useState({
    title: "",
    brand: "",
    description: "",
  });
  const [categoryValue, setCategoryValue] = useState("");
  const [priceValue, setPriceValue] = useState(null);
  const [discountValue, setDiscountValue] = useState(null);
  const [stockValue, setStockValue] = useState(null);
  const [ratingValue, setRatingValue] = useState(null);
  const [fileList, setFileList] = useState([]);

  const dispatch = useDispatch();
  const productId = useSelector((state) => state.list.selectedProductId);
  const productsList = useSelector((state) => state.list.items.products);
  const productDetailData = useSelector((state) => state.list.productDetails);
  const categoryList = useSelector((state) => state.list.categories);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api["warning"]({
      message:
        "The edit process could not be completed because all fields were not filled.",
      placement: "bottomLeft",
      maxCount: 3,
      duration: 2,
    });
  };

  const handleInputChange = (e) => {
    setInputValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (from === "edit" && productId) {
      dispatch(
        listActions.setProductDetails(
          productsList.find((product) => product.id === productId)
        )
      );
      dispatch(fetchProductDetailData(productId));
    }
  }, [productId]);

  useEffect(() => {
    if (
      productDetailData &&
      Object.keys(productDetailData).length > 0 &&
      from === "edit"
    ) {
      setInputValues({
        title: productDetailData.title,
        brand: productDetailData.brand,
        description: productDetailData.description,
      });
      setCategoryValue(productDetailData.category);
      setPriceValue(productDetailData.price);
      setDiscountValue(productDetailData.discountPercentage);
      setStockValue(productDetailData.stock);
      setRatingValue(productDetailData.rating);
      setFileList(
        productDetailData.images.map((image) => ({
          uid: image,
          url: image,
        }))
      );
    }
  }, [productDetailData]);

  useEffect(() => {
    if (isSubmit.isSubmit) {
      const product = {
        id: from === "edit" ? productId : uuidv4(),
        title: inputValues.title,
        description: inputValues.description,
        price: priceValue,
        discountPercentage: discountValue,
        rating: ratingValue,
        stock: stockValue,
        brand: inputValues.brand,
        category: categoryValue,
        thumbnail: fileList[fileList.length - 1]?.url,
        images: fileList.length > 0 ? fileList.map((image) => image.url) : [],
      };

      if (
        inputValues.title === "" ||
        inputValues.brand === "" ||
        inputValues.description === "" ||
        !categoryValue ||
        priceValue === null ||
        discountValue === null ||
        stockValue === null ||
        ratingValue === null ||
        fileList.length === 0
      ) {
        openNotification();
        return;
      }

      if (from === "edit") {
        dispatch(updateProduct(product));
      } else {
        dispatch(createProduct(product));
      }
      onClose();
    }
  }, [isSubmit]);

  return (
    <div className="comp-modalForm">
      {contextHolder}
      <UploadImages fileList={fileList} setFileList={setFileList} />
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
          width: "80%",
        }}
      >
        <Form.Item label="Title">
          <Input
            name="title"
            value={inputValues.title}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Brand">
          <Input
            name="brand"
            value={inputValues.brand}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Category">
          <Select
            name="category"
            value={categoryValue}
            onChange={setCategoryValue}
            placeholder="Select Category"
            allowClear
          >
            {categoryList.map((category) => (
              <Select.Option value={category} key={category}>
                {category.toUpperCase()}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Price">
          <InputNumber
            name="price"
            value={priceValue}
            onChange={setPriceValue}
          />
        </Form.Item>
        <Form.Item label="Discount">
          <InputNumber
            name="discount"
            value={discountValue}
            onChange={setDiscountValue}
          />
        </Form.Item>
        <Form.Item label="Stock">
          <InputNumber value={stockValue} onChange={setStockValue} />
        </Form.Item>
        <Form.Item label="Rating">
          <InputNumber value={ratingValue} onChange={setRatingValue} />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            rows={4}
            name="description"
            value={inputValues.description}
            onChange={handleInputChange}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default ModalForm;

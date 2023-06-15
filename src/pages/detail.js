import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Divider, Row, Image } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { listActions } from "../store/list-slice";
import {
  fetchProductDetailData,
  fetchProductsListData,
} from "../store/list-actions";

const ProductDetail = () => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const productDetailData = useSelector((state) => state.list.productDetails);
  const productsList = useSelector((state) => state.list.items.products);

  useEffect(() => {
    if (productsList?.length > 0) {
      dispatch(
        listActions.setProductDetails(
          productsList.find((product) => product.id === +id)
        )
      );
      dispatch(fetchProductDetailData(id));
    }
  }, [id, productsList]);

  useEffect(() => {
    if (!productsList) {
      dispatch(fetchProductsListData(0, 10));
    }
  }, []);

  return (
    <div className="comp-home">
      <Divider className="c-divider">{productDetailData?.title}</Divider>
      <Image.PreviewGroup
        preview={{
          onChange: (current, prev) =>
            console.log(`current index: ${current}, prev index: ${prev}`),
        }}
      >
        <div className="c-image-group">
          {productDetailData?.images?.map((item) => (
            <Image className="c-image-field" src={item} key={item} />
          ))}
        </div>
      </Image.PreviewGroup>
      {productDetailData &&
        Object.keys(productDetailData)
          ?.filter((item) => item !== "images" && item !== "thumbnail")
          .map((item) => (
            <Row key={item} className="c-col-detail">
              <Col span={8} order={1}>
                {item.toUpperCase()} :
              </Col>
              <Col span={16} order={2}>
                {productDetailData[item]}
              </Col>
            </Row>
          ))}
    </div>
  );
};

export default ProductDetail;

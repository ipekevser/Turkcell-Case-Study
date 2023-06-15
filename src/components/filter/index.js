import { Select } from "antd";
import { useState } from "react";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchFilteredProductsListData,
  fetchCategoriesData,
  fetchProductsListData,
} from "../../store/list-actions";
import { listActions } from "../../store/list-slice";

const CategoryFilter = () => {
  const [categoryValue, setCategoryValue] = useState("");

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.list.categories);
  const categoriesNotification = useSelector(
    (state) => state.ui.categoriesNotification
  );

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, []);

  const handleChange = (value) => {
    setCategoryValue(value);
  };

  useEffect(() => {
    dispatch(listActions.replaceSelectedCategory(categoryValue));
    if (categoryValue !== "" && categoryValue !== undefined) {
      dispatch(fetchFilteredProductsListData(categoryValue, 0, 10));
    } else if (categoryValue === undefined) {
      dispatch(fetchProductsListData(0, 10));
    }
  }, [categoryValue]);

  return (
    <Select
      className={"comp-filter"}
      allowClear
      size={"large"}
      id={"testSelect"}
      placeholder="CATEGORIES"
      loading={categoriesNotification.status === "pending"}
      options={categoryList.map((category) => ({
        value: category,
        label: category.toUpperCase(),
      }))}
      onChange={handleChange}
    />
  );
};

export default CategoryFilter;

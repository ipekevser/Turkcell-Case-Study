import { uiActions } from "./ui-slice";
import { listActions } from "./list-slice";

export const fetchProductsListData = (skip, limit) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showProductsNotification({
        status: "pending",
        postStatus: "succeeded",
        message: "Fetching product list data!",
      })
    );
    const fetchData = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch products!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const listData = await fetchData();

      dispatch(
        listActions.replaceListItems({
          items: listData || [],
        })
      );
      dispatch(
        uiActions.showProductsNotification({
          status: "succeeded",
          postStatus: "succeeded",
          message: "Product data fetched!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showProductsNotification({
          status: "error",
          postStatus: "succeeded",
          message: error.message,
        })
      );
    }
  };
};

export const fetchFilteredProductsListData = (categoryValue, skip, limit) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showProductsNotification({
        status: "pending",
        postStatus: "succeeded",
        message: "Filtering product list data!",
      })
    );
    const fetchData = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/category/${categoryValue}?limit=${limit}&skip=${skip}`
      );

      if (!response.ok) {
        throw new Error("Could not filter products!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const listData = await fetchData();

      dispatch(
        listActions.replaceListItems({
          items: listData || [],
        })
      );
      dispatch(
        uiActions.showProductsNotification({
          status: "succeeded",
          postStatus: "succeeded",
          message: "Product data fetched!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showProductsNotification({
          status: "error",
          postStatus: "succeeded",
          message: error.message,
        })
      );
    }
  };
};

export const fetchCategoriesData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showCategoriesNotification({
        status: "pending",
        postStatus: "succeeded",
        message: "Fetching product data!",
      })
    );
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products/categories");

      if (!response.ok) {
        throw new Error("Could not fetch categories!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const categoriesData = await fetchData();
      dispatch(
        listActions.replaceCategoriesList({
          categories: categoriesData || [],
        })
      );
      dispatch(
        uiActions.showCategoriesNotification({
          status: "succeeded",
          postStatus: "succeeded",
          message: "Product data fetched!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showCategoriesNotification({
          status: "error",
          postStatus: "succeeded",
          message: error.message,
        })
      );
    }
  };
};

export const fetchProductDetailData = (productId) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showProductDetailNotification({
        status: "pending",
        postStatus: "succeeded",
        message: "Fetching product data!",
      })
    );
    const fetchData = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch product!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const productData = await fetchData();
      // dispatch(listActions.setProductDetails(productData));
      // Product in detayini cektigimiz zaman DB den guncel olmayan veri geldigi icin bu servis simule olarak kullanildi.
      dispatch(
        uiActions.showProductDetailNotification({
          status: "succeeded",
          postStatus: "succeeded",
          message: "Product data fetched!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showProductDetailNotification({
          status: "error",
          postStatus: "succeeded",
          message: error.message,
        })
      );
    }
  };
};

export const createProduct = (newProduct) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showProductDetailNotification({
        status: "pending",
        postStatus: "pending",
        message: "Sending product data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        body: JSON.stringify(newProduct),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(listActions.updateListItems({ newProduct: newProduct }));
        });

      if (!response.ok) {
        throw new Error("Sending product data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showProductDetailNotification({
          status: "succeeded",
          postStatus: "succeeded",
          message: "Sent product data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showProductDetailNotification({
          status: "error",
          postStatus: "error",
          message: error.message,
        })
      );
    }
  };
};

export const updateProduct = (updatedProduct) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showProductDetailNotification({
        status: "pending",
        postStatus: "pending",
        message: "Sending product data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/${updatedProduct.id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedProduct),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(listActions.updateListItems({ newProduct: updatedProduct }));
        });

      if (!response.ok) {
        throw new Error("Sending product data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showProductDetailNotification({
          status: "succeeded",
          postStatus: "succeeded",
          message: "Sent product data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showProductDetailNotification({
          status: "error",
          postStatus: "error",
          message: error.message,
        })
      );
    }
  };
};
export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showProductDetailNotification({
        status: "pending",
        postStatus: "pending",
        message: "Delete product data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(listActions.deleteListItems(id));
        });

      if (!response.ok) {
        throw new Error("Deleting product data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showProductDetailNotification({
          status: "succeeded",
          postStatus: "succeeded",
          message: "Sent product data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showProductDetailNotification({
          status: "error",
          postStatus: "error",
          message: error.message,
        })
      );
    }
  };
};

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductActionModal from "./index";

const mockStore = configureStore([]);
const store = mockStore({});

describe("ProductActionModal", () => {
  test("displays delete confirmation message", () => {
    render(
      <Provider store={store}>
        <ProductActionModal
          open={true}
          onClose={() => {}}
          deleteParams={{ isDelete: true }}
        />
      </Provider>
    );

    const deleteConfirmationMessage = screen.getByText(
      "Are you sure you want to delete this item?"
    );
    expect(deleteConfirmationMessage).toBeInTheDocument();
  });
});

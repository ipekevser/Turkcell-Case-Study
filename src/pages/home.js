import { Button } from "antd";
import CategoryFilter from "../components/filter";
import ProductsTable from "../components/productsTable";
import ProductActionModal from "../components/productActionModal";
import { useState } from "react";

const AllProducts = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="comp-home">
      <div className="c-action-field">
        <CategoryFilter />
        <Button
          className="c-button-addNewItem"
          type="primary"
          size={"large"}
          onClick={handleClick}
        >
          Add +
        </Button>
      </div>
      <ProductsTable />
      {open && <ProductActionModal open={open} onClose={onClose} />}
    </div>
  );
};

export default AllProducts;

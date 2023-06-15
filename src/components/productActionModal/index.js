import { Modal } from "antd";
import { useState } from "react";
import ModalForm from "./modalForm";

import { useDispatch } from "react-redux";
import { deleteProduct } from "../../store/list-actions";

const ProductActionModal = ({ open, onClose, from, deleteParams }) => {
  const [isSubmit, setSubmit] = useState({ isSubmit: false });

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (deleteParams?.isDelete) {
      dispatch(deleteProduct(deleteParams?.id));
      onClose();
    } else {
      setSubmit({ isSubmit: true });
    }
  };

  return (
    <>
      <Modal
        title={
          deleteParams?.isDelete
            ? "Delete Product"
            : from === "edit"
            ? "Edit Product"
            : "Add New Product"
        }
        centered
        open={open}
        onOk={handleSubmit}
        onCancel={onClose}
        okButtonProps={{ disabled: false }}
        cancelButtonProps={{ disabled: false }}
        width={deleteParams?.isDelete ? "30%" : "60%"}
      >
        {deleteParams?.isDelete ? (
          <p>Are you sure you want to delete this item?</p>
        ) : (
          <ModalForm from={from} isSubmit={isSubmit} onClose={onClose} />
        )}
      </Modal>
    </>
  );
};

export default ProductActionModal;

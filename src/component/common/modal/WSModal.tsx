import React from "react";
import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import "./WSModal.less";

interface CustomModalProps extends ModalProps  {
  children?: React.ReactNode;
  visible?: boolean;
  confirmFunction?: (e: React.MouseEvent<HTMLElement>) => void;
  cancelFunction?: (e: React.MouseEvent<HTMLElement>) => void;
  footerFunction?: React.ReactNode | null;
  closable?: boolean;
  confirmLoading?: boolean;
}

export const WSModal = (props: CustomModalProps) => {
  const {
    children,
    visible,
    confirmFunction,
    closable = false,
    cancelFunction,
    footerFunction,
    confirmLoading,
  } = props;
  return (
    <>
      <Modal
        visible={visible}
        centered
        closable={closable}
        className="custom-modal"
        onOk={confirmFunction}
        confirmLoading={confirmLoading}
        footer={footerFunction}
        onCancel={cancelFunction}
        {...props}
      >
        {children}
      </Modal>
    </>
  );
};

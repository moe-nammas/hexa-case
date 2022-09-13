import React from "react";
import {
  UncontrolledTooltip,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button,
} from "reactstrap";

const AttackedAssetsModal = ({ openModal, setOpenModal }) => {
  return (
    <Modal toggle={() => setOpenModal(!openModal)} isOpen={openModal}>
      <ModalHeader toggle={() => setOpenModal(false)}>
        Attacked Assets
      </ModalHeader>
      <ModalBody></ModalBody>
    </Modal>
  );
};

export default AttackedAssetsModal;

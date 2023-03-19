import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Loading from "../../Loading/Loading";
import TableTemplate from "../../Table/TableTemplate";

const TableModal = ({
  openModal,
  setOpenModal,
  data,
  isLoading,
  columns,
  header,
  setCurrentPage,
  setLimit,
  currentPage,
  total,
  limit
}) => {
  return (
    <Modal size="lg" toggle={() => setOpenModal(!openModal)} isOpen={openModal}>
      <ModalHeader toggle={() => setOpenModal(false)}>{header}</ModalHeader>
      <ModalBody className="dashboard-info-modal-wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          <TableTemplate
            searchChoices={[]}
            columns={columns}
            data={data}
            setCurrentPage={setCurrentPage}
            setLimit={setLimit}
            currentPage={currentPage}
            total={total}
            rowsPerPage={limit}
            noSearch
          />
        )}
      </ModalBody>
    </Modal>
  );
};

export default TableModal;

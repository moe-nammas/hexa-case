import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Loading from "../../Loading/Loading";
import TableTemplate from "../../Table/TableTemplate";

const AttackedAssetsModal = ({ openModal, setOpenModal, data, isLoading }) => {
  const columns = [
    {
      name: "Destination IP",
      sortable: true,
      selector: (row) => row.destinationIp,
    },
  ];

  return (
    <Modal size="lg" toggle={() => setOpenModal(!openModal)} isOpen={openModal}>
      <ModalHeader toggle={() => setOpenModal(false)}>
        Attacked Assets
      </ModalHeader>
      <ModalBody className="dashboard-info-modal-wrapper ">
        {isLoading ? (
          <Loading />
        ) : (
          <TableTemplate
            searchChoices={[]}
            columns={columns}
            data={data}
            noSearch
          />
        )}
      </ModalBody>
    </Modal>
  );
};

export default AttackedAssetsModal;

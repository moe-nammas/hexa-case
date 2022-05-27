import React from "react";
import { Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import SearchBy from "../SearchBy/SearchBy";
import "./TableTemplate.scss";

const TableTemplate = ({ headers, data, extraElements, searchChoices }) => {
  return (
    <div className="table-template-container">
      <div className="search-container">
        <SearchBy choices={searchChoices} />
      </div>
      <Table striped>
        <thead>
          <tr>
            {headers?.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
      <Pagination size="lg">
        <PaginationItem disabled>
          <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem disabled>
          <PaginationLink href="#" previous />
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink className="pagination-item" href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" next />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" last />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default TableTemplate;

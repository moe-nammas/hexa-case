import React, { useState, useEffect } from "react";
import "./CaseDetails.scss";
import { Form, FormGroup, Label, Button, Input } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CasesApi } from "../../../Api/AxiosApi";
import { DataFormatter } from "../../../Helpers/DataFormatter";
import Loading from "../../../Components/Loading/Loading";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions/index";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiAlertTriangle } from "react-icons/fi";
import TableTemplate from "../../../Components/Table/TableTemplate";
import CommentsSection from "../../../Components/CommentsSection/CommentsSection";
import defaultUserImg from "../../../Assets/Images/default-user-img.png";
import { UncontrolledTooltip } from "reactstrap";

const CaseDetails = () => {
  const { state: caseIdFromSystem } = useLocation();
  const router = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user).user.userName;

  useEffect(() => {
    console.log(caseIdFromSystem);
  }, []);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    description: "",
    status: "",
    createdBy: "",
    closedTime: "",
    closedBy: "",
    creationTime: "",
    severity: "",
  });
  const [newCommentFormData, setNewCommentFormData] = useState({
    comment: "",
    commentBy: username,
    caseId: "",
    caseIdFromSystem: caseIdFromSystem,
  });
  const choices = ["Alert Id", "Rule Name", "Severity", "Time", "Status"];
  const [associatedAlerts, setAssociatedAlerts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newCommentError, setNewCommentError] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  const columns = [
    {
      name: "Alert ID",
      sortable: true,
      selector: (row) => row.alertId,
    },
    {
      name: "Time",
      sortable: true,
      selector: (row) => row.timeStamp,
    },
    {
      name: "Rule Name",
      sortable: true,
      selector: (row) => row.ruleName,
    },
    {
      name: "Severity",
      sortable: true,
      selector: (row) => row.severity,
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => row.status,
    },
    {
      cell: (row) => (
        <div className="table-icons-container">
          <AiOutlineEye
            className="edit-icon-style"
            onClick={(e) => handleButtonClick(e, row)}
            id={`view-icon-${row.alertId}`}
          />
          <UncontrolledTooltip
            autohide
            flip
            target={`view-icon-${row.alertId}`}
            placement="left"
          >
            View
          </UncontrolledTooltip>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const loadCaseDetails = async () => {
    try {
      setLoading(true);
      const res = await CasesApi.getCaseDetails(caseIdFromSystem);
      setFormData({
        name: DataFormatter(res.data.name),
        description: DataFormatter(res.data.description),
        status: DataFormatter(res.data.status),
        createdBy: DataFormatter(res.data.createdBy),
        closedTime: DataFormatter(res.data.closedTime),
        closedBy: DataFormatter(res.data.closedBy),
        creationTime: DataFormatter(res.data.creationTime),
        severity: DataFormatter(res.data.severity),
        id: res.data.id,
      });
      const flattenedData = res.data.associatedAlerts.map((item) => {
        const editedRow = {
          ...item,
          alertId: DataFormatter(item.alertId),
          timeStamp: DataFormatter(item.timeStamp),
          ruleName: DataFormatter(item.ruleName),
          severity: DataFormatter(item.severity),
          status: DataFormatter(item.status),
        };
        return editedRow;
      });
      setAssociatedAlerts(flattenedData);
      setComments(res.data.comments);
      setNewCommentFormData({
        ...newCommentFormData,
        caseId: res.data.id,
        comment: "",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong! Please try again later");
    }
  };

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Case Details" }));
    loadCaseDetails();
  }, []);

  const handleButtonClick = (e, row) => {
    router("/Alerts/AlertDetails", { state: row.alertId });
  };

  const handleCommentInput = (e) => {
    setNewCommentFormData({
      ...newCommentFormData,
      comment: e.target.value,
    });
  };

  const handleSendBtn = async () => {
    try {
      setCommentLoading(true);
      if (newCommentFormData.comment.length === 0) {
        setNewCommentError(true);
        setCommentLoading(false);
        return;
      }
      await CasesApi.postComment(newCommentFormData);
      toast.success("Comment posted successfully");
      loadCaseDetails();
      setCommentLoading(false);
    } catch (error) {
      console.log(error);
      setCommentLoading(false);
      toast.error(
        "Something went wrong while posting comment! Please Try Again Later"
      );
    }
  };

  useEffect(() => {
    if (newCommentFormData.comment.length > 0) setNewCommentError(false);
  }, [newCommentFormData.comment]);

  return (
    <div className="case-details-container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="cases-main-content">
            <div className="case-details-content-container">
              <label className="component-header-style">
                <span>
                  <AiOutlineInfoCircle />
                </span>
                Case Info
              </label>
              <Form
                className="form-container-style"
                style={{ fontSize: "14px", paddingInline: "0.5rem" }}
              >
                <div className="inputs-container">
                  <FormGroup className="row-container-form-style">
                    <div className="form-label-input-container with-border">
                      <Label>Name</Label>
                      <Label className="form-data-lbl-style">
                        {formData.name}
                      </Label>
                    </div>
                    <div className="form-label-input-container with-border">
                      <Label>Description</Label>
                      <Label className="form-data-lbl-style">
                        {formData.description}
                      </Label>
                    </div>
                  </FormGroup>
                  <FormGroup className="row-container-form-style with-border">
                    <div className="form-label-input-container">
                      <Label>Status</Label>
                      <Label className="form-data-lbl-style">
                        {formData.status}
                      </Label>
                    </div>

                    <div className="form-label-input-container with-border">
                      <Label>Created By</Label>
                      <Label className="form-data-lbl-style">
                        {formData.createdBy}
                      </Label>
                    </div>
                  </FormGroup>
                  <FormGroup className="row-container-form-style with-border">
                    <div className="form-label-input-container">
                      <Label>Closed Time</Label>
                      <Label className="form-data-lbl-style">
                        {formData.closedTime}
                      </Label>
                    </div>
                    <div className="form-label-input-container with-border">
                      <Label>Closed By</Label>
                      <Label className="form-data-lbl-style">
                        {formData.closedBy}
                      </Label>
                    </div>
                  </FormGroup>
                  <FormGroup className="row-container-form-style">
                    <div className="form-label-input-container with-border">
                      <Label>Creation Time</Label>
                      <Label className="form-data-lbl-style">
                        {formData.creationTime}
                      </Label>
                    </div>
                    <div className="form-label-input-container with-border">
                      <Label>Severity</Label>
                      <Label className="form-data-lbl-style">
                        {formData.severity}
                      </Label>
                    </div>
                  </FormGroup>
                </div>
              </Form>
            </div>
            <div className="case-details-comments-section-container">
              <label className="component-header-style">
                <span>
                  <AiOutlineComment />
                </span>
                Comments
              </label>
              {comments.length ? (
                <CommentsSection comments={comments} />
              ) : (
                <>No Comments</>
              )}
              <div className="comment-input-container">
                <div className="comment-img-container">
                  <img src={defaultUserImg} width="100%" height="100%" />
                </div>
                <input
                  className={`comment-input ${newCommentError ? "error" : ""} `}
                  placeholder="Comment..."
                  onChange={(e) => handleCommentInput(e)}
                  disabled={formData.status == "closed"}
                />
                <Button
                  className="primary-btn-style"
                  onClick={handleSendBtn}
                  disabled={commentLoading || formData.status == "closed"}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
          <div className="associated-alerts-table-container">
            <label className="component-header-style">
              <span>
                <FiAlertTriangle />
              </span>
              Associated Alerts
            </label>
            <TableTemplate
              searchChoices={choices}
              columns={columns}
              data={associatedAlerts}
              noSearch
            />
            <div className="form-btn-container-style">
              <Button
                className="form-back-btn-style"
                onClick={() => {
                  router(-1);
                }}
              >
                Back
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CaseDetails;

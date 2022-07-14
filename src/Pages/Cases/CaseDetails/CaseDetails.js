import React, { useState, useEffect } from "react";
import "./CaseDetails.scss";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { CasesApi } from "../../../Api/AxiosApi";
import { DataFormatter } from "../../../Helpers/DataFormatter";
import Loading from "../../../Components/Loading/Loading";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions/index";

const CaseDetails = () => {
  const { state } = useLocation();
  const router = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
    createdBy: "",
    closedTime: "",
    closedBy: "",
    creationTime: "",
    severity: "",
  });

  const loadAlertDetails = async () => {
    try {
      setLoading(true);
      const res = await CasesApi.getCaseDetails(state);
      setFormData({
        name: DataFormatter(res.data.name),
        description: DataFormatter(res.data.description),
        status: DataFormatter(res.data.status),
        createdBy: DataFormatter(res.data.createdBy),
        closedTime: DataFormatter(res.data.closedTime),
        closedBy: DataFormatter(res.data.closedBy),
        creationTime: DataFormatter(res.data.creationTime),
        severity: DataFormatter(res.data.severity),
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
    loadAlertDetails();
  }, []);

  return (
    <div className="case-details-container">
      {loading ? (
        <Loading />
      ) : (
        <Form className="form-container-style">
          <div className="inputs-container">
            <FormGroup className="row-container-form-style">
              <div className="form-label-input-container">
                <Label>Name</Label>
                <Label className="form-data-lbl-style">{formData.name}</Label>
              </div>
              <div className="form-label-input-container">
                <Label>Description</Label>
                <Label className="form-data-lbl-style">
                  {formData.description}
                </Label>
              </div>
              <div className="form-label-input-container">
                <Label>Status</Label>
                <Label className="form-data-lbl-style">{formData.status}</Label>
              </div>
            </FormGroup>
            <FormGroup className="row-container-form-style">
              <div className="form-label-input-container">
                <Label>Created By</Label>
                <Label className="form-data-lbl-style">
                  {formData.createdBy}
                </Label>
              </div>
              <div className="form-label-input-container">
                <Label>Closed Time</Label>
                <Label className="form-data-lbl-style">
                  {formData.closedTime}
                </Label>
              </div>
              <div className="form-label-input-container">
                <Label>Closed By</Label>
                <Label className="form-data-lbl-style">
                  {formData.closedBy}
                </Label>
              </div>
            </FormGroup>
            <FormGroup className="row-container-form-style">
              <div className="form-label-input-container">
                <Label>Creation Time</Label>
                <Label className="form-data-lbl-style">
                  {formData.creationTime}
                </Label>
              </div>
              <div className="form-label-input-container">
                <Label>Severity</Label>
                <Label className="form-data-lbl-style">
                  {formData.severity}
                </Label>
              </div>
              <div className="form-label-input-container">
                <Label></Label>
                <Label className="form-data-lbl-style"></Label>
              </div>
            </FormGroup>
          </div>
          <div className="form-btn-container-style">
            <Button
              className="form-back-btn-style"
              onClick={() => {
                router("/Cases");
              }}
            >
              Back
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default CaseDetails;

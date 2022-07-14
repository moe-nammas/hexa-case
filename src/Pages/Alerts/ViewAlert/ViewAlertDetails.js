import React, { useState, useEffect } from "react";
import "./ViewAlertDetails.scss";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertsApi } from "../../../Api/AxiosApi";
import { DataFormatter } from "../../../Helpers/DataFormatter";
import Loading from "../../../Components/Loading/Loading";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions/index";

const ViewAlertDetails = () => {
  const { state } = useLocation();
  const router = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    timeStamp: "",
    ruleName: "",
    description: "",
    severity: "",
    score: "",
    agent: "",
    category: "",
    eventCode: "",
    process: "",
    action: "",
    outcome: "",
    username: "",
    hostIp: "",
    destinationIp: "",
    relatedUser: "",
  });

  const loadAlertDetails = async () => {
    try {
      setLoading(true);
      const res = await AlertsApi.getAlertDetails(state);
      setFormData({
        timeStamp: DataFormatter(res.data.timeStamp),
        ruleName: DataFormatter(res.data.ruleName),
        description: DataFormatter(res.data.description),
        severity: DataFormatter(res.data.severity),
        score: DataFormatter(res.data.score),
        agent: DataFormatter(res.data.agent),
        category: DataFormatter(res.data.category),
        eventCode: DataFormatter(res.data.eventCode),
        process: DataFormatter(res.data.process),
        action: DataFormatter(res.data.action),
        outcome: DataFormatter(res.data.outcome),
        username: DataFormatter(res.data.username),
        hostIp: DataFormatter(res.data.hostIp),
        destinationIp: DataFormatter(res.data.destinationIp),
        relatedUser: DataFormatter(res.data.relatedUser),
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong! Please try again later");
    }
  };

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Alert Details" }));
    loadAlertDetails();
  }, []);

  return (
    <div className="view-alert-container">
      {loading ? (
        <Loading />
      ) : (
        <Form className="form-container-style">
          <div className="inputs-container">
            <FormGroup className="row-container-form-style">
              <div className="form-label-input-container">
                <Label>Time Stamp</Label>
                <Label className="form-data-lbl-style">
                  {formData.timeStamp}
                </Label>
              </div>
              <div className="form-label-input-container">
                <Label>Rule Name</Label>
                <Label className="form-data-lbl-style">
                  {formData.ruleName}
                </Label>
              </div>
              <div className="form-label-input-container">
                <Label>Description</Label>
                <Label className="form-data-lbl-style">
                  {formData.description}
                </Label>
              </div>
            </FormGroup>
            <FormGroup className="row-container-form-style">
              <div className="form-label-input-container">
                <Label>Severity</Label>
                <Label className="form-data-lbl-style">
                  {formData.severity}
                </Label>
              </div>
              <div className="form-label-input-container">
                <Label>Score</Label>
                <Label className="form-data-lbl-style">{formData.score}</Label>
              </div>
              <div className="form-label-input-container">
                <Label>Agent</Label>
                <Label className="form-data-lbl-style">{formData.agent}</Label>
              </div>
            </FormGroup>
            <FormGroup className="row-container-form-style">
              <div className="form-label-input-container">
                <Label>Category</Label>
                <Label className="form-data-lbl-style">
                  {formData.category}
                </Label>
              </div>
              <div className="form-label-input-container">
                <Label>Event Code</Label>
                <Label className="form-data-lbl-style">
                  {formData.eventCode}
                </Label>
              </div>
              <div className="form-label-input-container">
                <Label>Process</Label>
                <Label className="form-data-lbl-style">
                  {formData.process}
                </Label>
              </div>
            </FormGroup>
            <FormGroup className="row-container-form-style">
              <div className="form-label-input-container">
                <Label>Action</Label>
                <Label className="form-data-lbl-style">{formData.action}</Label>
              </div>
              <div className="form-label-input-container">
                <Label>Username</Label>
                <Label className="form-data-lbl-style">
                  {formData.username}
                </Label>
              </div>
              <div className="form-label-input-container">
                <Label>Related Users</Label>
                <Label className="form-data-lbl-style">
                  {formData.relatedUser}
                </Label>
              </div>
            </FormGroup>
            <FormGroup className="row-container-form-style">
              <div className="form-label-input-container">
                <Label>Host IPs</Label>
                <Label className="form-data-lbl-style">{formData.hostIp}</Label>
              </div>
            </FormGroup>
            <FormGroup className="row-container-form-style">
              <div className="form-label-input-container">
                <Label>Destination IPs</Label>
                <Label className="form-data-lbl-style">
                  {formData.destinationIp}
                </Label>
              </div>
            </FormGroup>
          </div>
          <div className="form-btn-container-style">
            <Button
              className="form-back-btn-style"
              onClick={() => {
                router("/Alerts");
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

export default ViewAlertDetails;

import React, { useState, useEffect } from "react";
import "./CaseSettings.scss";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions";

const CaseSettings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Case Settings" }));
  }, []);

  return <div className="case-settings-container">CaseSetting</div>;
};

export default CaseSettings;

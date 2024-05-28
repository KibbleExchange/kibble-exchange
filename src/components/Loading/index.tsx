import React from "react";
import "./style.css";
import { RiLoader2Line } from "react-icons/ri";

interface LoadingProps {
  status: boolean;
  content: string;
}

const Loading: React.FC<LoadingProps> = ({ status, content }: any) => {
  if (status) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" style={{ display: 'flex'}}>
          <span className="btn-bsc-icon-loading">
            <RiLoader2Line size={20} />
          </span>
          <span>{content}</span>
        </div>
      </div>
    );
  } else {
    return content;
  }
};

export default Loading;

import React from "react";
import { useAlert } from "../hooks/useAlert";
import { CheckCircle2, AlertCircle } from "lucide-react";

const Alert: React.FC = () => {
  const { alert } = useAlert();

  if (!alert) return null;

  const isSuccess = alert.type === "success";
  const isError = alert.type === "error";

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        minWidth: 250,
        padding: "12px 20px",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        backgroundColor: isSuccess ? "#d4edda" : isError ? "#f8d7da" : "#cce5ff",
        color: isSuccess ? "#155724" : isError ? "#721c24" : "#004085",
        fontWeight: "600",
        zIndex: 9999,
      }}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <span style={{ marginRight: 12 }}>
        {isSuccess && <CheckCircle2 color="#155724" size={24} />}
        {isError && <AlertCircle color="#721c24" size={24} />}
        {!isSuccess && !isError && (
          <CheckCircle2 color="#004085" size={24} />
        )}
      </span>
      <span>{alert.message}</span>
    </div>
  );
};

export default Alert;

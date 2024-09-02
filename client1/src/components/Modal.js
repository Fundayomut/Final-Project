import React from "react";
import "./Modal.css";

// Modal-Komponente, die ein modales Fenster darstellt
const Modal = ({ show, onClose, children, className = "" }) => {
  // Wenn 'show' auf false gesetzt ist, wird nichts gerendert
  if (!show) return null;

  return (
    <div className="modal-overlay">
      {" "}
      {/* Überlagerungshintergrund für das Modal */}
      <div className={`modal-content ${className}`}>
        {" "}
        {/* Hauptinhalt des Modals, optional mit zusätzlicher Klasse */}
        <button className="modal-close" onClick={onClose}>
          X
        </button>{" "}
        {/* Schaltfläche zum Schließen des Modals */}
        {children} {/* Inhalte des Modals */}
      </div>
    </div>
  );
};

export default Modal;

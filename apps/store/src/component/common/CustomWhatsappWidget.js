import React, { useState } from "react";

const CustomWhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const phoneNumber = "8801712652107";
  const message = "Hello! I need help.";

  return (
    <div className="whatsapp-chat">
      <button
        onClick={toggleChat}
        className="floating-whatsapp-button bottom-[80px] lg:bottom-[20px]"
        style={{
          position: "fixed",
          right: "20px",
          backgroundColor: "#FFF",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 50,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <img
          src="/whatsapp.png"
          alt="WhatsApp"
          style={{ width: "60px", height: "60px" }}
        />
      </button>

      {isOpen && (
        <div
          className="chat-popup"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "320px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "15px",
            zIndex: 50,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <p>Need help? Chat with us on WhatsApp!</p>
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              message
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#25D366", textDecoration: "none" }}
          >
            Start Chat
          </a>
        </div>
      )}
    </div>
  );
};

export default CustomWhatsAppChat;

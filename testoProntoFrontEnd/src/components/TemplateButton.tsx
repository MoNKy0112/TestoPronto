import '@assets/stylesheets/TemplateButton.css';
import React from 'react';
import { useState } from 'react';


interface TemplateButtonProps {
  title: string;
  text: string;
  onClick: () => void;
  className?: string;
}

const TemplateButton: React.FC<TemplateButtonProps> = ({ title, text, onClick, className }) => {

  const [showTooltip, setShowTooltip] = useState(false);
  let timer: NodeJS.Timeout;

  const handleMouseEnter = () => {
    // Esperar 1 segundo (1000 ms) antes de mostrar el tooltip
    timer = setTimeout(() => {
      setShowTooltip(true);
    }, 800);
  };

  const handleMouseLeave = () => {
    // Cancelar el timer si el mouse se va antes de 1 segundo
    clearTimeout(timer);
    setShowTooltip(false); // Ocultar el tooltip cuando el mouse salga
  };

  return (
    <>
      <div className="tooltip-container">
        <button
          onClick={onClick}
          className={className}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {title}
        </button>

        {
          showTooltip && (
            <div className="tooltip">
              {text}
            </div>
          )
        }

      </div>
    </>

  );
};

export default TemplateButton;

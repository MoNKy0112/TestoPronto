import React from 'react';

interface TemplateButtonProps {
  text: string;
  onClick: () => void;
}

const TemplateButton: React.FC<TemplateButtonProps> = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
};

export default TemplateButton;

import React from 'react';

interface TemplateButtonProps {
  text: string;
  onClick: () => void;
  className?:string;
}

const TemplateButton: React.FC<TemplateButtonProps> = ({ text, onClick ,className }) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
};

export default TemplateButton;

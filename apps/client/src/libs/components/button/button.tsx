import './style.scss';

const Button: React.FC<{
  type?: 'submit' | 'button';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}> = ({ type = 'button', onClick, disabled, children }) => {
  return (
    <button
      className="button"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export { Button };

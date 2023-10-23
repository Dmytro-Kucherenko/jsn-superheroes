import CloseIcon from '../../../assets/icons/close.svg';
import './style.scss';

const RemoveCover: React.FC<{
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ disabled, onClick, children }) => {
  return (
    <div className={`remove-container`}>
      {children}
      {!disabled && (
        <button className="remove-cover" type="button" onClick={onClick}>
          <img src={CloseIcon} height="16px" width="16px" alt="Remove icon" />
        </button>
      )}
    </div>
  );
};

export { RemoveCover };

import CloseIcon from '../../../assets/icons/close.svg'
import './style.scss';

const RemoveCover: React.FC<{ onClick: () => void, children: React.ReactNode }> = ({ onClick, children }) => {
  return (
    <div className={`remove-container`}>
      {children}
      <button className='remove-cover' type='button' onClick={onClick}>
        <img src={CloseIcon} height='16px' width='16px' alt="Remove icon" />
      </button>
    </div>
  );
};

export { RemoveCover };

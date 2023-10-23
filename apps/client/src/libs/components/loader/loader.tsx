import './style.scss';

const Loader: React.FC = () => {
  return (
    <div className={`loader-container`}>
      <div className="ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export { Loader };

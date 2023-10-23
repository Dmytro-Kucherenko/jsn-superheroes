import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './style.scss';

const Toast: React.FC = () => {
  return <ToastContainer toastClassName="toast" />;
};

export { Toast };

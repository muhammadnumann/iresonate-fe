import { message } from 'antd';

interface WSMessageProps {
  type: 'success' | 'error' | 'info' | 'warning' | 'loading';
  messageValue: string;
  duration?: number;
  onClose?: () => void;
  className?: string
}

export const WSMessage = ({ type, messageValue, duration, onClose, className }: WSMessageProps) => {
  message.config({
    maxCount: 1,
  });
  switch (type) {
    case 'success':
      message.success(messageValue, duration, onClose);
      break;
    case 'loading':
      message.loading(messageValue);
      break;
    case 'error':
      message.error(messageValue);
      break;
    case 'warning':
      message.warning(messageValue);
      break;
    case 'info':
      message.info(messageValue);
      break;
    default:
      return null;
  }
  return null;
};


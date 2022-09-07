import { Alert } from 'react-bootstrap';

const AlertBanner = ({
  message = 'An unexpected error ocurred. Please try again later.',
  variant = 'danger',
}) => {
  return (
    <Alert variant={variant} style={{ backgroundColor: 'red' }}>
      {message}
    </Alert>
  );
};
export default AlertBanner;

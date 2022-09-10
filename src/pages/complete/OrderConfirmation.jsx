import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { apiOrigin } from '../../constant';
import { useOrderDetails } from '../../context/OrderDetails';
import AlertBanner from '../common/AlertBanner';

const OrderConfirmation = ({ goToNextPage }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axios
      .post(`${apiOrigin}/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        setHasError(true);
      });
  }, []);

  const handleClick = () => {
    resetOrder();
    goToNextPage();
  };

  if (hasError) {
    return <AlertBanner />;
  }
  if (orderNumber === null) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Thank you!</h1>
      <p>Your order number is {orderNumber}</p>
      <p style={{ fontSize: '25%' }}>
        as per out terms and conditions, nothing will happen now.
      </p>
      <Button onClick={handleClick}>Create new order</Button>
    </div>
  );
};

export default OrderConfirmation;

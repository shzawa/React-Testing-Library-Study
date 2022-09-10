import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../context/OrderDetails';
import Options from './Options';

const OrderEntry = ({ goToNextPage }) => {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={goToNextPage}>Order Sundae!</Button>
    </div>
  );
};
export default OrderEntry;

import { useOrderDetails } from '../../context/OrderDetails';
import SummaryForm from './SummaryForm';

const OrderSummary = ({ goToNextPage }) => {
  const [orderDetails] = useOrderDetails();

  const scoopList = Array.from(orderDetails.scoops.entries()).map(
    ([key, value]) => (
      <li key={key}>
        {value} {key}
      </li>
    )
  );

  const toppingList = Array.from(orderDetails.toppings.entries()).map(
    ([key, value]) => (
      <li key={key}>
        {value} {key}
      </li>
    )
  );

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm goToNextPage={goToNextPage} />
    </div>
  );
};

export default OrderSummary;

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

  const hasToppings = orderDetails.toppings.size > 0;
  let toppingsDisplay = <></>;
  if (hasToppings) {
    const toppingList = Array.from(orderDetails.toppings.entries()).map(
      ([key, value]) => (
        <li key={key}>
          {value} {key}
        </li>
      )
    );
    toppingsDisplay = (
      <>
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm goToNextPage={goToNextPage} />
    </div>
  );
};

export default OrderSummary;

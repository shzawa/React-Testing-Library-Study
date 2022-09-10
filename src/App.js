import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './context/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/complete/OrderConfirmation';

function App() {
  // inProgress -> review -> complete -> inProgress -> ...
  const [orderPhase, setOrderPhase] = useState('inProgress');

  return (
    <Container>
      <OrderDetailsProvider>
        {orderPhase === 'inProgress' && (
          <OrderEntry
            goToNextPage={() => {
              setOrderPhase('review');
            }}
          />
        )}
        {orderPhase === 'review' && (
          <OrderSummary
            goToNextPage={() => {
              setOrderPhase('complete');
            }}
          />
        )}
        {orderPhase === 'complete' && (
          <OrderConfirmation
            goToNextPage={() => {
              setOrderPhase('inProgress');
            }}
          />
        )}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;

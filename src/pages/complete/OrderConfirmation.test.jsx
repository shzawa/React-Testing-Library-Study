import { rest } from 'msw';
import { apiOrigin } from '../../constant';
import { server } from '../../mocks/server';
import { render, screen } from '../../test-utils/testing-library-utils';
import OrderConfirmation from './OrderConfirmation';

test('handles error', async () => {
  server.resetHandlers(
    rest.post(`${apiOrigin}/order`, (req, res, ctx) => res(ctx.status(500)))
  );

  render(<OrderConfirmation goToNextPage={jest.fn()} />);

  const alert = await screen.findByRole('alert');
  expect(alert).toBeInTheDocument();
});

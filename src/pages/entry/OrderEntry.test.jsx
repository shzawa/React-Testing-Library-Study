import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import OrderEntry from './OrderEntry';
import { server } from '../../mocks/server';
import { apiOrigin } from '../../constant';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get(`${apiOrigin}/scoops`, (req, res, ctx) => res(ctx.status(500))),
    rest.get(`${apiOrigin}/toppings`, (req, res, ctx) => res(ctx.status(500)))
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});
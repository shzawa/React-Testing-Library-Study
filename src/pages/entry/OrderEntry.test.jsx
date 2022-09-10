import { rest } from 'msw';
import OrderEntry from './OrderEntry';
import { server } from '../../mocks/server';
import { apiOrigin } from '../../constant';
import { render, screen } from '../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get(`${apiOrigin}/scoops`, (req, res, ctx) => res(ctx.status(500))),
    rest.get(`${apiOrigin}/toppings`, (req, res, ctx) => res(ctx.status(500)))
  );

  render(<OrderEntry goToNextPage={jest.fn()} />);

  const alerts = await screen.findAllByRole('alert');
  expect(alerts).toHaveLength(2);
});

test('アイスクリームが未選択の場合、注文ボタンが非活性になっている', async () => {
  render(<OrderEntry goToNextPage={jest.fn()} />);

  const orderButton = screen.getByRole('button', /order Sundae/i);
  expect(orderButton).toBeDisabled();

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(orderButton).toBeEnabled();

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '0');
  expect(orderButton).toBeDisabled();
});

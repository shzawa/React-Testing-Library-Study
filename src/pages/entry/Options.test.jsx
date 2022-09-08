import { OrderDetailsProvider } from '../../context/OrderDetails';
import { render, screen } from '../../test-utils/testing-library-utils';
import Options from './Options';

test('displays image from each scoop option from server', async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altTexts = scoopImages.map((element) => element.alt);
  expect(altTexts).toStrictEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image from each topping option from server', async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

  const toppingImages = await screen.findAllByRole('img', {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altTexts = toppingImages.map((element) => element.alt);
  expect(altTexts).toStrictEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});

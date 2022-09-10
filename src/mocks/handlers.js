import { rest } from 'msw';
import { apiOrigin } from '../constant';

const handlers = [
  rest.get(`${apiOrigin}/scoops`, (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    );
  }),
  rest.get(`${apiOrigin}/toppings`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'Cherries',
          imagePath: '/images/cherries.png',
        },
        {
          name: 'M&Ms',
          imagePath: '/images/m-and-ms.png',
        },
        {
          name: 'Hot fudge',
          imagePath: '/images/hot-fudge.png',
        },
      ])
    );
  }),
  rest.post(`${apiOrigin}/order`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ orderNumber: 6235006122 }));
  }),
];
export default handlers;

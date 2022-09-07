import { rest } from 'msw';

const apiOrigin = process.env.REACT_APP_API_ORIGIN || 'http://localhost:3030';

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
];
export default handlers;

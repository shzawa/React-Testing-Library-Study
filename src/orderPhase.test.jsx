import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('order phases for happy path', async () => {
  render(<App />);

  // アイスクリームとトッピングを追加する
  // scoops と toppings の Input 要素は、それぞれ別の API をコールした後に描画されるため、
  // 要素ごとに API のコール結果を非同期的に待ち受ける
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  userEvent.click(cherriesCheckbox);

  // 注文ボタンをクリック -> 注文確認画面に切り替え
  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  userEvent.click(orderButton);

  // 同意事項に承諾し、注文確認ボタンをクリック
  const tcCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);

  const orderConfirmButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(orderConfirmButton);

  // loading 要素が表示される
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // 注文確認画面にて注文番号を確認する。
  // API コールが発生するため非同期的に待ち受ける
  const orderNumber = await screen.findByText(/your order number is /i);
  expect(orderNumber).toHaveTextContent('6235006122');

  // loading 要素が非表示になっている
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  // 注文確認画面にて注文するボタンをクリック
  const newOrderButton = screen.getByRole('button', {
    name: /new order/i,
  });
  userEvent.click(newOrderButton);

  // アイスとトッピングの小計がリセットされていることを検証する
  const scoopsSubtotal = screen.getByText('Scoops total: $', {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent('0.00');
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // テスト終了後にアプリが更新され、以下のようなエラーが発生するのを回避するため、
  // scoops と toppings の各 API コールの結果を非同期的に待ち受ける
  //  エラー文: `Warning: An update to Options inside a test was not wrapped in act(...).`
  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});

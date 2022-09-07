import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import SummaryForm from './SummaryForm';
import userEvent from '@testing-library/user-event';

test('初回描画時', () => {
  render(<SummaryForm />);

  const submitButton = screen.getByRole('button', { name: 'Confirm order' });
  expect(submitButton).toBeDisabled();

  const confirmCheckbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  expect(confirmCheckbox).not.toBeChecked();
});

test('checkboxをクリックで注文ボタンを無効化/有効化', () => {
  render(<SummaryForm />);

  const submitButton = screen.getByRole('button', { name: 'Confirm order' });
  const confirmCheckbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });

  // checkbox 初回クリック: 注文ボタン有効化
  userEvent.click(confirmCheckbox);
  expect(submitButton).toBeEnabled();

  // checkbox 2回目クリック: 注文ボタン無効化
  userEvent.click(confirmCheckbox);
  expect(submitButton).toBeDisabled();
});

test('checkboxのラベルをホバーしてポップアップを表示/非表示', async () => {
  render(<SummaryForm />);

  // 初期状態: ポップアップ非表示
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // ラベルをマウスオーバー: ポップアップ表示
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  // ここでは queryBy ではなく getBy を使う理由
  //  -> 表示されない(異常) = Error が throw されることで異常に気づける = テストが読みやすくなる
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // ラベルのマウスオーバー解除: ポップアップ非表示
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});

import { fireEvent, render, screen } from '@testing-library/react';
import SummaryForm from './SummaryForm';

test('初回描画時', () => {
  render(<SummaryForm />);

  const submitButton = screen.getByRole('button', { name: '注文する' });
  expect(submitButton).toBeDisabled();

  const confirmCheckbox = screen.getByRole('checkbox', {
    name: '利用規約に同意しました',
  });
  expect(confirmCheckbox).not.toBeChecked();
});

test('checkbox 2回クリックでボタンを無効化/有効化', () => {
  render(<SummaryForm />);

  const submitButton = screen.getByRole('button', { name: '注文する' });
  const confirmCheckbox = screen.getByRole('checkbox', {
    name: '利用規約に同意しました',
  });

  // checkbox 初回クリック: 注文ボタン有効化
  fireEvent.click(confirmCheckbox);
  expect(submitButton).toBeEnabled();

  // checkbox 2回目クリック: 注文ボタン無効化
  fireEvent.click(confirmCheckbox);
  expect(submitButton).toBeDisabled();
});

import { render, screen } from '../../test-utils/testing-library-utils';
import ScoopOption from './ScoopOption';
import userEvent from '@testing-library/user-event';

test('アイスクリームの個数に無効な値が入力されている場合、入力ボックスがエラー状態になる', async () => {
  const updateItemCountMock = jest.fn();

  render(
    <ScoopOption name="" imagePath="" updateItemCount={updateItemCountMock} />
  );

  const input = screen.getByRole('spinbutton');

  userEvent.clear(input);
  userEvent.type(input, '11');
  expect(input).toHaveClass('is-invalid');
  // `11` は `1` `1` として、一文字ずつ入力される。
  // updateItemCount は最初の `1` 入力時に呼び出される。
  expect(updateItemCountMock).toBeCalledTimes(1);
  updateItemCountMock.mockReset();

  userEvent.clear(input);
  userEvent.type(input, '-1');
  expect(input).toHaveClass('is-invalid');
  expect(updateItemCountMock).not.toBeCalled();
  updateItemCountMock.mockReset();

  userEvent.clear(input);
  userEvent.type(input, '.1');
  expect(input).toHaveClass('is-invalid');
  expect(updateItemCountMock).not.toBeCalled();
  updateItemCountMock.mockReset();

  userEvent.clear(input);
  userEvent.type(input, '3');
  expect(input).not.toHaveClass('is-invalid');
  expect(updateItemCountMock).toBeCalled();
});

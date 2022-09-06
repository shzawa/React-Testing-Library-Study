import { useState } from 'react';

const SummaryForm = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <div>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        aria-checked={disabled}
        onChange={() => setDisabled((disabled) => !disabled)}
      />
      <label htmlFor="disable-button-checkbox">利用規約に同意しました</label>
      <button disabled={disabled}>注文する</button>
    </div>
  );
};

export default SummaryForm;

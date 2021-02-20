const CurrencyInput = (props) => {
  const {
    currencyLabels,
    currentCurrency,
    handleChangeCurrency,
    amount,
    handleChangeAmount,
  } = props;

  return (
    <>
      <input type="number" value={amount} onChange={handleChangeAmount} />
      <select name="fromCurrency" value={currentCurrency} onChange={handleChangeCurrency}>
        {currencyLabels.map((label) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
};

export default CurrencyInput;

import classes from "./CurrencyInput.module.css";
const CurrencyInput = (props) => {
  const {
    currencyLabels,
    currentCurrency,
    handleChangeCurrency,
    amount,
    handleChangeAmount,
  } = props;

  return (
    <div>
      <input
        className={classes.input}
        type="number"
        value={amount}
        onChange={handleChangeAmount}
      />
      <select
        className={classes.select}
        name="fromCurrency"
        value={currentCurrency}
        onChange={handleChangeCurrency}
      >
        {currencyLabels.map((label) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyInput;

import { useEffect, useState } from "react";
import "./App.css";
import CurrencyInput from "./componentes/CurrencyInput/CurrencyInput";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyLabels, setCurrencyLabels] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [isFromCurrentInput, setIsFromCurrentInput] = useState(true);
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(1);

  let fromAmount, toAmount;
  if (isFromCurrentInput) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    fromAmount = amount / exchangeRate;
    toAmount = amount;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((res) => {
        const labels = [res.base, ...Object.keys(res.rates)];
        setCurrencyLabels(labels);
        setFromCurrency(labels[0]);
        setToCurrency(labels[1]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null)
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((res) => setExchangeRate(res.rates[toCurrency]));
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setIsFromCurrentInput(true);
  };

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setIsFromCurrentInput(false);
  };

  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyInput
        currencyLabels={currencyLabels}
        currentCurrency={fromCurrency}
        handleChangeCurrency={(e) => setFromCurrency(e.target.value)}
        handleChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      =
      <CurrencyInput
        currencyLabels={currencyLabels}
        currentCurrency={toCurrency}
        handleChangeCurrency={(e) => setToCurrency(e.target.value)}
        handleChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default App;

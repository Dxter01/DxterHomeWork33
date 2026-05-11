const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const convertButton = document.getElementById("convert");
const resultParagraph = document.getElementById("result");

convertButton.addEventListener("click", async () => {
  const amount = parseFloat(amountInput.value);
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;

  if (isNaN(amount)) {
    resultParagraph.textContent = "Please enter a valid amount.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
    );
    const data = await response.json();
    const rate = data.rates[toCurrency];

    if (!rate) {
      resultParagraph.textContent = "Conversion rate not available.";
      return;
    }

    const convertedAmount = (amount * rate).toFixed(2);
    resultParagraph.textContent = `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}.`;
  } catch (error) {
    resultParagraph.textContent =
      "Error fetching conversion rate. Please try again later.";
  }
});

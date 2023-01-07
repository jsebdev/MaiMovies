class CurrencyFormatter {
  // constructor() {
  //   this.formatter = new Intl.NumberFormat({
  //     style: "currency",
  //     currency: "USD",
  //     minimumFractionDigits: 3,
  //   });
  // }

  format(value) {
    const valueCurrency = `$${value
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    // return valueCurrency.substring(0, valueCurrency.length - 3);
    return valueCurrency;
  }
}

export const currencyFormatter = new CurrencyFormatter();

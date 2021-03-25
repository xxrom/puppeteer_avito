const cleanToInt = (intStr, removeChar) => intStr.replace(removeChar, "").replace(/ /i, "");

export const convertPriceToInt = (priceStr) => {
  const cleanPrice = cleanToInt(priceStr, "₽");
  const priceInt = Number(cleanPrice);

  return priceInt;
}

export const convertIdToInt = (idStr) => {
  const cleanPrice = cleanToInt(idStr, "i");
  const priceInt = Number(cleanPrice);

  return priceInt;
}

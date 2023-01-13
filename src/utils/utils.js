// import { subMinutes, subSeconds } from "date-fns/esm";
import { VOTE_COLORS, VOTE_COLORS_VALUES } from "./constants";

/**
 * This function returns a color according to index between startColor and endColor.
 * if index is startIndex, it will return startColor
 * if index is endIndex, it will return endColor
 * the colors are objects with keys r,g,b from 0 to 255
 * @param {Number} value
 * @param {Array[Number]} values
 * @param {Array[Object]} colors
 */
export const getColorFromSpectrum = (value, values, colors) => {
  if (values.length !== colors.length)
    throw new Error("indices.length must be equal to colors.length");
  if (value <= values[0]) {
    return colors[0];
  }
  if (value >= values[values.length - 1]) {
    return colors[colors.length - 1];
  }

  let startIndex;
  for (let i = 0; i < values.length; i++) {
    if (value < values[i]) {
      startIndex = i - 1;
      break;
    }
  }

  const valueSpectrum = values[startIndex + 1] - values[startIndex];
  const startValue = value - values[startIndex];
  const startColor = colors[startIndex];
  const endColor = colors[startIndex + 1];

  const color = {
    r: ponder(startColor.r, endColor.r, startValue, valueSpectrum),
    g: ponder(startColor.g, endColor.g, startValue, valueSpectrum),
    b: ponder(startColor.b, endColor.b, startValue, valueSpectrum),
  };
  return color;
};

const ponder = (start, end, value, rangeLength) => {
  return start + ((end - start) * value) / rangeLength;
};

export const rgbColor2rgbString = ({ r, g, b }) => `rgb(${r},${g},${b})`;

export const getReadableListOfItems = (items, key = null) => {
  if (items.length === 0) return;
  if (items.length === 1) return getItemKey(items[0], key);
  const lastItem = items[items.length - 1];
  const list =
    items
      .slice(0, items.length - 1)
      .map((item) => getItemKey(item, key))
      .join(", ") + ` and ${getItemKey(lastItem, key)}`;
  return list;
};

const getItemKey = (item, key) => {
  if (!key) return item;
  return item[key];
};

export const getVoteColor = (vote) =>
  rgbColor2rgbString(
    getColorFromSpectrum(vote, VOTE_COLORS_VALUES, VOTE_COLORS)
  );

export const parseStringToDate = (str) => {
  const newStr = str.replace(" UTC", "Z").trim().replace(" ", "T");
  const date = new Date(newStr);
  // return subSeconds(subMinutes(date, 59), 10);
  return date;
};

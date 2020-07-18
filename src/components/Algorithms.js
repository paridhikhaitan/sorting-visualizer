import { array } from "prop-types";

export const mergeSort = () => {
  console.log("MERGE SORT");
};

export const quickSort = () => {
  console.log("QUICK SORT");
};

/*
Checks two corresponding elements, and swaps them in the correct position
Runtime : O(n^2)
*/
export const bubbleSort = array_values => {
  const animations_array = [];

  for (let i = 0; i < array_values.length; i++) {
    for (let j = 0; j < array_values.length - i - 1; j++) {
      const animation = {};
      animation.compare = [j, j+1]
      if (array_values[j] > array_values[j + 1]) {
        var temp = array_values[j + 1];
        array_values[j + 1] = array_values[j];
        array_values[j] = temp;
        animation.swap = [j, j+1]
      } else {
          animation.swap = [-1, -1]
      }
      animations_array.push(animation)
    }
  }
  return [array_values, animations_array];
};

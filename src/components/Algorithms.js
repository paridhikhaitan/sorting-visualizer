import { array } from "prop-types";

export const mergeSort = () => {
  console.log("MERGE SORT");
};

export const quickSort = () => {
  console.log("QUICK SORT");
};

// export const bogoSort = array_values => {
//   console.log("BOGO SORT");
//   const animations_array = [];

//   const len = array_values.length;

//   const bogoHelperSorted = array_values => {
  //   for (let i = 0; i < len-1; i++) {
  //     if (array_values[i] > array_values[i+1]){
  //       return false
  //     }
  //   }
  //   return true
  // };

  // const shuffle = array_values => {
  //   for (let i = 0; i < len; i++) {
  //     var random_number = Math.floor(Math.random(len));
  //     var temp = array_values[random_number];
  //     array_values[random_number] = array_values[i];
  //     array_values[i] = temp;
  //   }
  //   console.log(array_values)
  //   return array_values;
  // };

  // while (bogoHelperSorted(array_values) === false) {
  //   animations_array.push(shuffle(array_values));
  // }

  // return animations_array;
// };

/*
Checks two corresponding elements, and swaps them in the correct position
Runtime : O(n^2)
*/
export const bubbleSort = array_values => {
  const animations_array = [];

  for (let i = 0; i < array_values.length; i++) {
    for (let j = 0; j < array_values.length - i - 1; j++) {
      const animation = {};
      animation.compare = [j, j + 1];
      if (array_values[j] > array_values[j + 1]) {
        var temp = array_values[j + 1];
        array_values[j + 1] = array_values[j];
        array_values[j] = temp;
        animation.swap = [j, j + 1];
      } else {
        animation.swap = [-1, -1];
      }
      animations_array.push(animation);
    }
  }
  return [array_values, animations_array];
};

export const insertionSort = array_values => {
  //shift all the elements to their corrent position to the left
  const animations_array = [];

  for (let i = 1; i < array_values.length; i++) {
    var j = i;
    if (array_values[j - 1] < array_values[j]) {
      var animation = {};
      animation.compare = [j - 1, j];
      animation.swap = [-1, -1];
      animations_array.push(animation);
      continue;
    }
    while (j > 0 && array_values[j - 1] > array_values[j]) {
      var animation = {};
      var temp = array_values[j - 1];
      array_values[j - 1] = array_values[j];
      array_values[j] = temp;
      animation.compare = [j - 1, j];
      animation.swap = [j - 1, j];
      animations_array.push(animation);
      j--;
    }

    //Another animation to show that we're comparing the two sorted values
    if (j > 0) {
      var animation = {};
      animation.compare = [j - 1, j];
      animation.swap = [-1, -1];
      animations_array.push(animation);
    }
  }

  return animations_array;
};

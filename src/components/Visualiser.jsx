import React from "react";
import "./Visualiser.scss";
import {
  mergeSort,
  quickSort,
  bubbleSort,
  insertionSort,
  bogoSort
} from "./Algorithms";

/*
Customisations : 
1. Pick the color they want the visualisation in 
2. Compare sorting algorithms (give option of 2)
3. Visualise sorting based on lightest to darkest
*/

class Visualiser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_values: [],
      len_all_values: 10,
      bar_color: "#f1c5c5",
      swap_color: "#faf0af",
      consider_color: "#8bcdcd",
      speed: 100
    };
    this.generateRandomArray = this.generateRandomArray.bind(this);
    this.animateSorting = this.animateSorting.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
    this.heapSort = this.heapSort.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
    this.insertionSort = this.insertionSort.bind(this);
    this.bogoSort = this.bogoSort.bind(this);
    this.sleep = this.sleep.bind(this);
  }

  componentDidMount() {
    this.generateRandomArray(10, 500, false);
    //document.getElementById("pause").addEventListener("click", ()=>{alert("Hello World")})
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  generateRandomArray = (min_num, max_num, reversed) => {
    const value_bars = document.getElementsByClassName("value-container")[0];
    for (let child of value_bars.childNodes) {
      child.style.backgroundColor = this.state.bar_color;
    }

    this.setState({});
    const all_values = [];
    var min = Math.ceil(min_num);
    var max = Math.floor(max_num);
    //This is for completely random, I can also add something for almost sorted
    for (let i = 0; i < this.state.len_all_values; i++) {
      var num;
      if (reversed === false) {
        num = Math.floor(Math.random() * (max - min)) + min;
      } else {
        // max = min + 10;
        min = max - 10;
        num = Math.floor(Math.random() * (max - min)) + min;
        max = num;
      }

      all_values.push(num);
    }

    if (reversed === true) {
      all_values.reverse();
    }
    this.setState({ all_values });
  };

  animateSorting = async animations => {
    const value_bars = document.getElementsByClassName("value-container")[0];
    var inversions = 0;

    for (let i = 0; i < animations.length; i++) {
      for (let child of value_bars.childNodes) {
        child.style.backgroundColor = this.state.bar_color;
      }
      var first = animations[i].compare[0];
      var second = animations[i].compare[1];

      value_bars.childNodes[
        first
      ].style.backgroundColor = this.state.consider_color;
      value_bars.childNodes[
        second
      ].style.backgroundColor = this.state.consider_color;

      await this.sleep(this.state.speed);

      first = animations[i].swap[0];
      second = animations[i].swap[1];

      if (first !== -1 && second !== -1) {
        inversions++;
        document.getElementById("inversions").innerHTML = inversions;
        var first_height = value_bars.childNodes[first].style.height;
        var second_height = value_bars.childNodes[second].style.height;

        value_bars.childNodes[
          first
        ].style.backgroundColor = this.state.swap_color;
        value_bars.childNodes[
          second
        ].style.backgroundColor = this.state.swap_color;
        await this.sleep(this.state.speed);
        // value_bars.childNodes[first].style.opacity = 0.002 * second_height;
        // value_bars.childNodes[second].style.opacity = 0.002 * first_height;
        value_bars.childNodes[first].style.height = second_height;
        value_bars.childNodes[second].style.height = first_height;

        await this.sleep(this.state.speed);
      }
    }

    for (let child of value_bars.childNodes) {
      child.style.backgroundColor = "#e5edb7";
      await this.sleep(this.state.speed);
    }

    return;
  };

  mergeSort = async () => {
    const start_time = new Date().getTime();
    const value_bars = document.getElementsByClassName("value-container")[0];
    const mergeHelper = async (arr, l, r) => {
      if (l < r) {
        var m = Math.floor(l + (r - l) / 2);
        console.log(m);
        await mergeHelper(arr, l, m);
        await mergeHelper(arr, m + 1, r);
        await merge(arr, l, m, r);
      }
    };
    const merge = async (arr, start, mid, end) => {
      var start2 = mid + 1;

      if (arr[mid] <= arr[start2]) {
        return;
      }

      while (start <= mid && start2 <= end) {
        if (arr[start] <= arr[start2]) {
          start += 1;
        } else {
          var value = arr[start2];
          var index = start2;

          while (index != start) {
            arr[index] = arr[index - 1];
            value_bars.childNodes[index].style.height =
              value_bars.childNodes[index - 1].style.height;
            value_bars.childNodes[
              index
            ].style.backgroundColor = this.state.consider_color;
            await this.sleep(this.state.speed);
            value_bars.childNodes[
              index
            ].style.backgroundColor = this.state.bar_color;
            index--;
          }

          arr[start] = value;
          value_bars.childNodes[start].style.height = `${value}px`;
          value_bars.childNodes[
            start
          ].style.backgroundColor = this.state.consider_color;
          await this.sleep(this.state.speed);
          value_bars.childNodes[
            start
          ].style.backgroundColor = this.state.bar_color;
          start++;
          mid++;
          start2++;
        }
      }
      console.log(arr);
      return;
    };

    await mergeHelper(
      this.state.all_values,
      0,
      this.state.all_values.length - 1
    );
    const end_time = new Date().getTime();
    alert((end_time - start_time) / 1000);
  };

  quickSort = () => {
    //Quick Sort
    quickSort();
  };

  bogoSort = async array_values => {
    const animations_array = [];
    const start_time = new Date().getTime();
    const value_bars = document.getElementsByClassName("value-container")[0];

    const len = array_values.length;
    const bogoHelperSorted = array_values => {
      for (let child of value_bars.childNodes) {
        child.style.backgroundColor = this.state.bar_color;
      }
      for (let i = 0; i < len - 1; i++) {
        if (array_values[i] > array_values[i + 1]) {
          return false;
        }
      }
      return true;
    };

    const shuffle = array_values => {
      for (let i = 0; i < len; i++) {
        var random_number = Math.floor(Math.random() * len);
        var temp = array_values[random_number];

        value_bars.childNodes[
          random_number
        ].style.backgroundColor = this.state.consider_color;
        array_values[random_number] = array_values[i];
        value_bars.childNodes[
          random_number
        ].style.height = `${array_values[i]}px`;

        value_bars.childNodes[
          i
        ].style.backgroundColor = this.state.consider_color;
        array_values[i] = temp;
        value_bars.childNodes[i].style.height = `${temp}px`;
      }
      return array_values;
    };

    while (bogoHelperSorted(array_values) === false) {
      await this.sleep(this.state.speed);
      shuffle(array_values);
      await this.sleep(this.state.speed);
    }

    const end_time = new Date().getTime();

    console.log((end_time - start_time) / 1000);
  };

  bubbleSort = () => {
    //Bubble Sort
    //console.log(bubbleSort(this.state.all_values))
    const [sorted_values, animations] = bubbleSort(this.state.all_values);
    this.animateSorting(animations);
  };

  heapSort = () => {
    //Selection Sort
  };

  insertionSort = async () => {
    //Insertion Sort
    const start_time = new Date().getTime();
    const animations = insertionSort(this.state.all_values);
    await this.animateSorting(animations);
    const end_time = new Date().getTime();
    alert((end_time - start_time) / 1000);
  };

  render() {
    return (
      <>
        <div className="button-container">
          <div className="array-buttons">
            <button
              onClick={() => {
                this.generateRandomArray(10, 500, false);
              }}
            >
              Generate Random Array
            </button>

            <button
              onClick={() => {
                this.generateRandomArray(400, 500, false);
              }}
            >
              Generate Almost Sorted Array
            </button>

            <button
              onClick={() => {
                this.generateRandomArray(10, 500, true);
              }}
            >
              Generate Reversed Array
            </button>
          </div>

          <div className="sorting-buttons">
            <button
              onClick={() => {
                this.mergeSort();
              }}
            >
              Merge Sort
            </button>
            <button
              onClick={() => {
                this.quickSort();
              }}
            >
              Quick Sort
            </button>
            <button
              onClick={() => {
                this.heapSort();
              }}
            >
              Heap Sort
            </button>
            <button
              onClick={() => {
                this.insertionSort();
              }}
            >
              Insertion Sort
            </button>
            <button
              onClick={() => {
                this.bubbleSort();
              }}
            >
              Bubble Sort
            </button>
            <button
              onClick={() => {
                this.bogoSort(this.state.all_values);
              }}
            >
              Bogo Sort
            </button>
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              Stop
            </button>
          </div>
        </div>
        <div className="value-container">
          {this.state.all_values.map((value, index) => {
            var height = value;
            // var opacity = 0.002 * value;
            //   var width = "2px"
            return (
              <div className="value-bar" key={index} style={{ height }}>
                {/* {value} : {index} */}
              </div>
            );
          })}
        </div>
        <div>
          <h2>
            Number of inversions : <span id="inversions">0</span>
          </h2>
        </div>
      </>
    );
  }
}

export default Visualiser;

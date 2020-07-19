import React from "react";
import "./Visualiser.scss";
import { mergeSort, quickSort, bubbleSort, insertionSort } from "./Algorithms";

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
      len_all_values: 100,
      bar_color: "#f1c5c5",
      swap_color: "#faf0af",
      consider_color: "#8bcdcd",
      speed: 1
    };
    this.generateRandomArray = this.generateRandomArray.bind(this);
    this.animateSorting = this.animateSorting.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
    this.heapSort = this.heapSort.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
    this.insertionSort = this.insertionSort.bind(this);
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
      child.style.backgroundColor = "#00badb";
    }
  };

  mergeSort = () => {
    //Merge Sort
    mergeSort();
  };

  quickSort = () => {
    //Quick Sort
    quickSort();
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

  insertionSort = () => {
    //Insertion Sort
    const animations = insertionSort(this.state.all_values);
    this.animateSorting(animations);
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

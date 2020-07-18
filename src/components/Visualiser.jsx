import React from "react";
import "./Visualiser.scss";
import { mergeSort, quickSort, bubbleSort } from "./Algorithms";

/*
Customisations : 
1. Pick the color they want the visualisation in 
2. Compare sorting algorithms (give option of 2)
*/

class Visualiser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_values: [],
      len_all_values: 100,
      bar_color: "#f1c5c5",
      swap_color: "#faf0af",
      consider_color: "#8bcdcd"
    };
    this.generateRandomArray = this.generateRandomArray.bind(this);
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

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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
        min = max - 10
        num = Math.floor(Math.random() * (max - min)) + min;
        max = num
      }

      all_values.push(num);
    }

    if (reversed === true) {
      all_values.reverse();
    }
    this.setState({ all_values });
  };

  mergeSort = () => {
    //Merge Sort
    mergeSort();
  };

  quickSort = () => {
    //Quick Sort
    quickSort();
  };

  bubbleSort = async () => {
    //Bubble Sort
    //console.log(bubbleSort(this.state.all_values))
    const [sorted_values, animations] = bubbleSort(this.state.all_values);

    const value_bars = document.getElementsByClassName("value-container")[0];

    const array = [];
    animations.forEach(element => {
      array.push(element.compare);
      array.push(element.swap);
    });

    console.log(array);

    for (let i = 0; i < array.length; i++) {
      setTimeout(() => {
        if (i % 2 === 0) {
          for (let child of value_bars.childNodes) {
            child.style.backgroundColor = this.state.bar_color;
          }
          var first = array[i][0];
          var second = array[i][1];

          value_bars.childNodes[
            first
          ].style.backgroundColor = this.state.consider_color;
          value_bars.childNodes[
            second
          ].style.backgroundColor = this.state.consider_color;
        } else {
          var first_swap = array[i][0];
          var second_swap = array[i][1];

          if (first_swap != -1 && second_swap != -1) {
            var first_height = value_bars.childNodes[first_swap].style.height;
            var second_height = value_bars.childNodes[second_swap].style.height;
            value_bars.childNodes[
              first_swap
            ].style.backgroundColor = this.state.swap_color;
            value_bars.childNodes[
              second_swap
            ].style.backgroundColor = this.state.swap_color;
            value_bars.childNodes[first_swap].style.height = second_height;
            value_bars.childNodes[second_swap].style.height = first_height;
          }
        }

      }, i * 10);
    }

    // for (let i = 0; i < animations.length; i++) {
    //   setTimeout(() => {
    //     for (let child of value_bars.childNodes) {
    //       child.style.backgroundColor = "pink";
    //     }
    //     var first = animations[i].compare[0];
    //     var second = animations[i].compare[1];
    //     value_bars.childNodes[first].style.backgroundColor = "blue";
    //     value_bars.childNodes[second].style.backgroundColor = "blue";
    //   }, i * 100);
    // }
  };

  heapSort = () => {
    //Selection Sort
  };

  insertionSort = () => {
    //Insertion Sort
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
                this.generateRandomArray(300, 500, false);
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
            //   var width = "2px"
            return (
              <div className="value-bar" key={index} style={{ height }}>
                {/* {value} : {index} */}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Visualiser;

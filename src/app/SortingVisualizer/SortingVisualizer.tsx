'use client'

import React, { useEffect, useState } from 'react';
import { arraysAreEqual, bubbleSort, getMergeSortAnimations, mergeSort, randomIntFromInterval } from '../utils/sortingAlgorithms';

const SortingVisualizer: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [animationSpeed, setAnimationSpeed] = useState<number>(1);

    const NUMBER_OF_ARRAY_BARS = 300;
    const PRIMARY_COLOR = 'blue';
    const SECONDARY_COLOR = 'red';

    type Animation = [number, number];

    useEffect(() => {
        generateRandomArray();
    }, []);

    const generateRandomArray = (size: number = NUMBER_OF_ARRAY_BARS, minValue: number = 5) => {
        const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * (500 - minValue)) + minValue);
        setArray(newArr);
    };

    const handleNewArray = () => {
        generateRandomArray();
    };

    //original merge sort, no animations
    const handleMergeSort = (event: React.MouseEvent<HTMLButtonElement>) => {
        const newArray = [...array];
        const sortedArray = mergeSort(newArray);
        setArray(sortedArray);
    };

    const mergeSort2 = () => {
        const animations: Animation[] = getMergeSortAnimations(array);
        
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>;
            const isColorChange: boolean = i % 3 !== 2;
    
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color: string = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
    
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * animationSpeed);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * animationSpeed);
            }
        }
    };
    
    
    

    const handleBubbleSort = () => {
        const newArray = [...array];
        const sortedArray = bubbleSort(newArray);
        setArray(sortedArray);
    };

    const testSortingAlgorithms = () => {
        const array = [];
        const bound = randomIntFromInterval(1, 1000);
        for (let i = 0; i < 100; i++) {
            const testArray = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));
            const mergeSortedArray = mergeSort(testArray);
            const bubbleSortedArray = bubbleSort(testArray);
            const jsSortedArray = testArray.slice().sort((a, b) => a - b);
            console.log(arraysAreEqual(mergeSortedArray, bubbleSortedArray, jsSortedArray));
        }
    };

    const maxHeight = Math.max(...array, 0);

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 h-screen">
            <div className="w-90vw max-w-4xl flex items-end justify-center p-4" style={{ height: `calc(${maxHeight}px + 10px)` }}>
                {array.map((value, idx) => (
                    <div
                        key={idx}
                        className={`array-bar mx-px`}
                        style={{ height: `${value}px`, minWidth: '3px', marginBottom: '10px', backgroundColor: PRIMARY_COLOR }}
                    ></div>
                ))}
            </div>
            <div className="mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                    onClick={handleNewArray}
                >
                    New Array
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
                    onClick={mergeSort2}
                >
                    Merge Sort
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
                    onClick={handleBubbleSort}
                >
                    Bubble Sort
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
                    onClick={testSortingAlgorithms}
                >
                    Test Sorting Algorithms
                </button>
                <div className="flex items-center">
                    <label htmlFor="animationSpeed" className="mr-2">
                        Animation Speed:
                    </label>
                    <input
                        type="range"
                        id="animationSpeed"
                        min="1"
                        max="20"
                        value={animationSpeed}
                        onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
};

export default SortingVisualizer;

const fs = require('fs');
class Counter {
	constructor() {
		this.numbers = this.testData(this.getData(process.argv[2]));
		this.bubbleComparaisons = 0;
		this.insertionComparaisons = 0;
		this.selectionComparaisons = 0;
		this.quickSortComparaisons = 0;
		this.mergeSortComparaisons = 0;
	}

	getData(fileName) {
		try {
			let data = fs.readFileSync(fileName, 'utf8');
			return data;
		} catch (error) {
			console.error(error.message);
			process.exit();
		}
	}

	testData(data) {
		let dataArray;
		try { 
			dataArray = JSON.parse(data);
		} catch (error) {
			console.error(error.message);
			process.exit();
		}

		if (Array.isArray(dataArray) && dataArray.every(number => typeof number == "number") && dataArray.length > 0){
			return dataArray;
		} else {
			console.error("Your input is not valid, please provide an array of integers.");
			process.exit();
		}
	}

	bubbleSort(){
		let numbers = [...this.numbers];
		let arrayIsModified = true;

		while (arrayIsModified == true){
			arrayIsModified = false;
			for(let i = 1; i < numbers.length; i++){
				this.bubbleComparaisons += 1;
				if (numbers[i-1] > numbers[i]){
					Counter.swap(numbers,i-1,i)
					arrayIsModified = true;
				}
			}
		}
		
		return numbers;
	}

	insertionSort(array = [...this.numbers], left = 1, right = this.numbers.length){
		let numbers = [...array].slice(left - 1,right);
		let j;

		for(let i = 1; i <= numbers.length; i++){
			j = i - 1;
			this.insertionComparaisons += 1;

			if (numbers[j] > numbers[i]){
				while(numbers[j] > numbers[i] && j > 0){
					this.insertionComparaisons += 1;
					j--
				}
				j++
				numbers.splice(j,0,numbers[i]); 
				numbers.splice(i + 1,1);
			}

		}
		return numbers
	}

	selectionSort(){
		let numbers = [...this.numbers]
		let smallestNumber;
		let orderedNumbers = [];
		
		for(let i = 0; i < numbers.length + orderedNumbers.length; i++){
			this.selectionComparaisons += 1;
			smallestNumber = Math.min(...numbers);
			orderedNumbers.push(smallestNumber);
			numbers.splice(numbers.indexOf(smallestNumber),1);
		}

		this.selectionComparaisons = this.selectionComparaisons ** 2

		return orderedNumbers
	}

	runQuickSort(){
		return this.quickSort([...this.numbers], 0, this.numbers.length)
	}

	// I had a bit of trouble to make quicksort. So i went and searched the internet (for a very long time) until i was
	// able to understand it. Here are a few ressources that might help you if you struggle too. Note that it takes time
	// and dedication to finally get it:
	// https://youtu.be/Hoixgm4-P4M
	// https://youtu.be/PgBzjlCcFvc
	// https://www.geeksforgeeks.org/quick-sort/
	// Because of that, the code below is not 100% mine.

	quickSort(array, low, high){
		if(low < high){
			let pivot = this.partition(array, low, high); // Execute partition, which will sort numbers around the "low" index
																									 // and returns a new pivot position. We sort from left to right and
																									 // take low as pivot, but we could use something else (high is also used)
			this.quickSort(array, low, pivot); // Use the method on the numbers on the left of the pivot
			this.quickSort(array, pivot + 1, high); // Use the method on the numbers on the right of the pivot
		}
		return array;
	}

	partition(array, low, high){
		let pivot = array[low];
		let leftWall = low;

		for(let i = low + 1; i <= high; i++){
			this.quickSortComparaisons += 1;
			if(array[i] <= pivot){
				leftWall++;
				Counter.swap(array,i,leftWall); // swap array[i] with leftWall
			}
		}

		Counter.swap(array,low,leftWall); // swap pivot with leftWall

		return leftWall;
	}

	static swap(array,firstNb,secondNb){
		[array[firstNb],array[secondNb]] = [array[secondNb],array[firstNb]];
	}

	mergeSort(array){
		if (array.length > 1){
			let firstHalf = array.slice(0,array.length / 2);
			let secondHalf = array.slice(array.length / 2, array.length)
			
			firstHalf = this.mergeSort(firstHalf);
			secondHalf = this.mergeSort(secondHalf);

			return this.merge(firstHalf, secondHalf)

		} else {
			return array
		}

	}

	merge(firstHalf, secondHalf){
		let merge = new Array;

		while(firstHalf.length > 0 && secondHalf.length > 0){
			this.mergeSortComparaisons += 1;
			if (firstHalf[0] < secondHalf[0]){
				merge.push(firstHalf[0])
				firstHalf.splice(0,1)
			} else {
				merge.push(secondHalf[0])
				secondHalf.splice(0,1)
			}
		}

		// Thoses two while loops are made to avoid doing the if statement every time, but they are basically the same as before
		while(firstHalf.length > 0){
			merge.push(firstHalf[0])
			firstHalf.splice(0,1)
		}

		while(secondHalf.length > 0){
			merge.push(secondHalf[0])
			secondHalf.splice(0,1)
		}

		return merge;
	}


 // I spent a few hours (a bit less than 7 i think), i couldn't make it work, so i modified the code until it worked,
 // but i don't know if it's still a timsort. At least the core principle is still there (i guess)
	timSort(array, n){
		let final = new Array;
		let merge;
		let insertions = new Array;
		for(let i = 1; i < n; i += 32){ // 32 is the run size. This sorts subarrays
			insertions.push(this.insertionSort(array, i, Math.min(i+31, n + 1)));
		}

		final = insertions[0]
		for (let i = 1; i < insertions.length; i++){
			final = this.merge(final, insertions[i])
		}
		return final
	}

	runTimSort(){
		return this.timSort([...this.numbers], this.numbers.length)
	}	

}

c = new Counter
console.log(c.numbers);

console.log("Bubble sort");
console.log(c.bubbleSort());
console.log(c.bubbleComparaisons)

console.log("Insertion sort");
console.log(c.insertionSort());
console.log(c.insertionComparaisons)

console.log("Selection sort");
console.log(c.selectionSort());
console.log(c.selectionComparaisons);

console.log("Quick sort");
console.log(c.runQuickSort());
console.log(c.quickSortComparaisons);

console.log("Merge sort");
console.log(c.mergeSort(c.numbers));
console.log(c.mergeSortComparaisons);

console.log(c.numbers)
console.log("Hey");
console.log(c.runTimSort());

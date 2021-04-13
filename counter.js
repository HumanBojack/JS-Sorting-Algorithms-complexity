const fs = require('fs');
class Counter {
	constructor() {
		this.numbers = this.testData(this.getData(process.argv[2]));
		this.bubbleComparaisons = 0;
		this.insertionComparaisons = 0;
		this.selectionComparaisons = 0;
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

	insertionSort(){
		let numbers = [...this.numbers];
		let j;

		for(let i = 1; i <= numbers.length; i++){
			j = i - 1;
			this.insertionComparaisons += 1;

			if (numbers[j] > numbers[i]){
				while(numbers[j] > numbers[i] && j >= 0){
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

		return orderedNumbers
	}

	static swap(array,firstNb,secondNb){
		[array[firstNb],array[secondNb]] = [array[secondNb],array[firstNb]];
	}


}

c = new Counter
console.log(c.numbers);

// console.log(c.bubbleSort());
// console.log(c.bubbleComparaisons)

// console.log(c.insertionSort());
// console.log(c.insertionComparaisons)

// console.log(c.selectionSort());
// console.log(c.selectionComparaisons);

const fs = require('fs');
class Counter {
	constructor() {
		this.numbers = this.testData(this.getData(process.argv[2]));
		this.bubbleSortComparaisons = 0;
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
				this.bubbleSortComparaisons += 1;
				if (numbers[i-1] > numbers[i]){
					[numbers[i-1],numbers[i]] = [numbers[i],numbers[i-1]];
					arrayIsModified = true;
				}
			}
		}
		
		return numbers;
	}


}

c = new Counter

console.log(c.bubbleSort());
console.log(c.bubbleSortComparaisons)

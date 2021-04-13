const fs = require('fs');
class Counter {
	constructor() {
		this.numbers = this.getData(process.argv[2])
	}

	getData(fileName) {
		try {
			let data = fs.readFileSync(fileName, 'utf8');
			return data;
		} catch (error) {
			console.error(error.message);
			process.exit()
		}
	}

	testData(data) {
		let dataArray;
		try { 
			dataArray = JSON.parse(data);
			return dataArray;
		} catch (error) {
			console.error(error.message);
			process.exit()
		}
	}


}

c = new Counter
console.log(c.numbers)
console.log(c.testData(c.numbers));

const button = document.getElementById("button");
const input = document.getElementById("input");
const labelcount = document.getElementById("labelcount");
var performance = window.performance;

window.onload = () => {
	input.value = "";

}


const submitHandler = () => {
	var string = input.value;
	var stringarray = Array.from(string);

	var array = ["a","e","i","o","u"];

	let counter = 0;



	// The first way to do this.. faster, but is it practicall when comparing to a lot more data?
		// var t0 = performance.now();
		// for (let i = 0;i < string.length; i++){
		// 		if (string[i] === "a" || string[i] === "e" || string[i] === "i" || string[i] === "o" || string[i] === "u" ){
		// 			counter++;
		// 		}
		// 	}
		// var t1 = performance.now();

	// the second way, better for comparing more data(no typing) , but slower
				var t0 = performance.now();
				array.forEach(vowel => stringarray.forEach(x => {if (vowel === x){counter++;}}) )
				var t1 = performance.now();






	console.log(counter);
	labelcount.innerHTML = counter;
	console.log("performance time start",t0,"end>",t1,"difference",t1-t0);
	input.value = "";

}





button.addEventListener("click", submitHandler) ;
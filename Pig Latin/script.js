const button = document.getElementById("button");
const input = document.getElementById("input");
const latin = document.getElementById("latin");
var performance = window.performance;

window.onload = () => 
	{
		input.value = "";
	}



const adday = (a) => {return a.concat("ay")};
const addyay = (a) => {return a.concat("yay")};



const getFirstIndex = () => 
	{
	 	var string = input.value.toLowerCase();
	 	var closestToOne = 1000000;
	 	//stringarray takes the string and makes each word part of an array
		var stringarray = string.split(" ");

		const array = /["a","e","i","o","u"]/g;



					//for each word in the array
					// char = each character of the word is in this char array
					var result = [];
					var found;
	 				stringarray.forEach(word => 
	 					{

		 					if (word.match(array) != null)
			 					{

				 					var found = word.match(array);
				 					var firstmatch = found[0];

				 					if (word.indexOf(firstmatch) === 0)
					 					{
					 						result.push(addyay(word));
					 					}
					 				else 
						 				{
						 					let extracted = word.slice(word.indexOf(found[0]));  // hello >> ello;

						 					let remaining =  word.replace(extracted, ""); 			//h should remain
						 					
						 					let combined = extracted.concat(remaining);
						 					
						 					var resultingWord = adday(combined);
						 					
						 					result.push(resultingWord);
					 					}

			 					
			 					} 
			 				else 
				 				{
			 						result.push(adday(word));
			 					}

	 					})

	 			var endResult = result.join(" ");
	 			latin.innerHTML = endResult;
	 			input.value = "";
 	}

button.addEventListener("click", getFirstIndex);
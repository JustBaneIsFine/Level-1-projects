//test

window.onload = () => 
	{
		//On window load changes the text of clock and date to TIME and DATE..
		document.getElementById("clock").innerHTML = "Time";
		document.getElementById("date").innerHTML = "Date";
	}



var fun = () => 
	{
		//This function takes out each thing individualy (day, year, second etc. )

		var date = new Date();
		var s = date.getSeconds();
		var m = date.getMinutes();
		var h = date.getHours();
		var y = date.getFullYear();
		var mo = date.getMonth() + 1;
		var d = date.getDate();

			//Adds those things together
		var time = h + ":" + m  + ":" + s;
		var date =  d + "/" + mo + "/" + y;
			//changes the text inside CLOCK and DATE to the time and date
		document.getElementById("clock").innerHTML = time;
		document.getElementById("date").innerHTML = date;
	}





setInterval(fun,1000);


//This is the longer version but more specific and controled..
//Below is the quicker and shorter version
								


// setInterval(()=>{document.getElementById("clock").innerHTML = (new Date().toLocaleTimeString())},1000)
// setInterval(()=>{document.getElementById("date").innerHTML =(new Date().getFullYear()) },1000									
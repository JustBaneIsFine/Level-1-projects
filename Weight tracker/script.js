const getIt = (x) => {return document.getElementById(x)};

const addButton = getIt("addButton");
const changeButton = getIt("changeButton");
const statusWeight = getIt("statusWeight");
const statusChange = getIt("statusChange");
const statusFromGoal = getIt("statusFromGoal");
const statusWeek = getIt("statusWeek");
const statusMonth = getIt("statusMonth");
const statusTotalChange = getIt("statusTotalChange");
const statusGoal = getIt("statusGoal");
const historyList = getIt("list");
var date = new Date();
const labelHistory = getIt("labelhistory")
const storage = window.localStorage;
var storageList = JSON.parse(storage.getItem("list"));
var storageAverage = JSON.parse(storage.getItem("average"));

window.onload = () => 
	{
		loadItems();
		loadStatus();
	}


const countThis = (a,b) => 
	{
		var first;
		var second;	
		first = parseInt(a);
		second = parseInt(b);

		return first+second;

}

const calculateAverages = () => 
			{

				var currentWeekNum = getWeekOfMonth(date);
				var currentMonthNum = (date.getMonth()+1);
				var currentYearNum = date.getFullYear();
				var weekCount = 0;
				var monthCount = 0;
				var totalCount = 0;

				storageList.forEach(x => 
				{
						if (x.weekNum === currentWeekNum && x.monthNum === currentMonthNum)
						{
							weekCount = parseInt(x.change) + weekCount;
						}

						if (x.monthNum === currentMonthNum && x.yearNum === currentYearNum)
						{
							monthCount = parseInt(x.change) + monthCount;
						}

						if (true)
						{
							totalCount = parseInt(x.change) + totalCount;
						}

				})

				var avStore = [{"averageWeek": weekCount,"averageMonth": monthCount, "averageTotal":totalCount}]

				storage.setItem("average", JSON.stringify(avStore));
				storageAverage = JSON.parse(storage.getItem("average"));
			}


const loadItems = () => 
	{
		

		if (storageList != null){
				storageList.forEach(x => 
				{
					createFromStorage(x.date, x.change, x.weight,x.id);
				})}

		if (storage.getItem("goal") != null)
			{statusGoal.innerHTML = JSON.parse(storage.getItem("goal"))[0].goal;}

		

	}



const getWeekOfMonth = (date) => {
    let adjustedDate = date.getDate() + date.getDay(); 
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    // IMPORTANT!!!
    // i am having trouble understanding what this return code does.. Need to investigate furter!!!
    return (parseInt(prefixes[0 | adjustedDate / 7])+1);
}



const loadStatus = () => 
	{
		
		const child = historyList.getElementsByTagName("li")[1];
		try {
			if (child === undefined || child === null){
				statusWeight.innerHTML = 0;
				statusChange.innerHTML = 0;
				statusFromGoal.innerHTML = 0;
			} else {
		const childChange = child.children[1].innerHTML;
		const childWeight = child.children[2].innerHTML;
		statusWeight.innerHTML = childWeight;
		statusChange.innerHTML = childChange;
		statusGoal.innerHTML = JSON.parse(storage.getItem("goal"))[0].goal;
		statusFromGoal.innerHTML = statusGoal.innerHTML - childWeight;

		}
		} catch(e) {
		}

		if (storageAverage === null){
			statusWeek.innerHTML = 0;
			statusMonth.innerHTML = 0;
			statusTotalChange.innerHTML = 0;
			} else {
			statusWeek.innerHTML = JSON.parse(storage.getItem("average"))[0].averageWeek;
			statusMonth.innerHTML = JSON.parse(storage.getItem("average"))[0].averageMonth;
			statusTotalChange.innerHTML = JSON.parse(storage.getItem("average"))[0].averageTotal;
		
			}

			
	}

const deleteHandler = (e) => {
	const itemId = e.target.id;
	const itemContent = e.target.children[2].innerHTML;

	const result = confirm("Are you sure you want to delete this entry? >> "+itemContent+" <<");

	if (result===true)
	{
		
		const index = storageList.findIndex(x => x.id === itemId);
		storageList.splice(index,1);
		storage.setItem("list", JSON.stringify(storageList));


		e.target.remove();
		calculateAverages();
		loadStatus();

	};



}

const createFromStorage = (date,change,weight,id) => 
	{
		const li = document.createElement("li");
		li.classList.add("historyComp");
		li.addEventListener("click", deleteHandler);
		li.setAttribute("id",id);

		const labelDate = document.createElement("label");
		const labelChange = document.createElement("label");
		const labelWeight = document.createElement("label");

		labelDate.setAttribute("id","date");
		labelChange.setAttribute("id","changeh");
		labelWeight.setAttribute("id","weight");


		labelDate.innerHTML = date;
		labelChange.innerHTML = change;
		labelWeight.innerHTML = weight;


		li.append(labelDate);
		li.append(labelChange);
		li.append(labelWeight);
		labelHistory.insertAdjacentElement('afterend', li);
	}


const createElement = (input,old) => {
	const li = document.createElement("li");
	li.classList.add("historyComp");
	li.addEventListener("click", deleteHandler);
	let id =  Math.random().toString(16).slice(2);
	li.setAttribute("id",id);
	const labelDate = document.createElement("label");
	const labelChange = document.createElement("label");
	const labelWeight = document.createElement("label");

	labelDate.setAttribute("id","date");
	labelChange.setAttribute("id","changeh");
	labelWeight.setAttribute("id","weight");
	const newDate = date;
	const thisDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
	labelDate.innerHTML = thisDate;
	labelWeight.innerHTML = input;
	let oldWeight = statusWeight.innerHTML;
 	let result = input-old;

	if (result <=0){
		labelChange.innerHTML = result;
	} else {
		let newNum = "+" + result;
		labelChange.innerHTML = newNum;
	}

	li.append(labelDate);
	li.append(labelChange);
	li.append(labelWeight);


	const thisDateWeek = getWeekOfMonth(newDate);





 labelHistory.insertAdjacentElement('afterend', li);

	let newObject = 
	{
		"id": id,
		"date": labelDate.innerHTML,
		"change": labelChange.innerHTML,
		"weight": labelWeight.innerHTML,
		"weekNum" : thisDateWeek ,
		"monthNum": (date.getMonth() + 1),
		"yearNum": date.getFullYear()
	};


	if(storageList === null)
		{
			storage.setItem("list",JSON.stringify([newObject]));
		}
		else 
		{
			let newList = storageList.concat(newObject);
			storage.setItem("list",JSON.stringify(newList));
		}

	storageList = JSON.parse(storage.getItem("list"));

	calculateAverages();
	loadStatus();
	
 	
}



const addHandler = () => {
	let oldWeight = statusWeight.innerHTML;
	let inputWeight =  window.prompt("please enter your current weight");


	statusWeight.innerHTML = inputWeight;
	let newChange = inputWeight - oldWeight;
	if (newChange <=0){
		statusChange.innerHTML = newChange;
	} else {
		let newNum = "+" + newChange;
		statusChange.innerHTML = newNum;
	}

	statusFromGoal.innerHTML = statusGoal.innerHTML - inputWeight;
	createElement(inputWeight,oldWeight);
};

const changeHandler = () => {
	let current = statusWeight.innerHTML;

	let inputGoal =  window.prompt("please enter your desired weight");
	statusGoal.innerHTML = inputGoal;
	storage.setItem("goal",JSON.stringify([{"goal": inputGoal}]));
	statusFromGoal.innerHTML = inputGoal-current;


};

addButton.addEventListener("click", addHandler);
changeButton.addEventListener("click", changeHandler);


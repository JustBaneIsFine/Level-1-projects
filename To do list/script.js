const storage = window.localStorage;
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const getInput = document.getElementById("inputform");
const contentBox = document.getElementById("contentBox");

//the stored list of items is turned from string to a JS object.
var storedList = JSON.parse(storage.getItem("list"));

// on page load, delete input entry and load the items from storage.
window.onload = () => 
	{
		// getInput.value = "";
		loadItems();

	}	

//repeatable code block
	const createEl = () => document.createElement("span");

	//create a span with check and delete sign
	//append everything together for a full element

	const createSpan = (newLi) => 
	{
				const spanbox = createEl();
				spanbox.setAttribute("id", "box");
				const spancheck = createEl();
				spancheck.setAttribute("class", "checkSign");
				spancheck.innerHTML = "o";
				const spandel = createEl();
				spandel.setAttribute("class", "deleteSign");
				spandel.innerHTML = "x";
				spanbox.appendChild(spancheck);
				spanbox.appendChild(spandel);
				newLi.appendChild(spanbox);
				contentBox.appendChild(newLi)
				spandel.addEventListener("click",targetDelete);
				spancheck.addEventListener("click",targetCheck);
	}

//repeatable code block


const loadItems = () => 
	{
		if (storedList != null)
		{
			storedList.forEach(x => 
			{
				//for each list object, create a li element and add id + text to it.
				const newLi = document.createElement("li");
				var id = x.id;
				newLi.setAttribute("id", id);
				newLi.innerHTML = x.text;

				createSpan(newLi);

				//if checked in store, also check it in contentBox..
				if (x.checked === "yes")
				{
					newLi.classList.add("done");
				}

			})
		}

	};

const saveItems = (value,id) => 
	{
		if (storedList === null)
		{
			storage.setItem("list", JSON.stringify([{"text": value, "checked":"no", "id":id}]));
		} 
		else 
		{
			const newobject = {"text": value, "checked": "no", "id":id};
			newList = storedList.concat(newobject);
			storage.setItem("list", JSON.stringify(newList));
		}

		storedList =  JSON.parse(storage.getItem("list"));

	};



//if delete sign is clicked, this function runs and finds the parent element of the target
//after confirming the delete it deletes it obviously 
const targetDelete = (e) => 
	{	

		//find the targeted element

		const delme = e.target;
		const badcontent = delme.parentNode.parentNode.textContent;
		// get the text content  (used only for the confirm window..)
		const content = badcontent.slice(0,-2);
		var result = confirm("Do you want to delete this task:  " + content);

		// If confirmed, finds the element id
		if (result === true)
		{
			var id = delme.parentNode.parentNode.id;

			//then finds the index of that id in storage and deletes it, then we update the list and thats it..
			const index = storedList.findIndex(x => x.id === id);
			storedList.splice(index, 1);
			storage.setItem("list", JSON.stringify(storedList));
			
			
		//and finaly we delete the actual element from the contentBox
		delme.parentNode.parentNode.remove();
		};
	};

// Checks the targeted task
const targetCheck = (e) => 
	{	
		const check = e.target;
		const checkme = check.parentNode.parentNode;
		checkme.classList.toggle("done");
		var id = checkme.id;
			
			//matches the target id and store id and checks/uncheks it in the storage
			if (checkme.classList[0] === "done")
			{
				storedList.forEach(x => 
					{
					 if (x.id === id)
					 {x.checked = "yes";}
					}
				);
			} 
			else 
			{
				storedList.forEach(x => 
					{ 
					 if (x.id === id)
					 {x.checked = "no";}
					}
				)
			}
		//updates the store to the new list (with checked/unchecked object);
		storage.setItem("list", JSON.stringify(storedList));
	};


const createElement = (value) => 
	{

		const newLi = document.createElement("li");
		var id = Math.random().toString(16).slice(2);
		newLi.setAttribute("id", id);
		newLi.innerHTML = value;
		//add snipet to function

		createSpan(newLi);
	 	saveItems(value,id);
		
	}


// Create function: creates the list item along with the check sign and delete sign. adds event listeners on the signs..
const createNew = () => 
	{
		createElement(getInput.value);
		getInput.value = "";
	}


const deleteList = () =>
	{	
		const answer = confirm("Are you sure you want to delete everything? This can't be reverted");
		
		if (answer === true)
		{
			storedList = null;
			storage.removeItem("list");
			document.location.reload();
		};


	}


addButton.addEventListener("click", createNew);
clearButton.addEventListener("click", deleteList);
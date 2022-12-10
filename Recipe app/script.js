const getIt = (x) => {return document.getElementById(x)};
const storage = window.localStorage;
const storageList = JSON.parse(storage.getItem("recipeApp"));

const searchInput = getIt("searchInput");
const displayRecipes = getIt("recipeList");
const addButton = getIt("addRecipe");

window.onload = () => {
	clearInputs();
	loadItems();
}


const clearInputs = () => {
	searchInput.value = "";
}

const loadItems = (items) => {
	displayRecipes.innerHTML = "";

	if (items === null || items === undefined)
	{
		//if there are no filtered recipes, load all recipes
			storageList.forEach(x => 
			{
				createEl(x.id, x.name, x.ingredients, x.check);	// everything apart from name and id is probably not needed here
			})
			

	} else 
	{
			console.log(items);
			items.forEach(x => {   


				storageList.forEach(c => {
					if (x === c.id){
						createEl(c.id,c.name,c.ingredients,c.check) // everything apart from name and id is probably not needed here
					}
				})
					})
			

	}

	}


const createEl = (id,name,text, ingredients, check) => { // everything apart from name and id is probably not needed here

	const href = "Edit/index.html"+"?"+id;
	const a = document.createElement("a");
	a.setAttribute("href", href); 
	const h = document.createElement("h4");
	h.setAttribute("class","recipeItem");
	h.setAttribute("id",id);
	h.innerHTML = name;



	a.appendChild(h);
	displayRecipes.appendChild(a);


}

const addHandler = () => {
	window.location = "Add/index.html";

}


const searchHandler = (e) => {
	displayRecipes.innerHTML = "";	//clear current displayed items


	const search = searchInput.value.toLowerCase();
	const idList = []; // create new empty array
	try {
		//for each stored recipe, we check if recipe includes search filter, if so, push it's id to list
		storageList.forEach(x => 
			{
				if (x.name.toLowerCase().includes(search))
				{
					idList.push(x.id);
										// for each recipe in storage, compare searched item with that recipe
									  	// if matches, push to idList
				} 
			})
	} catch {}
	
	// then loadItems with these id's..
	loadItems(idList);	// then load that list 

};
	
addButton.addEventListener("click", addHandler);
searchInput.addEventListener("input", searchHandler);
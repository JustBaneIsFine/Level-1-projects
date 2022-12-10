const getIt = (x) => {return document.getElementById(x)};

const inputName = getIt("inputName");
const inputAmount = getIt("inputAmount");
const income = getIt("income");
const expense = getIt("expense");
const history = getIt("history")
const currentBalance = getIt("currentBalance");
const button = getIt("submitButton");

window.onload = () => {
	inputName.value = "";
	inputAmount.value = "";
	income.innerHTML="";
	expense.innerHTML=="";
	currentBalance.innerHTML=="";
};

const submitHandler = () => 
	{

		var theValue = inputAmount.value; 
		var theSign = theValue[0]; 
		var storeBalance = Number(currentBalance.innerHTML); 
		var storeExpense = Number(expense.innerHTML);	
		var storeIncome = Number(income.innerHTML); 
		var storeValue = Number(theValue); 


			if (theSign === "-")
				{

					currentBalance.innerHTML = storeBalance - Math.abs(theValue);
					expense.innerHTML = Math.abs(theValue) + Math.abs(storeExpense);		
					createHistory("expense");
					// Add this to history as expense
				}

			else if(theSign === "+")
				{
					currentBalance.innerHTML = storeBalance + Math.abs(theValue);
					income.innerHTML = Math.abs(theValue) + Math.abs(storeIncome);
					createHistory("income")
					// Add this to history as income 
				};

		inputAmount.value = "";
	};
		


const createHistory = (type) => {

	const li = document.createElement("li");
	li.classList = "listItem";
	li.style = "background-color: white;"

	const createLabel = (id) => 
		{
			 const label = document.createElement("label");
			 label.id = id;
			 return label;
		}


	const labelname = createLabel("nameSpace");
	const labeltype = createLabel("typeSpace");
	const labelamount = createLabel("amountSpace");

	li.appendChild(labelname);
	li.appendChild(labeltype);
	li.appendChild(labelamount);

	labelname.innerHTML = inputName.value;
	labeltype.innerHTML = type;
	labelamount.innerHTML = inputAmount.value;


	history.appendChild(li);
};


submitButton.addEventListener("click", submitHandler);



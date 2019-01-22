const array = [];

let arraySize = 0;

//Array Constructor
function Array(value){

    this.value = value;

    array.push(this.value);
}

//UI Constructor
function UI(){

}

//UI PROTOTYPES

//Add Number to Table
UI.prototype.addNumberToList = function(num){

    const list = document.getElementById('unsorted-table');

    //Create a tr element
    const row = document.createElement('tr');

    //Insert the number
    row.innerHTML = `<td>${num.value}</td>`;

    list.appendChild(row);
};

//Add sort array button and deactivate submit button
UI.prototype.sortArrayButton = function(){

    //Create an input element
    const button = document.createElement('input');

    //Give an id to the button
    button.setAttribute('type', 'submit');
    button.setAttribute('class', 'sort-array-button');

    //Add the button to the UI
    document.getElementById('insert-button').appendChild(button);
};

//Display sorted array
UI.prototype.displayArray = function(arr, index){

    const list = document.getElementById('sorted-table');

    //Create an element to insert the values
    const row = document.createElement('tr');

    const data = document.createElement('td');

    //Insert the numbers
    data.innerHTML = arr[index];

    list.appendChild(row).appendChild(data);

};

//Clear form field
UI.prototype.clearField = function(){
    document.getElementById('input').value = '';
};

//Show message to user
UI.prototype.displayAlert = function(message, className){
    //Create a div
    const div = document.createElement('div');

    div.className = `alert ${className}`;

    //Add the text to the alert
    div.appendChild(document.createTextNode(message));

    //Get the parent
    const parent = document.querySelector('.container');

    //Get the form
    const form = document.querySelector('#user-input');

    //Insert the alert
    parent.insertBefore(div, form);

    //Timeout after two seconds
    setTimeout(function () {
        document.querySelector('.alert').remove()
    }, 2000);
};



//Event Listeners
document.getElementById('user-input').addEventListener('submit', function (e) {

    //Get form value and convert it to an int from a string
    const number = parseInt(document.getElementById('input').value);

    //Instantiate array object
    const list = new Array(number);

    //Instantiate UI object
    const ui = new UI();

    if(isNaN(number)){

        //Display error message
        ui.displayAlert('Please enter a number', 'error');

    } else if(arraySize !== 10) {

        //Display success message
        ui.displayAlert('Number added to array', 'success');

        //Add the number to the UI
        ui.addNumberToList(list);

        //Clear the form
        ui.clearField();

        //Increase the count of the array
        arraySize++;
    }

    if(arraySize === 10){
        //Deactivate submit button
        document.getElementById('submit-button').disabled = true;

        //Add sort array button
        ui.sortArrayButton();
    }

    //Prevents the window from reloading
    e.preventDefault();
});

document.getElementById('insert-button').addEventListener('click', function (e) {

    //Instantiate UI object
    const ui = new UI();

    //Call the sort array function
    sortArray(array);

    //Display the sorted array
    for(let i=0; i<array.length; i++){
        ui.displayArray(array, i);
    }

    //Prevent window from reloading
    e.preventDefault();
});

//Functions

function sortArray(arr){
    let tempValue = 0;

    for(let i=1; i<arr.length; i++){

        while(arr[i] < arr[i-1] && i>=0){
            tempValue = arr[i-1];

            arr[i-1] = arr[i];

            arr[i] = tempValue;

            i--;
        }

    }

    return arr;
}
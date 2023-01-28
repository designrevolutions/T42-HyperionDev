// Create a global array to store our local data in an array. We need storing into an array so we can perform functions, like searching and makign changes.
let sample_data_retrieved_array = [];
console.log(`FIRST sample_data_retrieved_array: >>${sample_data_retrieved_array}<<`);

// ############################
class Sample_Data 
{
    constructor(name, url)
    {
        this.name = name;
        this.url = url;
    }
}
// I had to declare this class again in this file. Creating one file and importing seems impossible if not using a server.
// ############################

// console.log("I'm here")
// sample_data_retrieved_array.push(new Sample_Data("News", "banana.html"));
// write_array_to_localstorage()

const this_page_url = window.location.href; // We have the current page location - we store this in the localStorage
// console.log(this_page_url);
let this_page_name = document.title;
    
// I needed a function to run after the page has loaded.
// I got the answer from chatGPT. This version does not need to have an eventListener.
// I have a function declared below called on_page_load().
window.onload = on_page_load; // 1. This is the first function that gets called.


// We have a reference to the div where we want to add our new content. 
// I have this positioned at the bottom of the page.
let html_div_like_save = document.getElementById("like_save"); 

// Start ++++++++++++++++++++++
// Create a button element

let save_for_later_button = document.createElement("button");
save_for_later_button.innerHTML = "Save for later";
// save_for_later_button.style.backgroundColor = "rgba(175, 238, 238,1.0)";
save_for_later_button.addEventListener("click", save_for_later_function);

// ALSO we'll create a span element to add messages like how many items the user has saved
let span_before_save_button = document.createElement("span");
span_before_save_button.innerHTML = "" // Start with blank text 
span_before_save_button.style.marginLeft = "1rem"; // using rem as a unit. Rem relates to the unit of the absolute parent HTML
span_before_save_button.style.marginRight = "1rem";
span_before_save_button.style.fontSize = "0.8rem"

html_div_like_save.appendChild(span_before_save_button); // We want to have the message appear before the save button
html_div_like_save.appendChild(save_for_later_button);

// End ++++++++++++++++++++++

// Sun 22 Jan 2023, 0228
// There's a problem here. This is where you left off
// You are having trouble toggling the button state
// When you switched lines around below... it worked - but the value was being removed

function save_for_later_function() // This gets invoked when the 'Save for Later' button is clicked on
{
    console.log("I'm inside the button function")

    if(check_if_page_exists()) // If the page exits, the text shown on the button will be 'Remove from Saved' so this part of the code removes the page from localStorage
    {
        // If the page exists, then we need to remove the page from the array and save to localStorage
        // The button now needs to have the 'Save page' message again. All of this is super confusing and doing my head in!

        // This code makes a new array, but exluded the current page URL - we want to remove from local storage
        // We needed code to search the array in order to remove it
        // I got the solution from Chat GPT
        sample_data_retrieved_array = sample_data_retrieved_array.filter(data => data.url !== this_page_url);        

        function removed_how_many_saved(); // This function RMEOVES the message next to the span next to the button saying how many pages are saved.

        button_state_save_page();
    }
    else // Else the button says currently 'Save for Later' - therefore we want to store the page into localStorage
    {
        // If we are in here, then the page needs storing. So we store the page and change the button message to 'remove from save' - because we will now save.
        // If this logic doesn't work, I need to simplify a lot more. Make less efficient, but it be better as it will be easier to maintain if further changes are needed.

        let new_save = new Sample_Data(this_page_name, this_page_url);
        // console.log("----------")
        // console.log(new_save);
        // console.log(`sample_data_retrieved_array: >>${sample_data_retrieved_array}<<`);
        // console.log("----------")
        sample_data_retrieved_array.push(new_save);

        button_state_remove_page();
    }

    write_array_to_localstorage()

    // console.log("Local Storage written to - I think")

    // I need to add this later.
    // First line of code needs to be to check if the page exists already
    // Or do I want this?
    // How do I want to implement?
    // Have 2 buttons? Or have 1 button and change how it looks and what action it has assigned based on the search result?


    // This is where I left off. I need something that looks up localStorage and checks if the page has been saved. If it has been saved, the button changes state 
    // - maybe doesn't appear as a button?
}

function button_state_save_page() // 4. This maybe the 4th function that gets called.
{
    save_for_later_button.innerHTML = "Save for later";
    save_for_later_button.style.backgroundColor = ""; // This make the colour of the button be the default grey colour
}

function button_state_remove_page() // 4. This maybe the 4th function that gets called.
{
    save_for_later_button.innerHTML = "Remove from Saved";
    save_for_later_button.style.backgroundColor = "rgba(175, 238, 238,1.0)"; // This gives the button a light green look - we want a different colour if the page has been saved
}

function write_array_to_localstorage()
{
    localStorage.setItem("sample_data", JSON.stringify(sample_data_retrieved_array));
}

// We need to load localdata into an arrya and then traverse through and see if the page is already stored.
// If stored, then we have a different decoration for the button.
// Maybe add "Click to unstore"?

function retrieve_local_data() // 2. This is the second function that gets called.
{
    // I had a lot of problem with sample_data_retrieved_array containing null
    // Checking JSON.parse(localStorage.getItem("sample_data")) returns a null if it empty
    // Later on in the code, a search is done. If we have sample_data_retrieved_array = JSON.parse(localStorage.getItem("sample_data"))
    // Then sample_data_retrieved_array is null. This caused my so much problems

    let check_local_storage = JSON.parse(localStorage.getItem("sample_data")) 

    if(check_local_storage) // This means localStorage has some data
    {
        sample_data_retrieved_array = check_local_storage // sample_data_retrieved_array needs to be a global variable
    }
    else
    {
        // Do nothing. Leave sample_data_retrieved_array as it is.
    }

    // console.log(`CHECK sample_data_retrieved_array: >>${sample_data_retrieved_array}<<`);
}

function on_page_load() // 1. This is the first function that gets called.
{
    // Here we need to get the local data and then traverse through array to see if we can find a link match.
    // 2. This is the second function that gets called.
    retrieve_local_data(); // sample_data_retrieved_array[] now has the localStorage data installed

    if(check_if_page_exists()) // 3. check_if_page_exists() - this is the third function that gets called.
    {
        button_state_remove_page() // 4. This maybe the 4th function that gets called.
        // button_state_save_page()
    }
    else
    {
        button_state_save_page() // 4. This maybe the 4th function that gets called.
        // button_state_remove_page()
    }
}

function check_if_page_exists()
{
    // I need to first check the array is not empty before searching.
    // If it's empty, then we have an error thrown when we search for an item within the array.
    if(sample_data_retrieved_array) // Means we have data inside of our array
    {
        // Code to search array - from ChatGPT
        const result = sample_data_retrieved_array.find(item => item.url === this_page_url);
        // We are assuming that the array will have valid data. In a later revision, we need to check if the data in the array has a valid structure - like each object has name and URL
        return result; // The result will be an object if found, otherwise it will be null
    }
    else // Array is null and therefore we shouldn't search the array and just send a false result
    {
        return false;
    }
}

// I spent a lot of time trying to import javascript files
// Much of the code used below has already been done in other files
// Alas, it doesn't seem to want to work on local PC
// So, I gave up

// I need to research how to search an array for a value - if value is abc, then we do this, exlse if xyz, then we do that 
// (i.e. give the button a different colour and decortion)
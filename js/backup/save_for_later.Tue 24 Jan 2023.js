function on_load_check()
{
    // Here we need to read from local storage and display our data
}

// #######################
// Start setting up sample test data
class Sample_Data 
{
    constructor(name, url)
    {
        this.name = name;
        this.url = url;
    }
}

const sample_data_array = []

sample_data_array.push(new Sample_Data("News", "banana.html"));
sample_data_array.push(new Sample_Data("Local", "local.html"));
sample_data_array.push(new Sample_Data("Favourite Fruit", "cherry.html"));
sample_data_array.push(new Sample_Data("Passion", "learning.html"));
sample_data_array.push(new Sample_Data("User Choice", "choice_made.html"));

console.log(sample_data_array)
console.log(sample_data_array[0].name)

console.log("-----------------------")

localStorage.setItem("sample_data", JSON.stringify(sample_data_array));
// This is just meant to be done once. And is only meant for testing initially. Need to delete afterwards.

// Finish setting up sample test data
// ####################

// Let's retrieve data from loacl storage
sample_data_retrieved_array = JSON.parse(localStorage.getItem("sample_data")) // This needs to be a global variable
console.log(sample_data_retrieved_array)

// We have a save_for_later UL in the HTML
const save_for_later_id = document.getElementById("save_for_later_id"); // This is the UL that holds the list of saved items

function make_html_list()
{
    delete_html()
    // We don't have to delete the HTML elements - we can just over write. The information ont he website said there would be memory issues and it's better to delete.

    for (let index = 0; index < sample_data_retrieved_array.length; index++) 
    {
        const element = sample_data_retrieved_array[index];

        let list_item = document.createElement("li");
        list_item.index = index; // really important to delete - must add

        // Make the link
        let link = document.createElement("a");
        link.href = element.url;
        link.innerHTML = element.name;
        list_item.appendChild(link);

        // Add a button
        let delete_button = document.createElement("button");
        delete_button.innerHTML = "Delete";
        delete_button.style.margin = "10px";
        delete_button.addEventListener("click", delete_button_function)
        list_item.appendChild(delete_button);

        save_for_later_id.appendChild(list_item);
    }
}

make_html_list() // This needs to be called first time round to populate the page. After that, we call again when one of the items is deleted

function delete_button_function()
{
    // We don't need to pass in anything. We get the index from the button itself by looking up the parents details. You've already done this in other code.
    //     book_catalogue_array.splice(this.parentElement.index, 1) - this is how we did it before
    // alert(`The index is: ${this.parentElement.index}`)
    sample_data_retrieved_array.splice(this.parentElement.index, 1)
    make_html_list() // We don't need to delete the HTML? 
}

function write_array_to_localstorage()
{
    localStorage.setItem("sample_data", JSON.stringify(sample_data_retrieved_array));
}

function delete_html()
{
    while (save_for_later_id.firstChild)
    {
        save_for_later_id.removeChild(save_for_later_id.firstChild);
    }
}

// Don't think this is needed. This was implemented on each of the candidate pages.
// Just need to focus on the onload
function create_saved_items(index) // Create the page from localStorage. Cycle through the array
{

}

// #### ++++++ Coding restarted here Tue 24 Jan 2023

// #### ++++++
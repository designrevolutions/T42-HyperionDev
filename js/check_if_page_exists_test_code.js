let sample_data_retrieved_array = [];
let current_page = window.location.href;
let this_page_name = document.title;

class Sample_Data 
{
    constructor(name, url)
    {
        this.name = name;
        this.url = url;
    }
}

let new_save = new Sample_Data(this_page_name, current_page);
console.log(`sample_data_retrieved_array: >>${sample_data_retrieved_array}<<`);
sample_data_retrieved_array.push(new_save)

console.log(sample_data_retrieved_array)

console.log("===============")

function retrieve_local_data()
{
    sample_data_retrieved_array = JSON.parse(localStorage.getItem("sample_data")) // This needs to be a global variable
}

// retrieve_local_data()
// console.log(sample_data_retrieved_array)

function check_if_page_exists()
{
    //current_page = "local2.html"
    
    // Code to search array - from ChatGPT
    const result = sample_data_retrieved_array.find(item => item.url === current_page);
    //console.log(result);
}

console.log("----------")
if(check_if_page_exists())
{
    console.log("Yes")
}
else
{
    console.log("No")
}

console.log("----------")
let submit_button = document.getElementById("submit-button");

// Below I add event liteners for click, double click, enter and space bar
// First, I had trouble when enter or spacebar was hit - the overlay would show and then dissapear as if it were clicked
// Then I had problem with some clicks - if you clicked quickly, I think this registered as a double click - so I added code to cope with that
// EDIT: these solutions didn't work. I've added event.preventDefault()
// ----------------- ++++++++++++++++++++
submit_button.addEventListener("click", function ()
{
    // console.log("I'm in here")
    document.getElementById("overlay").style.display = "block";
    // hide_overlay_after_time();
    event.preventDefault()
});

// submit_button.addEventListener("dblclick", function ()
// {
//     // console.log("I'm in here")
//     document.getElementById("overlay").style.display = "block";
//     hide_overlay_after_time();
// });

// submit_button.addEventListener("keydown", function ()
// {
//     if(event.code === "Enter" || event.code === "Space")
//     {
//         document.getElementById("overlay").style.display = "block";
//         hide_overlay_after_time();
//     }
// });
// ----------------- ++++++++++++++++++++

function hide_overlay_after_time()
{
    setTimeout(function ()
    {
        document.getElementById("overlay").style.display = "none"; 
    }, 10000); // Make the ovrlay dissapear after 10 seconds if nothing else is clicked

}

function empty_form()
{
    // console.log(document.getElementById("first_name"))
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("message").value = "";
    document.getElementById("radio").checked = false;
    document.getElementById("checkbox").checked = false;
}

let overlay = document.getElementById("overlay");
overlay.addEventListener("click", function ()
{
    overlay.style.display = "none";
});

overlay.addEventListener("click", function (e)
{
    empty_form();

    e.stopPropagation();
    // clearTimeout(timeout);
    overlay.style.display = "none";
    e.preventDefault()
});
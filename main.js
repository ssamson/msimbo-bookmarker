
// Save Bookmark
function saveBookmark(event) {
    // Prevent from page reloading;
    event.preventDefault();

    // Get site name and url
    var siteName = document.querySelector("#siteName").value;
    var siteURL = document.querySelector("#siteURL").value;
    // console.log(siteName, siteURL);

    // create a bookmark object
    var bookmark = {
        name: siteName,
        url: siteURL
    };

    // Store bookmark
    var bookmarks = [];

    // check if the local storage is empty
    if (localStorage.getItem("bookmarks") !== null) {
        // Get bookmarks from local storage
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    }

    // adding new bookmark
    bookmarks.push(bookmark);

    // Update bookmarks in local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    // fetch bookmarks
    fetchBookmarks();

    // empty input
    // siteName.value = "";
    // siteURL.value = "";
    document.querySelector("form").reset();
}

    // fetch bookmarks
    function fetchBookmarks() {
        // Get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

        // Select the output bookmarks div
        var output = document.querySelector("#bookmarks");

        // Reset the bookmarks  div
        output.innerHTML = "";

        // Loop over bookmarks
        for (var i=0;i<bookmarks.length;i++){
            // Create div
            var div = document.createElement("div");
            // Create h3
            var h3 = document.createElement("h3");
            h3.textContent = bookmarks[i].name;

            // Create visit link
            var a = document.createElement("a");
            a.href = bookmarks[i].url;
            a.className = "btn btn-success";
            a.textContent = "Visit";

            // Create delete button
            var button = document.createElement("button");
            button.className = "btn btn-danger";
            button.textContent = "Delete";

            // Add event listener to delete button
            button.addEventListener("click", function(event) {
                //console.log(event.target.parentElement.children[0].textContent);
                var name = event.target.parentElement.children[0].textContent;
                deleteBookmark(name);
            });

            // Append h3, a, button into div
            div.appendChild(h3);
            div.appendChild(a);
            div.appendChild(button);

            // Append div into output
            output.appendChild(div);
        }
    }

// Delete bookmark
function deleteBookmark(name) {
 //console.log(name);
 // Get bookmarks from local storage
 var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

 // Loop over bookmarks
 for (var i=0;i<bookmarks.length;i++) {
     // Looking up bookmark with given name, then delete it
     if (bookmarks[i].name === name) {
         bookmarks.splice(i, 1);
         break;
     }
 }

 // Update localStorage
 localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

 // re-fetch bookmark output
 fetchBookmarks();
}
// Select filter input
var filter = document.querySelector("#filter");

// filter bookmarks
function filterBookmarks() {
    // Select all bookmarks name
    var bookmarks = document.querySelectorAll("#bookmarks div h3");
    // console.log(bookmarks);

    // loop over bookmarks
    for (var i=0;i<bookmarks.length;i++) {
        if (bookmarks[i].textContent.toUpperCase().includes(filter.value.toUpperCase())) {
            bookmarks[i].parentNode.style.display = "block";
        } else {
            bookmarks[i].parentNode.style.display = "none";
        }
    }
}

// Adding event listener to submit button
document.querySelector("form").addEventListener("submit", saveBookmark);

// Adding event listener  for page loading
window.addEventListener("load", fetchBookmarks);

// Adding event listener for filter input
filter.addEventListener("input", filterBookmarks);
// Using the UFO dataset provided in the form of an array of JavaScript objects, 
// append a table to your web page and then add new rows of data for each UFO sighting

// The given data from data.js
var tableData = given_data;

// Table references
var table_body = d3.select("tbody");

// Building the table
function Building_Table(data) {

  // Clearing out existing data
  table_body.html("");

  // Looping through each object
  // Appending rows and cells for each value
  data.forEach((row) => {

    // Appending rows to table body
    var r = table_body.append("tr");

    // Looping through each field in the row
    // Adding each value as a table cell (td)
    Object.values(row).forEach((value) => {
      var cell = r.append("td");
        cell.text(value);
      }
    );
  });
}

// Listen for events and search through the date/time column to find rows that match user input
function user_sightings() {

  // Grabbing datetime value from filter
  var given_date = d3.select("#datetime").property("value");
  let filteredData = tableData;

  // Checking if a date value was entered and 
  // filtering existing data using the given date
  if (given_date) {
    // Applying a filter to table data
    // Keeping only rows where `datetime` value matches the user's entered date
    filteredData = filteredData.filter(row => row.datetime === given_date);
  }

  // Rebuilding the table with filtered data
  Building_Table(filteredData);
}

// Attaching an event to listen to form button
d3.selectAll("#filter-button").on("click", user_sightings);

// Building original table when page loads
Building_Table(tableData);

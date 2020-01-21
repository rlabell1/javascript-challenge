// Using the UFO dataset provided in the form of an array of JavaScript objects, 
// append a table to your web page and then add new rows of data for each UFO sighting

// Given data from data.js
var Sightings_Data = given_data;

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

// Using multiple input tags and/or select dropdowns, 
// write JavaScript code so the user can to set multiple filters based on table columns

// Listing all filters
var filter_list = {};

function Updating_Filters() {

  // Saving element, value, and id of a given filter that was changed by the user
  var Changed_Element = d3.select(this).select("input");
  var Element_Value = Changed_Element.property("value");
  var Filter_Id = Changed_Element.attr("id");

  // When a filter value is entered, add the Id and value to the filters list
  // Else, clear all filters from the filters list
  if (Element_Value) {
    filter_list[Filter_Id] = Element_Value;
  }
  else {
    delete filter_list[Filter_Id];
  }

  // Calling function to rebuild Sightings_Table according to filters
  Filtered_Sightings();

}

function Filtered_Sightings() {

  // Setting Filtered_Sightings to Sightings_Data
  let Filtered_Sightings = Sightings_Data;

  // Looping through all filters 
  // Keeping any data that matches the filter values
  Object.entries(filter_list).forEach(([filter, value]) => {
    Filtered_Sightings = Filtered_Sightings.filter(row => row[filter] === value);
  });

  // Finally, rebuild the table using the filtered Data
  Building_Table(Filtered_Sightings);
}

// Attach an event to listen for changes to each filter
d3.selectAll(".filter").on("change", Updating_Filters);

// Building original table when page loads
Building_Table(Sightings_Data);

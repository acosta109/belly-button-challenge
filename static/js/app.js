// URL variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Time to fetch the json data using D3
d3.json(url).then(function(data) {
    console.log(data)
});

//Initialise the dashboard and populate the drop down menu
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and populate the drop-down selector
    d3.json(url).then((data) => {
        
        // We are collecting the names from the json data. data is our dataset and names is the key value.
        // We can check this by openning the json file. 
        let names = data.names;

        // Now, we add the sample names we collected to the drop down menu. 
        names.forEach((id) => {

            // Log each iD
            console.log(id);
            //Finally, we add the IDs to the drop down menu. 
            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Set the first sample from the list
        let sample_one = names[0];

        // Log the value of sample_one
        console.log(sample_one);

        // Build the initial plots
       // buildMetadata(sample_one);
        buildBarChart(sample_one);
        //buildBubbleChart(sample_one);
        //buildGaugeChart(sample_one);

    });
};

function buildBarChart(sampleID){
    //Gather the data for this function
    d3.json(url).then((data) => {
        // First, we collect the samples data
        let samples = data.samples
        
        //Filter the data so it's just the ID we want.
        let value = samples.filter(result => result.id == sampleID); 


        //Get the first item with this value -- there should be only one TSBOO!
        let firstValue = value[0];

        let sampleValue = firstValue.sample_values;
        let otuID = firstValue.otu_ids;
        let otuLables = firstValue.otu_labels;

        //Log to console to ensure we got the correct data
        console.log(sampleValue, otuID, otuLables);

        // Set top ten items to display in descending order
        let yticks = otuID.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sampleValue.slice(0,10).reverse();
        let labels = otuLables.slice(0,10).reverse();


        let barGraph = {
            x : xticks,
            y : yticks, 
            labels: labels, 
            type: "bar",
            orientation: "h"
        };

        barData = [barGraph];
        Plotly.newPlot("bar", barData);
    });

};

//Now, we want to start the page with the initalised data.
init();




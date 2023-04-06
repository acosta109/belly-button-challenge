// URL variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Time to fetch the json data using D3
d3.json(url).then(function(data) {
    console.log(data)
});

// Initialise the dashboard at start up 
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and populate the drop-down selector
    d3.json(url).then((data) => {
        
        // Set a variable for the sample names
        let names = data.names;

        // Add  samples to dropdown menu
        names.forEach((id) => {

            // Validating
            console.log(id);
            //Make the drop down
            dropdownMenu.append("option").text(id).property("value",id);
        });

        // Set the first sample from the list
        let sample_one = names[0];

        // Log the value of sample_one
        console.log(sample_one);

        // Build the initial plots
        buildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one);
        //buildGaugeChart(sample_one);

    });
};

//Building the Metadata section
// We'll be working on this section "sample-metadata"
function buildMetadata(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Set the metadata to a variable
        let metadata = data.metadata;

        //Get the first item with this value -- there should be only one TSBOO!
        let value = metadata.filter(result => result.id == sample);

        // Check to make sure we got the data
        console.log(value)

        // Get the first index from the array
        let firstData = value[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(firstData).forEach(([key,value]) => {

            // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

// Here, we're building the bar chart
function buildBarChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all sample data
        let sampleInfo = data.samples;

        //Get the first item with this value -- there should be only one TSBOO!
        let value = sampleInfo.filter(result => result.id == sample);

       
        let firstData = value[0];

        // Get the data we want to display
        let otu_ids = firstData.otu_ids;
        let otu_labels = firstData.otu_labels;
        let sample_values = firstData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);

        // Set top ten items to display in descending order
        let xticks = sample_values.slice(0,10).reverse();
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        // Set up the trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };
        let graphData = [trace]
        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", graphData)
    });
};

// Function that builds the bubble chart
function buildBubbleChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        
        // Retrieve all sample data
        let sampleInfo = data.samples;

        //Get the first item with this value -- there should be only one TSBOO!
        let value = sampleInfo.filter(result => result.id == sample);

        let firstData = value[0];

        // Get the graph data
        let otu_ids = firstData.otu_ids;
        let otu_labels = firstData.otu_labels;
        let sample_values = firstData.sample_values;

        // Checking data
        console.log(otu_ids,otu_labels,sample_values);
        
        // Make chart data
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Layout
        let layout = {
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };
        let graphData = [trace1]
        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", graphData, layout)
    });
};

//Last, but certainly not least, we want to update the graphs when we 
//change the dropdown menu value

function optionChanged(value) { 
    // Check to make sure we are switching values
    console.log(value); 

    //Change everything accordingly 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
};


//Now, we want to start the page with the initalised data.
init();




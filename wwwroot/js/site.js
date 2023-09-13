var table;

// var updateIcon = function(cell, formatterParams){ 
//     return "<i class='fa-solid fa-user-pen'></i>";
// };
//custom formatter definition
var printIcon = function(cell, formatterParams, onRendered){ //plain text value
    var icon = document.createElement("i");
    icon.classList.add("fa", "fa-print");
    icon.style.cursor = "pointer";

    icon.addEventListener("click", function(e){
        e.stopPropagation(); // Stop the event from propagating to the cell
        alert("sandeep");
    });

    return icon;
};


$(document).ready(function(){  
    table = new Tabulator("#tblDepartment", 
    {
        //enable responsive layouts
        responsiveLayout:true, 
        //fit columns to width of table
        //layout: "fitColumns",
        //table is Fitted According to the data
        //layout:"fitDataTable",
        //To move the column
        movableColumns:true,
        //To Apply The Features For all the columns globally 
        columnDefaults:{
            //show tool tips on cells
            tooltip:true, 
            //maximum column width of  150 px for all columns
            width:180, 
        },
        resizableRows: false,
        ajaxURL: "https://localhost:7093/Department/fetchDepartments",
        ajaxConfig: "get",
        columns: [
            //To enable the check box column
            {
                formatter:"rowSelection",
                titleFormatter:"rowSelection", 
                hozAlign:"center", 
                // width:50,
                headerSort:false, 
                    cellClick:function(e, cell){
                        cell.getRow().toggleSelect();
                    }
            },
            {   
                title: "DepartmentId", 
                field:"departmentId", 
                // width:200,
                hozAlign: "left", 
                //tool tip for the header or title name
                headerTooltip: "Department Id",
                //To fllter the data ,But it is not filter like start with A not like that //If a existed in the word it will filter the data
                headerFilter: "input",    
            },
            {
                title: "DepartmentName", 
                field:"departmentName",
                // width:200,
                hozAlign: "left",  //align the text to the left
                headerFilter: "input",//filter the data in header
                editor:"input",//To edit the data it willl act like a input filed
                editor:true,
                /*To Do the Validation inside the tabulator only
                editorParams: {
                    // Add validatorParams with custom error messages
                    validatorParams: {
                        min: 3,
                        max: 20,
                        string: {
                            messages: {
                                min: "Please enter at least 3 characters.",
                                max: "Please enter at most 20 characters.",
                                string: "Please enter a valid string."
                            }
                        }
                    }
                },
                validator: ["min:3", "max:20", "string"]*/
            },
            {
                title:"Update",
        formatter: printIcon,
        width: 40,
        hozAlign: "center",
            },
            // {
            //     title: "Update",
            //     formatter: "html",
            //     // width: 200, 
            //     hozAlign: "center",
            //     // cellClick:function(e, cell)
            //     // {
            //     //     var selectedRows = cell.getTable().getSelectedRows(); // Get selected rows from the table
            //     //     if (selectedRows.length !== 1) {
            //     //         alert("Please select a single row for update.");
            //     //         return;
            //     //     }
            //     //     var rowData = selectedRows[0].getData();
            //     //     console.log(rowData);
            //     //     updateButtonClicked(rowData);
            //     // },
            //     formatter: printIcon,
            //     cellClick: function(e, cell){
            //         e.stopPropagation(); // Stop the event from propagating to the cell
            //     }
            //     // formatter:updateIcon, width:40, hozAlign:"center", cellClick:function(e, cell){alert("Printing row data for: " + cell.getRow().getData().name)}
            //     // formatter:updateIcon, width:40, hozAlign:"center"
            // },

            //Generate print icon
            

            // {
            //     title: "Update",
            //     // formatter:,
            //     width:100, 
            //     hozAlign:"center", 
            //     cellClick:function(e, cell)
            //     {
            //         var a = document.querySelector("i").classList.contains("fa-pencil");
            //         alert(a);
            //         var selectedRows = cell.getTable().getSelectedRows(); // Get selected rows from the table
            //         if (selectedRows.length !== 1) {
            //             alert("Please select a single row for update.");
            //             return;
            //         }
            //         var rowData = selectedRows[0].getData();
            //         console.log(rowData);
            //         updateButtonClicked(rowData);
            //     }
            // },
            {
                title: "Delete",
                formatter: function(cell, formatterParams, onRendered) {
                    var data = cell.getRow().getData();
                    var button = document.createElement("button");
                    /*button.classList.add("btn", "btn-primary", "delete-btn");
                    button.innerText = "Delete";*/
                    const icon = document.createElement("i");
                    icon.classList.add("fa-solid","fa-pen");// Add classes for the desired icon

                     // Append the icon element to the button
                    button.appendChild(icon);

                    button.addEventListener("click", function() 
                    {
                        var selectedRows = table.getSelectedRows();
                        if (selectedRows.length === 0) {
                            alert("Please select checkboxes before deleting.");
                        return;
                        }
                        var selectedData = selectedRows.map(function(row) {
                            return row.getData();
                        });
                        deleteButtonClicked(selectedData);
                    });
                    return button;
                }
            },
        ],
        footerElement:"<p>Sandeep ©2023</p>", //add a custom button to the footer element    
    });
});


// var editIcon = function(cell, formatterParams, onRendered)
// {
//     updateButtonClicked();
//     return '<i class="fa-solid fa-pencil" style="color: #1f514e;"></i>';
// }


// function updateButtonClicked() 
// {
//     var departmentName = rowData.departmentName;
//     alert('update button clicked');
//     console.log(departmentName);
    
// }


// Function to handle the delete button click event
function deleteButtonClicked(selectedData) 
{
    // Perform delete operation for each selected data object
    selectedData.forEach(function(data) 
    {
        alert("Deleting data with DepartmentId: " + data.departmentId);
    });
}

/*
Printing button adding a icon to them.
{formatter:printIcon, width:40, hozAlign:"center", cellClick:function(e, cell){alert("Printing row data for: " + cell.getRow().getData().name)}},
//custom formatter definition
var printIcon = function(cell, formatterParams, onRendered){
    return '<i class="fa-thin fa-print"></i>';
};*/


// document.getElementById("icons").addEventListener("click", function() {
//     alert('icon working');
// });
// table selector flags
var employees = false;
var locations = false;
var departments = false;
var departments_array = [];
var locations_array = [];
var char_array = [];

// Lists all employees names upon selection
function displayAllEmployees() {
    $.ajax({
        url: "libs/php/getAllEmployees.php",
        type: 'GET',
        dataType: 'json',
        success: function(result){
            if(result.status.code == 200){
                emptyTable("#table-main");
                console.log(result);
                emptyArray(char_array);
                var alphabetChar = result['data'][0]['lastName'].charAt(0).toUpperCase();
                char_array.push(alphabetChar);
                $("#table-main").append('<tr class="rows filter" style="background-color:grey;"><th align="left" scope="row" style="background-color: grey;">' + '</th><td style="text-align: center;">' + alphabetChar + '</td></tr>');
                for(let i = 0 ; i < Object.keys(result['data']).length ; i++){
                    $("#table-main").append('<tr class="rows"><th align="left" scope="row">' + '</th><td>' + result['data'][i]['lastName'] + " " + result['data'][i]['firstName'] + '</td></tr>');
                    if(alphabetChar != result['data'][i]['lastName'].charAt(0).toUpperCase()){
                        $("#table-main").append('<tr class="rows filter" style="background-color:grey;"><th align="left" scope="row" style="background-color: grey">' + '</th><td style="text-align: center;">' + result['data'][i]['lastName'].charAt(0).toUpperCase() + '</td></tr>');
                        alphabetChar = result['data'][i]['lastName'].charAt(0).toUpperCase();
                        char_array.push(alphabetChar)
                    }
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Database error: ${textStatus}`);
        }
    });
}

// Lists all employees names filtered by location
function displayAllEmployeesWithLocationFilter() {
    $.ajax({
        url: "libs/php/getEmployeesByLocation.php",
        type: 'GET',
        dataType: 'json',
        success: function(result){
            console.log(result);
            if(result.status.code == 200){
                emptyArray(locations_array);
                console.log(result);
                emptyTable("#table-main");
                var locName = result['data'][0]['name'];
                locations_array.push(result['data'][0]['name']);
                $("#table-main").append('<tr class="rows filter" style="background-color:grey;"><th align="left" scope="row" style="background-color: grey;">' + '</th><td style="text-align: center;">' + result['data'][0]['name'] + '</td></tr>');
                for(let i = 0 ; i < Object.keys(result['data']).length ; i++){
                    if(locName != result['data'][i]['name']){
                        $("#table-main").append('<tr class="rows filter" style="background-color:grey;"><th align="left" scope="row" style="background-color: grey">' + '</th><td style="text-align: center;">' + result['data'][i]['name'] + '</td></tr>');
                        locName = result['data'][i]['name'];
                        locations_array.push(locName)
                    }
                    $("#table-main").append('<tr class="rows"><th align="left" scope="row">' + '</th><td>' + result['data'][i]['lastName'] + " " + result['data'][i]['firstName'] + '</td></tr>');
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Database error: ${textStatus}`);
        }
    });
}

// Lists all employees names filtered by department
function displayAllEmployeesWithDepartmentFilter() {
    $.ajax({
        url: "libs/php/getEmployeesByDepartment.php",
        type: 'GET',
        dataType: 'json',
        success: function(result){
            console.log(result);
            if(result.status.code == 200){
                emptyArray(departments_array);
                console.log(result);
                emptyTable("#table-main");
                var dptName = result['data'][0]['name'];
                departments_array.push(result['data'][0]['name']);
                $("#table-main").append('<tr class="rows filter" style="background-color:grey;"><th align="left" scope="row" style="background-color: grey;">' + '</th><td style="text-align: center;">' + result['data'][0]['name'] + '</td></tr>');
                for(let i = 0 ; i < Object.keys(result['data']).length ; i++){
                    if(dptName != result['data'][i]['name']){
                        $("#table-main").append('<tr class="rows filter" style="background-color:grey;"><th align="left" scope="row" style="background-color: grey">' + '</th><td style="text-align: center;">' + result['data'][i]['name'] + '</td></tr>');
                        dptName = result['data'][i]['name'];
                        departments_array.push(dptName)
                    }
                    $("#table-main").append('<tr class="rows"><th align="left" scope="row">' + '</th><td>' + result['data'][i]['lastName'] + " " + result['data'][i]['firstName'] + '</td></tr>');
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Database error: ${textStatus}`);
        }
    });
}

// Lists all departments names
function displayAllDepartments() {
    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: 'GET',
        dataType: 'json',
        success: function(result){
            console.log(result);
            if(result.status.code == 200){
                emptyTable("#table-main");
                for(let i = 0 ; i < Object.keys(result['data']).length ; i++){
                    $("#table-main").append('<tr class="rows"><th align="left" scope="row">' + '</th><td>' + result['data'][i]['name'] + '</td></tr>');
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Database error: ${textStatus}`);
        }
    });
}

// Lists all locations names
function displayAllLocations() {
    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: 'GET',
        dataType: 'json',
        success: function(result){
            console.log(result);
            if(result.status.code == 200){
                emptyTable("#table-main");
                for(let i = 0 ; i < Object.keys(result['data']).length ; i++){
                    $("#table-main").append('<tr class="rows"><th align="left" scope="row">' + '</th><td>' + result['data'][i]['name'] + '</td></tr>');
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Database error: ${textStatus}`);
        }
    });
}

// Retrieves all employee details and returns them in a modal pop up
function getEmployeeDetails(firstName, lastName) {
    $.ajax({
        url: "libs/php/getEmployeeDetails.php",
        type: 'POST',
        dataType: 'json',
        data: {
            firstName: firstName,
            lastName: lastName
        },
        success: function(result){
            //console.log("employee details");
            if(result.status.code == 200){
                console.log(result);
                emptyTable('#table-details');
                $('#table-details').append('<tr><th align="left" scope="row">ID</th><td id="details-id">' + result['data'][0]['id'] +'</td></tr>');
                $('#table-details').append('<tr><th align="left" scope="row">First name</th><td id="details-first">' + result['data'][0]['firstName'] +'</td></tr>');
                $('#table-details').append('<tr><th align="left" scope="row">Last name</th><td id="details-last">' + result['data'][0]['lastName'] +'</td></tr>');
                $('#table-details').append('<tr><th align="left" scope="row">Email address</th><td id="details-email">' + result['data'][0]['email'] +'</td></tr>');
                if(result['data'][0]['jobTitle'] == ""){
                    $('#table-details').append('<tr><th align="left" scope="row">Job title</th><td id="details-title">' + "Unspecified" +'</td></tr>');
                }else {
                    $('#table-details').append('<tr><th align="left" scope="row">Job title</th><td id="details-title">' + result['data'][0]['jobTitle'] +'</td></tr>');
                }
                $('#table-details').append('<tr><th align="left" scope="row">Department</th><td id="details-department">' + result['data'][0]['department'] +'</td></tr>');
                $('#table-details').append('<tr><th align="left" scope="row">Location</th><td id="details-location">' + result['data'][0]['location'] +'</td></tr>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
           // console.log("employee failure");
            alert(`Database error: ${textStatus}`);
        }
    });
    $('#employeeModal').modal('show');
}

// Retrieves all department details and returns them in a modal pop up
function getDepartmentDetails(departmentName) {
    $.ajax({
        url: "libs/php/getDepartmentDetails.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: departmentName,
        },
        success: function(result){
            console.log(result);
            if(result.status.code == 200){
                console.log(result);
                emptyTable('#table-dpt-details');
                $('#table-dpt-details').append('<tr><th align="left" scope="row">ID</th><td id="details-dpt-id">' + result['data'][0]['id'] +'</td></tr>');
                $('#table-dpt-details').append('<tr><th align="left" scope="row">Department name</th><td id="details-dpt-name">' + result['data'][0]['department'] +'</td></tr>');
                $('#table-dpt-details').append('<tr><th align="left" scope="row">Location</th><td id="details-dpt-location">' + result['data'][0]['name'] +'</td></tr>');
                $('#table-dpt-details').append('<tr><th align="left" scope="row">Num of employees</th><td id="details-dpt-employees">' + result['data'][0]['employees'] +'</td></tr>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            //console.log("department failure");
            alert(`Database error: ${textStatus}`);
        }
    });
    $('#departmentModal').modal('show');
}

// Retrieves all location details and returns them in a modal pop up
function getLocationDetails(locationName) {
    $.ajax({
        url: "libs/php/getLocationDetails.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: locationName,
        },
        success: function(result){
            console.log(result);
            if(result.status.code == 200){
                console.log(result);
                emptyTable('#table-loc-details');
                $('#table-loc-details').append('<tr><th align="left" scope="row">ID</th><td id="details-loc-id">' + result['data'][0]['id'] +'</td></tr>');
                $('#table-loc-details').append('<tr><th align="left" scope="row">City</th><td id="details-loc-name">' + result['data'][0]['name'] +'</td></tr>');
                $('#table-loc-details').append('<tr><th align="left" scope="row">Departments</th><td id="details-loc-locations">' + result['data'][0]['departments'] +'</td></tr>');
                $('#table-loc-details').append('<tr><th align="left" scope="row">Employees</th><td id="details-loc-employees">' + result['data'][0]['employees'] +'</td></tr>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Database error: ${textStatus}`);
        }
    });
    $('#locationModal').modal('show');
}

// Retrieves all departments
function getAllDepartments() {
    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: 'GET',
        dataType: 'json',
        success: function(result){
            console.log(result);
            if(result.status.code == 200){
                emptySelect("#select-department-edit");
                for(let i = 0 ; i < Object.keys(result['data']).length ; i++){
                    $("#select-department-edit").append('<option value=' + result['data'][i]['id'] + '>' + result['data'][i]['name'] + '</option>');
                    if(result['data'][i]['name'] == $('#details-department').html()){
                        $('#select-department-edit').val(result['data'][i]['id']);
                    }
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Database error: ${textStatus}`);
        }
    });
}

// Gets all departments and puts them into employee addition modal
function populateAllDepartments() {
    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: 'GET',
        dataType: 'json',
        success: function(result){
            console.log(result);
            if(result.status.code == 200){
                emptySelect("#select-department-add");
                for(let i = 0 ; i < Object.keys(result['data']).length ; i++){
                    $("#select-department-add").append('<option value=' + result['data'][i]['locationID'] + '>' + result['data'][i]['name'] + '</option>');
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Database error: ${textStatus}`);
        }
    });
    $('#addEmployeeModal').modal('show');
}

// Gets all departments and puts them into employee addition modal
function populateAllLocations() {
    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: 'GET',
        dataType: 'json',
        success: function(result){
            console.log(result);
            if(result.status.code == 200){
                emptySelect("#select-location-add-dpt");
                for(let i = 0 ; i < Object.keys(result['data']).length ; i++){
                    $("#select-location-add-dpt").append('<option value=' + result['data'][i]['id'] + '>' + result['data'][i]['name'] + '</option>');
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Database error: ${textStatus}`);
        }
    });
    $('#addDepartmentModal').modal('show');
}

// Retrieves all locations
function getAllLocations() {
    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: 'GET',
        dataType: 'json',
        success: function(result){
            console.log(result);
            if(result.status.code == 200){
                emptySelect("#select-dpt-location-edit");
                for(let i = 0 ; i < Object.keys(result['data']).length ; i++){
                    $("#select-dpt-location-edit").append('<option value=' + result['data'][i]['id'] + '>' + result['data'][i]['name'] + '</option>');
                    if(result['data'][i]['name'] == $('#details-dpt-location').html()){
                        $('#select-dpt-location-edit').val(result['data'][i]['id']);
                    }
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Database error: ${textStatus}`);
        }
    });
}

// Deletes employee record
function deleteEmployee(employeeID) {
    $.ajax({
        url: "libs/php/deleteEmployeeByID.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: employeeID
        },
        success: function(result){
            if(result.status.code == 200){
                console.log(result);
                $('#confirmModal').modal('show');
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Database error: ${textStatus}`);
        }
    });
}

// Deletes department record
function deleteDepartment(departmentID) {
    $.ajax({
        url: "libs/php/deleteDepartmentByID.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: departmentID
        },
        success: function(result){
            if(result.status.code == 200){
                console.log(result);
                $('#confirmModal').modal('show');

            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Database error: ${textStatus}`);
        }
    });
}

// Deletes location record
function deleteLocation(locationID) {
    $.ajax({
        url: "libs/php/deleteLocationByID.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: locationID
        },
        success: function(result){
            if(result.status.code == 200){
                console.log(result);
                $('#confirmModal').modal('show');
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Database error: ${textStatus}`);
        }
    });
}

// Empties array passed as argument
function emptyArray(array) {
    array.length = 0;
}

// Clears any table with ID passed as parameter
function emptyTable(tabID) {
    $(tabID).empty();
}

// Clears any select options with ID passed as parameter
function emptySelect(selectID) {
    $(selectID).empty();
}

// Determines if the checkbox with given id is checked by the user
function isBoxCheckedById(id) {
    if ($(id).prop("checked") == 0) {
        return false;
    } else {
        return true;
    }
}

function capitalize(str) 
{
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Populates and shows modal with edit employee details form
function showEmployeeDetailsForm(){
    $('#input-first-edit').val($('#details-first').html());
    $('#input-last-edit').val($('#details-last').html());
    $('#input-email-edit').val($('#details-email').html());
    $('#input-title-edit').val($('#details-title').html());
    getAllDepartments();
    $('#editModal').modal('show');
}

// Populates and shows modal with edit employee details form
function showDepartmentDetailsForm(){
    $('#input-dpt-edit').val($('#details-dpt-name').html());
    getAllLocations();
    $('#editDptModal').modal('show');
}

// Table click event handler
$(document).on("click","tr.rows td", function(e) {
    if(employees){
        if(!departments_array.includes(e.target.innerHTML) 
        && !locations_array.includes(e.target.innerHTML)
        && !char_array.includes(e.target.innerHTML)){
            console.log(e.target.innerHTML.split(" ").length);
            console.log(e.target.innerHTML);
            getEmployeeDetails(JSON.stringify(e.target.innerHTML.split(" ")[1]),
            JSON.stringify(e.target.innerHTML.split(" ")[0])
            );
        }
    }else if(departments){
        getDepartmentDetails(JSON.stringify(e.target.innerHTML));
    }else if(locations){
        getLocationDetails(JSON.stringify(e.target.innerHTML));
    }
});

// Edit record event handler
$(document).on("click", "#btn-edit", function(e) {
    if(employees){
        showEmployeeDetailsForm();
    }else if(departments){
        showDepartmentDetailsForm();
    }else if(locations){
        showLocationDetailsForm();
    }
});

// Delete record event handler
$(document).on("click", "#btn-delete", function(e) {
    if(employees){
        $('#deleteModal').modal('show');
    }else if(departments){
        $('#deleteModal').modal('show');
    }else if(locations){
        $('#deleteModal').modal('show');
    }
});

// Confirm delete of a record event handler
$(document).on("click", "#btn-confirm", function(e) {
    if(employees){
        deleteEmployee(JSON.stringify($('#details-id').html()));
        displayAllEmployees();
    }else if(departments){
        deleteDepartment(JSON.stringify($('#details-dpt-id').html()));
        displayAllDepartments();
    }else if(locations){
        deleteLocation(JSON.stringify($('#details-loc-id').html()));
        displayAllLocations();
    }
});

// Add record event handler
$(document).on("click", "#btn-add-record", function(e) {
    if(employees){
        populateAllDepartments();
    }else if(departments){
        populateAllLocations();
    }else if(locations){
        $('#addLocationModal').modal('show');
    }
});

// Confirm employee addition event handler
$(document).on("click", "#btn-add", function(e) {
    if(employees){
        displayAllEmployees();
    }else if(departments){
        displayAllDepartments();
    }else if(locations){
        displayAllLocations();
    }
});

// Populate locations in add employee modal
$(document).on("click", "#select-department-add", function(e) {
    $.ajax({
        url: "libs/php/getDepartmentLocations.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: JSON.stringify($('#select-department-add').val())
        },
        success: function(result){
            console.log(result);
            if(result.status.code == 200){
                emptySelect("#select-location-add");
                for(let i = 0 ; i < Object.keys(result['data']).length ; i++){
                    $("#select-location-add").append('<option value=' + result['data'][i]['id'] + '>' + result['data'][i]['name'] + '</option>');
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Database error: ${textStatus}`);
        }
    });
});

// Hide all modals even handler
$(document).on("click", "#btn-hide-modals", function(e) {
    $('.modal').modal('hide');
});

// Table filter base on search input field event handler
$(document).ready(function(){
    $("#input-name").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#table-main tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  }); 

// Resets employee edit modal form
$('#editModal').on('hidden.bs.modal', function() {
    $('#check-edit').prop("checked", false);
    $('#label-checkbox').css("text-decoration", "none");
});

// Resets add employee modal form
$('#addEmployeeModal').on('hidden.bs.modal', function() {
    $('#check-add').prop("checked", false);
    $('#form-add-employee').get(0).reset();
    $('#label-checkbox-add').css("text-decoration", "none");
});

// Resets add department modal form
$('#addDepartmentModal').on('hidden.bs.modal', function() {
    $('#check-dpt-edit').prop("checked", false);
    $('#form-add-department').get(0).reset();
    $('#label-checkbox-dpt-add').css("text-decoration", "none");
});

// Resets add location modal form
$('#addLocationModal').on('hidden.bs.modal', function() {
    $('#check-loc-edit').prop("checked", false);
    $('#form-add-location').get(0).reset();
    $('#label-checkbox-loc-add').css("text-decoration", "none");
});

// Resets department edit modal form
$('#editDptModal').on('hidden.bs.modal', function() {
    $('#check-dpt-edit').prop("checked", false);
    $('#label-checkbox-dpt-add').css("text-decoration", "none");
});

// Defaults employee checkbox text
$(document).on("change", "#check-edit", function(e) {
    $('#label-checkbox').css("text-decoration", "none");
}); 

// Defaults employee add checkbox text
$(document).on("change", "#check-add", function(e) {
    $('#label-checkbox-add').css("text-decoration", "none");
}); 

// Defaults employee add checkbox text
$(document).on("change", "#check-dpt-add", function(e) {
    $('#label-checkbox-dpt-add').css("text-decoration", "none");
}); 

// Defaults department checkbox text
$(document).on("change", "#check-dpt-edit", function(e) {
    $('#label-dpt-checkbox').css("text-decoration", "none");
}); 

// Loads employees
$(document).on("click", "#employees", function(e) {
    employees = true;
    locations = false;
    departments = false;
    $('#selected-only').show();
    $('#employees-dropdown-only').show();
    $('#nav-search').show();
    displayAllEmployees();
});

// Loads departments
$(document).on("click", "#departments", function(e) {
    employees = false;
    locations = false;
    departments = true;
    $('#selected-only').show();
    $('#employees-dropdown-only').hide();
    $('#nav-search').show();
    displayAllDepartments();
});

// Loads Locations
$(document).on("click", "#locations", function(e) {
    employees = false;
    locations = true;
    departments = false;
    $('#selected-only').show();
    $('#employees-dropdown-only').hide();
    $('#nav-search').show();
    displayAllLocations();
});

// Loads employees with department filter
$(document).on("click", "#location-filter", function(e) {
    employees = true;
    locations = false;
    departments = false;
    displayAllEmployeesWithLocationFilter();
});

// Loads employees with department filter
$(document).on("click", "#department-filter", function(e) {
    employees = true;
    locations = false;
    departments = false;
    displayAllEmployeesWithDepartmentFilter();
});

// Loads employees with employee last name filter
$(document).on("click", "#employee-filter", function(e) {
    employees = true;
    locations = false;
    departments = false;
    displayAllEmployees();
});

// Updates employee record upon confirmation
$(document).on("click", "#btn-update-edit", function() {
    if(isBoxCheckedById('#check-edit')){
        $.ajax({
            url: "libs/php/updateEmployeeDetails.php",
            type: 'POST',
            dataType: 'json',
            data: {
                first: JSON.stringify(capitalize($('#input-first-edit').val())),
                last: JSON.stringify(capitalize($('#input-last-edit').val())),
                email: JSON.stringify($('#input-email-edit').val()),
                job: JSON.stringify(capitalize($('#input-title-edit').val())),
                depID: JSON.stringify($("#select-department-edit").val()),
                id: JSON.parse($('#details-id').html())
            },
            success: function(result){
                if(result.status.code == 200){
                    console.log(result);
                    displayAllEmployees();
                    $('#editModal').modal('hide');
                    $('#check-edit').prop("checked", false);
                    getEmployeeDetails(JSON.stringify(capitalize($('#input-first-edit').val())),
                    JSON.stringify(capitalize($('#input-last-edit').val())));
                    $('#editModal').modal({refresh: true});
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert(`Database error: ${errorThrown}`);
            }
        });
    }else {
        $('#label-checkbox').css("text-decoration", "underline");
        $('#label-checkbox').css("text-decoration-color", "red");
    }
});

// Updates department record upon confirmation
$(document).on("click", "#btn-dpt-update-edit", function() {
    if(isBoxCheckedById('#check-dpt-edit')){
        $.ajax({
            url: "libs/php/updateDepartmentDetails.php",
            type: 'POST',
            dataType: 'json',
            data: {
                name: JSON.stringify(capitalize($('#input-dpt-edit').val())),
                locationID: JSON.stringify($('#select-dpt-location-edit').val()),
                id: JSON.parse($('#details-dpt-id').html())
            },
            success: function(result){
                console.log(JSON.stringify($('#select-dpt-location-edit').val()));
                if(result.status.code == 200){
                    console.log(result);
                    displayAllDepartments();
                    $('#editDptModal').modal('hide');
                    $('#check-dpt-edit').prop("checked", false);
                    getDepartmentDetails(JSON.stringify($('#input-dpt-edit').val()));
                    $('#editDptModal').modal({refresh: true});
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert(`Database error: ${errorThrown}`);
            }
        });
    }else {
        $('#label-dpt-checkbox').css("text-decoration", "underline");
        $('#label-dpt-checkbox').css("text-decoration-color", "red");
    }
});

// Add new employee
$(document).on("click", "#btn-add", function() {
    if(isBoxCheckedById('#check-add')){
        $.ajax({
            url: "libs/php/addEmployee.php",
            type: 'POST',
            dataType: 'json',
            data: {
                first: JSON.stringify(capitalize($('#input-first-add').val())),
                last: JSON.stringify(capitalize($('#input-last-add').val())),
                email: JSON.stringify($('#input-email-add').val().trim()),
                job: JSON.stringify(capitalize($('#input-title-add').val())),
                depName: JSON.stringify($("#select-department-add option:selected").text())
            },
            success: function(result){
                if(result.status.code == 200){
                    console.log(result);
                    displayAllEmployees();
                    $('#addEmployeeModal').modal('hide');
                    $('#check-add').prop("checked", false);
                    getEmployeeDetails(JSON.stringify(capitalize($('#input-first-add').val())),
                    JSON.stringify(capitalize($('#input-last-add').val())));
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert(`Database error: ${errorThrown}`);
            }
        });
    }else {
        $('#label-checkbox-add').css("text-decoration", "underline");
        $('#label-checkbox-add').css("text-decoration-color", "red");
    }
});

// Add new department
$(document).on("click", "#btn-dpt-add", function() {
    if(isBoxCheckedById('#check-dpt-add')){
        $.ajax({
            url: "libs/php/addDepartment.php",
            type: 'POST',
            dataType: 'json',
            data: {
                name: JSON.stringify(capitalize($('#input-dpt-name-add').val())),
                locID: JSON.stringify($('#select-location-add-dpt').val())
            },
            success: function(result){
                if(result.status.code == 200){
                    console.log(result);
                    displayAllDepartments();
                    $('#addDepartmentModal').modal('hide');
                    $('#check-dpt-add').prop("checked", false);
                    getDepartmentDetails(JSON.stringify(capitalize($('#input-dpt-name-add').val())));
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert(`Database error: ${errorThrown}`);
            }
        });
    }else {
        $('#label-checkbox-dpt-add').css("text-decoration", "underline");
        $('#label-checkbox-dpt-add').css("text-decoration-color", "red");
    }
});

// Add new location
$(document).on("click", "#btn-loc-add", function() {
    if(isBoxCheckedById('#check-loc-add')){
        $.ajax({
            url: "libs/php/addLocation.php",
            type: 'POST',
            dataType: 'json',
            data: {
                name: JSON.stringify(capitalize($('#input-loc-name-add').val()))
            },
            success: function(result){
                if(result.status.code == 200){
                    console.log(result);
                    displayAllLocations();
                    $('#addLocationModal').modal('hide');
                    $('#check-loc-add').prop("checked", false);
                    getLocationDetails(JSON.stringify(capitalize($('#input-loc-name-add').val())));
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert(`Database error: ${errorThrown}`);
            }
        });
    }else {
        $('#label-checkbox-loc-add').css("text-decoration", "underline");
        $('#label-checkbox-loc-add').css("text-decoration-color", "red");
    }
});

// Login load
function init(){
    $('#navbar').hide();
    $('#selected-only').hide();
    $('#nav-search').hide();
    $('#employees-dropdown-only').hide();
    $('#modalLoginForm').modal('show');
}

// Add new location
$(document).on("click", "#btn-login", function() {
        $.ajax({
            url: "libs/php/authenticate.php",
            type: 'GET',
            dataType: 'json',
            success: function(result){
                console.log(result);
                if(result.status.code == 200){
                    console.log(result);
                    if($('#login-input').val() == result['data'][0]['login'] && $('#password-input').val() == result['data'][0]['password']){
                        $('#navbar').show();
                        $('#modalLoginForm').modal('hide');
                        $('#login-launch').hide();
                    }
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert(`Database error: ${errorThrown}`);
            }
        });
    
});

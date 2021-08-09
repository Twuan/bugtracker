
async function checkAccess () {
    return new Promise ((resolve, reject) => {
        var params = "process=checkAccess";

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'process.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        var result = null;

        xhr.onload = function(){
            var reply = JSON.parse(this.responseText);
            if (reply.error != '') {
                alert('Error!');
            }
            else {  
                result = reply.role;
                resolve(result);
            }
        }
        xhr.send(params);
    });
    // return result;
}
// async function test () {
//     var x = await checkAccess();
//     console.log(x);
// }
// test();

var projectsBody = document.querySelector('#projects tbody');

// edit ticket project id (name)
function editTicketprojectIdOnClick(e) {
    var editTicketprojectIdSelect = e;
    
    var params = "process=getProjectIdsAndNames";

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'process.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        if (this.responseText == "Error!") {
            alert('Error!');
        }
        else {                    
            returnedData = JSON.parse(this.responseText);
            editTicketprojectIdSelect.innerHTML = '<option value="">--choose a project--</option>'
            for (var i = 0; i < Object.keys(returnedData).length; i++) {
                editTicketprojectIdSelect.innerHTML += 
                `<option value="` + returnedData[i].id + `">` + returnedData[i].id + `-` + returnedData[i].project + `</option>` ;
            }  
            editTicketprojectIdSelect.value = editTicketprojectIdSelect.closest('td').getAttribute('data-project-id');
        }
    }
    xhr.send(params);
}

// new table editing
function rowEditing (e) {
    if (!e.target.classList.contains('edit-ticket')) {
        return;
    }
    var td = e.target.closest('tr').querySelectorAll('td');
    var values = [];

    for (var i = 0; i < td.length; i++){
        td[i].setAttribute('data-original-value', td[i].innerHTML);
    }

    // editable indexes 1, 4, 5, 6, 7. 8
    td[1].innerHTML = `
        <select class="edit-ticket-project-id" name="edit-ticket-project-id" form="edit-ticket-form" style="width: 100%;" data-clicked="no" required>
            <option value="">--choose a project--</option>
        </select>
    `;
    td[4].innerHTML = `
        <select class="edit-ticket-type" name="edit-ticket-type" form="edit-ticket-form" style="width: 100%;" required>
            <option value="">--choose a type--</option>
            <option value="issue">issue</option>
            <option value="comment">comment</option>
            <option value="other">other</option>
        </select>
    `
    td[5].innerHTML = `
        <select class="edit-ticket-priority" name="edit-ticket-priority" form="edit-ticket-form" style="width: 100%;" required>
            <option value="">--choose a priority--</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>
    `
    td[6].innerHTML = `
        <textarea class="edit-ticket-description" name="edit-ticket-description" form="edit-ticket-form" style="width: 100%;" placeholder="Enter description" required>
        </textarea>
    `
    td[7].innerHTML = `
        <select class="edit-ticket-status" name="edit-ticket-status" form="edit-ticket-form" style="width: 100%;" required>
            <option value="">--choose status--</option>
            <option value="new">New</option>
            <option value="open">Open</option>
            <option value="in progress">In progress</option>
            <option value="resolved">Resolved</option>
            <option value="needs additional info">Needs additional info</option>
        </select>
    `
    td[8].innerHTML = `
        <select class="edit-ticket-assigned-technician" name="edit-ticket-assigned-technician" form="edit-ticket-form" style="width: 100%;" required>
            <option value="">--choose a technician--</option>
            <option value="tech">tech</option>
        </select>
    `
    editTicketprojectIdOnClick(e.target.closest('tr').querySelector('.edit-ticket-project-id'));
    getUsers(e.target.closest('tr').querySelector('.edit-ticket-assigned-technician')); 

    // td[1].querySelector('select').value = td[1].getAttribute('data-project-id');    
    td[4].querySelector('select').value = td[4].getAttribute('data-original-value');
    td[5].querySelector('select').value = td[5].getAttribute('data-original-value');
    td[6].querySelector('textarea').innerHTML = td[6].getAttribute('data-original-value');
    td[7].querySelector('select').value = td[7].getAttribute('data-original-value');
    // td[8].querySelector('select').value = td[8].getAttribute('data-original-value');
    
    var tr = td[0].closest('tr');
    tr.querySelector('.edit-ticket').style.display = 'none';
    tr.querySelector('.delete').style.display = 'none';
    tr.querySelector('.edit-ticket-cancel').style.display = 'inline';
    tr.querySelector('.edit-ticket-submit').style.display = 'inline';

}
function editTicketCancelOnClick (e) {
    if (!e.target.classList.contains('edit-ticket-cancel')) {
        return;
    }
    var tr = e.target.closest('tr');
    var td = e.target.closest('tr').querySelectorAll('td');
    td[1].innerHTML = td[1].getAttribute('data-original-value');
    td[4].innerHTML = td[4].getAttribute('data-original-value');
    td[5].innerHTML = td[5].getAttribute('data-original-value');
    td[6].innerHTML = td[6].getAttribute('data-original-value');
    td[7].innerHTML = td[7].getAttribute('data-original-value');
    td[8].innerHTML = td[8].getAttribute('data-original-value');

    tr.querySelector('.edit-ticket-submit').style.display = 'none';
    tr.querySelector('.edit-ticket-confirm').style.display = 'none';
    tr.querySelector('.edit-ticket-yes').style.display = 'none';    
    tr.querySelector('.edit-ticket-no').style.display = 'none';
    tr.querySelector('.edit-ticket-cancel').style.display = 'none';
    tr.querySelector('.edit-ticket').style.display = 'inline';
    tr.querySelector('.delete').style.display = 'inline';
}
// edit-ticket-submit on click
function editTicketSubmitOnClick (e) {
    if (!e.target.classList.contains('edit-ticket-submit')) {
        return;
    }
    e.preventDefault();
    var tr = e.target.closest('tr');
    tr.querySelector('.edit-ticket-submit').style.display = 'none';
    tr.querySelector('.edit-ticket-confirm').style.display = 'inline';
    tr.querySelector('.edit-ticket-yes').style.display = 'inline';
    tr.querySelector('.edit-ticket-no').style.display = 'inline';
}
function editTicketNoOnClick (e) {
    if (!e.target.classList.contains('edit-ticket-no')) {
        return;
    }
    e.preventDefault();
    var tr = e.target.closest('tr');
    tr.querySelector('.edit-ticket-confirm').style.display = 'none';
    tr.querySelector('.edit-ticket-yes').style.display = 'none';    
    tr.querySelector('.edit-ticket-no').style.display = 'none';
    tr.querySelector('.edit-ticket-submit').style.display = 'inline';
}

function editTicketYesOnClick (e) {
    if (!e.target.classList.contains('edit-ticket-yes')) {
        return;
    }

    var tr = e.target.closest('tr');
    tr.querySelector('.edit-ticket-confirm').style.display = 'none';
    tr.querySelector('.edit-ticket-yes').style.display = 'none';    
    tr.querySelector('.edit-ticket-no').style.display = 'none';
    tr.querySelector('.edit-ticket-submit').style.display = 'inline';

    const editTicketYes = e.target;  

    const form = {
        id: editTicketYes.closest('tr').querySelector('.id'),
        projectId: editTicketYes.closest('tr').querySelector('.edit-ticket-project-id'),
        type: editTicketYes.closest('tr').querySelector('.edit-ticket-type'),
        priority: editTicketYes.closest('tr').querySelector('.edit-ticket-priority'),
        description: editTicketYes.closest('tr').querySelector('.edit-ticket-description'),
        status: editTicketYes.closest('tr').querySelector('.edit-ticket-status'),
        assignedTechnician: editTicketYes.closest('tr').querySelector('.edit-ticket-assigned-technician')
    }
    // if (form.projectId.value == null || form.projectId.value.trim() == "" 
    //     || form.type.value == null || form.type.value.trim() == ""
    //     || form.priority.value == null || form.priority.value.trim() == ""
    //     || form.description.value == null || form.description.value.trim() == ""
    //     || form.status.value == null || form.status.value.trim() == ""
    //     || form.status.value == null || form.status.value.trim() == "" 
    //     || form.assignedTechnician.value == null || form.assignedTechnician.value.trim() == "") {
        
    if (false) {
        alert("Fill out all fields.");
        
    } else {

        var params = "process=editTicket&id="+form.id.innerHTML+"&projectId="+form.projectId.value+"&type="
                    +form.type.value+"&priority="+form.priority.value+"&description="+form.description.value+"&status="+form.status.value+"&assignedTechnician="+form.assignedTechnician.value;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'process.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.onload = function() {
            if (JSON.parse(this.responseText).error != null) {
                var returned = JSON.parse(this.responseText);
                console.log(returned.error);
            }
            else {
                var returnedRow = JSON.parse(this.responseText);
                tr.querySelector('.edit-ticket-submit').style.display = 'none';
                tr.querySelector('.edit-ticket-cancel').style.display = 'none';
                tr.querySelector('.edit-ticket').style.display = 'inline';
                tr.querySelector('.delete').style.display = 'inline';
                td = editTicketYes.closest('tr').querySelectorAll('td');
                td[1].setAttribute('data-project-id', returnedRow.data.project_id);
                td[1].innerHTML = returnedRow.data.project_id + '-' + returnedRow.data.project;
                td[4].innerHTML = returnedRow.data.type;
                td[5].innerHTML = returnedRow.data.priority;
                td[6].innerHTML = returnedRow.data.description;
                td[7].innerHTML = returnedRow.data.status;
                td[8].setAttribute('data-assigned-technician-id', returnedRow.data.assigned_technician_id);
                td[8].innerHTML = returnedRow.data.assigned_technician_id + '-' + returnedRow.data.assigned_technician;
                alert('Ticket edited.')
                
            }
        }
        xhr.send(params);
    }
}
var ticketsBody = document.querySelector('#tickets tbody');
if (ticketsBody) {
    ticketsBody.addEventListener('click', rowEditing);
    ticketsBody.addEventListener('click', editTicketSubmitOnClick);
    ticketsBody.addEventListener('click', editTicketNoOnClick);
    ticketsBody.addEventListener('click', editTicketYesOnClick);
    ticketsBody.addEventListener('click', editTicketCancelOnClick);
}

// for nav bar
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

toggleButton.addEventListener('click', function() {
    navbarLinks.classList.toggle('active');
})

// start login/signup

const loginForm = document.querySelector("form.login");
const signupForm = document.querySelector("form.signup");
const loginLabel = document.querySelector("label.login");
const signupLabel = document.querySelector("label.signup");
const signupLink = document.querySelector(".signup-link a");
const loginText = document.querySelector(".title-text .login");
const signupText = document.querySelector(".title-text .signup");
const loginButton = document.querySelector(".login-button")
const signupButton = document.querySelector(".signup-button")

if(signupLabel) {
    signupLabel.onclick = (()=>{
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
    });
}
if(loginLabel) {
    loginLabel.onclick = (()=>{
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
    });
}
if(signupLink) {
    signupLink.onclick = (()=>{
        signupLabel.click();
        return false;
    });      
}
if(loginButton) {
    loginButton.onclick = ((e)=>{
        e.preventDefault();
        console.log("loginButton");
        const form = {
            loginUid: document.querySelector('.login-uid'),
            loginPassword: document.querySelector('.login-password')
        }

        var params = "process=login&loginUid="+form.loginUid.value+"&loginPassword="+form.loginPassword.value;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'process.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.onload = function(){  
            var reply = JSON.parse(this.responseText);        
            if (reply.error != '') {
                alert(reply.error);
            }
            else {
                if (reply.loggedIn == true) {
                    window.location.href = "welcome.php";
                }
                alert(reply.message);
            }
        }
        xhr.send(params);
    })
}
if(signupButton) {
    signupButton.onclick = ((e)=>{
        e.preventDefault();
        const form = {
            signupUid: document.querySelector('.signup-uid'),
            signupTemporaryPassword: document.querySelector('.signup-temporary-password'),
            signupPassword: document.querySelector('.signup-password'),
            signupConfirmPassword: document.querySelector('.signup-confirm-password')
        }

        var params = "process=signup&signupUid="+form.signupUid.value+"&signupTemporaryPassword="+form.signupTemporaryPassword.value+"&signupPassword="+form.signupPassword.value+"&signupConfirmPassword="+form.signupConfirmPassword.value;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'process.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.onload = function(){
            if (this.responseText.data != null) {
                alert('Error!');
            }
            else {                    
                var returned = JSON.parse(this.responseText);                
            }
        }
        xhr.send(params);
    })
}


// end signup/login

// for searchable table/table search functionality
function ticketsFilter() {
    var ticketsSearch = document.getElementById('tickets-search');

    if (ticketsSearch) {
        ticketsSearch.addEventListener("keyup", function (e) {
            const q = e.target.value.toLowerCase();
            var rows = document.querySelectorAll('#tickets .row');
            rows.forEach((row) => {
                row.querySelectorAll('td')[0].textContent.toLowerCase().startsWith(q)
                    || row.querySelectorAll('td')[1].textContent.toLowerCase().startsWith(q)
                    || row.querySelectorAll('td')[2].textContent.toLowerCase().startsWith(q)
                    || row.querySelectorAll('td')[3].textContent.toLowerCase().startsWith(q)
                    || row.querySelectorAll('td')[4].textContent.toLowerCase().startsWith(q)
                    || row.querySelectorAll('td')[5].textContent.toLowerCase().startsWith(q)
                    || row.querySelectorAll('td')[6].textContent.toLowerCase().startsWith(q)
                    || row.querySelectorAll('td')[7].textContent.toLowerCase().startsWith(q)
                    || row.querySelectorAll('td')[8].textContent.toLowerCase().startsWith(q)
                    ? row.style.display = "table-row"
                    : row.style.display = 'none';
            });
        })
    }
}
ticketsFilter();

function projectsFilter() {
    var projectsSearch = document.getElementById('projects-search');
    if (projectsSearch) {
        projectsSearch.addEventListener("keyup", function (e) {
            const q = e.target.value.toLowerCase();
            var rows = document.querySelectorAll('#projects .row');
            rows.forEach((row) => {
                console.log(row);
                row.querySelectorAll('td')[0].textContent.toLowerCase().startsWith(q)
                    || row.querySelectorAll('td')[1].textContent.toLowerCase().startsWith(q)
                    || row.querySelectorAll('td')[2].textContent.toLowerCase().startsWith(q)
                    || row.querySelectorAll('td')[3].textContent.toLowerCase().startsWith(q)
                    // || row.querySelectorAll('td')[4].textContent.toLowerCase().startsWith(q)
                    ? row.style.display = "table-row"
                    : row.style.display = 'none';
            });
        })
    }
}
projectsFilter();

// create add tickets row form
var newTicketForm = document.createElement("div");
newTicketForm.setAttribute('class', 'new-ticket-form-div');
newTicketForm.innerHTML = 
`
<form action="action" class="new-ticket-form" method="post">
    <div class="new-ticket-field"  id="new-ticket-login-uid">
    <input name="new-ticket-login-uid" type="text" placeholder="test" required>                  
    </div>
</form>
`;

// add div then form inside it and prevent default form submit action
// when submitted remove it and call add row

// begins add row
function addRow() {
}
var ticketsBody = document.querySelector('#tickets tbody');
var addTicketButton = document.getElementById('add-ticket');

var ticketsSearchTable = document.querySelector('.tickets-search-table');


// for adding form
if (addTicketButton) {
    addTicketButton.onclick = function () {
        var newTicketForm = document.createElement("tr");
        newTicketForm.setAttribute('class', 'new-ticket-form-div');
        newTicketForm.innerHTML = 
        `    
        <tr>
            <td>                 
            </td>
            <td class="new-ticket-field"  id="new-ticket-project-id-td">
                <select class="new-ticket-project-id" name="new-ticket-project-id" type="text" form="new-ticket-form" data-clicked="no" style="width: 100%;" required>
                <option value="">--choose a project--</option>
                </select>                  
            </td>
            <td>
            </td>
            <td>
            </td>
            <td class="new-ticket-field id="new-ticket-type-td>
                <select class="new-ticket-type" name="new-ticket-type" form="new-ticket-form" style="width: 100%;" required>
                    <option value="">--choose a type--</option>
                    <option value="issue">issue</option>
                    <option value="comment">comment</option>
                    <option value="other">other</option>
                </select>
            </td>
            <td class="new-ticket-field" id="new-ticket-priority-td">
                <select class="new-ticket-priority" name="new-ticket-priority" form="new-ticket-form" style="width: 100%;" required>
                    <option value="">--choose a priority--</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </td>                
            <td>
                <textarea class="new-ticket-description" name="new-ticket-description" form="new-ticket-form" style="width: 100%;" placeholder="Enter description" required></textarea>
            </td>                
            <td>
                <select class="new-ticket-status" name="new-ticket-status" form="new-ticket-form" style="width: 100%;" required>
                <option value="">--choose status--</option>
                <option value="new">New</option>
                <option value="open">Open</option>
                <option value="in progress">In progress</option>
                <option value="resolved">Resolved</option>
                <option value="needs additional info">Needs additional info</option>
                </select>
            </td>
            <td>
                <select class="new-ticket-assigned-technician" name="new-ticket-assigned-technician" form="new-ticket-form" style="width: 100%;" required>
                <option value="">--choose a technician--</option>
                <option value="tech">Tech</option>
                </select>
            </td>            
            <td class="new-ticket-field" id="new-ticket-button-td">
                <input class="new-submit" type="submit" value="submit" form="new-ticket-form">
                <span class="new-submit-confirm">submit?</span>
                <button class="new-ticket-yes new-submit-yes" type="button">yes</button>
                <button class="new-submit-no" type="button">no</button>              
                <button class="new-delete" type="button">delete</button>
                <span class="new-delete-confirm">delete?</span>
                <button class="new-delete-yes" type="button">yes</button>
                <button class="new-delete-no" type="button">no</button>
            </td>
        </tr>         
        `;
        // console.log(newTicketForm.querySelector('.new-ticket-assigned-technician').classList.contains('new-ticket-assigned-technician'));
        getUsers(newTicketForm.querySelector('.new-ticket-assigned-technician'));
        newTicketForm.querySelector('.new-submit-confirm').style.display = 'none';
        newTicketForm.querySelector('.new-ticket-yes').style.display = 'none';
        newTicketForm.querySelector('.new-submit-no').style.display = 'none';
        newTicketForm.querySelector('.new-delete-confirm').style.display = 'none';
        newTicketForm.querySelector('.new-delete-yes').style.display = 'none';
        newTicketForm.querySelector('.new-delete-no').style.display = 'none';
        // ticketsSearchTable.prepend(newTicketForm);
        ticketsBody.appendChild(newTicketForm);
        // ticketsSearchTable.appendChild(newTicketForm);          
    }
}

// create a listener for the new-ticket-project-id select element to populate list from database
function newTicketprojectIdOnClick(e) {
        if (!e.target.classList.contains('new-ticket-project-id')) {
            return;
        }
        else if (e.target.getAttribute("data-clicked")=="no") {
            var newTicketprojectIdSelect = e.target;
            e.target.setAttribute("data-clicked", "yes");
            var params = "process=getProjectIdsAndNames";

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'process.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onload = function(){
                if (this.responseText == "Error!") {
                    alert('Error!');
                }
                else {                    
                    var returnedData = JSON.parse(this.responseText);
                    newTicketprojectIdSelect.innerHTML = '<option value="">--choose a project--</option>'
                    for (var i = 0; i < Object.keys(returnedData).length; i++) {
                        newTicketprojectIdSelect.innerHTML += 
                        `<option value="` + returnedData[i].id + `">` + returnedData[i].id + `-` + returnedData[i].project + `</option>` ;
                    }
                }
            }
            xhr.send(params);                  
        }
        else if (e.target.getAttribute("data-clicked")=="yes") {
            e.target.setAttribute("data-clicked", "no");
        }
        e.target.onblur = function () {
            e.target.setAttribute("data-clicked", "no");
        } 
}
if (ticketsBody) {
    ticketsBody.addEventListener('click', newTicketprojectIdOnClick);
}


// create a listener that for when yes is chosen it sends info to php file for validation and processing and recieves response
function addNewTicketRow(e) {
    if (!e.target.classList.contains('new-ticket-yes')) {
        return;
    }
    else {
        const newTicketYes = e.target;
        var tr = newTicketYes.closest('tr');
        newTicketYes.style.display = 'none';
        tr.querySelector('.new-submit-no').style.display = 'none';
        tr.querySelector('.new-submit-confirm').style.display = 'none';        
        tr.querySelector('.new-submit').style.display = 'inline';        
    
        const form = {
            projectId: newTicketYes.closest('tr').querySelector('.new-ticket-project-id'),
            type: newTicketYes.closest('tr').querySelector('.new-ticket-type'),
            priority: newTicketYes.closest('tr').querySelector('.new-ticket-priority'),
            description: newTicketYes.closest('tr').querySelector('.new-ticket-description'),
            status: newTicketYes.closest('tr').querySelector('.new-ticket-status'),
            assignedTechnician: newTicketYes.closest('tr').querySelector('.new-ticket-assigned-technician')
        }
        // if (form.projectId.value == null || form.projectId.value.trim() == "" 
        //     || form.type.value == null || form.type.value.trim() == ""
        //     || form.priority.value == null || form.priority.value.trim() == ""
        //     || form.description.value == null || form.description.value.trim() == ""
        //     || form.status.value == null || form.status.value.trim() == ""
        //     || form.assignedTechnician.value == null || form.assignedTechnician.value.trim() == "") {  
                    
        if (false) {
            alert("Fill out all fields.");
            
        } else {

            var params = "process=saveNewTicket&projectId="+form.projectId.value+"&type="
                        +form.type.value+"&priority="+form.priority.value+"&description="+form.description.value+"&status="+form.status.value+"&assignedTechnician="+form.assignedTechnician.value;

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'process.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onload = function(){
                if (this.responseText == "Save Error!") {
                    alert('Save error!');
                }
                else {
                    var returnedRow = JSON.parse(this.responseText);
                    newRow = document.createElement('tr');
                    newRow.setAttribute('class','row');
                    newRow.innerHTML = `
                    <td class='id'>`+returnedRow.id+`</td>
                    <td class='project e2' data-project-id=`+returnedRow.project_id+`>`+returnedRow.project_id+`-`+ returnedRow.project+`</td>
                    <td class='date'>`+returnedRow['date(date_created)']+`</td>
                    <td class='submitter e2'>`+returnedRow.submitter_id+`-`+returnedRow.submitter+`</td>
                    <td class='type e2'>`+returnedRow.ticket_type+`</td>
                    <td class='priority e e2'>`+returnedRow.priority+`</td>
                    <td class='description e e2'>`+returnedRow.description+`</td>
                    <td class='status e e2'>`+returnedRow.status+`</td>
                    <td class='assigned-technician e e2' data-assigned-technician-id=`+returnedRow.assigned_technician_id+`>`+returnedRow.assigned_technician_id+`-`+returnedRow.assigned_technician+`</td>
                    <td class='button'>
                        <input class='edit-ticket' type='button' value='edit'>                        
                        <input class='edit-ticket-submit' type='submit' value='submit' form='edit-ticket-form'>
                        <span class='edit-ticket-confirm'>submit?</span>
                        <button class='edit-ticket-yes' type='button'>yes</button>
                        <button class='edit-ticket-no' type='button'>no</button>
                        <input class='edit-ticket-cancel' type='button' value='cancel'>
                        <button class='delete' type='button'>delete</button>
                        <span class='delete-confirm'>delete?</span>
                        <button class='delete-yes' type='button'>yes</button>
                        <button class='delete-no' type='button'>no</button>
                    </td>`;
                    
                    const newTicketYes = e.target;
                    newTicketYes.closest('tr').remove();
                    ticketsBody.appendChild(newRow);
                    alert('Ticket created.')
                }
            }
            xhr.send(params);
        }            
    }
}
    // if there is an error, catch reply and display error messages somewhere

    // if not, recieve recently inserted tuple and add it to a new row by calling add row function that needs editing
if (ticketsBody) {
    ticketsBody.addEventListener('click', addNewTicketRow);        
}


// starts new ticket submit listener
table = document.querySelectorAll('table');

function newSubmitButtonOnclick (e) {
    if (!e.target.classList.contains('new-submit')) {
        return;
    }
    else {
        e.preventDefault();
        const submit = e.target;
        submit.style.display = 'none';
        submit.closest('tr').querySelector('.new-submit-confirm').style.display = 'inline';
        submit.closest('tr').querySelector('.new-submit-yes').style.display = 'inline';
        submit.closest('tr').querySelector('.new-submit-no').style.display = 'inline';
    }
}

// adds eventlistener for submit button that replaces the submit button with yes or no
for (var i = 0; i<table.length; i++) {
    table[i].addEventListener('click', newSubmitButtonOnclick);
}
// ends new ticket submit listener 

// starts new-delete listener
// create a table event listener to listen for the new-delete class and delete new-ticket-form
function newDeleteButtonOnClick (e) {
    if (!e.target.classList.contains('new-delete')) {
        return;
    }
    else {
        // e.preventDefault();
        const newTicketDelete = e.target;
        newTicketDelete.style.display = 'none';
        e.target.closest('tr').querySelector('.new-delete-confirm').style.display = 'inline';
        e.target.closest('tr').querySelector('.new-delete-yes').style.display = 'inline';
        e.target.closest('tr').querySelector('.new-delete-no').style.display = 'inline';
    }
}

// adds event listener for delete button for all tables that replaces the delete button with yes or no
for (var i = 0; i<table.length; i++) {
    table[i].addEventListener('click', newDeleteButtonOnClick);
}
// ends new ticket delete listener 


// starts new-submit-no replacement
// create a listener that for when no is chosen does nothing but hides the yes and no buttons and shows the submit button
function newSubmitNoOnClick (e) {
    if (!e.target.classList.contains('new-submit-no')) {
        return;
    }
    else {
        // e.preventDefault();
        const newSubmitNo = e.target;
        newSubmitNo.style.display = 'none';
        e.target.closest('tr').querySelector('.new-submit-yes').style.display = 'none';
        e.target.closest('tr').querySelector('.new-submit-confirm').style.display = 'none';
        e.target.closest('tr').querySelector('.new-submit').style.display = 'inline';
    }
}

// adds event listener that replaces new-submit-no button when clicked
for (var i = 0; i<table.length; i++) {
    table[i].addEventListener('click', newSubmitNoOnClick);
}
// ends new-submit-no replacement

// begins new-delete-no replacement
function newDeleteNoOnClick (e) {
    if (!e.target.classList.contains('new-delete-no')) {
        return;
    }
    else {
        // e.preventDefault();
        const newDeleteNoBtn = e.target;
        newDeleteNoBtn.style.display = 'none';
        e.target.closest('tr').querySelector('.new-delete-yes').style.display = 'none';
        e.target.closest('tr').querySelector('.new-delete-confirm').style.display = 'none';
        e.target.closest('tr').querySelector('.new-delete').style.display = 'inline';
    }
}

// adds event listener that replaces new-submit-no button when clicked
for (var i = 0; i<table.length; i++) {
    table[i].addEventListener('click', newDeleteNoOnClick);
}
// ends new-delete-no replacement

// begins new-delete-yes onclick
function newTicketDeleteYesOnClick (e) {
    if (!e.target.classList.contains('new-delete-yes')) {
        return;
    }
    else {
        // e.preventDefault();
        const newTicketDeleteYes = e.target;
        newTicketDeleteYes.closest('tr').remove();
    }
}

// adds event listener that deletes new-ticket row
for (var i = 0; i<table.length; i++) {
    table[i].addEventListener('click', newTicketDeleteYesOnClick);
}
// ends new-delete-yes onclck


var projectsBody = document.querySelector('#projects tbody');
var addProjectButton = document.getElementById('add-project');

if (addProjectButton) {
    addProjectButton.onclick = function () {
        var newProjectForm = document.createElement("tr");
        newProjectForm.setAttribute('class', 'new-project-form-div');
        newProjectForm.innerHTML = 
        `    
        <tr>
            <td>             
            </td>
            <td class="new-project-field"  id="new-project-name-td">
                <input class="new-project-name" name="new-project-name" type="text" placeholder="project name" form="new-project-form" style="width: 100%;" required>                  
            </td>
            <td>
            </td>
            <td class="new-project-manager-field" id="new-project-manager-field">
                <select class="new-project-manager" name="new-project-manager" form="new-project-form" style="width: 100%;" data-clicked="no" required>
                    <option value="">--choose a manager--</option>
                </select>
            </td>
            <td>
                <textarea class="new-project-description" name="new-project-description" form="new-project-form" style="width: 100%;" placeholder="Enter description" required></textarea>
            </td>                   
            <td class="new-project-field" id="new-project-button-td">
                <input class="new-submit" type="submit" value="submit" form="new-project-form">
                <span class="new-submit-confirm">submit?</span>
                <button class="new-project-yes new-submit-yes" type="button">yes</button>
                <button class="new-submit-no" type="button">no</button>              
                <button class="new-delete" type="button">delete</button>
                <span class="new-delete-confirm">delete?</span>
                <button class="new-delete-yes" type="button">yes</button>
                <button class="new-delete-no" type="button">no</button>
            </td>
        </tr>         
        `;
        newProjectForm.querySelector('.new-submit-confirm').style.display = 'none';
        newProjectForm.querySelector('.new-project-yes').style.display = 'none';
        newProjectForm.querySelector('.new-submit-no').style.display = 'none';
        newProjectForm.querySelector('.new-delete-confirm').style.display = 'none';
        newProjectForm.querySelector('.new-delete-yes').style.display = 'none';
        newProjectForm.querySelector('.new-delete-no').style.display = 'none';
        // ticketsSearchTable.prepend(newTicketForm);
        projectsBody.appendChild(newProjectForm);
        // ticketsSearchTable.appendChild(newTicketForm);          
    }
}

function newProjectGetManager(e) {    
    if (!e.target.classList.contains('new-project-manager')) {
        return;
    }
    else if (e.target.getAttribute("data-clicked")=="no") {
        var newProjectManagerSelect = e.target;
        e.target.setAttribute("data-clicked", "yes");
        var params = "process=getUsers";

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'process.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.onload = function(){
            if (this.responseText.data != null) {
                alert('Error!');
            }
            else {                    
                var returned = JSON.parse(this.responseText);
                console.log(returned);
                newProjectManagerSelect.innerHTML = '<option value="">--choose a manager--</option>';
                
                for (var i = 0; i < Object.keys(returned.data).length; i++) {
                    newProjectManagerSelect.innerHTML += 
                    `<option value="` + returned.data[i].id + `">` + returned.data[i].id + `-` + returned.data[i].manager + `</option>` ;
                }
            }
        }
        xhr.send(params);                  
    }
    else if (e.target.getAttribute("data-clicked")=="yes") {
        e.target.setAttribute("data-clicked", "no");
    }
    e.target.onblur = function () {
        e.target.setAttribute("data-clicked", "no");
    } 
}
if (projectsBody) {
    projectsBody.addEventListener('click', newProjectGetManager);
}

// create a listener that for when yes is chosen it sends info to php file for validation and processing and recieves response
function addNewProjectRow(e) {
    if (!e.target.classList.contains('new-project-yes')) {
        return;
    }
    else {
        const newProjectYes = e.target;
        tr = newProjectYes.closest('tr');
        newProjectYes.style.display = 'none';
        tr.querySelector('.new-submit-no').style.display = 'none';
        tr.querySelector('.new-submit-confirm').style.display = 'none';        
        tr.querySelector('.new-submit').style.display = 'inline';        
    
        const form = {
            projectName: newProjectYes.closest('tr').querySelector('.new-project-name'),
            manager: newProjectYes.closest('tr').querySelector('.new-project-manager'),
            description: newProjectYes.closest('tr').querySelector('.new-project-description')
        }
        if (form.projectName.value == null || form.projectName.value.trim() == "") {                
            alert("Fill out all fields.");
            
        } else {

            var params = "process=saveNewProject&projectName="+form.projectName.value+"&manager="+form.manager.value+"&description="+form.description.value;

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'process.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onload = function(){
                if (this.responseText == "Save Error!") {
                // if (true) {
                    alert('Save error!');
                    console.log(this.responseText);
                }
                else {
                    console.log(this.responseText);
                    var returnedRow = JSON.parse(this.responseText);
                    console.log(returnedRow);
                    newRow = document.createElement('tr');
                    newRow.setAttribute('class','row');
                    newRow.innerHTML = `
                    <td class='id'>`+returnedRow.id+`</td>
                    <td class='project e2'>`+returnedRow.project+`</td>
                    <td class='date'>`+returnedRow['date']+`</td>
                    <td class='manager' data-manager-id=`+returnedRow.manager_id+`>`+returnedRow.manager_id+`-`+returnedRow.manager+`</td>
                    <td class='description'>`+returnedRow.description+`</td></td>
                    <td class='button'>
                        <input class='edit-project' type='button' value='edit'>                           
                        <input class='edit-project-submit' type='submit' value='submit' form='edit-project-form'>
                        <span class='edit-project-confirm'>submit?</span>
                        <button class='edit-project-yes' type='button'>yes</button>
                        <button class='edit-project-no' type='button'>no</button>
                        <input class='edit-project-cancel' type='button' value='cancel'>
                        <button class='delete' type='button'>delete</button>
                        <span class='delete-confirm'>delete?</span>
                        <button class='delete-yes' type='button'>yes</button>
                        <button class='delete-no' type='button'>no</button>
                    </td>`;
                    newProjectYes.closest('tr').remove();
                    projectsBody.appendChild(newRow);
                    alert('Project created.')
                }
            }
            xhr.send(params);
        }            
    }
}
if (projectsBody) {
    projectsBody.addEventListener('click', addNewProjectRow); 
}
// addRow();
// ends add row

// starts code for row delete funcionality
table = document.querySelectorAll('table');

function deleteButtonOnClick(e) {
    if (!e.target.classList.contains('delete')) {
        return;
    }
    else {
        const deleteBtn = e.target
        deleteBtn.style.display = 'none';
        deleteBtn.closest('tr').querySelector('.delete-confirm').style.display = 'inline';
        deleteBtn.closest('tr').querySelector('.delete-yes').style.display = 'inline';
        deleteBtn.closest('tr').querySelector('.delete-no').style.display = 'inline';
    }
} 
for (var i = 0; i<table.length; i++) {
    table[i].addEventListener('click', deleteButtonOnClick);
}
function deleteNoOnClick(e) {
    if (!e.target.classList.contains('delete-no')) {
        return;
    }
    else {
        // e.preventDefault();
        const deleteNoBtn = e.target;
        deleteNoBtn.style.display = 'none';
        deleteNoBtn.closest('tr').querySelector('.delete-yes').style.display = 'none';
        deleteNoBtn.closest('tr').querySelector('.delete-confirm').style.display = 'none';
        deleteNoBtn.closest('tr').querySelector('.delete').style.display = 'inline';
    }
}
for (var i = 0; i<table.length; i++) {
    table[i].addEventListener('click', deleteNoOnClick);
}

function deleteYesOnClick(e) {
    if (!e.target.classList.contains('delete-yes')) {
        return;
    }
    else {
        const btn = e.target;

        var params = "process=delete&table="+btn.closest('table').id+"&id="
                    +btn.parentElement.parentElement.getElementsByClassName("id")[0].innerHTML;

                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'process.php', true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                xhr.onload = function(){
                    
                    if (this.responseText != "Success!") {
                        console.log('Delete error!');
                        console.log(this.responseText);
                    }
                    else {
                        console.log("Delete successful!");
                    }
                }

                xhr.send(params);

        btn.closest('tr').classList[0];
        btn.closest('tr').remove(); 
    }
} 

for (var i = 0; i<table.length; i++) {
    table[i].addEventListener('click', deleteYesOnClick);
}
// ends row delete

// starts edit project row
function editProjectRow (e) {
    if (!e.target.classList.contains('edit-project')) {
        return;        
    }

    var td = e.target.closest('tr').querySelectorAll('td');
    for (var i = 0; i < td.length; i++){
        td[i].setAttribute('data-original-value', td[i].innerHTML);
    }
    // editable indexes 1, 3
    td[1].innerHTML = `
        <input class="edit-project-project" name="edit-project-project" form="edit-project-form" placeholder="Choose a project name" style="width: 100%;" data-clicked="no" required>
    `;
    td[3].innerHTML = `
        <select class="edit-project-manager" name="edit-project-manager" form="edit-project-form" style="width: 100%;" data-clicked="no">
            <option value="">--choose a manager--</option>
        </select>
    `
    td[4].innerHTML = `
        <textarea class="edit-project-description" name="edit-project-description" form="edit-project-form" style="width: 100%;" placeholder="Enter description" required></textarea>
    `;

    getUsers(td[3].querySelector('.edit-project-manager'));    
    td[1].querySelector('input').value = td[1].getAttribute('data-original-value');
    td[4].querySelector('textarea').value = td[4].getAttribute('data-original-value');
    
    var tr = td[0].closest('tr');
    tr.querySelector('.edit-project').style.display = 'none';
    tr.querySelector('.delete').style.display = 'none';
    tr.querySelector('.edit-project-cancel').style.display = 'inline';
    tr.querySelector('.edit-project-submit').style.display = 'inline';
    
}
function getUsers (e) {
    if (!e.classList.contains('edit-project-manager') && !e.classList.contains('new-user-user') && !e.classList.contains('new-ticket-assigned-technician') && !e.classList.contains('edit-ticket-assigned-technician')) {
        return;
    }
    var editProjectManagerSelect = e;
    
    var params = "process=getUsers";

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'process.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        if (this.responseText.error != null) {
            returned = JSON.parse(this.responseText);
            alert(returned.error);
        }
        else {                  
            returned = JSON.parse(this.responseText);
            if (e.classList.contains('edit-project-manager')) {
                editProjectManagerSelect.innerHTML = '<option value="">--choose a manager--</option>'
                for (var i = 0; i < Object.keys(returned.data).length; i++) {
                    editProjectManagerSelect.innerHTML += 
                    `<option value="` + returned.data[i].id + `">` + returned.data[i].id + `-` + returned.data[i].manager + `</option>` ;
                }

                editProjectManagerSelect.value = editProjectManagerSelect.closest('td').getAttribute('data-manager-id');
            }
            else if (e.classList.contains('new-user-user')) {
                editProjectManagerSelect.innerHTML = '<option value="">--choose a new user--</option>'
                
                var column = document.querySelectorAll('#user tbody td:nth-child(1)');
                var columnValues = [];
                column.forEach((element) => {columnValues.push(element.innerHTML)});
                for (var i = 0; i < Object.keys(returned.data).length; i++) {
                    if (columnValues.indexOf("" + returned.data[i].id) == -1) {
                        editProjectManagerSelect.innerHTML += 
                        `<option value="` + returned.data[i].id + `">` + returned.data[i].id + `-` + returned.data[i].manager + `</option>` ;
                    }
                }               
            }
            else if (e.classList.contains('new-ticket-assigned-technician') || e.classList.contains('edit-ticket-assigned-technician')) {
                editProjectManagerSelect.innerHTML = '<option value="">--choose a technician--</option>'
                
                var column = document.querySelectorAll('#user tbody td:nth-child(1)');
                var columnValues = [];
                column.forEach((element) => {columnValues.push(element.innerHTML)});
                for (var i = 0; i < Object.keys(returned.data).length; i++) {
                    if (columnValues.indexOf("" + returned.data[i].id) == -1) {
                        editProjectManagerSelect.innerHTML += 
                        `<option value="` + returned.data[i].id + `">` + returned.data[i].id + `-` + returned.data[i].manager + `</option>` ;
                    }
                }
                
                if (e.classList.contains('edit-ticket-assigned-technician')) {
                    editProjectManagerSelect.value = editProjectManagerSelect.closest('td').getAttribute('data-assigned-technician-id');
                }
            }
        }
    }
    xhr.send(params);                  

    e.onblur = function () {
        e.setAttribute("data-clicked", "no");
    }

}
function editProjectButtons (e) {
    if (!e.target.classList.contains('edit-project-cancel') && !e.target.classList.contains('edit-project-submit') && !e.target.classList.contains('edit-project-confirm') && !e.target.classList.contains('edit-project-yes') && !e.target.classList.contains('edit-project-no')) {
        return;
    }
    var button = e.target;
    if (button.classList.contains('edit-project-cancel')) {
        var tr = button.closest('tr');
        var td = tr.querySelectorAll('td');
        td[1].innerHTML = td[1].getAttribute('data-original-value');
        td[3].innerHTML = td[3].getAttribute('data-original-value');
        td[4].innerHTML = td[4].getAttribute('data-original-value');

        tr.querySelector('.edit-project-submit').style.display = 'none';
        tr.querySelector('.edit-project-confirm').style.display = 'none';
        tr.querySelector('.edit-project-yes').style.display = 'none';    
        tr.querySelector('.edit-project-no').style.display = 'none';
        tr.querySelector('.edit-project-cancel').style.display = 'none';
        tr.querySelector('.edit-project').style.display = 'inline';
        tr.querySelector('.delete').style.display = 'inline';
    }
    else if (button.classList.contains('edit-project-submit')) {
        e.preventDefault()
        var tr = button.closest('tr');
        tr.querySelector('.edit-project-submit').style.display = 'none';
        tr.querySelector('.edit-project-confirm').style.display = 'inline';
        tr.querySelector('.edit-project-yes').style.display = 'inline';
        tr.querySelector('.edit-project-no').style.display = 'inline';
    }
    else if (button.classList.contains('edit-project-no')) {
        var tr = button.closest('tr');
        tr.querySelector('.edit-project-confirm').style.display = 'none';
        tr.querySelector('.edit-project-yes').style.display = 'none';    
        tr.querySelector('.edit-project-no').style.display = 'none';
        tr.querySelector('.edit-project-submit').style.display = 'inline';
    }
    else if (button.classList.contains('edit-project-yes')) {
        var tr = button.closest('tr');
        tr.querySelector('.edit-project-confirm').style.display = 'none';
        tr.querySelector('.edit-project-yes').style.display = 'none';    
        tr.querySelector('.edit-project-no').style.display = 'none';
        tr.querySelector('.edit-project-submit').style.display = 'inline';

        // const button = e.target;  

        const form = {
            id: button.closest('tr').querySelector('.id'),
            project: button.closest('tr').querySelector('.edit-project-project'),
            manager: button.closest('tr').querySelector('.edit-project-manager'),
            description: button.closest('tr').querySelector('.edit-project-description')
        }
        // if (form.projectId.value == null || form.projectId.value.trim() == "" 
        //     || form.type.value == null || form.type.value.trim() == ""
        //     || form.priority.value == null || form.priority.value.trim() == ""
        //     || form.description.value == null || form.description.value.trim() == ""
        //     || form.status.value == null || form.status.value.trim() == ""
        //     || form.status.value == null || form.status.value.trim() == "" 
        //     || form.assignedTechnician.value == null || form.assignedTechnician.value.trim() == "") {
            
        if (false) {
            alert("Fill out all fields.");
            
        } else {
            var params = "process=editProject&id="+form.id.innerHTML+"&project="+form.project.value+"&manager="+form.manager.value+"&description="+form.description.value;

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'process.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onload = function() {
                if (this.responseText.error != null) {
                    var returned = JSON.parse(this.responseText);
                }
                else {
                    console.log(this.responseText);
                    var returnedRow = JSON.parse(this.responseText);
                    tr.querySelector('.edit-project-submit').style.display = 'none';
                    tr.querySelector('.edit-project-cancel').style.display = 'none';
                    tr.querySelector('.edit-project').style.display = 'inline';
                    tr.querySelector('.delete').style.display = 'inline';
                    td = button.closest('tr').querySelectorAll('td');
                    td[1].innerHTML = returnedRow.data.project;
                    td[3].setAttribute('data-manager-id', returnedRow.data.manager_id)
                    td[3].innerHTML = returnedRow.data.manager_id + '-' + returnedRow.data.manager;
                    td[4].innerHTML = returnedRow.data.description;
                    alert('Project edited.')
                    
                }
            }
            xhr.send(params);
        }
    }
}
var projectsBody = document.querySelector('#projects tbody');
if (projectsBody) {
    projectsBody.addEventListener('click', editProjectRow);
    projectsBody.addEventListener('click', editProjectButtons);
}
// ends edit project row

// starts user table row editing
// starts edit project row
function editUserRow (e) {
    if (!e.target.classList.contains('edit-user')) {
        return;        
    }

    var td = e.target.closest('tr').querySelectorAll('td');
    for (var i = 0; i < td.length; i++){
        td[i].setAttribute('data-original-value', td[i].innerHTML);
    }

    td[3].innerHTML = `
        <select class="edit-user-role" name="edit-user-role" form="edit-user-form" style="width: 100%;" data-clicked="no">
            <option value="">--choose a role--</option>
        </select>
    `
        
    getRoles(td[3].querySelector('.edit-user-role')); 
    
    var tr = td[0].closest('tr');
    tr.querySelector('.edit-user').style.display = 'none';
    tr.querySelector('.delete').style.display = 'none';
    tr.querySelector('.edit-user-cancel').style.display = 'inline';
    tr.querySelector('.edit-user-submit').style.display = 'inline';
    
}
function getRoles (e) {
    if (!e.classList.contains('edit-user-role') && !e.classList.contains('new-user-role')) {
        return;
    }
    var editUserRoleSelect = e;
    
    var params = "process=getRoles";

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'process.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        if (this.responseText.error != null) {
            returned = JSON.parse(this.responseText);
            alert(returned.error);
        }
        else {                  
            returned = JSON.parse(this.responseText);
            editUserRoleSelect.innerHTML = '<option value="">--choose a role--</option>'
            for (var i = 0; i < Object.keys(returned.data).length; i++) {
                editUserRoleSelect.innerHTML += 
                `<option value="` + returned.data[i].role + `">` + returned.data[i].role + `</option>` ;
            }
            if (e.classList.contains('edit-user-role')) {
                editUserRoleSelect.value = editUserRoleSelect.closest('td').getAttribute('data-original-value');
            }
        }
    }
    xhr.send(params);
}

function editUserButtons (e) {
    if (!e.target.classList.contains('edit-user-cancel') && !e.target.classList.contains('edit-user-submit') && !e.target.classList.contains('edit-user-confirm') && !e.target.classList.contains('edit-user-yes') && !e.target.classList.contains('edit-user-no')) {
        return;
    }
    var button = e.target;
    if (button.classList.contains('edit-user-cancel')) {
        var tr = button.closest('tr');
        var td = tr.querySelectorAll('td');
        td[3].innerHTML = td[3].getAttribute('data-original-value');

        tr.querySelector('.edit-user-submit').style.display = 'none';
        tr.querySelector('.edit-user-confirm').style.display = 'none';
        tr.querySelector('.edit-user-yes').style.display = 'none';    
        tr.querySelector('.edit-user-no').style.display = 'none';
        tr.querySelector('.edit-user-cancel').style.display = 'none';
        tr.querySelector('.edit-user').style.display = 'inline';
        tr.querySelector('.delete').style.display = 'inline';
    }
    else if (button.classList.contains('edit-user-submit')) {
        e.preventDefault()
        var tr = button.closest('tr');
        tr.querySelector('.edit-user-submit').style.display = 'none';
        tr.querySelector('.edit-user-confirm').style.display = 'inline';
        tr.querySelector('.edit-user-yes').style.display = 'inline';
        tr.querySelector('.edit-user-no').style.display = 'inline';
    }
    else if (button.classList.contains('edit-user-no')) {
        var tr = button.closest('tr');
        tr.querySelector('.edit-user-confirm').style.display = 'none';
        tr.querySelector('.edit-user-yes').style.display = 'none';    
        tr.querySelector('.edit-user-no').style.display = 'none';
        tr.querySelector('.edit-user-submit').style.display = 'inline';
    }
    else if (button.classList.contains('edit-user-yes')) {
        var tr = button.closest('tr');
        tr.querySelector('.edit-user-confirm').style.display = 'none';
        tr.querySelector('.edit-user-yes').style.display = 'none';    
        tr.querySelector('.edit-user-no').style.display = 'none';
        tr.querySelector('.edit-user-submit').style.display = 'inline';

        const form = {
            id: button.closest('tr').querySelector('.id'),
            role: button.closest('tr').querySelector('.edit-user-role'),
        }
        // if (form.projectId.value == null || form.projectId.value.trim() == "" 
        //     || form.type.value == null || form.type.value.trim() == ""
        //     || form.priority.value == null || form.priority.value.trim() == ""
        //     || form.description.value == null || form.description.value.trim() == ""
        //     || form.status.value == null || form.status.value.trim() == ""
        //     || form.status.value == null || form.status.value.trim() == "" 
        //     || form.assignedTechnician.value == null || form.assignedTechnician.value.trim() == "") {
            
        if (false) {
            alert("Fill out all fields.");
            
        } else {
            var params = "process=editUser&id="+form.id.innerHTML+"&role="+form.role.value;

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'process.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onload = function() {
                if (this.responseText.error != null) {
                    console.log(returned.error);
                }
                else {
                    var returnedRow = JSON.parse(this.responseText);
                    tr.querySelector('.edit-user-submit').style.display = 'none';
                    tr.querySelector('.edit-user-cancel').style.display = 'none';
                    tr.querySelector('.edit-user').style.display = 'inline';
                    tr.querySelector('.delete').style.display = 'inline';
                    td = button.closest('tr').querySelectorAll('td');
                    td[3].innerHTML = returnedRow.data.role;
                    alert('User edited.')
                    
                }
            }
            xhr.send(params);
        }
    }
}
var userBody = document.querySelector('#user tbody');
if (userBody) {
    userBody.addEventListener('click', editUserRow);
    userBody.addEventListener('click', editUserButtons);
}
// ends user table row editing

// begins add user
function addUserOnClick (e) {
    if (e.target.id != 'add-user') {
        return;
    }
    newUserForm = document.querySelector('#new-user-form');
    newUserForm.style.display = 'block';
    var newUserRoleSelect = document.querySelector('#new-user-form .new-user-role');
    getRoles(newUserRoleSelect);
    var newUserUserSelect = document.querySelector('#new-user-form .new-user-user');
    getUsers(newUserUserSelect);
}
var addUserButton = document.querySelector('#add-user');
if (addUserButton) {
    addUserButton.addEventListener('click', addUserOnClick);
}

function addUserCancelButtonOnClick(e) {
    if (!e.target.classList.contains('new-user-cancel')) {
        return;
    }
    newUserForm = document.querySelector('#new-user-form');
    newUserForm.style.display = 'none';
    newUserForm.reset();
}
function addUserSubmitButtonOnClick(e) {
    if (!e.target.classList.contains('new-user-cancel')) {
        return;
    }


    newUserForm = document.querySelector('#new-user-form');
    newUserForm.style.display = 'none';
    newUserForm.reset();
}

addUserCancelButton = document.querySelector('#new-user-form .new-user-cancel');
addUserSubmitButton = document.querySelector('#new-user-form .new-user-submit');
if (addUserCancelButton && addUserSubmitButton) {
    addUserCancelButton.addEventListener('click', addUserCancelButtonOnClick);
}

// ends add user

// starts table sort
/* 
    &#9650 = accending arrow's html
    &#9650 = descending arrow's html
    \u25b2 = accending arrow's unicode
    \u25bc = descending arrow's unicode
*/
var ticketsTh = document.querySelectorAll('#tickets th');
var projectsTh = document.querySelectorAll('#projects th');

function tableSort(e) {
    
    var tableTh = e.target.closest('table').querySelectorAll('th');
    clickedTh = e.target.closest('th');

    // find which column was clicked and state of current column's sort arrow
    clickedIndex = Array.prototype.indexOf.call(tableTh, clickedTh);

    // adjust column's sort arrow appropriately to the column clicked
    if (!clickedTh.classList.contains('ascending') && !clickedTh.classList.contains('descending')) {
        clickedTh.classList.toggle('ascending');
    }
    else if (clickedTh.classList.contains('ascending') || clickedTh.classList.contains('descending')) {
        clickedTh.classList.toggle('ascending');
        clickedTh.classList.toggle('descending');
    }
    tableTh.forEach( (th) => {
        if ( th != clickedTh.closest('th')) {
            th.classList.remove('ascending', 'descending');
            if (th.querySelector('.sort-arrow')) {
                th.querySelector('.sort-arrow').innerText = '';
            }
        }
    } )

    if (sortArrow = clickedTh.querySelector('.sort-arrow')) {
        if (clickedTh.classList.contains('descending')) {
            var direction = -1;
            sortArrow.innerText = '\u25bc';
        }
        else {
            var direction = 1;
            sortArrow.innerText = '\u25b2';
        }
    }
    // sort according to column clicked
    rowArray = Array.from(clickedTh.closest('table').querySelectorAll('.row'));
    rowArray.sort( (a, b) => {
        aTd = a.querySelectorAll('td');
        bTd = b.querySelectorAll('td');

        if (aTd[clickedIndex].classList.contains('date')) {
            return  new Date(aTd[clickedIndex].innerText).getTime() == new Date(bTd[clickedIndex].innerText).getTime() ? 0 : new Date(aTd[clickedIndex].innerText).getTime()  > new Date(bTd[clickedIndex].innerText).getTime() ? 1 * direction : -1 * direction;
        }
        else if (aTd[clickedIndex].classList.contains('id')) {
            return  + aTd[clickedIndex].innerText  == + bTd[clickedIndex].innerText ? 0 : + aTd[clickedIndex].innerText  > + bTd[clickedIndex].innerText ? 1 * direction : -1 * direction;
        }
        else if (aTd[clickedIndex].classList.contains('project') && aTd[clickedIndex].closest('table').id != 'projects' || aTd[clickedIndex].classList.contains('manager') || aTd[clickedIndex].classList.contains('submitter') || aTd[clickedIndex].classList.contains('assigned-technician')) {
            return  parseInt(aTd[clickedIndex].innerText) == parseInt(bTd[clickedIndex].innerText) ? 0 : (parseInt(aTd[clickedIndex].innerText) - parseInt(bTd[clickedIndex].innerText)) * direction;
        }
        else {
            return  aTd[clickedIndex].innerText == bTd[clickedIndex].innerText ? 0 : aTd[clickedIndex].innerText  > bTd[clickedIndex].innerText ? 1 * direction : -1 * direction;
        }
    });

    // rebuild table
    let tableBody = clickedTh.closest('table').querySelector('tbody');
    tableBody.innerHTML = '';
    tableBody.append(...rowArray);
}

if (ticketsTh) {
    for (var i = 0; i<ticketsTh.length; i++) {
        ticketsTh[i].addEventListener('click', tableSort);

    }
}
if (projectsTh) {
    for (var i = 0; i<projectsTh.length; i++) {
        projectsTh[i].addEventListener('click', tableSort);

    }
}
// ends table sort


// For contact form
const form = document.querySelector(".contact-form");
if (form) {
    statusTxt = form.querySelector(".contact-span");
 
    form.onsubmit = (e)=>{
    e.preventDefault();
    statusTxt.style.color = "rgb(13, 72, 121)";
    statusTxt.style.display = "block";
    statusTxt.innerText = "Sending message..";
    form.classList.add("disabled");

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "process.php", true);
    xhr.onload = ()=>{
        if(xhr.readyState == 4 && xhr.status == 200){
            let response = xhr.response;
            if(response.indexOf("Email and message field is required!") != -1) {
                statusTxt.style.color = "red";
                statusTxt.innerText = "Email and message field is required!";
            }
            else if (response.indexOf("Enter a valid email address!") != -1) {
                statusTxt.style.color = "red";
                statusTxt.innerText = "Enter a valid email address!";
            }
            else if (response.indexOf("Message sending failed!") != -1){
                statusTxt.style.color = "red";
                statusTxt.innerText = "Message sending failed!";
            }else{
                form.reset();
                setTimeout(()=>{
                statusTxt.style.display = "none";
                }, 3000);
            }
        form.classList.remove("disabled");
        }
    }
    let formData = new FormData(form);
    xhr.send(formData);
    }
}


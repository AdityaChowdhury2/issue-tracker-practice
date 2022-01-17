

function updateIssuesCount(id, func) {
    document.getElementById(id).innerText = func;
}

// document.getElementById('total-issue').innerText = getIssueCount();
// document.getElementById('open-issue').innerText = getOpenIssueCount();
document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
    const getInputValue = id => document.getElementById(id).value;
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');

    if (description === '' || assignedTo === '') {
        alert('Please fill the form correctly');
    }
    else {
        const id = Math.floor(Math.random() * 100000000);
        const status = 'Open';

        const issue = { id, description, severity, assignedTo, status };
        let issues = [];
        if (localStorage.getItem('issues')) {
            issues = JSON.parse(localStorage.getItem('issues'));
        }
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));

        document.getElementById('issueInputForm').reset();
    }
    fetchIssues();
    e.preventDefault();
}
function setStatusClosed(id) {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const currentIssue = issues.find(issue => issue.id === id);
    currentIssue.status = 'Closed';
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}
// function setStatusClosed(id) {
//     closeIssue(id);
// }
// const closeIssue = id => {
//     const issues = JSON.parse(localStorage.getItem('issues'));
//     const currentIssue = issues.find(issue => issue.id === id);
//     currentIssue.status = 'Closed';
//     localStorage.setItem('issues', JSON.stringify(issues));
//     fetchIssues();
// }

const deleteIssue = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const remainingIssues = issues.filter(issue.id !== id)
    localStorage.setItem('issues', JSON.stringify(remainingIssues));
}

const fetchIssues = () => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';
    const getOpenIssueCount = () => {
        let count = 0;
        issues.forEach(element => {
            if (element.status === 'Open') {
                count++;
            }
        });
        return count;
    }

    for (var i = 0; i < issues.length; i++) {
        const { id, description, severity, assignedTo, status } = issues[i];

        if (status === 'Open') {
            issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
        }
        else {
            issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-danger"> ${status} </span></p>
                              <h3> <del>${description}</del> </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
        }
    }
    updateIssuesCount('total-issue', issues.length);
    updateIssuesCount('open-issue', getOpenIssueCount());
}

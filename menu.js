var tableBody = document.getElementById("wolfTable");
var input = document.getElementById("wolfSearch");

function shouldFilter(filter, name) {
    if (name.toUpperCase().indexOf(filter) >= 0)
        return false;

    var tags = wolves[name].tags;
    for (var i=0; i<tags.length; i++) {
        if (tags[i].toUpperCase().indexOf(filter) >= 0)
            return false;
    }
    return true;
}

function filterFunction() {
    var list = tableBody.getElementsByTagName('tr');

    for (var i=0; i<list.length; i++) {
        if (shouldFilter(input.value.toUpperCase(), list[i].getElementsByTagName('td')[0].innerHTML))
            list[i].style.display = "none";
        else
            list[i].style.display = "";
    }
}

function fillRow(tr, name) {
    // Set callback on click
    tr.onclick = function() {
        location.hash = name;
    }
    var tdName = document.createElement('td');
    tdName.innerHTML = name;
    tr.append(tdName);

    var tdTags = document.createElement('td');
    for (var i=0; i<wolves[name].tags.length; i++) {
        tdTags.innerHTML += wolves[name].tags[i];
        if (i < wolves[name].tags.length - 1)
            tdTags.innerHTML += ", ";
    }
    tr.append(tdTags);
}

for (name in wolves) {
    var tr = document.createElement('tr');
    fillRow(tr, name);
    console.log(tr);
    tableBody.append(tr);
}

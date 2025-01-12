var menu = document.getElementById("menuContainer");
var tableBody = document.getElementById("wolfTable");
var searchInput = document.getElementById("wolfSearch");
var menuButton = document.getElementById("menuButton");
var menu_isup = false;

function  hideMenu() {
    menu.className = "menu-hidden";
    menuButton.style.display = "";
    menu_isup = false;
}

function showMenu() {
    menu.className = "menu-flexbox";
    menuButton.style.display = "none";
    menu_isup = true;
}

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
    var words = searchInput.value.toUpperCase().split(" ");
    for (var i=0; i<list.length; i++) {
        for (var j=0; j<words.length; j++)
        {
            if (shouldFilter(words[j], list[i].getElementsByTagName('td')[0].innerHTML))
            {
                list[i].style.display = "none";
                break ;
            }
            else if (j == words.length - 1)
                list[i].style.display = "";
        }
    }
}

function customGirl() {
    window.location.hash = "curl=" + document.getElementById("customUrl").value;
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
    tableBody.append(tr);
}

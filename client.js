var printerTable = document.getElementById('printer-table');
var content = document.querySelector('.content');
var close = document.getElementById('modal-close');
var cancel = document.getElementById('modal-cancel');
var modal = document.getElementById('sell-something-modal');
var backdropModal = document.getElementById('modal-backdrop');
var post = document.getElementById('modal-accept');
<<<<<<< HEAD
var reset = document.getElementById('reset-button');
var submitCodeAmt = document.getElementById('add-codeamt-item');
var defaultSort = null;
=======
>>>>>>> f3b0d4c98fc2e4e2aedaab3ce171a6143b6e654a

close.addEventListener("click", closeModal);
cancel.addEventListener("click", closeModal);
document.addEventListener("click", windowCloseModal);
<<<<<<< HEAD
post.addEventListener("click", submit);
reset.addEventListener("click", resetTable);
// submitCodeAmt.addEventListener("click", createCodeAmt);


// function createCodeAmt(event){
//   var modalForm = document.getElementById('modal-body');
//   var code = document.getElementById('post-codeamt-input').value;
//   for(var i = 1; i <= code; i++){
//     var printerDiv = document.createElement('div');
//     printerDiv.classList.add('post-input-element');
//     var label = document.createElement('label');
//     label.setAttribute('for', 'post-text-input');
//     label.textContent = 'Code #' + i;
//     printerDiv.appendChild(label);
//     var input = document.createElement('input');
//     input.type = "text";
//     input.setAttribute('id', 'post-code-input');
//     printerDiv.appendChild(input);
//     modalForm.appendChild(printerDiv);
//     var printerDiv = document.createElement('div');
//     printerDiv.classList.add('post-input-element');
//     var label = document.createElement('label');
//     label.setAttribute('for', 'post-text-input');
//     label.textContent = 'Color for Code #' + i;
//     printerDiv.appendChild(label);
//     var input = document.createElement('input');
//     input.type = "text";
//     input.setAttribute('id', 'post-color-input');
//     printerDiv.appendChild(input);
//     modalForm.appendChild(printerDiv);
//     console.log(modalForm);
//   }
// }
=======
post.addEventListener("click", addNewPrinter);
>>>>>>> f3b0d4c98fc2e4e2aedaab3ce171a6143b6e654a

function resetTable(target) {
    document.getElementById('filter-search').value = '';
    document.getElementById('filter-min-quantity').value = '';
    document.getElementById('filter-max-quantity').value = '';
    var brandFilter = document.querySelectorAll('input[name="filter-brand"]');
    for (i = 0; i < brandFilter.length; i++) {
        brandFilter[i].checked = false;
    }
    document.getElementById('filter-color').value = '';
    filter();
}

function windowCloseModal(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        backdropModal.style.display = "none";
        clearModal();
    }
}

<<<<<<< HEAD
function openmodal(event) {
=======
function openModal(event) {
>>>>>>> f3b0d4c98fc2e4e2aedaab3ce171a6143b6e654a
    backdropModal.style.display = "block";
    modal.style.display = "block";
}

<<<<<<< HEAD
function closemodal(event) {
=======
function closeModal(event) {
>>>>>>> f3b0d4c98fc2e4e2aedaab3ce171a6143b6e654a
    backdropModal.style.display = "none";
    modal.style.display = "none";
    clearModal();

}


function clearModal() {
    document.getElementById('post-brand-input').value = "";
    document.getElementById('post-type-input').value = "";
    document.getElementById('post-code-input').value = "";
    document.getElementById('post-color-input').value = "";
    document.getElementById('post-quantity-input').value = "";
    document.getElementById('post-updated-input').value = "";
    document.getElementById('post-name-input').value = "";
    document.getElementById('post-location-input').value = "";
    document.getElementById('post-notes-input').value = "";
}


<<<<<<< HEAD
function submit(event) {
=======
function addNewPrinter(event) {
>>>>>>> f3b0d4c98fc2e4e2aedaab3ce171a6143b6e654a
    var brand = document.getElementById('post-brand-input').value;
    var type = document.getElementById('post-type-input').value;
    var code = document.getElementById('post-code-input').value;
    var color = document.getElementById('post-color-input').value;
    var quantity = document.getElementById('post-quantity-input').value;
    var updated = document.getElementById('post-updated-input').value;
    var name = document.getElementById('post-name-input').value;
    var location = document.getElementById('post-location-input').value;
    var notes = document.getElementById('post-notes-input').value;

    var arrayCode = code.split(",").map(function(item) {
        return item.trim();
    });

    var arrayColor = color.split(",").map(function(item) {
        return item.trim();
    });

<<<<<<< HEAD
    var arrayQuantity = quantity.split(",").map(function(item) {
        return item.trim();
    });

    var arrayUpdated = updated.split(",").map(function(item) {
        return item.trim();
    });



    if ((brand === "") || (type === "") || (code === "") || (color === "") || (quantity === "") || (updated === "") || (name === "") || (location === "") || (notes === "")) {
        alert("Not all fields have been completed, please fill out all fields and then submit.")
    }

    else {
        var tr = document.createElement('tr');
        tr.classList.add("table-info")
        var tdBrand = document.createElement('td');
        tdBrand.textContent = brand;
        tr.appendChild(tdBrand);
        var tdType = document.createElement('td');
        tdType.textContent = type;
        tr.appendChild(tdType);
        var tdCode = document.createElement('td');
        for(var i = 0; i < arrayCode.length; i++){
          var createDiv = document.createElement('div');
          createDiv.classList.add('code');
          createDiv.setAttribute('type', type);
          createDiv.setAttribute('color', arrayColor[i]);
          createDiv.textContent = arrayCode[i];
          tdCode.appendChild(createDiv);
        }
        tr.appendChild(tdCode);
        var tdColor = document.createElement('td');
        for(var i = 0; i < arrayColor.length; i++){
          var createDiv = document.createElement('div');
          createDiv.classList.add('color');
          createDiv.setAttribute("type", type);
          createDiv.setAttribute("code", arrayCode[i]);
          createDiv.textContent = arrayColor[i];
          var createColorDiv = document.createElement('div');
          createColorDiv.classList.add('color-icon-'+ arrayColor[i].toLowerCase());
          createDiv.appendChild(createColorDiv);
          tdColor.appendChild(createDiv);
        }
        tr.appendChild(tdColor);
        var tdQuantity = document.createElement('td');
        for(var i = 0; i < arrayQuantity.length; i++){
          var createDiv = document.createElement('div');
          createDiv.classList.add('quantity');
          createDiv.setAttribute("type", type);
          createDiv.setAttribute("color", color[i]);
          createDiv.setAttribute("type", code[i]);
          createDiv.textContent = arrayQuantity[i];
          tdQuantity.appendChild(createDiv);
          var createChangeQuantityDiv = document.createElement('div');
          createChangeQuantityDiv.classList.add('change-quantity');
          var addQuantity = document.createElement('button');
          addQuantity.setAttribute('type', 'button');
          addQuantity.setAttribute('id', 'change');
          var createButtonPlus = document.createElement('i');
          createButtonPlus.classList.add('fa', 'fa-plus');
          addQuantity.appendChild(createButtonPlus);
          addQuantity.textContent = '(+1)';
          var minusQuantity = document.createElement('button');
          minusQuantity.setAttribute('type', 'button');
          minusQuantity.setAttribute('id', 'change');
          var createButtonMinus = document.createElement('i');
          createButtonMinus.classList.add('fa', 'fa-plus');
          minusQuantity.appendChild(createButtonMinus);
          minusQuantity.textContent = '(-1)';
          createChangeQuantityDiv.appendChild(addQuantity);
          createChangeQuantityDiv.appendChild(minusQuantity);
          tdQuantity.appendChild(createChangeQuantityDiv);
        }
        tr.appendChild(tdQuantity);
        var tdUpdated = document.createElement('td');
        for(var i = 0; i < arrayUpdated.length; i++){
          var createDiv = document.createElement('div');
          createDiv.classList.add('Last-Updated');
          createDiv.setAttribute('type', type);
          createDiv.setAttribute('color', arrayColor[i]);
          createDiv.setAttribute('code', arrayCode[i]);
          createDiv.textContent = arrayUpdated[i];
          tdUpdated.appendChild(createDiv);
        }
        tr.appendChild(tdUpdated);
        var tdNotes = document.createElement('td');
        var createNotesDiv = document.createElement('div');
        createNotesDiv.classList.add('notes');
        createNotesDiv.textContent = "Notes: " + notes;
        tdNotes.appendChild(createNotesDiv);
        var createNotesButton = document.createElement('div');
        createNotesButton.classList.add('edit');
        var editButton = document.createElement('button');
        editButton.setAttribute("type", "button");
        editButton.setAttribute('id', 'edit');
        var createButton = document.createElement('i');
        createButton.classList.add('fa', 'fa-plus');
        editButton.appendChild(createButton);
        editButton.textContent = "Edit";
        createNotesButton.appendChild(editButton);
        tdNotes.appendChild(createNotesButton);
        tr.appendChild(tdNotes);
        var tdName = document.createElement('td');
        tdName.textContent = name;
        tr.appendChild(tdName);
        var tdLocation = document.createElement('td');
        tdLocation.textContent = location;
        tr.appendChild(tdLocation);
        var printerTable = document.getElementById('printer-table').getElementsByTagName('tbody')[0];
        printerTable.appendChild(tr);
        console.log(printerTable);
=======
    if ((brand === "") || (type === "") || (code === "") || (color === "") || (quantity === "") || (updated === "") || (name === "") || (location === "") || (notes === "")) {
        alert("Not all fields have been completed, please fill out all fields and then submit.")
    }

    else {
>>>>>>> f3b0d4c98fc2e4e2aedaab3ce171a6143b6e654a
        modal.style.display = "none";
        backdropModal.style.display = "none";
        clearModal();
    }

}



function Filter(searchKey, minQuantity, maxQuantity, brand, color) {
    this.searchKey = searchKey;
    this.minQuantity = Number(minQuantity);
    this.maxQuantity = Number(maxQuantity);
    this.brand = brand;
    this.color = color;
}

function contentClick(event) {
    var target = event.target;

    if (target.id === 'change') {
        changeQuantity(target);
    }
    else if (target.id === 'edit') {
        editNotes(target);
    }
    else if (target.id === 'filter-update-button') {
        filter(target);
    }
    else if (target.id === 'reset-button') {
        resetTable(target)
    }
<<<<<<< HEAD
=======
    else if (target.id === 'add-new-item') {
        addNewPrinter();
    }
>>>>>>> f3b0d4c98fc2e4e2aedaab3ce171a6143b6e654a
}

function changeQuantity(target) {
    var text = target.parentNode.previousElementSibling.textContent;
    var quantity = Number(text);

    if (target.textContent == '(+1)') { //figure out why this isn't working...
        quantity += 1;
    }
    else if (target.textContent == '(-1)' && quantity <= 0) {
        alert("Toner quantity cannot be lower than 0");
    }
    else {
        quantity -= 1;
    }

    target.parentNode.previousElementSibling.textContent = quantity;
}

function editNotes(target) {
    var text = target.parentNode.previousElementSibling.textContent;
}

function filter(target) {
<<<<<<< HEAD
    var i, j;
=======
    var i, j, matchesFound = 0;
>>>>>>> f3b0d4c98fc2e4e2aedaab3ce171a6143b6e654a
    var start = 2;
    var td, th, tr = printerTable.getElementsByTagName('TR');
    var quantity;
    var foundMatch = false;
    var numRows = tr.length;
    var color;
    var columns = {};

    var filter = new Filter(
        document.getElementById('filter-search').value,
        document.getElementById('filter-min-quantity').value,
        document.getElementById('filter-max-quantity').value,
        document.querySelectorAll('input[name="filter-brand"]:checked'),
        document.getElementById('filter-color').value
    );



    th = tr[1].getElementsByTagName('TH');
    for (i = 0; i < th.length; i++) {
        columns[th[i].textContent] = i;
    }

    // Show each row to start
    for (i = start; i < numRows - 1; i++) {
        tr[i].style.display = 'table-row';
    }

    var key = new RegExp(filter.searchKey, 'i');

    // Search filter
    for (i = start; i < numRows - 1; i++) {
        foundMatch = false;
        td = tr[i].getElementsByTagName('TD');
        for (j = 0; j < td.length; j++) {
            if (td[j].textContent.search(key) != -1) {
                foundMatch = true;
                tr[i].style.display = 'table-row';
                break;
            }
        }
        if (!foundMatch) {
            tr[i].style.display = 'none';
        }
    }

    // min Quantity and max quantity filter
    for (i = start; i < numRows - 1; i++) {

        td = tr[i].getElementsByTagName('TD');
        quantity = td[columns['Quantity']].getElementsByClassName('quantity');
<<<<<<< HEAD
=======
        matchesFound = 0;
>>>>>>> f3b0d4c98fc2e4e2aedaab3ce171a6143b6e654a

        for (j = 0; j < quantity.length; j++) {
            // reset all rows back to normal
            td[columns['# Code']].children[j].style.display = 'block';
            td[columns['Color']].children[j].style.display = 'block';
            quantity[j].style.display = 'block';
            quantity[j].nextElementSibling.style.display = 'block';
            td[columns['Last-Updated']].children[j].style.display = 'block';

            if (filter.maxQuantity === 0) {
                filter.maxQuantity = 9999999;
            }

            if (Number(quantity[j].textContent) < filter.minQuantity || Number(quantity[j].textContent) > filter.maxQuantity) {
                // set the display of all rows not meeting quantity standards to 'none'
                td[columns['# Code']].children[j].style.display = 'none';
                td[columns['Color']].children[j].style.display = 'none';
                quantity[j].style.display = 'none';
                quantity[j].nextElementSibling.style.display = 'none';
                td[columns['Last-Updated']].children[j].style.display = 'none';
<<<<<<< HEAD
=======

                matchesFound++;
            }

            if (matchesFound === td[columns['Color']].children.length) {
                tr[i].style.display = 'none';
>>>>>>> f3b0d4c98fc2e4e2aedaab3ce171a6143b6e654a
            }
        }
    }

    // Brand filter
    if (filter.brand.length > 0) {
        for (i = start; i < numRows - 1; i++) {
            td = tr[i].getElementsByTagName('TD');
            var brandName = td[0].textContent.toLowerCase();
            foundMatch = false;
            for (j = 0; j < filter.brand.length; j++) {
                if (brandName == filter.brand[j].value) {
                    foundMatch = true;
                    break;
                }
            }
            if (!foundMatch) {
                tr[i].style.display = 'none';
            }

        }
    }

    // Color filter
    // For HTML add an attribute that will give the color
    if (filter.color != '') {
        for (i = start; i < numRows - 1; i++) {

            td = tr[i].getElementsByTagName('TD');
            color = td[3].getElementsByClassName('color');

            for (j = 0; j < color.length; j++) {
                // reset all rows back to normal
                td[2].children[j].style.display = 'block';
                color[j].style.display = 'block';
                td[4].children[j].style.display = 'block';
                td[5].children[j].style.display = 'block';

                if (filter.color != '') {
                    if (color[j].textContent.search(filter.color) === -1) {
                        // set the display of all rows not meeting quantity standards to 'none'
                        td[2].children[j].style.display = 'none';
                        color[j].style.display = 'none';
                        td[4].children[j].style.display = 'none';
                        td[5].children[j].style.display = 'none';
                    }

                }
            }


        }
    }
}
content.addEventListener('click', contentClick);

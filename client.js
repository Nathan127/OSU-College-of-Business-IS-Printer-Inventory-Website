var printerTable = document.getElementById('printer-table');
var content = document.querySelector('.content');
var close = document.getElementById('modal-close');
var cancel = document.getElementById('modal-cancel');
var modal = document.getElementById('sell-something-modal');
var backdropModal = document.getElementById('modal-backdrop');
var open = document.getElementById('add-new-item');
var addNew = document.getElementById('modal-add-new');
var edit = document.getElementById('modal-edit');
var selectedRow = null;

function checkQuantitiesForLowWarning(row, printer) {
    var minAlert = row.getAttribute('data-min-alert');
    var quantities = row.children[4].getElementsByClassName('quantity');
    for (var i = 0; i < quantities.length; i++) {
        if (printer.quantity[i] <= minAlert) {
            quantities[i].setAttribute('highlight', 'red');
        }
        else {
            quantities[i].removeAttribute('highlight');
        }
    }
}

function resetTable(target) {
    document.getElementById('filter-search').value = '';
    document.getElementById('filter-min-quantity').value = '';
    document.getElementById('filter-max-quantity').value = '';
    document.getElementById('filter-brand').value = '';
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

function openmodal(option, row) {
    backdropModal.style.display = "block";
    modal.style.display = "block";
    if (option === 'add-new') {
        edit.style.display = 'none';
    }
}

function closemodal(event) {
    backdropModal.style.display = "none";
    modal.style.display = "none";
    clearModal();
}


function clearModal() {
    edit.style.display = 'block';
    document.getElementById('post-brand-input').value = "";
    document.getElementById('post-type-input').value = "";
    document.getElementById('post-code-input').value = "";
    document.getElementById('post-color-input').value = "";
    document.getElementById('post-quantity-input').value = "";
    document.getElementById('post-updated-input').value = "";
    document.getElementById('post-name-input').value = "";
    document.getElementById('post-min-quantity-warning').value = "";
    document.getElementById('post-location-input').value = "";
    document.getElementById('post-notes-input').value = "";
}

function Printer(brand, type, code, color, quantity, updated, name, location, notes, warning) {
    this.brand = brand;
    this.type = type;
    this.code = code;
    this.color = color;
    this.quantity = quantity;
    this.lastUpdated = updated;
    this.name = name;
    this.location = location;
    this.notes = notes;
    this.minAlert = Number(warning);
}

function createPrinter(printer) {
    var printerHandlebars = Handlebars.templates.printer(printer);
    console.log(printerHandlebars);
    return printerHandlebars;
}

function addPrinter(row, newPrinter, rowNum) {
    var postURL;
    if (rowNum === printerTable.getElementsByClassName('table-info').length) {
        postURL = '/addPrinter';
    }
    else {
        postURL = '/editPrinter';
    }
    console.log(postURL);
    var postRequest = new XMLHttpRequest();
     postRequest.open('POST', postURL);

     var requestBody = JSON.stringify(newPrinter);
     postRequest.setRequestHeader('Content-Type', 'application/json');

     postRequest.addEventListener('load', function (event) {
         if (event.target.status !== 200) {
             alert("Error storing photo in database:" + event.target.response);
         }
         else {
             var printer = createPrinter(newPrinter);
             if (row) {
                row.insertAdjacentHTML('afterend', printer);
             }
             else {
                printerTable.tBodies[0].insertAdjacentHTML('afterbegin', printer);
             }
         }
     });

     postRequest.send(requestBody);
     if (row) {
        checkQuantitiesForLowWarning(row.previousElementSibling, newPrinter);
     }
     else {
        checkQuantitiesForLowWarning(printerTable.getElementsByClassName('table-info')[rowNum], newPrinter);
     }
     closemodal();

    /*var columns = {};
    var th, td, tr = printerTable.querySelector('TR')

    postRequest.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
            alert("Error storing photo in database:" + event.target.response);
        }
        else {
            var printer = createPrinter(newPrinter);
            row.insertAdjacentHTML('afterend', printer);
        }
    });

    postRequest.send(requestBody);
    checkQuantitiesForLowWarning(row.nextElementSibling, newPrinter);
    // var columns = {};
    // var th, td, tr = printerTable.querySelector('TR')

    // th = tr.getElementsByTagName('TH');
    // for (i = 0; i < th.length; i++) {
    //     columns[th[i].textContent] = i;
    // }
*/

    // var brandFilter = document.getElementById('filter-brand');
    // var noBrand = 0;

    // var tdBrand = document.createElement('td');
    // tdBrand.textContent = newPrinter.brand;
    // row.appendChild(tdBrand);
    // var tdType = document.createElement('td');
    // tdType.textContent = newPrinter.type;
    // row.appendChild(tdType);
    // var tdCode = document.createElement('td');

    // for (var i = 0; i < arrayCode.length; i++) {
    //     var createDiv = document.createElement('div');
    //     createDiv.classList.add('code');
    //     createDiv.setAttribute('data-type', newPrinter.type);
    //     createDiv.setAttribute('data-color', arrayColor[i]);
    //     createDiv.textContent = arrayCode[i];
    //     tdCode.appendChild(createDiv);
    // }

    // row.appendChild(tdCode);
    // var tdColor = document.createElement('td');

    // for (var i = 0; i < arrayColor.length; i++) {
    //     var createDiv = document.createElement('div');
    //     createDiv.classList.add('color');
    //     createDiv.setAttribute("data-type", newPrinter.type);
    //     createDiv.setAttribute("data-code", arrayCode[i]);
    //     createDiv.textContent = arrayColor[i];

    //     var createColorDiv = document.createElement('div');
    //     createColorDiv.classList.add('color-icon-' + arrayColor[i].toLowerCase());
    //     createDiv.appendChild(createColorDiv);
    //     tdColor.appendChild(createDiv);
    // }

    // row.appendChild(tdColor);
    // var tdQuantity = document.createElement('td');

    // for (var i = 0; i < arrayQuantity.length; i++) {

    //     var createDiv = document.createElement('div');
    //     createDiv.classList.add('quantity');
    //     createDiv.setAttribute("data-type", newPrinter.type);
    //     createDiv.setAttribute("data-color", arrayColor[i]);
    //     createDiv.setAttribute("data-type", arrayCode[i]);
    //     createDiv.textContent = arrayQuantity[i];
    //     tdQuantity.appendChild(createDiv);

    //     var createChangeQuantityDiv = document.createElement('div');
    //     createChangeQuantityDiv.classList.add('change-quantity');

    //     var addQuantity = document.createElement('button');
    //     addQuantity.setAttribute('type', 'button');
    //     addQuantity.setAttribute('class', 'change');
    //     addQuantity.setAttribute('value', 'add')

    //     var createButtonPlus = document.createElement('i');
    //     createButtonPlus.classList.add('fa', 'fa-plus');
    //     addQuantity.appendChild(createButtonPlus);
    //     addQuantity.textContent = '(+1)';

    //     var minusQuantity = document.createElement('button');
    //     minusQuantity.setAttribute('type', 'button');
    //     minusQuantity.setAttribute('class', 'change');
    //     minusQuantity.setAttribute('value', 'minus');

    //     var createButtonMinus = document.createElement('i');
    //     createButtonMinus.classList.add('fa', 'fa-plus');
    //     minusQuantity.appendChild(createButtonMinus);
    //     minusQuantity.textContent = '(-1)';
    //     createChangeQuantityDiv.appendChild(addQuantity);
    //     createChangeQuantityDiv.appendChild(minusQuantity);
    //     tdQuantity.appendChild(createChangeQuantityDiv);
    // }

    // row.appendChild(tdQuantity);
    // var tdUpdated = document.createElement('td');
    // for (var i = 0; i < arrayUpdated.length; i++) {
    //     var createDiv = document.createElement('div');
    //     createDiv.classList.add('Last-Updated');
    //     createDiv.setAttribute('data-type', newPrinter.type);
    //     createDiv.setAttribute('data-color', arrayColor[i]);
    //     createDiv.setAttribute('data-code', arrayCode[i]);
    //     createDiv.textContent = arrayUpdated[i];
    //     tdUpdated.appendChild(createDiv);
    // }

    // row.appendChild(tdUpdated);
    // var tdNotes = document.createElement('td');
    // var createNotesDiv = document.createElement('div');
    // createNotesDiv.classList.add('notes');
    // createNotesDiv.textContent = "Notes: " + newPrinter.notes;
    // tdNotes.appendChild(createNotesDiv);

    // var createNotesButton = document.createElement('div');
    // createNotesButton.classList.add('edit');
    // var editButton = document.createElement('button');
    // editButton.setAttribute("type", "button");
    // editButton.classList.add('edit-notes-button')
    // var createButton = document.createElement('i');
    // createButton.classList.add('fa', 'fa-plus');
    // editButton.appendChild(createButton);
    // editButton.textContent = "Edit";
    // createNotesButton.appendChild(editButton);
    // tdNotes.appendChild(createNotesButton);
    // row.appendChild(tdNotes);

    // var tdName = document.createElement('td');
    // var createPrinterNameDiv = document.createElement('div');
    // createPrinterNameDiv.classList.add('newPrinter-name');
    // createPrinterNameDiv.setAttribute("data-type", newPrinter.type)
    // createPrinterNameDiv.textContent = newPrinter.name;
    // tdName.appendChild(createPrinterNameDiv);
    // row.appendChild(tdName);

    // var tdLocation = document.createElement('td');
    // var createLocationDiv = document.createElement('div');
    // createLocationDiv.classList.add('location');
    // createLocationDiv.setAttribute('data-type', newPrinter.type);
    // createLocationDiv.textContent = newPrinter.location;
    // tdLocation.appendChild(createLocationDiv);
    // row.appendChild(tdLocation);

    // var tdRemoveButton = document.createElement('td');
    // var editPrinterDiv = document.createElement('div');
    // editPrinterDiv.classList.add('edit-printer');
    // editPrinterDiv.setAttribute('data-type', newPrinter.type);
    // editPrinterDiv.setAttribute('data-brand', newPrinter.brand);
    // var editPrinterButton = document.createElement('button');
    // editPrinterButton.setAttribute('type', 'button');
    // editPrinterButton.classList.add('edit-printer-button');
    // var removeActualButton = document.createElement('i');
    // removeActualButton.classList.add('fa', 'fa-plus');
    // editPrinterButton.appendChild(removeActualButton);
    // editPrinterButton.textContent = 'Edit Printer';
    // editPrinterDiv.appendChild(editPrinterButton);
    // tdRemoveButton.appendChild(editPrinterDiv);

    // var createRemovePrinterDiv = document.createElement('div');
    // createRemovePrinterDiv.classList.add('remove-printer');
    // createRemovePrinterDiv.setAttribute('data-type', newPrinter.type);
    // createRemovePrinterDiv.setAttribute('data-brand', newPrinter.brand);
    // var removeButton = document.createElement('button');
    // removeButton.setAttribute("type", "button");
    // removeButton.classList.add('remove-item');
    // removeButton.appendChild(removeActualButton);
    // removeButton.textContent = "Remove Printer";
    // createRemovePrinterDiv.appendChild(removeButton);
    // tdRemoveButton.appendChild(createRemovePrinterDiv);

    // row.appendChild(tdRemoveButton);

  //  modal.style.display = "none";
    //backdropModal.style.display = "none";

    row.setAttribute('data-min-alert', newPrinter.minAlert);

    function titleCase(city) {
        newPrinter.brand = newPrinter.brand.toLowerCase();
        newPrinter.brand = newPrinter.brand.split(' ');
        for (var i = 0; i < newPrinter.brand.length; i++) {
            newPrinter.brand[i] = newPrinter.brand[i].charAt(0).toUpperCase() + newPrinter.brand[i].slice(1);
        }
        return newPrinter.brand.join(' ');
    }

    // for (var i = 0; i < brandFilter.options.length; i++) {
    //     if ((newPrinter.brand === "") || (newPrinter.brand.toUpperCase() === brandFilter.options[i].value.toUpperCase())) {
    //         noBrand = 1;
    //     }
    // }

    /*if (noBrand === 0) {
        var newBrand = document.createElement('option');
        newBrand.textContent = titleCase(newPrinter.brand);
        brandFilter.appendChild(newBrand);
        noBrand = 0;
    }
*/

}
function addNewPrinter(event) {
    var printer = new Printer(
        document.getElementById('post-brand-input').value,
        document.getElementById('post-type-input').value,
        document.getElementById('post-code-input').value,
        document.getElementById('post-color-input').value,
        document.getElementById('post-quantity-input').value,
        document.getElementById('post-updated-input').value,
        document.getElementById('post-name-input').value,
        document.getElementById('post-location-input').value,
        document.getElementById('post-notes-input').value,
        document.getElementById('post-min-quantity-warning').value
    );
    var numRows = printerTable.getElementsByClassName('table-info').length;
    var rowBefore = printerTable.getElementsByClassName('table-info')[numRows - 1];

    var arrayCode = printer.code.split(",").map(function (item) {
        return item.trim();
    });
    

    var arrayColor = printer.color.split(",").map(function (item) {
        return item.trim();
    });
    for (var i = 0; i < arrayColor.length; i++) {
        arrayColor[i] = arrayColor[i].charAt(0).toUpperCase() + arrayColor[i].substr(1).toLowerCase();
    }

    var arrayQuantity = printer.quantity.split(",").map(function (item) {
        return item.trim();
    });

   var arrayUpdated = printer.lastUpdated.split(",").map(function (item) {
       return item.trim();
   });

   printer.code = arrayCode;
   printer.color = arrayColor;
   printer.quantity = arrayQuantity;
   printer.lastUpdated = arrayUpdated;

    addPrinter(rowBefore, printer, numRows);
}
function editPrinter (event) {
    var editedPrinter = new Printer(
        document.getElementById('post-brand-input').value,
        document.getElementById('post-type-input').value,
        document.getElementById('post-code-input').value,
        document.getElementById('post-color-input').value,
        document.getElementById('post-quantity-input').value,
        document.getElementById('post-updated-input').value,
        document.getElementById('post-name-input').value,
        document.getElementById('post-location-input').value,
        document.getElementById('post-notes-input').value,
        document.getElementById('post-min-quantity-warning').value
    );

    while (selectedRow.firstChild) {
        selectedRow.removeChild(selectedRow.firstChild);
    }
    var rowBefore = selectedRow.previousElementSibling;

    selectedRow.parentNode.removeChild(selectedRow);

    var arrayCode = printer.code.split(",").map(function (item) {
        return item.trim();
    });

    var arrayColor = printer.color.split(",").map(function (item) {
        return item.trim();
    });

    var arrayQuantity = printer.quantity.split(",").map(function (item) {
        return item.trim();
    });

   var arrayUpdated = printer.lastUpdated.split(",").map(function (item) {
       return item.trim();
   });

   printer.code = arrayCode;
   printer.color = arrayColor;
   printer.quantity = arrayQuantity;
   printer.lastUpdated = arrayUpdated;

    addPrinter(rowBefore, editedPrinter, null);
}
function setModalDefaultValues(target) {
    var columns = {};
    var th, td, tr = document.getElementById('printer-table').querySelector('TR')

    th = tr.getElementsByTagName('TH');
    for (i = 0; i < th.length; i++) {
        columns[th[i].textContent] = i;
    }

    td = selectedRow.getElementsByTagName('TD');

    var oldPrinter = new Printer(
        td[columns.Brand].textContent.trim(),
        td[columns.Type].textContent.trim(),
        td[columns['# Code']].children,
        td[columns.Color].getElementsByClassName('color'),
        td[columns.Quantity].getElementsByClassName('quantity'),
        td[columns['Last-Updated']].children,
        td[columns['Printer Name']].firstElementChild.textContent.trim(),
        td[columns.Location].firstElementChild.textContent.trim(),
        td[columns.Notes].firstElementChild.textContent.trim().slice(7),
        selectedRow.getAttribute('data-min-alert')
    );

    /* ------ SETTING UP MODAL TO HAVE DEFAULT VALUES ------- */
    document.getElementById('post-brand-input').value = oldPrinter.brand;
    document.getElementById('post-type-input').value = oldPrinter.type;
    document.getElementById('post-notes-input').value = oldPrinter.notes;
    document.getElementById('post-name-input').value = oldPrinter.name;
    document.getElementById('post-location-input').value = oldPrinter.location;
    document.getElementById('post-min-quantity-warning').value = oldPrinter.minAlert;

    var codeInput = document.getElementById('post-code-input');
    var colorInput = document.getElementById('post-color-input');
    var quantityInput = document.getElementById('post-quantity-input');
    var updatedInput = document.getElementById('post-updated-input');

    var tempCodes = "";
    var tempColor = "";
    var tempQuantity = "";
    var tempUpdated = "";
    for (i = 0; i < oldPrinter.code.length; i++) {
        if (i < oldPrinter.code.length - 1) {
            tempCodes += oldPrinter.code[i].textContent.trim() + ', ';
            tempColor += oldPrinter.color[i].textContent.trim() + ', ';
            tempQuantity += oldPrinter.quantity[i].textContent.trim() + ', ';
            tempUpdated += oldPrinter.lastUpdated[i].textContent.trim() + ', ';
        }
        else {
            tempCodes += oldPrinter.code[i].textContent.trim();
            tempColor += oldPrinter.color[i].textContent.trim();
            tempQuantity += oldPrinter.quantity[i].textContent.trim();
            tempUpdated += oldPrinter.lastUpdated[i].textContent.trim();
        }
    }
    codeInput.value = tempCodes;
    colorInput.value = tempColor;
    quantityInput.value = tempQuantity;
    updatedInput.value = tempUpdated;

    openmodal();
    /* ----- UPDATING CHANGES TO TABLE ----- */
}

function Filter(searchKey, minQuantity, maxQuantity, brand, color) {
    this.searchKey = searchKey;
    if (minQuantity === '') {
        this.minQuantity = 0;
    }
    else {
        this.minQuantity = minQuantity;
    }
    if (maxQuantity === '') {
        this.maxQuantity = 9999999;
    }
    else {
        this.maxQuantity = maxQuantity;
    }
    this.brand = brand.toUpperCase();
    this.color = color;
}

function contentClick(event) {
    var target = event.target;
    if (target.className === 'change') {
        changeQuantity(target);
    }
    else if (target.className === 'edit-notes-button') {
        editNotes(target);
    }
    else if (target.id === 'filter-update-button') {
        filter(target);
    }
    else if (target.id === 'reset-button') {
        resetTable(target)
    }
    else if (target.className === 'remove-item') {
        removeRowFromDOM(target);
    }
    else if (target.className === 'edit-printer-button') {
        selectedRow = target.parentNode.parentNode.parentNode;
        setModalDefaultValues(target);
        console.log(selectedRow);
    }
    else if (target.id === 'add-new-item') {
        openmodal("add-new");
    }
}

function changeQuantity(target) {
    var quantity = Number(target.parentNode.previousElementSibling.textContent.trim());
    var row = target.parentNode.parentNode.parentNode;
    if (target.value === 'add') { //figure out why this isn't working...
        quantity += 1;
    }
    else if (target.value === 'minus' && quantity <= 0) {
        alert("Toner quantity cannot be lower than 0");
    }
    else {
        quantity -= 1;
    }

    target.parentNode.previousElementSibling.textContent = quantity;

    if (quantity <= row.getAttribute('data-min-alert')) {
        target.parentNode.previousElementSibling.setAttribute('highlight', 'red');
    }
    else {
        target.parentNode.previousElementSibling.removeAttribute('highlight');
    }
}

function editNotes(target) {
    var textDiv = target.parentNode.previousElementSibling;
    var text = textDiv.textContent.trim();
    //creating input text box
    var input = document.createElement('textarea');
    input.classList.add('edit-notes-field');
    input.value = text.slice(7, text.length);
    input.rows = 10;
    input.cols = 20;

    // creating both the cancel and submit buttons
    var cancelEditButton = document.createElement('button');
    cancelEditButton.classList.add('cancel-edit-button');
    cancelEditButton.textContent = 'Cancel';

    var submitEditButton = document.createElement('button');
    submitEditButton.classList.add('submit-edit-button');
    submitEditButton.textContent = 'Submit';

    // changing display values to none for textDiv and edit button
    textDiv.style.display = 'none';
    target.parentNode.style.display = 'none';
    textDiv.parentNode.insertBefore(input, textDiv.nextElementSibling);
    textDiv.parentNode.insertBefore(cancelEditButton, input.nextElementSibling);
    textDiv.parentNode.insertBefore(submitEditButton, cancelEditButton.nextElementSibling);


    submitEditButton.addEventListener('click', function (event) {

        textDiv.textContent = 'Notes: ' + input.value;
        textDiv.parentNode.removeChild(input);
        textDiv.parentNode.removeChild(cancelEditButton);
        textDiv.parentNode.removeChild(submitEditButton);

        textDiv.style.display = 'block';
        target.parentNode.style.display = 'block';

    });

    cancelEditButton.addEventListener('click', function (event) {
        textDiv.parentNode.removeChild(input);
        textDiv.parentNode.removeChild(cancelEditButton);
        textDiv.parentNode.removeChild(submitEditButton);

        textDiv.style.display = 'block';
        target.parentNode.style.display = 'block';
    });

}


function removeRowFromDOM(target) {
    var postURL = '/removePrinter';

    var row = target.parentNode.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function filter(target) {
    var i, j;
    var tbody = printerTable.querySelector('tbody');
    var start = tbody.firstElementChild.rowIndex;
    var td, th, tr = printerTable.getElementsByTagName('TR');
    var quantity, color;
    var foundMatch = false;
    var numRows = tr.length;
    var columns = {};
    var matchesFound;

    var filter = new Filter(
        document.getElementById('filter-search').value,
        document.getElementById('filter-min-quantity').value,
        document.getElementById('filter-max-quantity').value,
        document.getElementById('filter-brand').value,
        document.getElementById('filter-color').value
    );

    th = tr[0].getElementsByTagName('TH');
    for (i = 0; i < th.length; i++) {
        columns[th[i].textContent] = i;
    }

    // Show each row to start
    for (i = start; i < numRows; i++) {
        tr[i].style.display = 'table-row';
    }

    var key = new RegExp(filter.searchKey, 'i');

    // Search filter
    if (filter.searchKey.length > 0) {
        for (i = start; i < numRows; i++) {
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

    }
    // min Quantity and max quantity filter
    for (i = start; i < numRows; i++) {

        td = tr[i].getElementsByTagName('TD');
        quantity = td[columns.Quantity].getElementsByClassName('quantity');
        matchesFound = 0;

        for (j = 0; j < quantity.length; j++) {
            // reset all columns and rows back to normal
            td[columns['# Code']].children[j].style.display = 'block';
            td[columns.Color].children[j].style.display = 'block';
            quantity[j].style.display = 'block';
            quantity[j].nextElementSibling.style.display = 'block';
            td[columns['Last-Updated']].children[j].style.display = 'block';

            if (Number(quantity[j].textContent) < filter.minQuantity || Number(quantity[j].textContent) > filter.maxQuantity) {
                // set the display of all rows not meeting quantity standards to 'none'
                td[columns['# Code']].children[j].style.display = 'none';
                td[columns.Color].children[j].style.display = 'none';
                quantity[j].style.display = 'none';
                quantity[j].nextElementSibling.style.display = 'none';
                td[columns['Last-Updated']].children[j].style.display = 'none';
                matchesFound++;
            }
            if (matchesFound === quantity.length) {
                tr[i].style.display = 'none';
            }

        }
    }

    // Brand filter
    if (filter.brand.length > 0) {
        for (i = start; i < numRows; i++) {
            td = tr[i].getElementsByTagName('TD');
            var brandName = td[columns.Brand].textContent.toUpperCase();

            if (brandName != filter.brand) {
                tr[i].style.display = 'none';
            }
        }
    }

    // Color filter
    // For HTML add an attribute that will give the color
    if (filter.color != '') {
        for (i = start; i < numRows; i++) {

            td = tr[i].getElementsByTagName('TD');
            color = td[columns.Color].getElementsByClassName('color');
            quantity = td[columns.Quantity].getElementsByClassName('quantity');
            matchesFound = 0;

            for (j = 0; j < color.length; j++) {
                // reset all rows back to normal
                td[columns['# Code']].children[j].style.display = 'block';
                color[j].style.display = 'block';
                quantity[j].style.display = 'block';
                quantity[j].nextElementSibling.style.display = 'block';
                td[columns['Last-Updated']].children[j].style.display = 'block';


                if (color[j].textContent.search(filter.color) === -1) {
                    // set the display of all rows not meeting quantity standards to 'none'
                    td[columns['# Code']].children[j].style.display = 'none';
                    color[j].style.display = 'none';
                    quantity[j].style.display = 'none';
                    quantity[j].nextElementSibling.style.display = 'none';
                    td[columns['Last-Updated']].children[j].style.display = 'none';
                    matchesFound++;
                }

                if (matchesFound === color.length) {
                    tr[i].style.display = 'none';
                }
            }
        }
    }
}
window.addEventListener('load', function (event) {
    var rows = printerTable.getElementsByClassName('table-info');
    var columns = {};
    var th, td, row = printerTable.querySelector('TR');
    var i, j;
    var quantity;

    th = row.getElementsByTagName('TH');
    for (i = 0; i < th.length; i++) {
        columns[th[i].textContent] = i;
    }

    for (i = 0; i < rows.length; i++) {
        td = rows[i].getElementsByTagName('TD');
        quantity = td[columns.Quantity].getElementsByClassName('quantity');
        for (j = 0; j < quantity.length; j++) {
            if (Number(quantity[j].textContent) <= rows[i].getAttribute('data-min-alert')) {
                quantity[j].setAttribute('highlight', 'red');
            }
            else {
                quantity[j].removeAttribute('highlight');
            }
        }
    }
});
content.addEventListener('click', contentClick);
edit.addEventListener('click', editPrinter);
addNew.addEventListener('click', addNewPrinter);
close.addEventListener("click", closemodal);
cancel.addEventListener("click", closemodal);
document.addEventListener("click", windowCloseModal);

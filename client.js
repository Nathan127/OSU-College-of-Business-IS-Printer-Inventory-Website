var printerTable = document.getElementById('printer-table');
var content = document.querySelector('.content');
var close = document.getElementById('modal-close');
var cancel = document.getElementById('modal-cancel');
var modal = document.getElementById('sell-something-modal');
var backdropModal = document.getElementById('modal-backdrop');
var post = document.getElementById('modal-accept');
var open = document.getElementById('add-new-item');

open.addEventListener("click", openmodal);
close.addEventListener("click", closemodal);
cancel.addEventListener("click", closemodal);
document.addEventListener("click", windowCloseModal);
post.addEventListener("click", submit);

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

function openmodal(event) {
    backdropModal.style.display = "block";
    modal.style.display = "block";
}

function closemodal(event) {
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

function Printer(brand, type, code, color, quantity, updated, name, location, notes) {
    this.brand = brand;
    this.type = type;
    this.code = code;
    this.color = color;
    this.quantity = quantity;
    this.updated = updated;
    this.name = name;
    this.location = location;
    this.notes = notes;
}

function submit(event) {
    var printer = new Printer(
        document.getElementById('post-brand-input').value,
        document.getElementById('post-type-input').value,
        document.getElementById('post-code-input').value,
        document.getElementById('post-color-input').value,
        document.getElementById('post-quantity-input').value,
        document.getElementById('post-updated-input').value,
        document.getElementById('post-name-input').value,
        document.getElementById('post-location-input').value,
        document.getElementById('post-notes-input').value
    );


    var arrayCode = printer.code.split(",").map(function(item) {
        return item.trim();
    });

    var arrayColor = printer.color.split(",").map(function(item) {
        return item.trim();
    });

    var arrayQuantity = printer.quantity.split(",").map(function(item) {
        return item.trim();
    });

    var arrayUpdated = printer.updated.split(",").map(function(item) {
        return item.trim();
    });

    var filledOut = true;
    for (var i in printer) {
        if (printer[i] === "") {
            filledOut = false;
            break;
        }
    }
    if (!filledOut) {
        alert("Not all fields have been completed, please fill out all fields and then submit.")
    }

    else {
        var brandFilter = document.getElementById('filter-brand');
        var noBrand = 0;
        var tr = document.createElement('tr');
        tr.classList.add("table-info")
        var tdBrand = document.createElement('td');
        tdBrand.textContent = printer.brand;
        tr.appendChild(tdBrand);
        var tdType = document.createElement('td');
        tdType.textContent = printer.type;
        tr.appendChild(tdType);
        var tdCode = document.createElement('td');

        for(var i = 0; i < arrayCode.length; i++){
          var createDiv = document.createElement('div');
          createDiv.classList.add('code');
          createDiv.setAttribute('type', printer.type);
          createDiv.setAttribute('color', arrayColor[i]);
          createDiv.textContent = arrayCode[i];
          tdCode.appendChild(createDiv);
        }

        tr.appendChild(tdCode);
        var tdColor = document.createElement('td');

        for(var i = 0; i < arrayColor.length; i++){
          var createDiv = document.createElement('div');
          createDiv.classList.add('color');
          createDiv.setAttribute("type", printer.type);
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
          createDiv.setAttribute("type", printer.type);
          createDiv.setAttribute("color", arrayColor[i]);
          createDiv.setAttribute("type", arrayCode[i]);
          createDiv.textContent = arrayQuantity[i];
          tdQuantity.appendChild(createDiv);

          var createChangeQuantityDiv = document.createElement('div');
          createChangeQuantityDiv.classList.add('change-quantity');

          var addQuantity = document.createElement('button');
          addQuantity.setAttribute('type', 'button');
          addQuantity.setAttribute('class', 'change');
          addQuantity.setAttribute('value', 'add')

          var createButtonPlus = document.createElement('i');
          createButtonPlus.classList.add('fa', 'fa-plus');
          addQuantity.appendChild(createButtonPlus);
          addQuantity.textContent = '(+1)';

          var minusQuantity = document.createElement('button');
          minusQuantity.setAttribute('type', 'button');
          minusQuantity.setAttribute('class', 'change');
          minusQuantity.setAttribute('value', 'minus');

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
          createDiv.setAttribute('type', printer.type);
          createDiv.setAttribute('color', arrayColor[i]);
          createDiv.setAttribute('code', arrayCode[i]);
          createDiv.textContent = arrayUpdated[i];
          tdUpdated.appendChild(createDiv);
        }

        tr.appendChild(tdUpdated);
        var tdNotes = document.createElement('td');
        var createNotesDiv = document.createElement('div');
        createNotesDiv.classList.add('notes');
        createNotesDiv.textContent = "Notes: " + printer.notes;
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
        var createPrinterNameDiv = document.createElement('div');
        createPrinterNameDiv.classList.add('printer-name');
        createPrinterNameDiv.setAttribute("type", "503A")
        createPrinterNameDiv.textContent = printer.name;
        tdName.appendChild(createPrinterNameDiv);
        tr.appendChild(tdName);
        var tdLocation = document.createElement('td');
        var createLocationDiv = document.createElement('div');
        createLocationDiv.classList.add('location');
        createLocationDiv.setAttribute('type', '503A');
        createLocationDiv.textContent = printer.location;
        tdLocation.appendChild(createLocationDiv);
        tr.appendChild(tdLocation);
        var printerTable = document.getElementById('printer-table').getElementsByTagName('tbody')[0];
        printerTable.appendChild(tr);
        console.log(printerTable);
        modal.style.display = "none";
        backdropModal.style.display = "none";
        function titleCase(city){
          printer.brand = printer.brand.toLowerCase();
          printer.brand = printer.brand.split(' ');
          for (var i = 0; i < printer.brand.length; i++) {
            printer.brand[i] = printer.brand[i].charAt(0).toUpperCase() + printer.brand[i].slice(1);
          }
          return printer.brand.join(' ');
        }
        for(var i = 0; i < brandFilter.options.length; i++){
            if((printer.brand === "") || (printer.brand.toUpperCase() === brandFilter.options[i].value.toUpperCase())){
              noBrand = 1;
            }
          }

          if(noBrand === 0){
            var newBrand = document.createElement('option');
            newBrand.textContent = titleCase(printer.brand);
            brandFilter.appendChild(newBrand);
            noBrand = 0;
          }
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
    if (target.className === 'change') {
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
}

function changeQuantity(target) {
    var quantity = Number(target.parentNode.previousElementSibling.textContent);
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
}

function editNotes(target) {
    var text = target.parentNode.previousElementSibling.textContent;
}

function filter(target) {
    var i, j;
    var start = 2;
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
        document.querySelectorAll('input[name="filter-brand"]:checked'),
        document.getElementById('filter-color').value
    );



    th = tr[1].getElementsByTagName('TH');
    for (i = 0; i < th.length; i++) {
        columns[th[i].textContent] = i;
    }

    // Show each row to start
    for (i = start; i < numRows; i++) {
        tr[i].style.display = 'table-row';
    }

    var key = new RegExp(filter.searchKey, 'i');

    // Search filter
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

            if (filter.maxQuantity === 0) {
                filter.maxQuantity = 9999999;
            }

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
            var brandName = td[columns.Brand].textContent.toLowerCase();
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
content.addEventListener('click', contentClick);

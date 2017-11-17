var printerTable = document.getElementById('printer-table');
var addPrinter = document.getElementById('add-new-item');
var content = document.querySelector('.content');
var close = document.getElementById('modal-close');
var cancel = document.getElementById('modal-cancel');
var modal = document.getElementById('sell-something-modal');
var backdropModal = document.getElementById('modal-backdrop')
var post = document.getElementById('modal-accept');

addPrinter.addEventListener("click", openmodal);
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


function submit(event) {
    var brand = document.getElementById('post-brand-input').value;
    var type = document.getElementById('post-type-input').value;
    var code = document.getElementById('post-code-input').value;
    var color = document.getElementById('post-color-input').value;
    var quantity = document.getElementById('post-quantity-input').value;
    var updated = document.getElementById('post-updated-input').value;
    var name = document.getElementById('post-name-input').value;
    var location = document.getElementById('post-location-input').value;
    var notes = document.getElementById('post-notes-input').value;



    if ((brand === "") || (type === "") || (code === "") || (color === "") || (quantity === "") || (updated === "") || (name === "") || (location === "") || (notes === "")) {
        alert("Not all fields have been completed, please fill out all fields and then submit.")
    }

    else {
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
    var i, j, matchesFound = 0;
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
        matchesFound = 0;

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

                matchesFound++;
            }

            if (matchesFound === td[columns['Color']].children.length) {
                tr[i].style.display = 'none';
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

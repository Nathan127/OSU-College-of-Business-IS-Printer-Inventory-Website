var printerTable = document.getElementById('printer-table');
var button = document.getElementById('add-new-item');
var content = document.querySelector('.content');
var table = document.getElementById('printer-table');
var modal = document.getElementById('sell-something-modal');
var backdropModal = document.getElementById('modal-backdrop')
var close = document.getElementById('modal-close');
var cancel = document.getElementById('modal-cancel');

button.addEventListener("click", openmodal);
close.addEventListener("click", closemodal);
cancel.addEventListener("click", closemodal);
document.addEventListener("click", windowCloseModal);

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

function openmodal(event) {
  backdropModal.style.display = "block";
  modal.style.display = "block";
}

function Filter (searchKey, minQuantity, maxQuantity, brand, color) {
    this.searchKey = searchKey;
    this.minQuantity = Number(minQuantity);
    this.maxQuantity = Number(maxQuantity);
    this.brand = brand;
    this.color = color;
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
}

function contentClick (event) {
    var target = event.target;

    if (target.id == 'change') {
        changeQuantity(target);
    }
    else if (target.id == 'edit') {
        editNotes(target);
    }
    else if (target.id == 'filter-update-button') {
        filter(target);
<<<<<<< HEAD
    }
    console.log(document.getElementById('sort-type').value);
    // else if (target.id == 'submitSort') {
    //     console.log(document.getElementById('sort-type').value);
    //     sort(event.currentTarget);
    // }// add a submit button to the sort
=======
    }   
>>>>>>> 19813def8a46b8d0c9086272d1c2cb8e2603d80f
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

function editNotes (target) {
    var text = target.parentNode.previousElementSibling.textContent;
}

function filter (target) {
    var i, j;
    var start = 2;
    var td;
    var quantity;
    var foundMatch = false;
    var tr = table.getElementsByTagName('TR');
    var numRows = tr.length;
    var color;

    var filter = new Filter(
        document.getElementById('filter-search').value,
        document.getElementById('filter-min-quantity').value,
        document.getElementById('filter-max-quantity').value,
        document.querySelectorAll('input[name="filter-brand"]:checked'),
        document.getElementById('filter-color').value
    );

    var columns = {};

    td = tr[1].getElementsByClassName('TD');
    for (i = 0; i < td.length; i++) {
        columns[td[i].textContent] = i;
    }
    // Show each row to start
    for (i = start; i < numRows - 1; i++) {
        tr[i].style.display = 'table-row';
    }

    var key = new RegExp(filter.searchKey, 'i');

<<<<<<< HEAD
    // Search key
    for (i = start; i < numRows - 1; i++) {
=======
    // Search filter
    for (i = start; i < numRows - 1; i++) {    
>>>>>>> 19813def8a46b8d0c9086272d1c2cb8e2603d80f
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
        quantity = td[4].getElementsByClassName('quantity');

        for (j = 0; j < quantity.length; j++) {
            // reset all rows back to normal
            td[2].children[j].style.display = 'block';
            td[3].children[j].style.display = 'block';
            quantity[j].style.display = 'block';
            quantity[j].nextElementSibling.style.display = 'block';
            td[5].children[j].style.display = 'block';
            
            if (filter.maxQuantity === 0) {
                filter.maxQuantity = 9999999;
            }
            console.log("== Before", quantity[j].style.display + " " + i);
            if (Number(quantity[j].textContent) < filter.minQuantity || Number(quantity[j].textContent) > filter.maxQuantity) {
                // set the display of all rows not meeting quantity standards to 'none'
                td[2].children[j].style.display = 'none';
                td[3].children[j].style.display = 'none';
                quantity[j].style.display = 'none';
                quantity[j].nextElementSibling.style.display = 'none';
                td[5].children[j].style.display = 'none';
                console.log(quantity[j].style.display + '  ' + i);
                // The commented out code below is in case we decide that we would rather change the color of the match
                //      instead of the display value

                // if (quantity[j].getAttribute('color').toLowerCase() == 'black') {
                //     quantity[j].style.color = 'white';
                // }
                // quantity[j].style.backgroundColor = quantity[j].getAttribute('color');
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
<<<<<<< HEAD
    for (i = start; i < numRows - 1; i++) {

        td = tr[i].getElementsByTagName('TD');
        color = td[3].getElementsByClassName('color');

        for (j = 0; j < color.length; j++) {
            // reset all rows back to normal
            td[2].children[j].style.display = 'block';
            color[j].style.display = 'block';
            td[4].children[j].style.display = 'block';
            td[5].children[j].style.display = 'block';
            console.log(color[j].textContent);
            if (filter.color != '') {
                if (color[j].textContent.search(filter.color) === -1) {
                    // set the display of all rows not meeting quantity standards to 'none'
                    td[2].children[j].style.display = 'none';
                    color[j].style.display = 'none';
                    td[4].children[j].style.display = 'none';
                    td[5].children[j].style.display = 'none';

                    // The commented out code below is in case we decide that we would rather change the color of the match
                    //      instead of the display value

                    // if (quantity[j].getAttribute('color').toLowerCase() == 'black') {
                    //     quantity[j].style.color = 'white';
                    // }
                    // quantity[j].style.backgroundColor = quantity[j].getAttribute('color');
                }

            }
        }


    }


}
content.addEventListener('click', contentClick);











// function sortAlpha (table) {

//     // var numOfPrinters = null;
//     // var start = 2;
//     // var j = start;
//     // var x;
//     for (var i = 0; i < table.rows.length; i++) {
//         console.log(table.rows[i]);
//     }
//     table.rows = selectionSort(table.rows)
//     for (var i = 0; i < table.rows.length; i++) {
//         console.log(table.rows[i]);
//     }
//     return table.rows;

//     // for (var x = 0; x < i; x++) {
//     //     rows.shift();
//     // }
// }
// function selectionSort(items){

//         var len = items.length,
//             min;

//         for (i=2; i < len; i++){

//             //set minimum to this position
//             min = i;

//             //check the rest of the array to see if anything is smaller
//             for (j=i+1; j < len; j++){
//                 if (items[j].cells[0].textContent < items[min].cells[0].textContent){
//                     min = j;
//                 }
//             }

//             //if the minimum isn't in the position, swap it
//             if (i != min){
//                 swap(items, i, min);
//             }
//         }

//         return items;
// }
// function swap(items, firstIndex, secondIndex){
//     var temp = items[firstIndex];
//     items[firstIndex] = items[secondIndex];
//     items[secondIndex] = temp;
// }
//
/*  while (i < rows.length) {
        for (var j = i + 1; j < rows.length; j++) {
            if (rows[j].cells[0].textContent < rows[i].cells[0].textContent) {
                tempRow = rows[i];
                rows[i] = rows[j];
                rows[j] = tempRow;
                j++;
                i++;
            }
=======
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
        
                        // The commented out code below is in case we decide that we would rather change the color of the match
                        //      instead of the display value 
        
                        // if (quantity[j].getAttribute('color').toLowerCase() == 'black') {
                        //     quantity[j].style.color = 'white';
                        // }
                        // quantity[j].style.backgroundColor = quantity[j].getAttribute('color');
                    }
                
                }
            }
    
                
>>>>>>> 19813def8a46b8d0c9086272d1c2cb8e2603d80f
        }
    }


<<<<<<< HEAD
    var tempRow = rows[j];
    var xRowspan, jRowspan;

    while (j < rows.length) {
        x = j + jRowspan
        xRowspan = rows[x].cells[0].rowSpan;
        jRowspan = rows[j].cells[0].rowSpan;

        while (x >= j) {
            if (rows[x].cells[0].textContent < rows[j].cells[0].textContent) {
                if (xRowspan > jRowspan) {
                    var rowSpanGT, rowSpanLT;
                    if (xRowspan > jRowspan) {
                        rowSpanGT = xRowspan;
                        rowSpanLT = jRowspan;
                    }
                    else  {
                        rowSpanGT = jRowspan;
                        rowSpanLT = xRowspan;
                    }


                    for (var k = 0; k <= rowSpanGT; k++) {
                        if (j + k > rowSpanLT) {
                            for (var z = x + rowSpanGT; z > x; z--) {
                                tempRow = rows[x + rowSpanGT - z];
                                rows[x + rowSpanGT - z] = rows[rowSpanGT];
                                rows[rowSpanGT] = tempRow;
                            }
                        }
                        else {
                            tempRow = rows[j + k];
                            rows[j + k] = rows[x + k];
                            rows[x + k] = tempRow;
                        }

                    }
                    }
                }
            }
            */
=======
    
}
content.addEventListener('click', contentClick);
>>>>>>> 19813def8a46b8d0c9086272d1c2cb8e2603d80f

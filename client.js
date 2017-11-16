var printerTable = document.getElementById('printer-table');

function tableClick (event) {    
var content = document.querySelector('.content');
var table = document.getElementById('printer-table');
console.log(table);

var defaultSort = null;

function Filter (searchKey, minQuantity, maxQuantity, brand, color) {
    this.searchKey = searchKey;
    this.minQuantity = minQuantity;
    this.maxQuantity = maxQuantity;
    this.brand = brand;
    this.color = color;
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
    }
    console.log(document.getElementById('sort-type').value);
    // else if (target.id == 'submitSort') {
    //     console.log(document.getElementById('sort-type').value);
    //     sort(event.currentTarget);
    // }// add a submit button to the sort

    
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
    var foundMatch = false;
    var tr = table.getElementsByTagName('tr');
    var numRows = tr.length;

    for (i = start; i < numRows; i++) {
        tr[i].style.display = 'table-row';
    }

    var filter = new Filter(
        document.getElementById('filter-search').value,
        document.getElementById('filter-min-quantity').value,
        document.getElementById('filter-max-quantity').value,
        document.querySelectorAll('input[name="filter-brand"]:checked'),
        document.getElementById('filter-color')
    );
    console.log(filter);
    var key = new RegExp(filter.searchKey, 'i');

    if (filter.searchKey.length > 0) {
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
    }
    
}











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
//     // while (i < rows.length) {
//     //     for (var j = i + 1; j < rows.length; j++) {
//     //         if (rows[j].cells[0].textContent < rows[i].cells[0].textContent) {
//     //             tempRow = rows[i];
//     //             rows[i] = rows[j];
//     //             rows[j] = tempRow;
//     //             j++;
//     //             i++;
//     //         }
//     //     }
//     //     i++;
//     // }
    

//     // var tempRow = rows[j];
//     // var xRowspan, jRowspan;

//     // while (j < rows.length) {
//     //     x = j + jRowspan
//     //     xRowspan = rows[x].cells[0].rowSpan;
//     //     jRowspan = rows[j].cells[0].rowSpan;

//     //     while (x >= j) {
//     //         if (rows[x].cells[0].textContent < rows[j].cells[0].textContent) {
//     //             if (xRowspan > jRowspan) {
//     //                 var rowSpanGT, rowSpanLT;
//     //                 if (xRowspan > jRowspan) {
//     //                     rowSpanGT = xRowspan;
//     //                     rowSpanLT = jRowspan;
//     //                 }  
//     //                 else  {
//     //                     rowSpanGT = jRowspan;
//     //                     rowSpanLT = xRowspan;
//     //                 }
                        
                   
//     //                 for (var k = 0; k <= rowSpanGT; k++) {
//     //                     if (j + k > rowSpanLT) {
//     //                         for (var z = x + rowSpanGT; z > x; z--) {
//     //                             tempRow = rows[x + rowSpanGT - z];
//     //                             rows[x + rowSpanGT - z] = rows[rowSpanGT];
//     //                             rows[rowSpanGT] = tempRow;
//     //                         }
//     //                     }
//     //                     else {
//     //                         tempRow = rows[j + k];
//     //                         rows[j + k] = rows[x + k];
//     //                         rows[x + k] = tempRow;
//     //                     }
                        
//     //                 }
//             //         }
//             //     }
//             // }
                    
content.addEventListener('click', contentClick);




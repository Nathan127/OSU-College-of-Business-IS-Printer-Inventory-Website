var printerTable = document.getElementById('printer-table');

function tableClick (event) {    
    var target = event.target;

    if (target.id == 'change') {
        changeQuantity(target);   
    }
    else if (target.id == 'edit') {
        editNotes(target);
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

function editNotes (target) {
    var text = target.parentNode.previousElementSibling.textContent;

}
printerTable.addEventListener('click', tableClick);




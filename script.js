
// DEVON REINHART

const DIALOGS = [
    dialogMenu,
    dialogCart,
]

overlay.onclick = (e) => {
    if (DIALOGS.some(x => x === e.target || x.contains(e.target))){
        return;
    }
    CloseCartDialog();
    CloseMenuDialog();
}

let activeDialogCount = 0;

function OpenMenuDialog() {
    activeDialogCount++;
    dialogMenu.classList.remove("disabled");
    overlay.classList.add("open");
}

function OpenCartDialog() {
    activeDialogCount++;
    anyDialogActive = true;
    dialogCart.classList.remove("disabled");
    overlay.classList.add("open");
}

function CloseMenuDialog() {
    activeDialogCount--;
    dialogMenu.classList.add("disabled");
    if (activeDialogCount <= 0) {
        overlay.classList.remove("open");
        activeDialogCount = 0;
    }
}

function CloseCartDialog() {
    activeDialogCount--;
    dialogMenu.classList.add("disabled");
    if (activeDialogCount <= 0) {
        overlay.classList.remove("open");
        activeDialogCount = 0;
    }
}
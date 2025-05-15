// DEVON REINHART

const DIALOGS = [dialogMenu, dialogCart];

overlay.onclick = (e) => {
  if (DIALOGS.some((x) => x === e.target || x.contains(e.target))) {
    return;
  }
  CloseCartDialog();
  CloseMenuDialog();
};

let activeDialogCount = 0;

function OpenMenuDialog() {
  OpenDialog(dialogMenu);
}

function OpenCartDialog() {
  OpenDialog(dialogCart);
}

function CloseMenuDialog() {
  CloseDialog(dialogMenu);
}

function CloseCartDialog() {
  CloseDialog(dialogCart);
}

function OpenDialog(dialogElement) {
  activeDialogCount++;
  anyDialogActive = true;
  dialogElement.classList.remove("disabled");
  overlay.classList.add("open");
  document.body.classList.add("no-scroll");
}

function CloseDialog(dialogElement) {
  activeDialogCount--;
  dialogElement.classList.add("disabled");
  if (activeDialogCount <= 0) {
    overlay.classList.remove("open");
    document.body.classList.remove("no-scroll");
    activeDialogCount = 0;
  }
}

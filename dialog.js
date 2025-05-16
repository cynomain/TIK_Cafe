const dialogMessage = $I("dialog-message")

const DIALOGS = [dialogMenu, dialogCart, dialogMessage, dialogTable];


var Overlay_AllowClose = true;
overlay.onclick = (e) => {
  if (!Overlay_AllowClose || DIALOGS.some((x) => x === e.target || x.contains(e.target))) {
    return;
  }
  DIALOGS.forEach(x => {
    CloseDialog(x);
  })
};

let activeDialogCount = 0;

function OpenMenuDialog(modal = false) {
  OpenDialog(dialogMenu, modal);
}

function OpenCartDialog(modal = false) {
  OpenDialog(dialogCart, modal);
}

function CloseMenuDialog() {
  CloseDialog(dialogMenu);
}

function CloseCartDialog() {
  CloseDialog(dialogCart);
}

const MessageDialog = {
  msgTitle: $Q("#dialog-message>.title"),
  msgMessage: $Q("#dialog-message>.message"),
  msgBtnClose: $I("msg-dialog-close"),
  msgBtnNo: $I("msg-dialog-no"),
  msgBtnYes: $I("msg-dialog-yes"),
  msgIcon: $I("dm-icon"),
  actionClose: () => { },
  actionNo: () => { },
  actionYes: () => { },
}

MessageDialog.msgBtnClose.onclick = () => {
  CloseDialog(dialogMessage);
  if (MessageDialog.actionClose !== null || MessageDialog.actionClose !== undefined) {
    MessageDialog.actionClose();
  }
}

MessageDialog.msgBtnNo.onclick = () => {
  CloseDialog(dialogMessage);
  if (MessageDialog.actionNo !== null || MessageDialog.actionNo !== undefined) {
    MessageDialog.actionNo();
  }
}

MessageDialog.msgBtnYes.onclick = () => {
  CloseDialog(dialogMessage);
  if (MessageDialog.actionYes !== null || MessageDialog.actionYes !== undefined) {
    MessageDialog.actionYes();
  }
}

function ShowMessage(title, message, btYesNo, actBtnClose = () => { }, actBtnNo = () => { }, actBtnYes = () => { }, customIcon = null) {
  MessageDialog.msgTitle.innerText = title;
  MessageDialog.msgMessage.innerText = message;
  if (btYesNo) {
    MessageDialog.msgBtnClose.classList.add("disabled");
    MessageDialog.msgBtnNo.classList.remove("disabled");
    MessageDialog.msgBtnYes.classList.remove("disabled");
  } else {
    MessageDialog.msgBtnClose.classList.remove("disabled");
    MessageDialog.msgBtnNo.classList.add("disabled");
    MessageDialog.msgBtnYes.classList.add("disabled");
  }
  MessageDialog.actionClose = actBtnClose ?? (() => { });
  MessageDialog.actionNo = actBtnNo ?? (() => { });
  MessageDialog.actionYes = actBtnYes ?? (() => { });
  MessageDialog.msgIcon.src = customIcon ?? "assets/icons/generic/error.svg";
  OpenDialog(dialogMessage);
}

function OpenDialog(dialogElement, modal = false) {
  activeDialogCount++;
  anyDialogActive = true;
  dialogElement.classList.remove("disabled");
  overlay.classList.add("open");
  document.body.classList.add("no-scroll");
  if (modal) {
    dialogElement.classList.add("top-most");
  }
}

function CloseDialog(dialogElement) {
  activeDialogCount--;
  dialogElement.classList.add("disabled");
  dialogElement.classList.remove("top-most");
  if (activeDialogCount <= 0) {
    overlay.classList.remove("open");
    document.body.classList.remove("no-scroll");
    activeDialogCount = 0;
  }
}

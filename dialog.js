const dialogMessage = $I("dialog-message")
const dialogMenu = $I("dialog-menuview");
const dialogTable = $I("dialog-table")
const dialogCart = $I("dialog-cart");
const overlay = $Q(".overlay");

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
  function act() {
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

  //wait for close animation
  if (!dialogMessage.classList.contains("disabled")) {
    dialogMessage.addEventListener("transitionend", (e) => {
      if (e.propertyName == "scale") {
        act();
      }
    }, {once:true})
  } else {
    act();
  }

}

let tempTimeouts = {};
function OpenDialog(dialogElement, modal = false) {
  activeDialogCount++;
  anyDialogActive = true;
  dialogElement.ontransitionend = () => { };
  dialogElement.classList.remove("disabled");
  setTimeout(() => {
    dialogElement.classList.remove('disable-anim')
  }, 10);
  overlay.classList.add("open");
  
  if (modal) {
    dialogElement.classList.add("top-most");
  }
}
// DEVON REINHART

function CloseDialog(dialogElement) {
  activeDialogCount--;
  dialogElement.classList.add('disable-anim')
  dialogElement.ontransitionend = (e) => {
    if (e.propertyName == "scale") {
      dialogElement.classList.add("disabled");
      dialogElement.classList.remove("top-most");
    }
  }
  if (activeDialogCount <= 0) {
    overlay.classList.remove("open");
    activeDialogCount = 0;
  }
}
// DEVON REINHART

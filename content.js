// Paste image from clipboard to file input
// Until LinkedIn catches up with the times
document.addEventListener("paste", function (event) {
  if (event.clipboardData && event.clipboardData.items[0].type.indexOf("image") === 0) {
    const fileType = event.clipboardData.items[0].type;
    var inputElements = document.getElementsByTagName("input");
    let fileInput = undefined;
    for (var i = 0; i < inputElements.length; ++i) {
      if (inputElements[i].accept.match(/image/)) {
        fileInput = inputElements[i];
        break;
      }
    }
    if (fileInput) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        fetch(readerEvent.target.result)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "Pasted file", { type: fileType });
            const dT = new DataTransfer();
            dT.items.add(file);
            fileInput.files = dT.files;
            fileInput.dispatchEvent(new Event("change"));
          });
      };
      reader.readAsDataURL(event.clipboardData.items[0].getAsFile());
    } else {
      alert("You first need to click on the image upload button and dismiss the file picker dialog. Then you can paste the image.");
    }
  }
});

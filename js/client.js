// Script for the responsive download button
document.getElementById("downloadBtn").addEventListener("click", function() {
    // The URL of the file to be downloaded
    var fileUrl = "https://drive.google.com/file/d/1Eapr9vq4Czi5OghNnObnpDj_fwK-OSIR/view?usp=sharing";
  
    // Create a temporary anchor element
    var link = document.createElement("a");
    link.href = fileUrl;
  
    // Set the download attribute to force download instead of navigation
    link.setAttribute("download", "cv.pdf");
  
    // Simulate a click on the anchor element
    if (document.createEvent) {
      var event = document.createEvent("MouseEvents");
      event.initEvent("click", true, true);
      link.dispatchEvent(event);
    } else {
      link.click();
    }
  });
  
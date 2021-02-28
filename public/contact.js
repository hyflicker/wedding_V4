let getSelector = document.getElementById("contact-select");
getSelector.addEventListener("change", addSubjectOther);
let otherInput = document.getElementById("contactOther");
function addSubjectOther() {
    if (getSelector.value === "4") {
        otherInput.style.display = "inline";
        otherInput.required = true;
    }else{
        otherInput.style.display = "none";
        otherInput.required = false;
    }
}
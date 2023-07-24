const wrapper = document.querySelector(".wrapper");
const form = wrapper.querySelector("form");
const fileInput = form.querySelector("input");
const infoText = form.querySelector("p");
const copyButton = wrapper.querySelector(".copy");
const closeButton = wrapper.querySelector(".close");

function fetchRequest(formData, file){
    infoText.innerText = "Scanning a QR Code..."
    fetch("https://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", 
        body: formData
    }).then(res => res.json()).then(result => {
        result= result[0].symbol[0].data;
        infoText.innerText = result ? "Upload a QR Code to Scan" : "Couldn't scan QR Code"
        if(!result) return;
        wrapper.querySelector("textarea").innerText = result ;
        form.querySelector("img").src = URL.createObjectURL(file)
        wrapper.classList.add("active");
    }).catch(() => {
        infoText.innerText = "Couldn't scan QR Code"
    })
}

fileInput.addEventListener("change", e => {
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append("file", file);
    fetchRequest(formData, file);
    // console.log(file);
})

copyButton.addEventListener("click", () => {
    let text = wrapper.querySelector('textarea').textContent;
    navigator.clipboard.writeText(text);
})

form.addEventListener("click", () => fileInput.click())

closeButton.addEventListener("click", () => wrapper.classList.remove("active"))
// closeButton.addEventListener("click", () => window.location.reload());
const svgContent = document.getElementById("svg-content");
const panZoomGroup = document.getElementById("pan-zoom-group");
const landmarkData = {};
let isDragging = false;
let startCoords = { x: 0, y: 0 };
let scaleFactor = 1.0;
let minScale = 0.5;
let maxScale = 2.0;

svgContent.addEventListener("mousedown", (e) => {
    isDragging = true;
    startCoords = { x: e.clientX, y: e.clientY };
    svgContent.style.cursor = "grabbing";
});

svgContent.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startCoords.x;
    const deltaY = e.clientY - startCoords.y;

    panZoomGroup.setAttribute("transform", `translate(${deltaX},${deltaY}) scale(${scaleFactor})`);
});

svgContent.addEventListener("mouseup", () => {
    isDragging = false;
    svgContent.style.cursor = "grab";
});

svgContent.addEventListener("mouseleave", () => {
    isDragging = false;
    svgContent.style.cursor = "grab";
});

svgContent.addEventListener("wheel", (e) => {
    e.preventDefault();

    if (e.deltaY > 0) {
        // Zoom out
        if (scaleFactor > minScale) {
            scaleFactor -= 0.1;
        }
    } else {
        // Zoom in
        if (scaleFactor < maxScale) {
            scaleFactor += 0.1;
        }
    }

    const { clientX, clientY } = e;
    const { left, top } = svgContent.getBoundingClientRect();
    const offsetX = clientX - left;
    const offsetY = clientY - top;

    const scaleTransform = `scale(${scaleFactor})`;
    const translateTransform = `translate(${offsetX * (1 - scaleFactor)}, ${offsetY * (1 - scaleFactor)})`;
    const transformValue = `${translateTransform} ${scaleTransform}`;
    
    panZoomGroup.setAttribute("transform", transformValue);

    
});

fetch("landmark_data.xml")
.then((response) => response.text())
.then((xmlText) => {
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlText, "application/xml");
const landmarks = xmlDoc.querySelectorAll("landmark");

landmarks.forEach((landmark) => {
const id = landmark.getAttribute("id");
const name = landmark.querySelector("name").textContent;
const description = landmark.querySelector("description").textContent;

landmarkData[id] = { name, description };
});
});

svgContent.addEventListener("click", (e) => {
const clickedElement = e.target;
const id = clickedElement.getAttribute("id");

if (id && landmarkData[id]) {
const { name, description } = landmarkData[id];
displayLandmarkInfo(name, description);
}
});

function displayLandmarkInfo(name, description) {
// Replace or update this part to display the information as you need
alert(`Landmark: ${name}\nDescription: ${description}`);
}

const floorMap = document.getElementById('floor-map');
const spaceInfo = document.getElementById('space-info');
const floors = floorMap.querySelectorAll("rect");

floorMap.addEventListener("click", function(e) {
    const floor = e.target.parentNode;
    
    if(e.target.nodeName === 'rect') {
        for (var i=0; i < floors.length; i++) {
            floors[i].classList.remove("active");
        }
        floor.classList.add("active");
        var floorName = floor.querySelector("title").innerHTML,
        floorPara = floor.querySelector("desc p");
        sourceImg = floor.querySelector("img"),
        imgPath = "";

        spaceInfo.innerHTML = "";
        spaceInfo.insertAdjacentHTML("afterbegin", 
        "<h1>"+floorName)
        // "</h1><p>"+provincePara.innerHTML+"</p>");
        spaceInfo.classList.add("show");
    }
})

 start()
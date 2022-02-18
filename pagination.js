const urlOriginaL="https://rickandmortyapi.com/api/character";
const urlAlterna="https://rickandmortyapi.com/api/character/?page=";


function listDesign(numPage=1, itemAmount){
    var numPages;
    fetch(urlOriginaL)
        .then(response => response.json())
        .then(data=>{
            numPages = data.info.pages;
            if (itemAmount == undefined){
                if (numPages>4){
                    itemAmount= 6;
                } else{
                    itemAmount= numPages;
                }
            };
            var prevLi=document.createElement("li");
            var prevA=document.createElement("a");
            prevLi.id="prev";
            prevA.className="page-link";
            prevA.setAttribute("tabindex", "-1")
            prevA.setAttribute("aria-disabled", "true")
            prevA.setAttribute("onclick", "goPage(title)")
            prevA.setAttribute("title", "prev")
            if (numPage==1){
                prevLi.className="page-item disabled";
            } else{
                prevLi.className="page-item";
            }
            prevLi.appendChild(prevA).appendChild(document.createTextNode("Anterior"));
            document.querySelector("#page-container").append(prevLi);
            for (i=1; i<itemAmount; i++){
                var li=document.createElement("li");
                var a=document.createElement("a");
                li.id=i;
                li.className="page-item";
                a.className="page-link";
                a.setAttribute("onclick", "goPage(title)")
                a.setAttribute("title", i)
                li.appendChild(a).appendChild(document.createTextNode(i));
                document.querySelector("#page-container").append(li);
            }
            var nextLi=document.createElement("li");
            var nextA=document.createElement("a");
            nextLi.id="next";
            nextA.className="page-link";
            if (numPage==numPages){
                nextLi.className="page-item disabled";
            } else{
                nextLi.className="page-item";
            }
            nextA.setAttribute("onclick", "goPage(title)")
            nextA.setAttribute("title", "next")
            nextLi.appendChild(nextA).appendChild(document.createTextNode("Siguiente"));
            document.querySelector("#page-container").append(nextLi);
        })
    
}

function goPage(pag){
    var urlPaginada;
    if (typeof pag === "string"){
        switch (pag) {
            case "prev":
                urlPaginada= document.getElementById("prev").getAttribute("prev-url");
                break;
            case "next":
                urlPaginada= document.getElementById("next").getAttribute("next-url");
                break;
        }
    } else{
        urlPaginada=urlAlterna + pag;
    }
    getData(urlPaginada);
}

$(document).ready(() => {
    $("#page-container").click(() => {
        $("#list-characters").empty();
    })
})
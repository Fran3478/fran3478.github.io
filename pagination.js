const urlOriginaL="https://rickandmortyapi.com/api/character";
const urlAlterna="https://rickandmortyapi.com/api/character/?page=";
var url=urlOriginaL;
var numPage = 1;
var itemAmount;

function listDesign(){
    var numPages;
    fetch(url)
        .then(response => response.json())
        .then(data=>{
            numPages = data.info.pages;
            var nextUrl=data.info.next;
            var prevUrl=data.info.prev;
            if (numPages>4){
                    itemAmount=6;
            } else{
                itemAmount= numPages;
            }
            var prevLi=document.createElement("li");
            var prevA=document.createElement("a");
            prevLi.id="prev";
            prevLi.setAttribute("prev-url", prevUrl);
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
                if (numPage==i){
                    li.className="page-item active";
                } else{
                    li.className="page-item";
                }
                a.className="page-link";
                a.setAttribute("onclick", "goPage(title)")
                a.setAttribute("title", i)
                li.appendChild(a).appendChild(document.createTextNode(i));
                document.querySelector("#page-container").append(li);
            }
            var nextLi=document.createElement("li");
            var nextA=document.createElement("a");
            nextLi.id="next";
            nextLi.setAttribute("next-url", nextUrl);
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
    switch (pag) {
        case "prev":
            url= document.getElementById("prev").getAttribute("prev-url");
            numPage--;
            break;
        case "next":
            url= document.getElementById("next").getAttribute("next-url");
            numPage++;
            break;
        default:
            url=urlAlterna + pag;
            numPage=parseInt(pag);
    }
    getData(url);
    listDesign();
}

$(document).ready(() => {
    $("#page-container").click(() => {
        $("#list-characters").empty();
        $("#page-container").empty();
    })
})
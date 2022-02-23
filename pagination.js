function getPage(){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var value = urlParams.get('pag');
    if (value==null){
        value="1";
    }
    return (value)
}

function pagDesign(numPag, pages, next, prev){
    var prevLi=document.createElement("li");
    var prevA=document.createElement("a");
    var num;
    prevA.className="page-link";
    prevA.setAttribute("tabindex", "-1")
    prevA.setAttribute("aria-disabled", "true")
    if (prev==null){
        prevLi.className="page-item disabled";
    } else{
        prevLi.className="page-item";
        prevA.setAttribute("onclick", "goToPage(title)");
        num=prev[prev.length-1];
        prevA.setAttribute("title",num);
    }
    prevLi.appendChild(prevA).appendChild(document.createTextNode("Anterior"));
    document.querySelector("#page-container").append(prevLi);
    for(i=1; i<6; i++){
        var li=document.createElement("li");
        var a=document.createElement("a");
        a.className="page-link";
        a.setAttribute("title", i)
        a.setAttribute("onclick", "goToPage(title)")
        li.appendChild(a).appendChild(document.createTextNode(i));
        document.querySelector("#page-container").append(li);
    }
    var nextLi=document.createElement("li");
    var nextA=document.createElement("a");
    nextA.className="page-link";
    if (next==null){
        nextLi.className="page-item disabled";
    } else{
        nextLi.className="page-item";
        nextA.setAttribute("onclick", "goToPage(title)");
        var aux=next.toString();
        num=aux[aux.length-1];
        nextA.setAttribute("title", num);
    }
    nextLi.appendChild(nextA).appendChild(document.createTextNode("Siguiente"));
    document.querySelector("#page-container").append(nextLi);
}

function goToPage(pag){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var value = urlParams.get('pag');
    var url=window.location.origin+window.location.pathname+"?pag=";
    var newUrl;
    if (value==null){
        value="1";
    }
    switch (pag) {
        case "prev":
            newUrl = url+(parseInt(value)-1).toString();
            break;
        case "next":
            newUrl =url+(parseInt(value)+1).toString();
            break;
        default:
            newUrl = url+pag;
    }
    window.location.replace(newUrl);
}
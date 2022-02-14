const url="https://rickandmortyapi.com/api/character";

function getData(){
    fetch(url)
        .then(response => response.json())
        .then(data=>{
            var name;
            for (character of data.results){
                var li=document.createElement("li");
                var btn=document.createElement("button");
                name=character.name;
                btn.className="btn";
                btn.type="button";
                btn.setAttribute("data-bs-toggle", "modal");
                btn.setAttribute("data-bs-target", "#exampleModal");
                li.id="personaje";
                btn.appendChild(document.createTextNode(name));
                document.querySelector("#list-characters").appendChild(li).appendChild(btn);
            }
        })
}

function showData(){
    console.log("click");
}
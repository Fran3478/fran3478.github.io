const url="https://rickandmortyapi.com/api/character";

function getData(){
    fetch(url)
        .then(response => response.json())
        .then(data=>{
            var name;
            for (character of data.results){
                var li=document.createElement("li");
                var p=document.createElement("p");
                name=character.name;
                p.appendChild(document.createTextNode(name));
                document.querySelector("#list-characters").appendChild(li).appendChild(p);
            }
        })
}
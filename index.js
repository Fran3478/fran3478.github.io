const url="https://rickandmortyapi.com/api/character";

function getData(){
    fetch(url)
        .then(response => response.json())
        .then(data=>{
            var name;
            var image;
            for (character of data.results){
                var li=document.createElement("li");
                var p=document.createElement("p");
                var img=document.createElement("img");
                name=character.name;
                img.src=character.image;
                p.appendChild(document.createTextNode(name));
                document.querySelector("#list-characters").appendChild(li).appendChild(img);
                document.querySelector("#list-characters").appendChild(li).appendChild(p);
            }
        })
}
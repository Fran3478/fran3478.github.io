function getData(url = "https://rickandmortyapi.com/api/character"){
    fetch(url)
        .then(response => response.json())
        .then(data=>{
            var name;
            var nextUrl=data.info.next;
            var prevUrl=data.info.prev;
            var prev=document.getElementById("prev");
            prev.setAttribute("prev-url", prevUrl);
            var next=document.getElementById("next");
            next.setAttribute("next-url", nextUrl);
            data.results.forEach(character => {
                var li=document.createElement("li");
                var btn=document.createElement("button");
                name=character.name;
                urlImg=character.image;
                species=character.species;
                btn.className="btn";
                btn.type="button";
                btn.setAttribute("data-bs-toggle", "modal");
                btn.setAttribute("data-bs-target", "#exampleModal");
                btn.setAttribute("char-name", name);
                btn.setAttribute("url-img", urlImg);
                btn.setAttribute("char-species", species)
                li.id="personaje";
                btn.appendChild(document.createTextNode(name));
                document.querySelector("#list-characters").appendChild(li).appendChild(btn);
            });
        })
}

var exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', event => {
    var button = event.relatedTarget
    var name = button.getAttribute('char-name')
    var urlImg = button.getAttribute('url-img')
    var species = button.getAttribute('char-species')
    var modalTitle = exampleModal.querySelector('.modal-title')
    var div=document.createElement("div");
    var img=document.createElement("img");
    var p=document.createElement("p");
    div.className="div-img";
    img.src=urlImg;
    img.className="img-char";
    p.appendChild(document.createTextNode(species))
    p.className="spieces";
    modalTitle.textContent = name
    document.querySelector("#modalBody").appendChild(div).appendChild(img);
    document.querySelector("#modalBody").appendChild(p);
})

$('.modal').on('hidden.bs.modal', () => {
    $('.modal').removeData('modal').find('.modal-body').html('')
});


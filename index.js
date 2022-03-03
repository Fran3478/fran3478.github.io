const urlBase = 'https://rickandmortyapi.com/api/character/'

function getData () {
  const param = '?page='
  const numPag = getPage()
  const url = urlBase + param + numPag
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let name
      data.results.forEach(character => {
        const li = document.createElement('li')
        const btn = document.createElement('button')
        name = character.name
        urlImg = character.image
        species = character.species
        btn.className = 'btn'
        btn.type = 'button'
        btn.setAttribute('data-bs-toggle', 'modal')
        btn.setAttribute('data-bs-target', '#exampleModal')
        btn.setAttribute('char-name', name)
        btn.setAttribute('url-img', urlImg)
        btn.setAttribute('char-species', species)
        li.id = 'personaje'
        btn.appendChild(document.createTextNode(name))
        document.querySelector('#list-characters').appendChild(li).appendChild(btn)
      })
      const pagData = data.info
      pagDesign(numPag, pagData.pages, pagData.next, pagData.prev)
    })
}

const exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget
  const name = button.getAttribute('char-name')
  const urlImg = button.getAttribute('url-img')
  const species = button.getAttribute('char-species')
  const modalTitle = exampleModal.querySelector('.modal-title')
  const div = document.createElement('div')
  const img = document.createElement('img')
  const p = document.createElement('p')
  div.className = 'div-img'
  img.src = urlImg
  img.className = 'img-char'
  p.appendChild(document.createTextNode(species))
  p.className = 'spieces'
  modalTitle.textContent = name
  document.querySelector('#modalBody').appendChild(div).appendChild(img)
  document.querySelector('#modalBody').appendChild(p)
})

$('.modal').on('hidden.bs.modal', () => {
  $('.modal').removeData('modal').find('.modal-body').html('')
})

const urlBase = 'https://rickandmortyapi.com/api/character/'

function getData () {
  const paginationData = getPage()
  const numPag = paginationData.pag
  const filterName = paginationData.filterName
  if (filterName != undefined) {
    var param = '?page=' + numPag + '&name=' + filterName
  } else {
    var param = '?page=' + numPag
  }
  const url = urlBase + param
  fetch(url).then(response => {
    if (response.ok){
      response.json().then(data => {
        let name
        data.results.forEach(character => {
          const li = document.createElement('li')
          const row = document.createElement('div')
          const colMain = document.createElement('div')
          const colAux = document.createElement('div')
          const btn = document.createElement('button')
          name = character.name
          urlImg = character.image
          species = character.species
          row.className = 'row'
          colMain.className = 'col-12'
          colAux.className = 'col'
          btn.className = 'buton'
          btn.type = 'button'
          btn.setAttribute('data-bs-toggle', 'modal')
          btn.setAttribute('data-bs-target', '#exampleModal')
          btn.setAttribute('char-name', name)
          btn.setAttribute('url-img', urlImg)
          btn.setAttribute('char-species', species)
          li.id = 'personaje'
          colMain.appendChild(li).appendChild(btn)
          btn.appendChild(document.createTextNode(name))
          document.querySelector('.list-characters').appendChild(colMain)
          document.querySelector('.list-characters').appendChild(colAux)
        })
        const pagData = data.info
        pagDesign(numPag, pagData.pages, pagData.next, pagData.prev)
      })
    } else {
      const errorMessage = "Ups, sorry we couldn't find that one"
      document.getElementById('error-message').innerHTML = errorMessage
      $('label').removeClass('hidden');
    }
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

window.onload = () => {
  $('#onload').fadeOut();
  $('body').removeClass('hidden');
  getData();
}

$('.modal').on('hidden.bs.modal', () => {
  $('.modal').removeData('modal').find('.modal-body').html('')
})
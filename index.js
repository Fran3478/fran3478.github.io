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
    if (response.ok) {
      response.json().then(data => {
        let name
        data.results.forEach(character => {
          const container = document.createElement('div')
          const row = document.createElement('div')
          const colImg = document.createElement('div')
          const img = document.createElement('img')
          const colData = document.createElement('div')
          const cardBody = document.createElement('div')
          const cardTittle = document.createElement('h2')
          const cardStatus = document.createElement('p')
          const statusIcon = document.createElement('span')
          /*const li = document.createElement('li')
          const btn = document.createElement('button')*/
          name = character.name
          container.className = 'card mb-3'
          container.style = 'max-width: 540px;'
          row.className = 'row g-0'
          colImg.className = 'img-col col-md-4'
          let imgUrl = character.image 
          img.src = imgUrl
          img.className = 'char-img img-fluid'
          img.setAttribute('alt', '...')
          colData.className = 'col-md-8'
          cardBody.className = 'card-body'
          cardTittle.className = 'card-tittle'
          cardStatus.className = 'card-text'
          let charStatus = character.status
          species = character.species
          switch (charStatus) {
            case 'Alive':
              statusIcon.className = 'status-icon-alive'
              break;
            case 'Dead':
              statusIcon.className = 'status-icon-dead'
              break;
            default:
              statusIcon.className = 'status-icon-unknown'
          }
          cardTittle.setAttribute('data-bs-toggle', 'modal')
          cardTittle.setAttribute('data-bs-target', '#exampleModal')
          cardTittle.setAttribute('char-name', name)
          cardTittle.setAttribute('url-img', imgUrl)
          cardTittle.setAttribute('char-species', species)
          container.id = 'personaje'
          cardTittle.appendChild(document.createTextNode(name))
          cardStatus.append(statusIcon, document.createTextNode(charStatus + ' - ' + species))
          colImg.appendChild(img)
          cardBody.append(cardTittle, cardStatus)
          colData.appendChild(cardBody)
          container.appendChild(row).append(colImg, colData)
          
          document.querySelector('.list-characters').appendChild(container)
        })
        const pagData = data.info
        pagDesign(numPag, pagData.pages, pagData.next, pagData.prev)
      })
    } else {
      const errorMessage = "Ups, sorry we couldn't find that one"
      document.getElementById('error-message').innerHTML = errorMessage
      $('label').removeClass('hidden')
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
  $('#onload').fadeOut()
  $('body').removeClass('hidden')
  getData()
}

$('.modal').on('hidden.bs.modal', () => {
  $('.modal').removeData('modal').find('.modal-body').html('')
})

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
          const card = document.createElement('div')
          const imgContainer = document.createElement('div')
          const img = document.createElement('img')
          const textContainer = document.createElement('div')
          const cardTittle = document.createElement('p')
          const cardInfo = document.createElement('div')
          const cardStatus = document.createElement('p')
          const statusIcon = document.createElement('span')
          name = character.name
          card.className = 'card'
          imgContainer.className = 'card__image-container'
          let imgUrl = character.image 
          img.src = imgUrl
          textContainer.className = 'card__content'
          cardTittle.className = 'card__title text--medium'
          cardInfo.className = 'card__info'
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
          card.setAttribute('data-bs-toggle', 'modal')
          card.setAttribute('data-bs-target', '#exampleModal')
          card.setAttribute('char-name', name)
          card.setAttribute('url-img', imgUrl)
          card.setAttribute('char-species', species)
          cardTittle.appendChild(document.createTextNode(name))
          cardStatus.append(statusIcon, document.createTextNode(charStatus + ' - ' + species))
          imgContainer.appendChild(img)
          cardInfo.appendChild(cardStatus)
          textContainer.append(cardTittle, cardStatus)
          card.append(imgContainer, textContainer)
          
          document.querySelector('.cards').appendChild(card)
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

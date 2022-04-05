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
          let lastLocation = character.location.name
          let origin = character.origin.name
          const fstEpisodeUrl = character.episode[0]
          let totalEpisodes = 0
          character.episode.forEach(() => {
            totalEpisodes++
          })
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
          card.setAttribute('last-location', lastLocation)
          card.setAttribute('origin', origin)
          card.setAttribute('fstepisode-url', fstEpisodeUrl)
          card.setAttribute('total-episodes', totalEpisodes)
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
  .then(() =>{
    $('#onload').fadeOut()
    $('#main-cards').removeClass('hidden')
    })
}

function openNav() {
  document.getElementById("sidebar").style.width = "250px";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
}

const exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', event => {
  const card = event.relatedTarget
  $('#modalload').show()
  const fstEpisodeUrl = card.getAttribute('fstepisode-url')
  const name = card.getAttribute('char-name')
  const modalTitle = exampleModal.querySelector('.modal-title')
  modalTitle.textContent = name
  fetch(fstEpisodeUrl)
    .then(response => response.json())
    .then(data => {
      $('#modalload').fadeOut()
      $('#modalBody').removeClass('hidden')
      const urlImg = card.getAttribute('url-img')
      const lastLocation = card.getAttribute('last-location')
      const origin = card.getAttribute('origin')
      const totalEpisodes = card.getAttribute('total-episodes')
      const episodeName = data.name
      const episodeCode = data.episode
      const div = document.createElement('div')
      const img = document.createElement('img')
      const textdiv = document.createElement('div')
      const pOrigin = document.createElement('p')
      const pOriginSpan = document.createElement('span')
      const pLastLocation = document.createElement('p')
      const pLastLocationSpan = document.createElement('span')
      const pEpisode = document.createElement('p')
      const pEpisodeSpan = document.createElement('span')
      const pTotalEp = document.createElement('p')
      const pTotalEpSpan = document.createElement('span')
      div.className = 'div-img'
      img.src = urlImg
      img.className = 'img-char'
      textdiv.className = 'div-text'
      pOriginSpan.appendChild(document.createTextNode('Origin: '))
      pOriginSpan.className = 'info text'
      pOrigin.appendChild(document.createTextNode(origin))
      pOrigin.className = 'info'
      pOrigin.insertAdjacentElement('afterbegin', pOriginSpan)
      pLastLocationSpan.appendChild(document.createTextNode('Last known location: '))
      pLastLocationSpan.className = 'info text'
      pLastLocation.appendChild(document.createTextNode(lastLocation))
      pLastLocation.className = 'info'
      pLastLocation.insertAdjacentElement('afterbegin', pLastLocationSpan)
      pEpisodeSpan.appendChild(document.createTextNode('First appearance: '))
      pEpisodeSpan.className = 'info text'
      pEpisode.appendChild(document.createTextNode('"' + episodeName + '" - ' + episodeCode))
      pEpisode.className = 'info'
      pEpisode.insertAdjacentElement('afterbegin', pEpisodeSpan)
      pTotalEpSpan.appendChild(document.createTextNode('Total episodes appearance: '))
      pTotalEpSpan.className = 'info text'
      pTotalEp.appendChild(document.createTextNode(totalEpisodes))
      pTotalEp.className = 'info'
      pTotalEp.insertAdjacentElement('afterbegin', pTotalEpSpan)
      div.appendChild(img)
      textdiv.append(pOrigin, pLastLocation, pEpisode, pTotalEp)
      document.querySelector('#modalBody').append(div, textdiv)
    })
    
  
})

window.onload = () => {
  
  $('page').removeClass('hidden')
  getData()
}

$('.modal').on('hidden.bs.modal', () => {
  $('.modal').removeData('modal').find('.modal-body').html('')
})
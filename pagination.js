function getPage () {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  let value = urlParams.get('pag')
  value = value == undefined ? 1 : value
  return (value)
}

function pagDesign (numPag, pages, next, prev) {
  const prevLi = document.createElement('li')
  const prevA = document.createElement('a')
  const prevDiv = document.createElement('div')
  let min, max
  prevA.className = 'page-link'
  prevA.setAttribute('tabindex', '-1')
  prevA.setAttribute('aria-disabled', 'true')
  if (prev == null) {
    prevLi.className = 'page-item disabled'
  } else {
    prevLi.className = 'page-item'
    prevA.setAttribute('onclick', 'goToPage(title)')
    prevA.setAttribute('title', 'prev')
  }
  prevDiv.appendChild(prevLi).appendChild(prevA).appendChild(document.createTextNode('Anterior'))
  document.querySelector('#page-container').append(prevDiv)
  switch (parseInt(numPag)) {
    case 1:
    case 2:
    case 3:
      min = 1
      max = 6
      break
    case pages - 2:
    case pages - 1:
    case pages:
      min = pages - 4
      max = pages + 1
      break
    default:
      min = parseInt(numPag) - 2
      max = parseInt(numPag) + 3
  }
  for (i = min; i < max; i++) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const div = document.createElement('div')
    switch (parseInt(numPag)) {
      case 1:
      case 2:
        if ((i === max - 2) || (i === max - 1)) {
          div.className = 'd-none d-sm-none d-md-block'
        }
        break
      case pages - 1:
      case pages:
        if ((i === min) || (i === min + 1)) {
          div.className = 'd-none d-sm-none d-md-block'
        }
        break
      default:
        if ((i === min) || (i === max - 1)) {
          div.className = 'd-none d-sm-none d-md-block'
        }
    }
    console.log(min, max, numPag)
    a.className = 'page-link'
    a.setAttribute('title', i)
    a.setAttribute('onclick', 'goToPage(title)')
    if (i == numPag) { li.className = 'page-item active' }

    div.appendChild(li).appendChild(a).appendChild(document.createTextNode(i))
    document.querySelector('#page-container').append(div)
  }
  const nextLi = document.createElement('li')
  const nextA = document.createElement('a')
  const nextDiv = document.createElement('div')
  nextA.className = 'page-link'
  if (next == null) {
    nextLi.className = 'page-item disabled'
  } else {
    nextLi.className = 'page-item'
    nextA.setAttribute('onclick', 'goToPage(title)')
    nextA.setAttribute('title', 'next')
  }
  nextDiv.appendChild(nextLi).appendChild(nextA).appendChild(document.createTextNode('Siguiente'))
  document.querySelector('#page-container').append(nextDiv)
}

function goToPage (pag) {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  let value = urlParams.get('pag')
  const url = window.location.origin + window.location.pathname + '?pag='
  let newUrl
  value = value == undefined ? 1 : value
  switch (pag) {
    case 'prev':
      newUrl = url + (parseInt(value) - 1).toString()
      break
    case 'next':
      newUrl = url + (parseInt(value) + 1).toString()
      break
    default:
      newUrl = url + pag
  }
  window.location.replace(newUrl)
}

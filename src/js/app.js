// import { MDCRipple } from '@material/ripple'
import { MDCTextField } from '@material/textfield'

import Spinner from './components/Spinner.js'
import Functions from './components/Functions.js'

const textFields = document.querySelectorAll('.mdc-text-field')
const buttonElement = document.querySelector('.mdc-button')

const card_1 = document
  .querySelector('.search__card--1')
  .querySelector('.search__wrapper')
const card_2 = document
  .querySelector('.search__card--2')
  .querySelector('.search__wrapper')

let flag

// const buttonInstance = new MDCRipple(buttonElement)
const artist_text_field = new MDCTextField(textFields[0])
const song_text_field = new MDCTextField(textFields[1])

function activeSpinner(el) {
  el.innerHTML = ''

  el.insertAdjacentHTML('beforeend', Spinner())
}

function resolveImage(user_data, images) {
  let markup_success
  let markup_error = `
      <div class="search__error">
            <i class="fas fa-times"></i>
            <span class="search__error--message">Imagem de artista não encontrada!</span>
      </div>
  `

  if (images) {
    const index = Math.floor(Math.random() * images.length)

    const image = images[index]

    markup_success = `<picture class="search__picture">
                      <img
                        class="search__image"
                        src="${image}"
                        alt="avatar placeholder"
                      />
                    </picture>

                    <span class="search__artist">${user_data.artist.toUpperCase()}</span>
                    <span class="search__song">${user_data.song.toUpperCase()}</span>
                  `
  }

  card_1.innerHTML = ''

  card_1.insertAdjacentHTML('beforeend', images ? markup_success : markup_error)

  toggleSearchButton()
}

function resolveLyrics(lyrics) {
  const markup_success = `
      <span class="search__lyrics">${lyrics}</span>
    `

  const markup_error = `
      <div class="search__error">
          <i class="fas fa-times"></i>
          <span class="search__error--message">Letra de música não encontrada!</span>
      </div>
  `
  card_2.innerHTML = ''

  card_2.insertAdjacentHTML('beforeend', lyrics ? markup_success : markup_error)

  toggleSearchButton()
}

function toggleSearchButton() {
  flag = flag + 1

  if (flag == 2) buttonElement.disabled = false
}

function waitForDataAnimation() {
  activeSpinner(card_1)
  activeSpinner(card_2)
}

function clearInputsAndDisableButton() {
  artist_text_field.value = song_text_field.value = ''
  buttonElement.disabled = true
}

function newSearch() {
  const artist = artist_text_field.value
  const song = song_text_field.value

  if (!artist || !song) return

  flag = 0

  clearInputsAndDisableButton()

  waitForDataAnimation()

  const user_data = { artist: artist, song: song }

  Functions.fetchImage(user_data).then((data) => {
    resolveImage(user_data, data)
  })

  Functions.fetchLyrics(user_data).then((data) => {
    resolveLyrics(data)
  })
}

function keyHandler(e) {
  if (e.key === 'Enter') {
    newSearch()

    textFields.forEach((field) => {
      field.querySelector('.mdc-text-field__input').blur()
    })
  }
}

function start() {
  textFields.forEach((field) => {
    field.addEventListener('keydown', keyHandler)
  })

  buttonElement.addEventListener('click', newSearch)
}

start()

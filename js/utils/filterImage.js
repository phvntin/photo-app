import {
  fileInput,
  filterName,
  filterOptions,
  filterSlider,
  filterValue,
  previewImg,
} from './constants.js'

export let newUrl = ''
let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0,
  contrast = 100,
  opacity = 100

export function loadImage() {
  // get selected file
  let file = fileInput.files[0]
  if (!file) return

  const size = file.size
  // max size of image 5MB
  const maxSize = 1 * 1024 * 1024
  if (size <= maxSize) {
    formCreateNewPost.style.display = 'block'
    // passing url file as preview img src
    previewImg.src = URL.createObjectURL(file)

    // remove overlay when img loaded
    previewImg.addEventListener('load', () => {
      // reset filter when change image
      resetFilters()
      const canvas = document.createElement('canvas')
      // return a drawing context on canvas
      const ctx = canvas.getContext('2d')
      // set width height for canvas with natural width height of preview img
      canvas.width = previewImg.naturalWidth
      canvas.height = previewImg.naturalHeight
      // set filter for canvas
      ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
      // translate canvas from center
      ctx.translate(canvas.width / 2, canvas.width / 2)

      ctx.drawImage(
        previewImg,
        -canvas.width / 2,
        -canvas.width / 2,
        canvas.width,
        canvas.height
      )

      newUrl = canvas.toDataURL()
    })
  } else {
    window.alert('Vui lòng chọn ảnh nhỏ hơn 1MB !')
  }
}

filterOptions.forEach((option) => {
  option.addEventListener('click', () => {
    document.querySelector('.filter .active').classList.remove('active')
    option.classList.add('active')

    filterName.textContent = option.textContent

    // store value of each filter
    switch (option.id) {
      case 'brightness':
        filterSlider.max = '200'
        filterSlider.value = brightness
        filterValue.textContent = `${brightness}%`
        break
      case 'saturation':
        filterSlider.max = '200'
        filterSlider.value = saturation
        filterValue.textContent = `${saturation}%`
        break
      case 'inversion':
        filterSlider.max = '100'
        filterSlider.value = inversion
        filterValue.textContent = `${inversion}%`
        break
      case 'grayscale':
        filterSlider.max = '100'
        filterSlider.value = grayscale
        filterValue.textContent = `${grayscale}%`
        break
      case 'contrast':
        filterSlider.max = '100'
        filterSlider.value = contrast
        filterValue.textContent = `${contrast}%`
        break
      case 'opacity':
        filterSlider.max = '100'
        filterSlider.value = opacity
        filterValue.textContent = `${opacity}%`
    }
  })
})

function applyFilters() {
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) contrast(${contrast}%) opacity(${opacity}%)`
}

export function updateFilters() {
  filterValue.textContent = `${filterSlider.value}%`

  // assign slider value as filter value
  const selectedFilter = document.querySelector('.filter .active')
  switch (selectedFilter.id) {
    case 'brightness':
      brightness = filterSlider.value
      break
    case 'saturation':
      saturation = filterSlider.value
      break
    case 'inversion':
      inversion = filterSlider.value
      break
    case 'grayscale':
      grayscale = filterSlider.value
      break
    case 'contrast':
      contrast = filterSlider.value
      break
    case 'opacity':
      opacity = filterSlider.value
      break
  }

  applyFilters()
}

export function resetFilters() {
  // reset all filters to default values
  brightness = 100
  saturation = 100
  inversion = 0
  grayscale = 0
  contrast = 100
  opacity = 100

  filterOptions[0].click()
  applyFilters()
}

export function saveFilter() {
  // create a new canvas element
  const canvas = document.createElement('canvas')
  // return a drawing context on canvas
  const ctx = canvas.getContext('2d')
  // set width height for canvas with natural width height of preview img
  canvas.width = previewImg.naturalWidth
  canvas.height = previewImg.naturalHeight
  // set filter for canvas
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
  // translate canvas from center
  ctx.translate(canvas.width / 2, canvas.width / 2)

  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.width / 2,
    canvas.width,
    canvas.height
  )

  newUrl = canvas.toDataURL()
}

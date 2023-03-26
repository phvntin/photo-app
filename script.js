const axiosClient = axios.create({
  baseURL: 'https://fake-api-server.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

const postApi = {
  getAll(params) {
    const url = '/posts'
    return axiosClient.get(url, { params })
  },

  getById(id) {
    const url = `/posts/${id}`
    return axiosClient.get(url)
  },

  add(data) {
    const url = '/posts'
    return axiosClient.post(url, data)
  },

  update(data) {
    const url = `/posts/${data.id}`
    return axiosClient.patch(url, data)
  },

  delete(id) {
    const url = `/posts/${id}`
    return axiosClient.delete(url)
  },
}

// declared to use for the function of creating and editing images
const fileInput = document.querySelector('.file-input')
const chooseImgBtn = document.querySelector('.choose-img')
const previewImg = document.querySelector('.preview-img img')
const filterOptions = document.querySelectorAll('.filter button')
const filterName = document.querySelector('.filter-info .name')
const filterSlider = document.querySelector('.slider input')
const filterValue = document.querySelector('.slider .value')
const resetBtn = document.querySelector('.reset-filter')
const saveFilterBtn = document.querySelector('.save-filter')
const formCreateNewPost = document.getElementById('formCreateNewPost')

let newUrl = ''
let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0,
  contrast = 100,
  opacity = 100

// declare to use for detail post modal
const detailModal = document.getElementById('postDetailModal')
const closeDetailBtn = document.getElementById('closeDetailBtn')
const detailPost = document.querySelector('.detail-post')

// declare to use for create new post modal
const createModal = document.getElementById('createNewPostModal')
const closeCreateBtn = document.getElementById('closeCreateBtn')
const detailCreate = document.querySelector('.create-new-content')
const newPostBtn = document.querySelector('.nav__create-post')

// Function of creating and editing images
function loadImage() {
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

function updateFilters() {
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

function resetFilters() {
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

function saveFilter() {
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

async function handleSubmitFormCreateNewPost(event) {
  event.preventDefault()

  const usernameInput = document.getElementById('usernameInput')
  if (!usernameInput) return

  const descInput = document.getElementById('descInput')
  if (!descInput) return

  const newPost = {
    id: Date.now(),
    username: usernameInput.value,
    desc: descInput.value,
    imageUrl: newUrl,
  }

  await postApi.add(newPost)

  // const newLiEl = createPostItem(newPost)
  // const ulEl = document.getElementById('postList')
  // if (ulEl) {
  //   ulEl.appendChild(newLiEl)
  // }

  // hideCreateModal()
  // formCreateNewPost.reset()
  window.location.reload()
}

// Toggle detail modal
function showDetailModal() {
  detailModal.classList.add('active')
}

function hideDetailModal() {
  detailModal.classList.remove('active')
}

closeDetailBtn.addEventListener('click', hideDetailModal)
detailModal.addEventListener('click', hideDetailModal)
detailPost.addEventListener('click', (e) => e.stopPropagation())

// Toggle create new post
function showCreateModal() {
  createModal.classList.add('active')
}

function hideCreateModal() {
  createModal.classList.remove('active')
  resetFilters()
  formCreateNewPost.reset()
  // formCreateNewPost.style.display = 'none'
}

newPostBtn.addEventListener('click', showCreateModal)
createModal.addEventListener('click', hideCreateModal)
closeCreateBtn.addEventListener('click', hideCreateModal)
detailCreate.addEventListener('click', (e) => e.stopPropagation())

// Function of rendering post list
function createPostItem(post) {
  if (!post) return

  const postItemTemplate = document.getElementById('postItemTemplate')
  if (!postItemTemplate) return null

  const liElement = postItemTemplate.content.firstElementChild.cloneNode(true)
  const postImg = liElement.querySelector('.post__img')
  if (postImg) {
    postImg.src = post.imageUrl
    postImg.alt = `Image of ${post.username}`
  }

  const user = liElement.querySelector('.item__user')
  if (user) user.textContent = post.username

  const desc = liElement.querySelector('.item__desc')
  if (desc) desc.textContent = post.desc

  return liElement
}

function renderPostList(postList) {
  if (!Array.isArray(postList) || postList.length === 0) return

  postList.forEach((post) => {
    const liElement = createPostItem(post)

    liElement.addEventListener('click', () => {
      assignDataToDetailModal(post)
      showDetailModal()
    })

    const ulEl = document.getElementById('postList')
    if (ulEl) {
      ulEl.appendChild(liElement)
    }
  })
}

function assignDataToDetailModal(data) {
  const detailImg = detailModal.querySelector('.detail-img')
  if (!detailImg) return
  detailImg.src = data.imageUrl

  const username = detailModal.querySelector('.user-name')
  if (!username) return
  username.textContent = data.username

  const desc = detailModal.querySelector('.user-desc')
  if (!desc) return
  desc.textContent = data.desc

  const deleteBtn = detailModal.querySelector('button.delete-btn')
  if (!deleteBtn) return

  deleteBtn.addEventListener('click', async () => {
    try {
      await postApi.delete(data.id)
    } catch (error) {
      console.log(error)
    }

    window.location.reload()
  })
}

// MAIN IFFE
;(async () => {
  fileInput.addEventListener('change', loadImage)
  filterSlider.addEventListener('input', updateFilters)
  // assign fileinput to choose image btn
  chooseImgBtn.addEventListener('click', () => fileInput.click())
  resetBtn.addEventListener('click', resetFilters)
  saveFilterBtn.addEventListener('click', saveFilter)

  try {
    const { data } = await postApi.getAll()
    renderPostList(data)
  } catch (error) {
    console.log('Failed to fetch post list', error)
  }

  formCreateNewPost.addEventListener('submit', handleSubmitFormCreateNewPost)
})()

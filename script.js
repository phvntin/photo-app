import postApi from './js/api/postApi.js'
import {
  chooseImgBtn,
  closeCreateBtn,
  closeDetailBtn,
  createModal,
  detailCreate,
  detailModal,
  detailPost,
  fileInput,
  filterSlider,
  formCreateNewPost,
  newPostBtn,
  resetBtn,
  saveFilterBtn,
} from './js/utils/constants.js'

import {
  loadImage,
  newUrl,
  resetFilters,
  saveFilter,
  updateFilters,
} from './js/utils/filterImage.js'

import {
  hideCreateModal,
  hideDetailModal,
  showCreateModal,
} from './js/utils/handleModal.js'

import renderPostList from './js/utils/post.js'

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
  window.location.reload()
}

// MAIN IFFE
;(async () => {
  fileInput.addEventListener('change', loadImage)
  filterSlider.addEventListener('input', updateFilters)

  // handle Click events
  chooseImgBtn.addEventListener('click', () => fileInput.click()) // assign fileinput to choose image btn
  resetBtn.addEventListener('click', resetFilters)
  saveFilterBtn.addEventListener('click', saveFilter)
  closeDetailBtn.addEventListener('click', hideDetailModal)
  detailModal.addEventListener('click', hideDetailModal)
  detailPost.addEventListener('click', (e) => e.stopPropagation())
  newPostBtn.addEventListener('click', showCreateModal)
  createModal.addEventListener('click', hideCreateModal)
  closeCreateBtn.addEventListener('click', hideCreateModal)
  detailCreate.addEventListener('click', (e) => e.stopPropagation())

  try {
    const { data } = await postApi.getAll()
    const postList = data.sort(
      (post1, post2) => post2.createdAt - post1.createdAt
    )
    renderPostList(postList)
  } catch (error) {
    console.log('Failed to fetch post list', error)
  }

  formCreateNewPost.addEventListener('submit', handleSubmitFormCreateNewPost)
})()

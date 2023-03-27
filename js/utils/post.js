import postApi from '../api/postApi.js'
import { detailModal } from './constants.js'
import { showDetailModal } from './handleModal.js'

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

    postImg.addEventListener('error', () => {
      postImg.src = 'https://via.placeholder.com/310x310?text=Image+not+found'
    })
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
  detailImg.addEventListener('error', () => {
    detailImg.src = 'https://via.placeholder.com/550x683?text=Image+not+found'
  })

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

export default renderPostList

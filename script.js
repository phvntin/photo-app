// Toggle detail modal
const detailModal = document.getElementById('postDetailModal')
const closeDetailBtn = document.getElementById('closeDetailBtn')
const detailPost = document.querySelector('.detail-post')
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
const createModal = document.getElementById('createNewPostModal')
const closeCreateBtn = document.getElementById('closeCreateBtn')
const detailCreate = document.querySelector('.create-new-content')
const newPostBtn = document.querySelector('.nav__create-post')

function showCreateModal() {
  createModal.classList.add('active')
}
function hideCreateModal() {
  createModal.classList.remove('active')
}

newPostBtn.addEventListener('click', showCreateModal)
createModal.addEventListener('click', hideCreateModal)
closeCreateBtn.addEventListener('click', hideCreateModal)
detailCreate.addEventListener('click', (e) => e.stopPropagation())

function createPostItem(post) {
  if (!post) return

  const postItemTemplate = document.getElementById('postItemTemplate')
  if (!postItemTemplate) return null

  const liElement = postItemTemplate.content.firstElementChild.cloneNode(true)
  const postImg = liElement.querySelector('.post__img')
  if (postImg) {
    postImg.src = post.imageUrl
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
  detailImg.src = data.imageUrl
  const username = detailModal.querySelector('.user-name')
  username.textContent = data.username
  const desc = detailModal.querySelector('.user-desc')
  desc.textContent = data.desc
}

;(() => {
  const postItemList = [
    {
      id: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1679476247743-c35de31fab88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      username: 'phvntin',
      desc: 'asdasdjasjasjo oaisdkaushdiuahs aiushd ausd',
    },
    {
      id: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1679486688718-b699a9a41346?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1019&q=80',
      username: 'sosobad_',
      desc: 'asdasdjasjasjo oaisdkaushdiuahs aiushd ausd',
    },
    {
      id: 3,
      imageUrl:
        'https://images.unsplash.com/photo-1679521878363-6987b06a30f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      username: 'xuemei._',
      desc: 'asdasdjasjasjo oaisdkaushdiuahs aiushd ausd',
    },
  ]

  renderPostList(postItemList)
})()

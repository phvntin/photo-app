import { createModal, detailModal, formCreateNewPost } from './constants.js'
import { resetFilters } from './filterImage.js'

export function showDetailModal() {
  detailModal.classList.add('active')
}

export function hideDetailModal() {
  detailModal.classList.remove('active')
}

// Toggle create new post
export function showCreateModal() {
  createModal.classList.add('active')
}

export function hideCreateModal() {
  createModal.classList.remove('active')
  resetFilters()
  formCreateNewPost.reset()
}

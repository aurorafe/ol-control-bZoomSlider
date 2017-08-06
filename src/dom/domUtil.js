/**
 * 创建dom
 * @param tagName (标签名)
 * @param className (类名)
 * @param container (容器)
 * @param id (唯一标识)
 * @returns {Element}
 */
export const create = (tagName, className, container, id) => {
  let el = document.createElement(tagName)
  el.className = className || ''
  if (id) {
    el.id = id
  }
  if (container) {
    container.appendChild(el)
  }
  return el
}

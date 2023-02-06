import { request } from "./request";
export function getCategorydata() {
  return request({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {
  // http://152.136.185.210:7878/api/m5/subcategory?maitKey=3627
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    // http://152.136.185.210:7878/api/m5/subcategory/detail?miniWallkey=10062603&type=pop
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
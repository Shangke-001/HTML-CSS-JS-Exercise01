import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqCatrgory1, reqCatrgory2, reqCatrgory3 } from '@/api/product/attr'
import type { CategoryItem } from '@/api/product/attr/type'

export default defineStore('CategoryStore', () => {
  let c1Id = ref<number | string>('') //字符串便于清空
  let c1List = ref<CategoryItem[]>([])
  const getC1 = () => {
    reqCatrgory1().then(
      (res) => {
        if (res.code == 200) {
          c1List.value = res.data
        }
      },
      (err) => {}
    )
  }
  let c2Id = ref<number | string>('')
  let c2List = ref<CategoryItem[]>([])
  const getC2 = async () => {
    const res = await reqCatrgory2(c1Id.value as number)
    if (res.code == 200) {
      c2List.value = res.data
    } else {
    }
  }
  let c3Id = ref<number | string>('')
  let c3List = ref<CategoryItem[]>([])
  const getC3 = async () => {
    const res = await reqCatrgory3(c2Id.value as number)
    if (res.code == 200) {
      c3List.value = res.data
    } else {
    }
  }
  return {
    c1Id,
    c1List,
    c2Id,
    c2List,
    c3Id,
    c3List,
    getC1,
    getC2,
    getC3
  }
})

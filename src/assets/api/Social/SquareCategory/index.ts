/**
 * 社交相关-圈子分类表
 */


import {get, post} from '@/utils/request'

//获取圈子分类
export const getSquareCategory = (categoryName: any) => {
    return get("/api/category/list", {categoryName})
}

//获取父圈子
export const getParentSquare = (parentId: number) => {
    return get("/api/category/getParentCategory", {parentId})
}

//获取父圈子的详情
export const getSquareDetail = (parentId: any) => {
    return get("/api/category/getCategoryDetail", {parentId})
}

//根据categoryId获取圈子详情
export const getSquareById = (id: any) => {
    return get("/api/category/getCategoryDetailById", {id})
}

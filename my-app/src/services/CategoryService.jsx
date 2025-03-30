import httpRequest from "@/utils/httpRequest";
export const getAllCategory=async(id)=>{
    try {
        const response = await httpRequest.get(`/category?userId=${id}`)
        return response.data
    } catch (error) {
        console.error(error);
    }
}
export const addCategory=async (data) => {
    try {
        const response = await httpRequest.post("/category",data)
        return response.data
    } catch (error) {
        console.error(error);
    }
}
export const deleteCategory=async (id) => {
    try {
        const response = await httpRequest.delete(`/category?categoryId=${id}`)
        return response.data
    } catch (error) {
        console.error(error);
    }
}
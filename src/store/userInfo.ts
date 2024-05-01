import {defineStore} from 'pinia'
import {getUserInfo} from "@/assets/api/Login";

export const useUserStore = defineStore('userInfo', () => {
    const userId = ref()
    const userData = ref()

    async function getUser() {
        if (!userId.value) {
            userData.value = await getUserInfo()
            userId.value = userData.value.userId
        }
    }

    return {
        getUser,
        userData,
        userId
    }
})

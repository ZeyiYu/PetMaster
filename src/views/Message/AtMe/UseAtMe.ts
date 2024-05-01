//@我的
import {useUserStore} from "@/store/userInfo";
import {getAtMe} from "@/assets/api/Social/UserPost";
import {transContent} from "@/utils/tools";

export const useAtMe = () => {
    onMounted(() => {
        onAtMe().catch(e => {
            console.log(e)
        });
    })
    const userStore = useUserStore()
    const postContent = ref()
    const onAtMe = async () => {
        postContent.value = await getAtMe(userStore.userId)
        postContent.value.map((item: any) => {
            transContent(item)
        });
    }
    return {
        postContent
    }
}

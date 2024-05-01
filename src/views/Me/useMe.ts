//用户所有帖子数
import {Ref} from "vue";
import {useUserStore} from "@/store/userInfo";
import {getAllFans, getAllFollowing} from "@/assets/api/Social/Follow";
import {getUserPost, getUserPostCount} from "@/assets/api/Social/UserPost";
import {transContent} from "@/utils/tools";

export const useMe = () => {
    onMounted(() => {
        onLogin().catch(e => {
            console.log(e)
        });
        onMyPosts().catch(e => {
            console.log(e)
        })
    })
    //用户所发帖子数量
    const allPosts = ref()
    //关注数量
    const allFollowing = ref()
    //粉丝数量
    const allFans = ref()
    //用户名
    const userName = ref()
    //用户ID
    const userId = ref()
    //用户头像
    const userAvatar = ref()
    const isExperts = ref()
    const loading: Ref<boolean> = ref(true)

    const userInfo = ref()
    const userStore = useUserStore()
    const onLogin = async () => {
        await userStore.getUser()
        //关注数
        const followingTemp = await getAllFollowing(userStore.userId)
        allFollowing.value = followingTemp.attentionNumber
        //粉丝数
        const fansTemp = await getAllFans(userStore.userId)
        allFans.value = fansTemp.fansNumber
        //帖子数
        const postCountTemp = await getUserPostCount(userStore.userId)
        allPosts.value = postCountTemp.articleCount

        userInfo.value = userStore.userData
        const {user: {nickname, id, profilePhoto, isExpert}} = userInfo.value
        userName.value = nickname
        userId.value = id
        userAvatar.value = profilePhoto
        isExperts.value = isExpert
        loading.value = false
    }

    const myPosts = ref()
    const onMyPosts = async () => {
        await userStore.getUser()
        myPosts.value = await getUserPost({userId: userStore.userId})
        myPosts.value.map((item: any) => {
            transContent(item)
        });
    }
    return {
        allPosts,
        allFollowing,
        allFans,
        userName,
        userId,
        userAvatar,
        isExperts,
        loading,
        myPosts
    }
}

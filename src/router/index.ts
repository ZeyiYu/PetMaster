import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import {getToken} from "@/utils/setToken";
import {useUserStore} from "@/store/userInfo";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/index.vue')
    },
    /**
     * 首页
     */
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index.vue')
    },
    /**
     * 首页-发帖
     */
    {
        path: '/newPost',
        name: 'newPost',
        component: () => import('@/views/Home/NewPost/index.vue')
    },
    /**
     * 首页-帖子详情页
     */
    {
        path: '/postPage/:articleId',
        name: 'postPage',
        component: () => import('@/views/Home/PostPage/index.vue')
    },
    /**
     * 首页-他人主页
     */
    {
        path: '/othersPage/:userId',
        name: 'othersPage',
        component: () => import('@/views/Home/OthersPage/index.vue')
    },
    /**
     * 首页-体重控制
     */
    {
        path: '/weightMonitoring',
        name: 'weightMonitoring',
        component: () => import('@/views/Home/PetInfo/WeightPage/index.vue')
    },
    /**
     * 首页-VaccinationReminder
     */
    {
        path: '/vaccinationReminder',
        name: 'vaccinationReminder',
        component: () => import('@/views/Home/PetInfo/VaccinationReminder/index.vue')
    },
    /**
     * 首页-Medical Records
     */
    {
        path: '/medicalRecords',
        name: 'medicalRecords',
        component: () => import('@/views/Home/PetInfo/MedicalRecords/index.vue')
    },
    /**
     * 首页-Location
     */
    {
        path: '/locationPage',
        name: 'locationPage',
        component: () => import('@/views/Home/MapInfo/LocationPage/index.vue')
    },
    /**
     * 首页-Calorie
     */
    {
        path: '/caloriePage',
        name: 'caloriePage',
        component: () => import('@/views/Home/CalorieInfo/CaloriePage/index.vue')
    },
    /**
     * 消息
     */
    {
        path: '/message',
        name: 'message',
        component: () => import('@/views/Message/index.vue')
    },
    /**
     * 消息-聊天页面
     */
    {
        path: '/chat/:userId/:otherId',
        name: 'chat',
        component: () => import('@/views/Message/Chat/index.vue')
    },
    /**
     * 消息-与专家的聊天页面
     */
    {
        path: '/expertChat/:userId/:otherId/:appointmentId',
        name: 'expertChat',
        component: () => import('@/views/Message/ExpertChat/index.vue')
    },
    /**
     * 消息-@我的
     */
    {
        path: '/atMe',
        name: 'atMe',
        component: () => import('@/views/Message/AtMe/index.vue')
    },
    /**
     * 消息-评论
     */
    {
        path: '/comments',
        name: 'comments',
        component: () => import('@/views/Message/Comments/index.vue')
    },
    /**
     * 消息-赞
     */
    {
        path: '/whoLiked',
        name: 'whoLiked',
        component: () => import('@/views/Message/WhoLiked/index.vue')
    },
    /**
     * 我
     */
    {
        path: '/me',
        name: 'me',
        component: () => import('@/views/Me/index.vue')
    },
    /**
     * 我-浏览记录
     */
    {
        path: '/viewHistory',
        name: 'viewHistory',
        component: () => import('@/views/Me/ViewHistory/index.vue')
    },
    /**
     * 我-预约记录
     */
    {
        path: '/expertHistory',
        name: 'expertHistory',
        component: () => import('@/views/Me/AppointHistory/index.vue')
    },
    /**
     * 我-我的相册
     */
    {
        path: '/photos',
        name: 'photos',
        component: () => import('@/views/Me/Photos/index.vue')
    },
    /**
     * 我-赞/收藏
     */
    {
        path: '/liked',
        name: 'liked',
        component: () => import('@/views/Me/Liked/index.vue')
    },
    /**
     * 我-本人发的所有帖子
     */
    {
        path: '/myPosts',
        name: 'myPosts',
        component: () => import('@/views/Me/MyPosts/index.vue')
    },
    /**
     * 我-关注
     */
    {
        path: '/following',
        name: 'following',
        component: () => import('@/views/Me/Following/index.vue')
    },
    /**
     * 我-粉丝
     */
    {
        path: '/fans',
        name: 'fans',
        component: () => import('@/views/Me/Fans/index.vue')
    },
    /**
     * 我-设置
     */
    {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/Me/Settings/index.vue')
    },
    /**
     * 我-申请成为专家
     */
    {
        path: '/beExpert',
        name: 'beExpert',
        component: () => import('@/views/Me/BeExpert/index.vue')
    },
    /**
     * 我-申请成为专家
     */
    {
        path: '/appointHistory',
        name: 'appointHistory',
        component: () => import('@/views/Me/AppointHistory/index.vue')
    },
    /**
     * 我-本人发的所有帖子
     */
    {
        path: '/searchUser',
        name: 'searchUser',
        component: () => import('@/views/Me/SearchUser/index.vue')
    },
    /**
     * 我-增加预约时间段
     */
    {
        path: '/addAppointTime',
        name: 'addAppointTime',
        component: () => import('@/views/Me/AddAppointTime/index.vue')
    },
    /**
     * 圈子
     */
    {
        path: '/square',
        name: 'square',
        component: () => import('@/views/Square/index.vue'),
    },
    /**
     * 圈子
     */
    {
        path: '/squarePage/:categoryId',
        name: 'squarePage',
        component: () => import('@/views/Square/SquarePage/index.vue'),
    },
    /**
     * Feed-Summary
     */
    {
        path: '/feedingSummary',
        name: 'feedingSummary',
        component: () => import('@/views/Square/Feeder/FeedingSummary/index.vue'),
    },
    /**
     * Feed-Schedule
     */
    {
        path: '/feedingSchedule',
        name: 'feedingSchedule',
        component: () => import('@/views/Square/Feeder/FeedingSchedule/index.vue'),
    },
    /**
     * Feed-Courses
     */
    {
        path: '/coursePage/:courseId',
        name: 'coursePage',
        component: () => import('@/views/Square/Feeder/Courses/CoursePage/index.vue'),
    },
    /**
     * 预约
     */
    {
        path: '/appointment',
        name: 'appointment',
        component: () => import('@/views/Appointment/index.vue')
    },
    /**
     * 预约-专家页面
     */
    {
        path: '/appointPage/:expertId',
        name: 'appointPage',
        component: () => import('@/views/Appointment/AppointPage/index.vue')
    },
    /**
     * 预约-服务评价
     */
    {
        path: '/appointReview/:expertId/:appointmentId',
        name: 'appointReview',
        component: () => import('@/views/Appointment/AppointReview/index.vue')
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    if (!getToken('token')) {
        if (to.path !== '/login') {
            next('/login')
        }
    }
    const userStore = useUserStore()
    if (getToken('token') && !userStore.userId) {
        await userStore.getUser()
    }
    next()

})

export default router


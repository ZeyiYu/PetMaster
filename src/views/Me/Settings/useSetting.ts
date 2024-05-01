import {Ref} from "vue";
import {updateUserInfo} from "@/assets/api/Social/User";
import Toast from "@/components/Toast";
import {useUserStore} from "@/store/userInfo";

export const useSetting = () => {
//头像
    const userStore = useUserStore()
    const userInfo = userStore.userData.user
    const editAvatar: Ref<boolean> = ref(false)
    const avatarUrl = ref<any[]>([]);
    const fileList = ref([]);
    const afterRead = (file: any) => {
    }

//昵称
    const editNickname: Ref<boolean> = ref(false)
    const nickname = ref<string>('')
    nickname.value = userInfo.nickname
    const nicknameSubmit = () => {
        updateUserInfo({
            id: userStore.userId,
            nickname: nickname.value,
        }).then(res => {
                Toast.success('昵称修改成功')
                userInfo.value = userStore.userData.user
                editNickname.value = false
                location.reload()

            }
        )
    }

//性别选择器
    const editGender: Ref<boolean> = ref<boolean>(false)
    const columns = [
        {text: '男', value: 1},
        {text: '女', value: 0}
    ];
    const gender = ref()
    gender.value = userInfo.gender
    const confirmGender = ({selectedValues}: any) => {
        updateUserInfo({
            id: userStore.userId,
            gender: selectedValues[0]
        }).then(res => {
            gender.value = 1 - gender.value
            Toast.success('修改性别成功')
            location.reload()
        })
        editGender.value = false
    }
    const cancelGender = () => {
        editGender.value = false
    }

//生日选择器
    const birthday = ref()
    birthday.value = userInfo.birthday
    const editBirth: Ref<boolean> = ref(false)
    const currentDate = ref(['2023', '01', '01']);
    const minDate = new Date(1940, 0, 1)
    const maxDate = new Date(2023, 4, 17)
    const confirmBirth = () => {
        editBirth.value = false
        const birth = currentDate.value[0] + '-' + currentDate.value[1] + '-' + currentDate.value[2]
        updateUserInfo({
            id: userStore.userId,
            birthday: birth
        }).then(res => {
            birthday.value = birth
            Toast.success('生日修改成功')
            location.reload()
        })
    }
    const cancelBirth = () => {
        editBirth.value = false
    }

//联系方式
    const editContact: Ref<boolean> = ref(false)
    const contactNumber = ref()
    contactNumber.value = userInfo.telephone
    const contactSubmit = () => {
        updateUserInfo({
            id: userStore.userId,
            telephone: contactNumber.value,
        }).then(res => {
                Toast.success('联系方式修改成功')
                editContact.value = false
                location.reload()

            }
        )
    }
    return {
        editAvatar,
        editNickname,
        editGender,
        editBirth,
        editContact,
        nickname,
        gender,
        birthday,
        contactNumber,
        fileList,
        columns,
        minDate,
        maxDate,
        currentDate,
        afterRead,
        nicknameSubmit,
        cancelGender,
        confirmGender,
        cancelBirth,
        confirmBirth,
        contactSubmit
    }

}

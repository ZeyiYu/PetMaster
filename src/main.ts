import {createApp} from 'vue'
//import './style.css'
import "@/assets/font/iconfont.css";
import "@/assets/font/iconfont.js";
import '@/assets/style/index.less'
import 'vant/lib/index.css';
import App from './App.vue'
import router from './router';
import axios from 'axios';
import 'amfe-flexible'
import {createPinia} from 'pinia'
import globalComponent from './components'
import echarts from './utils/echarts';

/*import 'video.js/dist/video-js.css'
import VideoPlayer from 'vue-video-player'*/


const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.use(router)
app.use(createPinia())
/*app.use(VideoPlayer)*/
app.mount('#app')
globalComponent(app)

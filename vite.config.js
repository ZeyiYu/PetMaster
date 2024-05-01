import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {VantResolver} from 'unplugin-vue-components/resolvers'
import path from "path";
import {resolve} from "path";
import AutoImport from "unplugin-auto-import/vite";
import postCssPxToRem from "postcss-pxtorem";
import autoprefixer from 'autoprefixer';

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: ["vue", "vue-router"], //自动引入vue的ref、toRefs、onmounted等，无需在页面中再次引入
            dts: "src/auto-import.d.ts" // 生成在src路径下名为auto-import.d.ts的声明文件
        }),
        Components({
            dirs: ['src/components', 'src/views'],
            resolvers: [VantResolver()],
        }),
    ],
    css: {
        postcss: {
            plugins: [
                autoprefixer({
                    // 指定目标浏览器
                    overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
                }),
                postCssPxToRem({
                    rootValue: 37.5, // 1rem的大小
                    propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
                }),
            ],
        },
        // css预处理器
        preprocessorOptions: {
            less: {
                additionalData: '@import "./src/assets/style/index.less";',
            },
        },
    },
    server: {
        //host: '127.0.0.1',
        proxy: {
            '/api': {
                target: 'https://petapi.anyone878.win:6879',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, "")
            },
            '/iot': {
                target: 'http://petapi.anyone878.win:8990',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/iot/, "")
            },
/*            '/network': {
                target: 'http://127.0.0.1:10002',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/network/, "")
            },
            //短视频微服务
            '/shortVideo': {
                target: 'http://127.0.0.1:10007',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/shortVideo/, "")
            }*/
        }
    },
    resolve: {
        extensions: [".js", ".vue", ".ts", "less", ".css", ".mjs"],
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    }
});

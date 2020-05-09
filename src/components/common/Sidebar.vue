<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subMenu!=null&&item.subMenu.length!=0">
                    <el-submenu :index="item.menuUrl" :key="item.menuUrl">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.menuName }}</span>
                        </template>
                        <template v-for="subItem in item.subMenu">
                            <el-submenu
                                v-if="subItem.subMenu!=null&&subItem.subMenu.length!=0"
                                :index="subItem.menuUrl"
                                :key="subItem.menuUrl"
                            >
                                <template slot="title">
                                    <i :class="subItem.icon"></i>
                                    <span slot="title">{{ subItem.menuName }}</span>
                                </template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subMenu"
                                    :key="i"
                                    :index="threeItem.menuUrl"
                                >
                                    <i :class="threeItem.icon"></i>
                                    {{ threeItem.menuName }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.menuUrl" :key="subItem.menuUrl">
                                <i :class="subItem.icon"></i>
                                {{ subItem.menuName }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.menuUrl" :key="item.menuUrl">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.menuName }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: []
        };
    },

    methods: {
        getList() {
         this.items =  JSON.parse(localStorage.getItem('menuList'));
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        this.getList();
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            console.log(msg)
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>

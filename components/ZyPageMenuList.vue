<template>
    <div class="page-menu c-mt-40">
        <div class="page-menu-item  "
             :class="{'item-active':state.flag === index}"
             v-for="(item,index) in state.list"
             :key="index"
             @click="handleItem(item,index)"
        >{{item.dict_label}}
        </div>
    </div>
</template>

<script setup>
    import {dictionariesList} from "../api/modules/api.common";

    const emit = defineEmits(['select'])
    const state = reactive({
        list: [],
        flag: 0,
    })

    const handleItem = (item, index) => {
        state.flag = index
        emit('select', item)
    }

    const getDataList = () => {
        dictionariesList({dict_code: 'category'}).then(res => {
            state.list = [{dict_label: '🚦全部', dict_value: -1}, ...res.data]
        })
    }
    getDataList()
</script>

<style lang="scss" scoped>
    .page-menu {
        padding: 0rem 4.5rem;
        display: flex;
        flex-wrap: wrap;

        .page-menu-item {
            padding: 5px 15px;
            cursor: pointer;
            transition: all .3s linear;

            &:hover {

            }
        }

        .item-active {
            font-weight: bold;
            color: $color-primary;
        }

        @media screen and (max-width: 968px) {
            padding: 0;
        }
    }
</style>

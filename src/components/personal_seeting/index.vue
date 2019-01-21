<template>
    <div class="container">
        <header>个性化排序设置</header>
        <div class="playground">
            <SortableList lockAxis="y" v-model="content" @input="reorder(content)">
                <SortableItem v-for="(item, index) in content" :index="index" :key="item.la" :item="item.ch.name_type" v-show="item.ch.navigations_of.length"/>
            </SortableList>
        </div>
    </div>
</template>
<script src="./index.js"></script>
<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>

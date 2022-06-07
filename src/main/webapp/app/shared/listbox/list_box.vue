<template>
    <div class="row">
        <div class="col pr-2">
            <b-card :header="title" no-body>
                <b-list-group flush>
                    <b-list-group-item v-for="item in syncedListItems"
                                       class="p-0"
                                       :key="item[idParam]">
                        <div class="edo-list-box" @click="onItemClick($event, item[idParam])">
                            <div class="edo-list-box-item">
                                <span v-for="label in labels">
                                    {{item[label]}}
                                </span>
                            </div>
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </b-card>
        </div>
        <div class="col-md-1 pl-0 pr-2 text-center">
            <b-button-group vertical>
                <b-button variant="outline-secondary" class="m-1"
                          @click="onMoveRightOnce">
                    <font-awesome-icon icon="angle-right"/>
                </b-button>
                <b-button variant="outline-secondary" class="m-1"
                          @click="onMoveRightAll">
                    <font-awesome-icon icon="angle-double-right"/>
                </b-button>
                <b-button variant="outline-secondary" class="m-1"
                          @click="onMoveLeftOnce">
                    <font-awesome-icon icon="angle-left"/>
                </b-button>
                <b-button variant="outline-secondary" class="m-1"
                          @click="onMoveLeftAll">
                    <font-awesome-icon icon="angle-double-left"/>
                </b-button>

            </b-button-group>
        </div>
        <div class="col pl-2">
            <b-card :header="$t('approval.listbox.selected_param', {title: title})" no-body>
                <b-list-group flush>
                    <b-list-group-item button v-for="item in selectedListItems"
                                       class="p-0"
                                       :key="item[idParam]">
                        <div class="edo-list-box" @click="onItemClickRight($event, item[idParam])">
                            <div class="edo-list-box-item">
                                <span v-for="label in labels">
                                    {{item[label]}}
                                </span>
                            </div>
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </b-card>
        </div>
    </div>
</template>

<script lang="ts" src="./list_box.ts">
</script>

<style type="text/css">

    .edo-list-box {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        cursor: pointer;
        width: 100%;
        display: flex;
    }

    .edo-list-box-item {
        border-left: 1px solid #dddddd;
        border-right: 1px solid #dddddd;
        text-align: left;
    }

    .edo-list-box.active {
        background-color: #eee;
    }
</style>

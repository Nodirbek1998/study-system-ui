<template>
    <b-card class="card-home card-reminders" header-tag="header" footer-tag="footer">
        <template v-slot:header>
            <div class="d-flex w-100 align-items-center justify-content-between">
                <div>
                    {{$t("pages.home.reminders.title")}}
                </div>
                <div>
                    <router-link class="create-document cursor-pointer"
                        :to="{name: 'EdoReminder'}" v-if="$can('EdoReminderAdd')">
                        <font-awesome-icon class="icon" icon="plus" />
                    </router-link>
                </div>
            </div>
        </template>

        <b-carousel
            id="carousel-1"
            :interval="15000">

            <b-carousel-slide v-for="item in reminders" v-bind:key="item.id">
                <template #img>
                    <div class="reminder-item">
                        <h4 class="reminder-title" >
                            {{ item.title }}
                        </h4>
                        <p class="reminder-body">
                            {{item.body }}
                        </p>
                    </div>
                </template>
            </b-carousel-slide>
        </b-carousel>
    </b-card>
</template>
<script lang="ts" src="./reminder-home.component.ts"></script>

<style scoped lang='scss'>
@import "src/main/webapp/content/scss/variables";
    .card-reminders .card-body {
        height: 483px;
        padding: 0;
    }

    .card-reminders .reminder-item .reminder-title, .card-reminders .reminder-item .reminder-body {
        width: 100%;
    }

    .card-reminders .reminder-item .reminder-title {
        color: #11141A;
        font-size: 18px;
        border-left: 4px;
        border-left-color: theme-color(primary);
        border-left-style: solid;
        margin-top: 10px;
        padding-left: 15px;
        line-height: 40px;
    }

    .card-reminders .reminder-item .reminder-body {
        color: #7F8FA4;
        max-height: 400px;
        overflow: auto;
        padding: 20px;
    }

    .card-reminders .card-header .cursor-pointer {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 100%;
        background-color: theme-color(primary);
        color: white;
    }
</style>

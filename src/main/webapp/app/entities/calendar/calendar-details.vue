<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="calendar">
                <h2 class="jh-entity-heading"><span v-text="$t('kdbemdocsuiApp.edoCalendar.detail.title')">EdoCalendar</span> {{calendar.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('kdbemdocsuiApp.edoCalendar.nameUz')">Name Uz</span>
                    </dt>
                    <dd>
                        <span>{{calendar.nameUz}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('kdbemdocsuiApp.edoCalendar.nameRu')">Name Ru</span>
                    </dt>
                    <dd>
                        <span>{{calendar.nameRu}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('kdbemdocsuiApp.edoCalendar.nameEn')">Name En</span>
                    </dt>
                    <dd>
                        <span>{{calendar.nameEn}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('kdbemdocsuiApp.edoCalendar.showDate')">Show Date</span>
                    </dt>
                    <dd>
                        <span>{{calendar.showDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('kdbemdocsuiApp.edoCalendar.createdOn')">Created On</span>
                    </dt>
                    <dd>
                        <span>{{calendar.createdOn}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('kdbemdocsuiApp.edoCalendar.isDeleted')">Is Deleted</span>
                    </dt>
                    <dd>
                        <span>{{calendar.isDeleted}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('kdbemdocsuiApp.edoCalendar.company')">Company</span>
                    </dt>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="calendar.id" :to="{name: 'EdoCalendarEdit', params: {edoCalendarId: calendar.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="calendar-details.component.ts">
</script>

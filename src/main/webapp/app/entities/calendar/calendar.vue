<template>
    <div class="page page-internal">
        <div>
            <div class="page-header d-flex align-items-center justify-content-between">
                <div>
                    <h3 class="page-title" v-text="">{{$t('kdbemdocsuiApp.edoCalendar.toDo')}}</h3>
                    <span class="page-sub-title">{{ $t('kdbemdocsuiApp.edoCalendar.home.title') }} /</span>
                </div>
                <ul class="list-inline">
                    <li class="list-inline-item">
                        <a class="btn btn-light" @click="retrieveAllEdoCalendars">
                            {{$t('approval.buttons.refresh') }}
                        </a>
                    </li>
                    <li class="list-inline-item" v-if="$can('EdoCalendarAdd')">
                        <router-link class="btn btn-primary" :to="{name: 'EdoCalendarCreate'}">
                            {{ $t('kdbemdocsuiApp.edoCalendar.home.createLabel') }}
                        </router-link>
                    </li>
                </ul>
            </div>

            <b-alert :show="dismissCountDown"
                     dismissible
                     :variant="alertType"
                     @dismissed="dismissCountDown=0"
                     @dismiss-count-down="countDownChanged">
                {{alertMessage}}
            </b-alert>
            <div class="alert alert-warning" v-if="!isFetching && edoCalendars && edoCalendars.length === 0">
                <span v-text="$t('kdbemdocsuiApp.edoCalendar.home.notFound')">No edoCalendars found</span>
            </div>
            <div class="table-wrapper" v-if="edoCalendars && edoCalendars.length > 0">
                <b-table
                    ref="selectTable"
                    id="table"
                    :small="tableOptions.small"
                    :responsive="tableOptions.responsive"
                    :borderless="tableOptions.borderless"
                    :outlined="tableOptions.outlined"
                    :hover="tableOptions.hover"
                    :fixed="tableOptions.fixed"
                    :sticky-header="tableOptions.stickyHeader"
                    :selectable="tableOptions.selectable"
                    :select-mode="tableOptions.selectMode"
                    :per-page="itemsPerPage"

                    :fields="fields"
                    :items="edoCalendars"
                    @row-selected="onSelectRow"
                    @row-dblclicked="onDbClickEdit"
                >
                    <!--Header-->
                    <template v-slot:head(id)="data">
                        <span v-html="$t('global.field.id')"></span>
                    </template>
                    <template v-slot:head(nameEn)="data">
                        <span v-html="$t('kdbemdocsuiApp.edoCalendar.name')"></span>
                    </template>

                    <template v-slot:head(showDate)="data">
                        <span v-html="$t('kdbemdocsuiApp.edoCalendar.showDate')"></span>
                    </template>
                    <template v-slot:head(createdOn)="data">
                        <span v-html="$t('kdbemdocsuiApp.edoCalendar.createdOn')"></span>
                    </template>
                    <template v-slot:head(action)="data">
                        <span v-html="$t('approval.pending.table.action')"></span>
                    </template>

                    <template v-slot:cell(index)="data"><span>{{ data.index + 1 }}</span></template>
                    <template v-slot:cell(id)="data"><span>{{ data.value }}</span></template>
                    <template v-slot:cell(nameEn)="data"><span>{{ data.value }}</span></template>
                    <!--<template v-slot:cell(nameUz)="data"><span>{{ data.value }}</span></template>-->
                    <!--<template v-slot:cell(nameRu)="data"><span>{{ data.value }}</span></template>-->
                    <!--<template v-slot:cell(nameEn)="data"><span>{{ data.value }}</span></template>-->
                    <template v-slot:cell(showDate)="data"><span>{{ data.value }}</span></template>
                    <template v-slot:cell(createdOn)="data"><span>{{ data.value }}</span></template>
                    <template v-slot:cell(action)="row">
                        <span>
                            <b-dropdown no-caret variant="link" class="action-dropdown" size="lg">
                                <template #button-content>
                                    <font-awesome-icon class="icon" icon="ellipsis-v" size="xs"/>
                                </template>

                                <b-dropdown-item @click="onClickEdit(row.item.id)" class="action-dropdown-item" v-if="$can('EdoCalendarUpdate')">
                                    <font-awesome-icon class="icon mr-1" icon="edit"/>
                                    {{$t('approval.buttons.edit')}}
                                </b-dropdown-item>
                                <b-dropdown-item @click="prepareRemove(row.item.id)" class="action-dropdown-item" v-if="$can('EdoCalendarDelete')">
                                    <font-awesome-icon class="icon mr-1" icon="trash"/>
                                    {{$t('approval.buttons.delete')}}
                                </b-dropdown-item>
                            </b-dropdown>
                        </span>
                    </template>
                </b-table>
                <b-pagination v-model="page" :total-rows="totalItems" :per-page="itemsPerPage" aria-controls="table" :change="loadPage(page)"></b-pagination>
            </div>
            <b-modal ref="removeEntity" id="removeEntity">
                <span slot="modal-title"><span id="kdbemdocsuiApp.edoCalendar.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
                <div class="modal-body">
                    <p id="jhi-delete-edoCalendar-heading" v-text="$t('kdbemdocsuiApp.edoCalendar.delete.question', {'id': removeId})">Are you sure you want to delete this Edo
                        Calendar?</p>
                </div>
                <div slot="modal-footer">
                    <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                    <button type="button" class="btn btn-primary" id="jhi-confirm-delete-edoCalendar" v-text="$t('entity.action.delete')" v-on:click="removeEdoCalendar()">Delete
                    </button>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script lang="ts" src="calendar.component.ts">
</script>

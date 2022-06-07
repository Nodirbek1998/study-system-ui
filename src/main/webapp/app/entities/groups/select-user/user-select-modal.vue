<template>
    <b-modal
        scrollable
        centered
        id="user-select-add-modal"
        :title="title"
        v-model="syncedVisible"
        size="xl"
        class="user-select-modal"
        cancel-variant="warning"
        ok-variant="primary"
        header-class="modal-header-custom"
        :ok-title="$t('entity.action.add')"
        :cancel-title="$t('entity.action.cancel')"
        @ok="onSubmitSelectUser">
        <div class="row d-flex h-100 -scrollbar mx-0">
            <div class="col-6">
                <b-card v-if="showHeadType">
                    <b-nav tabs justified>

                        <b-nav-item
                            :active="headType === 'All'"
                            @click="onChangeHead('All')"
                            class="header-nav"
                            exact exact-active-class="header-nav.active"
                        >
                            {{ $t('approval.userSelect.allStaffs') }}
                        </b-nav-item>

                    </b-nav>
                </b-card>

                <div class="row py-3 px-0 m-0 align-items-center justify-content-between">
                    <div class="col-3 ">
                        <b-checkbox :value="true" v-if="!isSingleSelect"
                                    :unchecked-value="false"
                                    v-model="selectAllModel"
                                    @change="selectAll"
                        >{{ $t('approval.userSelect.selectAll') }}
                        </b-checkbox>
                        <span v-if="isSingleSelect" v-html="$t('approval.userSelect.selectPerson')"></span>
                    </div>
                    <div class="col-1">
                        <b-button variant="outline-primary" id="user-select-refresh-btn" @click="refreshUsers">
                            <font-awesome-icon size="lg" icon="sync"></font-awesome-icon>
                        </b-button>
                    </div>
                    <div class="col-8 px-0 row">

                        <div class="col-5 pl-0">
                            <b-input-group class="search-keyword-group user-search-input pr-1" size="sm">
                                <b-input-group-prepend>
                                    <b-button class="search-keyword-icon">
                                        <font-awesome-icon icon="search" size="lg"/>
                                    </b-button>
                                </b-input-group-prepend>
                                <b-form-input v-model="searchword"
                                              class="search-keyword-input"
                                              :placeholder="$t('approval.userSelect.search')"></b-form-input>
                            </b-input-group>
                        </div>
                    </div>
                </div>
                <b-card-group deck class="row user-select-card pt-0">
                    <div v-for="user in getUserList" class="col-4 p-0">
                        <b-card class="m-1 user-card" :id="'card-id-' + user.id" @dblclick="addToRightThisItem(user.id);">
                            <div class="d-flex align-items-center">
                                <b-form-checkbox
                                    class="user-checkbox"
                                    :checked="user.checked"
                                    :value="true"
                                    :key="user.id"
                                    :unchecked-value="false"
                                    @change="setActiveClassToCard(user.id, !user.checked)"
                                    v-model="user.checked"
                                ></b-form-checkbox>

                                <div class="row p-2">
                                    <span class="font-weight-bold col-12 text-truncate" style="max-width: 200px;">
                                        {{ user.firstName }}
                                    </span>
                                    <small class="col-12 text-truncate">{{ user.firstName }}</small>
                                    <small class="col-12 text-truncate">{{ user.lastName }}</small>
                                </div>
                            </div>
                        </b-card>
                    </div>

                </b-card-group>
            </div>
            <div class="col-1 p-0 text-center" style="height: 40vh; top: 50%;">
                <b-button-group vertical>
                    <b-button @click="addToRight" class="mt-2 mb-2" variant="primary">
                        <font-awesome-icon icon="chevron-right"></font-awesome-icon>
                    </b-button>
                    <b-button @click="addToLeft" class="mt-2 mb-2" variant="primary">
                        <font-awesome-icon icon="chevron-left"></font-awesome-icon>
                    </b-button>
                    <b-button variant="warning" class="mt-2" @click="clearAll">
                        {{ $t('entity.action.delete') }}
                    </b-button>
                </b-button-group>
            </div>
            <div class="col-5 pr-4">
                <div class="row d-flex pr-2">
                    <div class="col-12 mx-1 p-0">
                        <b-card class="right-header">
                            <h5 class="p-1 m-0">{{ title }}</h5>
                        </b-card>
                    </div>
                </div>
                <b-card-group deck class="row mt-2">
                    <div v-for="user in selects" class="col-6 p-0">
                        <b-card class="m-1  user-card" @dblclick="removeFromLeftThisItem(user.id)">
                            <div class="d-flex align-items-center">
                                <b-checkbox
                                    class="user-checkbox"
                                    :checked="user.checked"
                                    :value="true"
                                    :unchecked-value="false"
                                    v-model="user.checked"
                                ></b-checkbox>
                                <div class="row p-2">
                                 <span class="font-weight-bold col-12 text-truncate" style="max-width: 250px;">
                                        {{ user.firstName }}
                                    </span>
                                    <small class="col-12 text-truncate">{{ user.firstName }}</small>
                                    <small class="col-12 text-truncate">{{ user.lastName }}</small>
                                </div>
                            </div>
                        </b-card>
                    </div>
                </b-card-group>
            </div>

        </div>
    </b-modal>
</template>

<script lang="ts" src="./user-select-modal.component.ts">
</script>
<style>
.header-nav > a.nav-link {
    font-size: 1rem;
}

.header-nav > a.nav-link:hover {
    border-color: #d3e0ec #d3e0ec #ffffff !important;
}

.header-nav > a.nav-link:focus {
    border-color: #ffffff #ffffff #88173d!important;
}

#user-select-add-modal.modal {
    padding: 0 !important;
}

#user-select-add-modal.modal .modal-dialog {
    width: 100%;
    max-width: none;
    height: 100%;
    margin: 0;
    max-height: 100% !important;
    min-height: 100% !important;
}

#user-select-add-modal.modal .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
    background-color: #f7f8fa;
}

#user-select-add-modal.modal .modal-body {
    overflow-y: auto;
}

#user-select-add-modal footer .btn {
    padding: 12px 24px;
}

#user-select-add-modal .user-search-input {
    border: 1px solid rgba(0, 0, 0, 0.125);
}

#user-select-department-select.v-select .vs__dropdown-toggle {
    border: 1px solid #cbd4e0;
    max-height: max-content;
    height: auto;
    min-height: 42px;
}

#user-select-refresh-btn.btn-outline-primary {
    height: 40px;
    border: none;
}

.user-card .avatar {
    min-width: 2.5em;
    min-height: 2.5em;
}

.user-card .card-body {
    padding: 0.5em 0.8em;
}

.user-card .user-checkbox {
}

.user-card {
    border: 1px solid rgba(0, 0, 0, 0.125) !important;
}

.user-vacation-badge{
    margin-top: -5px;
    right: 7px;
    position: absolute;
}

#user-select-add-modal .popover {
    width: 540px !important;
    min-width: 530px !important;
}

#user-select-add-modal .modal-footer {
    text-align: center;
    display: flow-root;
}

.modal-content > .modal-body > .row > .col-6 > .card >.card-body{
   padding: 12px 5px 0;
}

.user-select-card > .col-4 > div.active {
   border: 2px solid #3e8acc !important;
}

.right-header > .card-body{
    padding: 12px;
}

.vacation-status{
    background-color: orange;
    margin-left: 14px;
    border-radius: 2px;
}
</style>

<template>
    <div class="page">
        <b-card-group deck>
            <b-card class="card-document">
                <div class="row justify-content-center">
                    <div class="col-8">
                        <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
                            <h2 class="page-title mb-4 mt-2 text-capitalize" id="kdbemdocsuiApp.edoCalendar.home.createOrEditLabel" v-text="$t('kdbemdocsuiApp.edoCalendar.home.createOrEditLabel')"></h2>
                            <div>
                                <div class="form-group" v-if="edoCalendar.id">
                                    <label for="id" v-text="$t('global.field.id')">ID</label>
                                    <input type="text" class="form-control" id="id" name="id"
                                           v-model="edoCalendar.id" readonly/>
                                </div>
                               <!-- <div class="form-group">
                                    <label class="form-control-label" v-text="$t('kdbemdocsuiApp.edoCalendar.nameUz')" for="edo-calendar-nameUz">Name Uz</label>
                                    <input type="text" class="form-control" name="nameUz" id="edo-calendar-nameUz"
                                           :class="{'valid': !$v.edoCalendar.nameUz.$invalid, 'invalid': $v.edoCalendar.nameUz.$invalid }" v-model="$v.edoCalendar.nameUz.$model"
                                           required/>
                                    <div v-if="$v.edoCalendar.nameUz.$anyDirty && $v.edoCalendar.nameUz.$invalid">
                                        <small class="form-text text-danger" v-if="!$v.edoCalendar.nameUz.required" v-text="$t('entity.validation.required')">
                                            This field is required.
                                        </small>
                                        <small class="form-text text-danger" v-if="!$v.edoCalendar.nameUz.maxLength" v-text="$t('entity.validation.maxlength', {max: 1000})">
                                            This field cannot be longer than 1000 characters.
                                        </small>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-control-label" v-text="$t('kdbemdocsuiApp.edoCalendar.nameRu')" for="edo-calendar-nameRu">Name Ru</label>
                                    <input type="text" class="form-control" name="nameRu" id="edo-calendar-nameRu"
                                           :class="{'valid': !$v.edoCalendar.nameRu.$invalid, 'invalid': $v.edoCalendar.nameRu.$invalid }" v-model="$v.edoCalendar.nameRu.$model"
                                           required/>
                                    <div v-if="$v.edoCalendar.nameRu.$anyDirty && $v.edoCalendar.nameRu.$invalid">
                                        <small class="form-text text-danger" v-if="!$v.edoCalendar.nameRu.required" v-text="$t('entity.validation.required')">
                                            This field is required.
                                        </small>
                                        <small class="form-text text-danger" v-if="!$v.edoCalendar.nameRu.maxLength" v-text="$t('entity.validation.maxlength', {max: 1000})">
                                            This field cannot be longer than 1000 characters.
                                        </small>
                                    </div>
                                </div>-->
                                <div class="form-group">
                                    <label class="form-control-label" v-text="$t('kdbemdocsuiApp.edoCalendar.name')" for="edo-calendar-nameEn">Name En</label>
                                    <input type="text" class="form-control" name="nameEn" id="edo-calendar-nameEn"
                                           :class="{'valid': !$v.edoCalendar.nameEn.$invalid, 'invalid': $v.edoCalendar.nameEn.$invalid }" v-model="$v.edoCalendar.nameEn.$model"
                                           required/>
                                    <div v-if="$v.edoCalendar.nameEn.$anyDirty && $v.edoCalendar.nameEn.$invalid">
                                        <small class="form-text text-danger" v-if="!$v.edoCalendar.nameEn.required" v-text="$t('entity.validation.required')">
                                            This field is required.
                                        </small>
                                        <small class="form-text text-danger" v-if="!$v.edoCalendar.nameEn.maxLength" v-text="$t('entity.validation.maxlength', {max: 1000})">
                                            This field cannot be longer than 1000 characters.
                                        </small>
                                    </div>
                                </div>
                                <b-form-group
                                    :label="$t('kdbemdocsuiApp.edoCalendar.showDate')"
                                    label-for="edo-calendar-showDate"
                                >
                                    <date-picker
                                        id="edo-calendar-showDate"
                                        v-model="$v.edoCalendar.showDate.$model"
                                        format="DD.MM.YYYY"
                                        editable
                                        clearable
                                        value-type="format"
                                        type="date"
                                        input-class="form-control"
                                        style="width: 100%;"
                                    ></date-picker>
                                </b-form-group>

                                <div class="form-group" v-if="edoCalendar.id">
                                    <label class="form-control-label" v-text="$t('kdbemdocsuiApp.edoCalendar.company')" for="edo-calendar-company">Company</label>
                                    <select class="form-control" id="edo-calendar-company" name="company" v-model="edoCalendar.companyId" disabled="disabled">
                                        <option v-bind:value="null"></option>
                                        <option v-bind:value="edoCompanyOption.id" v-for="edoCompanyOption in edoCompanies" :key="edoCompanyOption.id">{{edoCompanyOption.nameEn}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                                    <!--<font-awesome-icon icon="ban"> </font-awesome-icon>&nbsp;-->
                                    <span v-text="$t('entity.action.cancel')">Cancel</span>
                                </button>
                                <button type="submit" id="save-entity" :disabled="$v.edoCalendar.$invalid || isSaving" class="btn btn-primary">
                                    <!--<font-awesome-icon icon="save"></font-awesome-icon>&nbsp;-->
                                    <span v-text="$t('entity.action.save')">Save</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </b-card>
        </b-card-group>
    </div>
</template>
<script lang="ts" src="calendar-update.component.ts">
</script>

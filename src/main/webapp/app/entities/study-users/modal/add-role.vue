<template>
    <b-modal
        centered
        id="user-manage-role-modal"
        title="Manage user"
        v-model="syncedVisible"
        size="md"
        @ok="onSubmitSelectRole"
    >
        <b-card>
            <b-form-group
                :label="$t('global.form[\'username.label\']')"
                label-for="username"
            >
                <b-form-input
                    id="username"
                    v-model="username"
                    @change="changeUserName"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                :label="$t('global.form[\'newpassword.label\']')"
                label-for="password"
            >
                <b-form-input
                    id="password"
                    v-model="password"
                    type="password"
                ></b-form-input>
                <small id="passwordHelp" class="form-text text-danger">
                    <span v-if="has_lowercase">One lowercase letter.</span>
                    <span v-if="has_uppercase">One uppercase letter.</span>
                    <span v-if="has_number">One number.</span>
                    <span v-if="has_special">One special character.</span>
                </small>
            </b-form-group>

            <b-form-group
                :label="$t('global.form[\'confirmpassword.label\']')"
                label-for="new-password"
            >
                <b-form-input
                    id="new-password"
                    v-model="confirmPassword"
                    type="password"
                ></b-form-input>
                <small class="form-text text-danger"
                       v-if="equalsNewAndConfirmPassword" >
                    New password do not equals confirm password.
                </small>
            </b-form-group>
<!--            <b-form-group-->
<!--                :label="$t('hr.isEsp')"-->
<!--                label-for="use-esp"-->
<!--            >-->
<!--                <b-form-checkbox-->
<!--                    id="use-esp"-->
<!--                    v-model="isEsp"-->
<!--                    :value="true"-->
<!--                    :unchecked-value="false"-->
<!--                ></b-form-checkbox>-->
<!--            </b-form-group>-->

            <b-radio-group stacked v-model="selectedRoleId">
                <b-radio v-for="item in roles" :value="item.id" :key="item.id">{{translationService().chooseLangLabelFromObj(item)}}</b-radio>
            </b-radio-group>
<!--            <b-form-row style="margin-top: 8px">-->
<!--                <b-button-->
<!--                    @click="sendEmailLoginPassword"-->
<!--                    v-text="$t('global.form[\'email.sendLogin\']')"-->
<!--                ></b-button>-->
<!--            </b-form-row>-->
        </b-card>
    </b-modal>
</template>


<script lang="ts" src="./add-role.component.ts">
</script>

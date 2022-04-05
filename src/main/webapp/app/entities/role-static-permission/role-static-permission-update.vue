<template>
  <div>
    <b-card-group deck>
      <b-card class="card-document pb-lg-5">
<!--        <h3 class="page-title mb-4 mt-2 text-capitalize" id="" v-text="translationService().chooseLangLabelFromObj(edoDtRole)">Edo Dt Role Static Permissions</h3>-->

        <b-row>
          <div class="col-6" style="padding-right: 35px;">
            <b-form-group
              label-size="sm"
              :label="$t('studysystemApp.roleStaticPermission.status')"
              label-for="filter-status"
              label-class="filter-label"
            >
              <b-form-select
                class="form-control"
                name="status"
                id="filter-status"
                @change="filterSource($event)"
              >
                <b-form-select-option value="" label=""></b-form-select-option>
                <b-form-select-option
                  v-for="(category, index) in Object.keys(sourceByCategory)"
                  :value="category"
                  :key="index"
                  :label="$t('studysystemApp.roleStaticPermission.roleGroups.' + category)"
                >
                  {{ category }}
                </b-form-select-option>

              </b-form-select>
            </b-form-group>
          </div>

          <div class="col-6" style="padding-left: 38px;">
            <b-form-group
              label-size="sm"
              :label="$t('studysystemApp.roleStaticPermission.status')"
              label-for="filter-status"
              label-class="filter-label"
            >
              <b-form-select
                class="form-control"
                name="status"
                id="filter-status"
                @change="filterDestination($event)"
              >
                <b-form-select-option value="" label=""></b-form-select-option>
                <b-form-select-option
                  v-for="(category, index) in Object.keys(destinationByCategory)"
                  :value="category"
                  :key="index"
                  :label="$t('studysystemApp.roleStaticPermission.roleGroups.' + category)"
                >
                  {{ category }}
                </b-form-select-option>

              </b-form-select>
            </b-form-group>
          </div>
        </b-row>


        <DualListBox
          :source="source"
          :destination="destination"
          label="name"
          @onChangeList="onChangeList"
        />

        <div class="role-submit">
          <b-button class="text-center" :disabled="!isChanging"
                    @click="submitRoles" variant="primary">{{$t('entity.action.submit')}}</b-button>
        </div>
      </b-card>
    </b-card-group>

  </div>
</template>
<script lang="ts" src="./role-static-permission-update.component.ts"></script>

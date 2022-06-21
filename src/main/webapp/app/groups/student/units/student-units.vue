<template>
  <div class="page page-internal">
    <div class="page-header d-flex align-items-center justify-content-between">
      <h2 id="page-heading" data-cy="SubjectsHeading">
        <span v-text="$t('studysystemApp.subjects.home.title')" id="subjects-heading">Subjects</span>
      </h2>
      <div>
        <div class="d-flex justify-content-end">
          <div>
            <ul class="list-inline">
              <li class="list-inline-item" >
                <b-link class='btn btn-light' @click="handleSyncList">
                  {{ $t('approval.buttons.refresh') }}
                </b-link>
              </li>
              <li class="list-inline-item">
                <v-select
                  style="min-width: 250px"
                  :placeholder="$t('global.input.placeholders.byBranch')"
                  id="branch-select"
                  v-model="subjectId"
                  :options="subjects"
                  :reduce="item => item.id"
                  label="label"
                  v-on:change="changeSubject">
                </v-select>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="table-wrapper">
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
        :fields="fields"
        :items="units"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong v-text="$t('global.loading')">Loading...</strong>
          </div>
        </template>
        <template v-slot:head(id)="data">
          <span v-html="$t('studysystemApp.role.id')"></span>
        </template>
        <template v-slot:head(nameUz)="data">
          <span v-html="$t('studysystemApp.role.nameUz')"></span>
        </template>
        <template v-slot:head(nameRu)="data">
          <span v-html="$t('studysystemApp.role.nameRu')"></span>
        </template>
        <template v-slot:head(nameEn)="data">
          <span v-html="$t('studysystemApp.role.nameEn')"></span>
        </template>
        <template v-slot:cell(id)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(nameUz)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(nameRu)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(nameEn)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(action)="row">
          <span>
            <b-dropdown no-caret variant="link" class="action-dropdown" size="lg">
              <template #button-content>
                  <font-awesome-icon class="icon" icon="ellipsis-v" size="xs"/>
              </template>
            </b-dropdown>
          </span>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts" src="./student-units.component.ts">
</script>

<style scoped>

</style>

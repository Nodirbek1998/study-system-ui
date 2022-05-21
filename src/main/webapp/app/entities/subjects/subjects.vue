<template>
  <div>
    <h2 id="page-heading" data-cy="SubjectsHeading">
      <span v-text="$t('studysystemApp.subjects.home.title')" id="subjects-heading">Subjects</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('studysystemApp.subjects.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'SubjectsCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-subjects"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('studysystemApp.subjects.home.createLabel')"> Create a new Subjects </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && subjects && subjects.length === 0">
      <span v-text="$t('studysystemApp.subjects.home.notFound')">No subjects found</span>
    </div>
<!--    <div class="table-responsive" v-if="subjects && subjects.length > 0">-->
<!--      <table class="table table-striped" aria-describedby="subjects">-->
<!--        <thead>-->
<!--          <tr>-->
<!--            <th scope="row" v-on:click="changeOrder('id')">-->
<!--              <span v-text="$t('global.field.id')">ID</span>-->
<!--              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>-->
<!--            </th>-->
<!--            <th scope="row" v-on:click="changeOrder('nameUz')">-->
<!--              <span v-text="$t('studysystemApp.subjects.nameUz')">Name Uz</span>-->
<!--              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nameUz'"></jhi-sort-indicator>-->
<!--            </th>-->
<!--            <th scope="row" v-on:click="changeOrder('nameRu')">-->
<!--              <span v-text="$t('studysystemApp.subjects.nameRu')">Name Ru</span>-->
<!--              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nameRu'"></jhi-sort-indicator>-->
<!--            </th>-->
<!--            <th scope="row" v-on:click="changeOrder('nameEn')">-->
<!--              <span v-text="$t('studysystemApp.subjects.nameEn')">Name En</span>-->
<!--              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nameEn'"></jhi-sort-indicator>-->
<!--            </th>-->
<!--            <th scope="row" v-on:click="changeOrder('createdAt')">-->
<!--              <span v-text="$t('studysystemApp.subjects.createdAt')">Created At</span>-->
<!--              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'createdAt'"></jhi-sort-indicator>-->
<!--            </th>-->
<!--            <th scope="row" v-on:click="changeOrder('updatedAt')">-->
<!--              <span v-text="$t('studysystemApp.subjects.updatedAt')">Updated At</span>-->
<!--              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'updatedAt'"></jhi-sort-indicator>-->
<!--            </th>-->
<!--            <th scope="row"></th>-->
<!--          </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--          <tr v-for="subjects in subjects" :key="subjects.id" data-cy="entityTable">-->
<!--            <td>-->
<!--              <router-link :to="{ name: 'SubjectsView', params: { subjectsId: subjects.id } }">{{ subjects.id }}</router-link>-->
<!--            </td>-->
<!--            <td>{{ subjects.nameUz }}</td>-->
<!--            <td>{{ subjects.nameRu }}</td>-->
<!--            <td>{{ subjects.nameEn }}</td>-->
<!--            <td>{{ subjects.createdAt }}</td>-->
<!--            <td>{{ subjects.updatedAt }}</td>-->
<!--            <td class="text-right">-->
<!--              <div class="btn-group">-->
<!--                <router-link :to="{ name: 'SubjectsView', params: { subjectsId: subjects.id } }" custom v-slot="{ navigate }">-->
<!--                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">-->
<!--                    <font-awesome-icon icon="eye"></font-awesome-icon>-->
<!--                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>-->
<!--                  </button>-->
<!--                </router-link>-->
<!--                <router-link :to="{ name: 'SubjectsEdit', params: { subjectsId: subjects.id } }" custom v-slot="{ navigate }">-->
<!--                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">-->
<!--                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>-->
<!--                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>-->
<!--                  </button>-->
<!--                </router-link>-->
<!--                <b-button-->
<!--                  v-on:click="prepareRemove(subjects)"-->
<!--                  variant="danger"-->
<!--                  class="btn btn-sm"-->
<!--                  data-cy="entityDeleteButton"-->
<!--                  v-b-modal.removeEntity-->
<!--                >-->
<!--                  <font-awesome-icon icon="times"></font-awesome-icon>-->
<!--                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>-->
<!--                </b-button>-->
<!--              </div>-->
<!--            </td>-->
<!--          </tr>-->
<!--        </tbody>-->
<!--      </table>-->
<!--    </div>-->
    <div class="table-wrapper" >
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
        :items="subjects"
        @sort-changed="changeOrder"
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
               <b-dropdown-item  class="action-dropdown-item" @click="onClickEdit(row.item.id)">
                  <font-awesome-icon class="icon mr-1" icon="edit"/>
                  {{$t('entity.action.edit')}}
                </b-dropdown-item>
                <b-dropdown-item  class="action-dropdown-item" @click="prepareRemove(row.item.id)">
                  <font-awesome-icon class="icon mr-1" icon="trash"/>
                  {{$t('entity.action.delete')}}
                </b-dropdown-item>
            </b-dropdown>
          </span>
        </template>
      </b-table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="studysystemApp.subjects.delete.question" data-cy="subjectsDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-subjects-heading" v-text="$t('studysystemApp.subjects.delete.question', { id: removeId })">
          Are you sure you want to delete this Subjects?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-subjects"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeSubjects()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="subjects && subjects.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./subjects.component.ts"></script>

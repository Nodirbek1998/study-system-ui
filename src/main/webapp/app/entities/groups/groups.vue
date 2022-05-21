<template>
  <div>
    <h2 id="page-heading" data-cy="GroupsHeading">
      <span v-text="$t('studysystemApp.groups.home.title')" id="groups-heading">Groups</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('studysystemApp.groups.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'GroupsCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-groups"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('studysystemApp.groups.home.createLabel')"> Create a new Groups </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && groups && groups.length === 0">
      <span v-text="$t('studysystemApp.groups.home.notFound')">No groups found</span>
    </div>
<!--    <div class="table-responsive" v-if="groups && groups.length > 0">-->
<!--      <table class="table table-striped" aria-describedby="groups">-->
<!--        <thead>-->
<!--          <tr>-->
<!--            <th scope="row" v-on:click="changeOrder('id')">-->
<!--              <span v-text="$t('global.field.id')">ID</span>-->
<!--              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>-->
<!--            </th>-->
<!--            <th scope="row" v-on:click="changeOrder('name')">-->
<!--              <span v-text="$t('studysystemApp.groups.name')">Name</span>-->
<!--              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator>-->
<!--            </th>-->
<!--            <th scope="row" v-on:click="changeOrder('createdAt')">-->
<!--              <span v-text="$t('studysystemApp.groups.createdAt')">Created At</span>-->
<!--              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'createdAt'"></jhi-sort-indicator>-->
<!--            </th>-->
<!--            <th scope="row" v-on:click="changeOrder('updatedAt')">-->
<!--              <span v-text="$t('studysystemApp.groups.updatedAt')">Updated At</span>-->
<!--              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'updatedAt'"></jhi-sort-indicator>-->
<!--            </th>-->
<!--            <th scope="row"></th>-->
<!--          </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--          <tr v-for="groups in groups" :key="groups.id" data-cy="entityTable">-->
<!--            <td>-->
<!--              <router-link :to="{ name: 'GroupsView', params: { groupsId: groups.id } }">{{ groups.id }}</router-link>-->
<!--            </td>-->
<!--            <td>{{ groups.name }}</td>-->
<!--            <td>{{ groups.createdAt }}</td>-->
<!--            <td>{{ groups.updatedAt }}</td>-->
<!--            <td class="text-right">-->
<!--              <div class="btn-group">-->
<!--                <router-link :to="{ name: 'GroupsView', params: { groupsId: groups.id } }" custom v-slot="{ navigate }">-->
<!--                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">-->
<!--                    <font-awesome-icon icon="eye"></font-awesome-icon>-->
<!--                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>-->
<!--                  </button>-->
<!--                </router-link>-->
<!--                <router-link :to="{ name: 'GroupsEdit', params: { groupsId: groups.id } }" custom v-slot="{ navigate }">-->
<!--                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">-->
<!--                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>-->
<!--                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>-->
<!--                  </button>-->
<!--                </router-link>-->
<!--                <b-button-->
<!--                  v-on:click="prepareRemove(groups)"-->
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
        :items="groups"
        @sort-changed="changeOrder"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong v-text="$t('global.loading')">Loading...</strong>
          </div>
        </template>
        <template v-slot:head(id)="data">
          <span v-html="$t('global.field.id')"></span>
        </template>
        <template v-slot:head(name)="data">
          <span v-html="$t('studysystemApp.groups.name')"></span>
        </template>
        <template v-slot:head(createdAt)="data">
          <span v-html="$t('studysystemApp.groups.createdAt')"></span>
        </template>
        <template v-slot:head(updatedAt)="data">
          <span v-html="$t('studysystemApp.groups.updatedAt')"></span>
        </template>
        <template v-slot:cell(id)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(name)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(createdAt)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(updatedAt)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(action)="row">
          <span>
            <b-dropdown no-caret variant="link" class="action-dropdown" size="lg">
              <template #button-content>
                  <font-awesome-icon class="icon" icon="ellipsis-v" size="xs"/>
              </template>
               <b-dropdown-item  class="action-dropdown-item" @click="onClickEdit(row.item.id)">
                  <font-awesome-icon class="icon mr-1" icon="edit"/>
                  {{$t('studysystemApp.role.updated')}}
                </b-dropdown-item>
                <b-dropdown-item  class="action-dropdown-item" @click="prepareRemove(row.item.id)">
                  <font-awesome-icon class="icon mr-1" icon="trash"/>
                  {{$t('studysystemApp.role.deleted')}}
                </b-dropdown-item>
            </b-dropdown>
          </span>
        </template>
      </b-table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="studysystemApp.groups.delete.question" data-cy="groupsDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-groups-heading" v-text="$t('studysystemApp.groups.delete.question', { id: removeId })">
          Are you sure you want to delete this Groups?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-groups"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeGroups()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="groups && groups.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./groups.component.ts"></script>

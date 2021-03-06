<template>
  <div>
    <h2 id="page-heading" data-cy="ImagesHeading">
      <span v-text="$t('studysystemApp.images.home.title')" id="images-heading">Images</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('studysystemApp.images.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ImagesCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-images"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('studysystemApp.images.home.createLabel')"> Create a new Images </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && images && images.length === 0">
      <span v-text="$t('studysystemApp.images.home.notFound')">No images found</span>
    </div>
    <div class="table-responsive" v-if="images && images.length > 0">
      <table class="table table-striped" aria-describedby="images">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('name')">
              <span v-text="$t('studysystemApp.images.name')">Name</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('imageSize')">
              <span v-text="$t('studysystemApp.images.imageSize')">Image Size</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'imageSize'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('contentType')">
              <span v-text="$t('studysystemApp.images.contentType')">Content Type</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'contentType'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('createdAt')">
              <span v-text="$t('studysystemApp.images.createdAt')">Created At</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'createdAt'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('studyUser.id')">
              <span v-text="$t('studysystemApp.images.studyUser')">Study User</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'studyUser.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="images in images" :key="images.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ImagesView', params: { imagesId: images.id } }">{{ images.id }}</router-link>
            </td>
            <td>{{ images.name }}</td>
            <td>{{ images.imageSize }}</td>
            <td>{{ images.contentType }}</td>
            <td>{{ images.createdAt }}</td>
            <td>
              <div v-if="images.studyUser">
                <router-link :to="{ name: 'StudyUsersView', params: { studyUsersId: images.studyUser.id } }">{{
                  images.studyUser.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ImagesView', params: { imagesId: images.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ImagesEdit', params: { imagesId: images.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(images)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="studysystemApp.images.delete.question" data-cy="imagesDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-images-heading" v-text="$t('studysystemApp.images.delete.question', { id: removeId })">
          Are you sure you want to delete this Images?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-images"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeImages()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="images && images.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./images.component.ts"></script>

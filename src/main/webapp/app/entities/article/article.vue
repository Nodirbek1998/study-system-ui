<template>
  <div>
    <h2 id="page-heading" data-cy="ArticleHeading">
      <span id="article-heading">Articles</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ArticleCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-article"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Article </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && articles && articles.length === 0">
      <span>No articles found</span>
    </div>
    <div class="table-responsive" v-if="articles && articles.length > 0">
      <table class="table table-striped" aria-describedby="articles">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('name')">
              <span>Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('text')">
              <span>Text</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'text'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('createdAt')">
              <span>Created At</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'createdAt'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('updatedAt')">
              <span>Updated At</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'updatedAt'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('studyUser.id')">
              <span>Study User</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'studyUser.id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('createdBy.id')">
              <span>Created By</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'createdBy.id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('updatedBy.id')">
              <span>Updated By</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'updatedBy.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ArticleView', params: { articleId: article.id } }">{{ article.id }}</router-link>
            </td>
            <td>{{ article.name }}</td>
            <td>{{ article.text }}</td>
            <td>{{ article.createdAt }}</td>
            <td>{{ article.updatedAt }}</td>
            <td>
              <div v-if="article.studyUser">
                <router-link :to="{ name: 'StudyUsersView', params: { studyUsersId: article.studyUser.id } }">{{
                  article.studyUser.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="article.createdBy">
                <router-link :to="{ name: 'StudyUsersView', params: { studyUsersId: article.createdBy.id } }">{{
                  article.createdBy.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="article.updatedBy">
                <router-link :to="{ name: 'StudyUsersView', params: { studyUsersId: article.updatedBy.id } }">{{
                  article.updatedBy.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ArticleView', params: { articleId: article.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ArticleEdit', params: { articleId: article.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(article)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="studysystemApp.article.delete.question" data-cy="articleDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-article-heading">Are you sure you want to delete this Article?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-article"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeArticle()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="articles && articles.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./article.component.ts"></script>

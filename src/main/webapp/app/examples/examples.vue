<template>
  <div  class="page page-internal">
    <h2 id="page-heading" data-cy="ArticleHeading">
      <span v-text="$t('studysystemApp.article.home.title')" id="article-heading">Articles</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('studysystemApp.examples.home.refreshListLabel')">Refresh List</span>
        </button>
        <button class="btn btn-info mr-2" v-on:click="createExamples" v-if="!$can('ExamplesAdd', 'admin')">
          <font-awesome-icon icon="plus" ></font-awesome-icon>
          <span v-text="$t('studysystemApp.examples.home.createLabel')">Create Examples</span>
        </button>
      </div>
    </h2>
    <br />
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
        :items="examples"
        @sort-changed="changeOrder"
        @row-dblclicked="onSelectRowDbClick"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong v-text="$t('global.loading')">Loading...</strong>
          </div>
        </template>
        <template v-slot:head(id)="data">
          <span v-html="$t('studysystemApp.examples.table.id')"></span>
        </template>
        <template v-slot:head(name)="data">
          <span v-html="$t('studysystemApp.examples.table.name')"></span>
        </template>
        <template v-slot:head(ball)="data">
          <span v-html="$t('studysystemApp.examples.table.ball')"></span>
        </template>
        <template v-slot:head(createdAt)="data">
          <span v-html="$t('studysystemApp.examples.table.createdAt')"></span>
        </template>
        <template v-slot:head(action)="data">
          <span v-html="$t('studysystemApp.examples.table.action')"></span>
        </template>
        <template v-slot:cell(id)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(name)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(ball)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(createdAt)="data"><span>{{ data.value }}</span></template>
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
      <div class="alert alert-warning" v-if="!isFetching && examples && examples.length === 0">
        <span v-text="$t('studysystemApp.article.home.notFound')">No articles found</span>
      </div>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="studysystemApp.article.delete.question" data-cy="articleDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-article-heading" v-text="$t('studysystemApp.article.delete.question', { id: removeId })">
          Are you sure you want to delete this Article?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-article"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeArticle()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="examples && examples.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./examples.component.ts"></script>

<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="studysystemApp.article.home.createOrEditLabel"
          data-cy="ArticleCreateUpdateHeading"
          v-text="$t('studysystemApp.article.home.createOrEditLabel')"
        >
          Create or edit a Article
        </h2>
        <div>
          <div class="form-group" v-if="task.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="task.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.article.name')" for="article-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="article-name"
              data-cy="name"
              v-model="task.topic"
            />
          </div>
          <div class="form-group">
            <b-form-group>
              <b-form-file
                id="edo-card-uploadDocument"
                class="form-control"
                name="edo-card-uploadDocument"
                size="sm"
                v-model="uploadDocument"
                @change="onChangeAttachment"
                accept="pdf, docx, doc"
                placeholder=""
              ></b-form-file>
            </b-form-group>

          </div>
          <div class="form-group">
            <b-form-group
              :label="$t('studysystemApp.article.createdAt')"
              label-for="article-createdAt"
            >
              <date-picker
                id="article-createdAt"
                v-model="task.deadline"
                format="DD.MM.YYYY"
                value-type="format"
                type="date"
                input-class="form-control"
                style="width: 100%;"
              ></date-picker>
            </b-form-group>
          </div>
          <div class="form-group">
            <b-form-group
              :label="$t('studysystemApp.article.createdAt')"
              label-for="article-createdAt-time"
            >
              <date-picker
                id="article-createdAt-time"
                v-model="task.time"
                format="HH:mm:SS"
                value-type="format"
                type="time"
                input-class="form-control"
                style="width: 100%;"
              ></date-picker>
            </b-form-group>
          </div>
        </div>
        <div>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" src="./create-tasks.component.ts">
</script>

<style scoped>

</style>

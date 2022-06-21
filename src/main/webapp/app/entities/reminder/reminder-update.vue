<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="studysystemApp.article.home.createOrEditLabel"
          data-cy="ArticleCreateUpdateHeading"
          v-text="$t('studysystemApp.reminder.title')"
        >
          Create or edit a Article
        </h2>
        <div>
          <div class="form-group" v-if="reminder.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="reminder.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.reminder.table.title')" for="article-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="article-name"
              data-cy="name"
              :class="{ valid: !$v.reminder.title.$invalid, invalid: $v.reminder.title.$invalid }"
              v-model="$v.reminder.title.$model"
            />
          </div>
          <div class="form-group">
            <b-form-group
              :label="$t('studysystemApp.reminder.table.body')"
              label-for="article-text"
              class="w-100">
              <b-form-textarea
                id="article-text"
                rows="8"
                size="sm"
                class="form-control"
                v-model="reminder.body"
              ></b-form-textarea>
            </b-form-group>
          </div>
          <div class="form-group">
            <b-form-group
              :label="$t('studysystemApp.reminder.table.createdAt')"
              label-for="article-createdAt"
            >
              <date-picker
                id="article-createdAt"
                v-model="reminder.createdAt"
                format="DD.MM.YYYY"
                value-type="format"
                type="date"
                input-class="form-control"
                style="width: 100%;"
              ></date-picker>
            </b-form-group>
          </div>
<!--          <div class="form-group">-->
<!--            <b-form-group-->
<!--              :label="$t('studysystemApp.article.updatedAt')"-->
<!--              label-for="article-updatedAt"-->
<!--            >-->
<!--              <date-picker-->
<!--                id="article-updatedAt"-->
<!--                v-model="reminder.updatedAt"-->
<!--                format="DD.MM.YYYY"-->
<!--                value-type="format"-->
<!--                type="date"-->
<!--                input-class="form-control"-->
<!--                style="width: 100%;"-->
<!--              ></date-picker>-->
<!--            </b-form-group>-->
<!--          </div>-->
<!--          <div class="form-group">-->
<!--            <label class="form-control-label" v-text="$t('studysystemApp.article.createdBy')" for="article-createdBy">Created By</label>-->
<!--            <select class="form-control" id="article-createdBy" data-cy="createdBy" name="createdBy" v-model="reminder.createdBy">-->
<!--              <option v-bind:value="null"></option>-->
<!--              <option-->
<!--                v-bind:value="reminder.createdBy && studyUsersOption.id === reminder.createdBy.id ? reminder.createdBy : studyUsersOption"-->
<!--                v-for="studyUsersOption in studyUsers"-->
<!--                :key="studyUsersOption.id"-->
<!--              >-->
<!--                {{ studyUsersOption.id }}-->
<!--              </option>-->
<!--            </select>-->
<!--          </div>-->
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.reminder.$invalid"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" src="./reminder-update.component.ts">
</script>

<style scoped>

</style>

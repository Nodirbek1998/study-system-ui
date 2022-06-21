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
          <div class="form-group" v-if="article.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="article.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.article.name')" for="article-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="article-name"
              data-cy="name"
              :class="{ valid: !$v.article.name.$invalid, invalid: $v.article.name.$invalid }"
              v-model="$v.article.name.$model"
            />
          </div>
          <div class="form-group">
            <b-form-group
              :label="$t('studysystemApp.article.text')"
              label-for="article-text"
              class="w-100">
              <b-form-textarea
                id="article-text"
                rows="8"
                size="sm"
                class="form-control"
                v-model="article.text"
              ></b-form-textarea>
            </b-form-group>
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
                accept=".jpg, .png, .jpeg"
                placeholder=""
              ></b-form-file>
            </b-form-group>

          </div>
<!--          <div class="form-group">-->
<!--            <b-form-group-->
<!--              :label="$t('studysystemApp.article.createdAt')"-->
<!--              label-for="article-createdAt"-->
<!--            >-->
<!--              <date-picker-->
<!--                id="article-createdAt"-->
<!--                v-model="article.createdAt"-->
<!--                format="DD.MM.YYYY"-->
<!--                value-type="format"-->
<!--                type="date"-->
<!--                input-class="form-control"-->
<!--                style="width: 100%;"-->
<!--              ></date-picker>-->
<!--            </b-form-group>-->
<!--          </div>-->
<!--          <div class="form-group">-->
<!--            <b-form-group-->
<!--              :label="$t('studysystemApp.article.updatedAt')"-->
<!--              label-for="article-updatedAt"-->
<!--            >-->
<!--              <date-picker-->
<!--                id="article-updatedAt"-->
<!--                v-model="article.updatedAt"-->
<!--                format="DD.MM.YYYY"-->
<!--                value-type="format"-->
<!--                type="date"-->
<!--                input-class="form-control"-->
<!--                style="width: 100%;"-->
<!--              ></date-picker>-->
<!--            </b-form-group>-->
<!--          </div>-->
<!--          <div class="form-group">-->
<!--            <label class="form-control-label" v-text="$t('studysystemApp.article.studyUser')" for="article-studyUser">Study User</label>-->
<!--            <select class="form-control" id="article-studyUser" data-cy="studyUser" name="studyUser" v-model="article.studyUser">-->
<!--              <option v-bind:value="null"></option>-->
<!--              <option-->
<!--                v-bind:value="article.studyUser && studyUsersOption.id === article.studyUser.id ? article.studyUser : studyUsersOption"-->
<!--                v-for="studyUsersOption in studyUsers"-->
<!--                :key="studyUsersOption.id"-->
<!--              >-->
<!--                {{ studyUsersOption.id }}-->
<!--              </option>-->
<!--            </select>-->
<!--          </div>-->
<!--          <div class="form-group">-->
<!--            <label class="form-control-label" v-text="$t('studysystemApp.article.createdBy')" for="article-createdBy">Created By</label>-->
<!--            <select class="form-control" id="article-createdBy" data-cy="createdBy" name="createdBy" v-model="article.createdBy">-->
<!--              <option v-bind:value="null"></option>-->
<!--              <option-->
<!--                v-bind:value="article.createdBy && studyUsersOption.id === article.createdBy.id ? article.createdBy : studyUsersOption"-->
<!--                v-for="studyUsersOption in studyUsers"-->
<!--                :key="studyUsersOption.id"-->
<!--              >-->
<!--                {{ studyUsersOption.id }}-->
<!--              </option>-->
<!--            </select>-->
<!--          </div>-->
<!--          <div class="form-group">-->
<!--            <label class="form-control-label" v-text="$t('studysystemApp.article.updatedBy')" for="article-updatedBy">Updated By</label>-->
<!--            <select class="form-control" id="article-updatedBy" data-cy="updatedBy" name="updatedBy" v-model="article.updatedBy">-->
<!--              <option v-bind:value="null"></option>-->
<!--              <option-->
<!--                v-bind:value="article.updatedBy && studyUsersOption.id === article.updatedBy.id ? article.updatedBy : studyUsersOption"-->
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
            :disabled="$v.article.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./article-update.component.ts"></script>

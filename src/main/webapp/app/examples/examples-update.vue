<template>
  <div class="page page-create-document ">
    <div class="row h-100">
      <div class="col-6 h-100">
        <form name="editForm" role="form" ref="create_examples"
          v-on:submit.prevent="saveIA()">
          <div>
            <h4 class="mb-2">{{
                examples.id ? $t('studysystemApp.examples.home.createOrEditLabel', {id: examples.id}) : $t("studysystemApp.examples.home.createLabel")
              }}</h4>
            <div>
              <div class="row">
                <div class="col-12">
                  <b-form-group
                    :label="$t('studysystemApp.examples.create.name')"
                    label-for="edo-internal-approval-subject"
                    maxlength="70">
                    <b-form-input
                      id="edo-internal-approval-subject"
                      class="form-control"
                      v-model="examples.name"
                    ></b-form-input>
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <b-form-group
                    :label="$t('studysystemApp.examples.create.ball')"
                    label-for="edo-internal-approval-subject"
                    maxlength="70">
                    <b-form-input
                      id="edo-internal-approval-subject"
                      class="form-control"
                      v-model="examples.ball"
                      type="number"
                    ></b-form-input>
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
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
              </div>
            </div>
          </div>
          <div>
            <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
              <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
            </button>
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
  </div>
</template>

<script lang="ts" src="./examples-update.component.ts">
</script>

<style scoped>

</style>

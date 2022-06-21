<template>
  <div class="page">
    <div class="row ">
      <div class="col-6" v-if="!isFullViewPdf">
        <div v-if="examples" class="text-center">
          <b-card class='head-card'>
            <div class='row'>
              <div class='col-12'>
               <span
                 v-if='examples.name'
                 v-html='examples.name'
               ></span>
              </div>
            </div>
          </b-card>
          <b-card class='head-card text-justify'>
            <div class='row'>
              <div class='col-12'>
               <span
                 v-if='examples.ball'
                 v-html='examples.ball'
               ></span>
              </div>
            </div>
          </b-card>
          <button class="btn btn-info mt-5" v-on:click="createExamplesAnswer" >
            <font-awesome-icon icon="plus" ></font-awesome-icon>
            <span v-text="$t('studysystemApp.examples.home.createLabel')">Create Examples</span>
          </button>
        </div>
        <div v-if="openAnswer">
          <div class="row">
            <div class="col-12">
              <b-form-group
                :label="$t('studysystemApp.examples.create.name')"
                label-for="edo-internal-approval-subject"
                maxlength="70">
                <b-form-input
                  id="edo-internal-approval-subject"
                  class="form-control"
                  v-model="examplesAnswer.name"
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
          <button class="btn btn-info mt-5" v-on:click="saveIA" >
            <font-awesome-icon icon="plus" ></font-awesome-icon>
            <span v-text="$t('studysystemApp.examples.home.createLabel')">Create Examples</span>
          </button>
        </div>
      </div>

      <div :class="(isFullViewPdf ? 'col-12 pdf-full' : 'col-6') + ' card-pdf '" v-if="examples.filesDTO && examples.filesDTO.id">
        <a class="pdf-view-button" @click="isFullViewPdf = !isFullViewPdf">
          <font-awesome-icon
            class="icon cursor-pointer"
            :icon="!isFullViewPdf ? 'chevron-left' : 'chevron-right'"
          />
        </a>
        <object class="w-100 h-100 min-h-full" :data="approvalPdfUrl(examples.filesDTO.id)" type="application/pdf"></object>
      </div>
    </div>
  </div>

</template>

<script lang="ts" src="./examples-details.component.ts"></script>

<style>
.pdf-view-button {
  position: absolute;
  top: 50%;
  margin-left: -15px;
  cursor: pointer;
}
</style>

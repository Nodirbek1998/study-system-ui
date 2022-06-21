<template>
  <div class="page">
    <div class="row ">
      <div class="col-6" v-if="!isFullViewPdf">
        <div v-if="examplesAnswer" class="text-center">
          <b-card class='head-card'>
            <div class='row'>
              <div class='col-12'>
               <span
                 v-if='examplesAnswer.name'
                 v-html='examplesAnswer.name'
               ></span>
              </div>
            </div>
          </b-card>
          <b-card class='head-card text-justify'>
            <div class='row'>
              <div class='col-12'>
               <span
                 v-if='examplesAnswer.ball'
                 v-html='examplesAnswer.ball'
               ></span>
              </div>
            </div>
          </b-card>
        </div>
      </div>
      <div :class="(isFullViewPdf ? 'col-12 pdf-full' : 'col-6') + ' card-pdf '" v-if="examplesAnswer.filesDTO && examplesAnswer.filesDTO.id">
        <a class="pdf-view-button" @click="isFullViewPdf = !isFullViewPdf">
          <font-awesome-icon
            class="icon cursor-pointer"
            :icon="!isFullViewPdf ? 'chevron-left' : 'chevron-right'"
          />
        </a>
        <object class="w-100 h-100 min-h-full" :data="approvalPdfUrl(examplesAnswer.filesDTO.id)" type="application/pdf"></object>
      </div>
    </div>
  </div>

</template>

<script lang="ts" src="./examples-answer-details.component.ts"></script>

<style>
.pdf-view-button {
  position: absolute;
  top: 50%;
  margin-left: -15px;
  cursor: pointer;
}
</style>

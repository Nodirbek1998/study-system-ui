<template>
  <div class="page">
    <div class="row ">
      <div class="col-6">
        <div v-if="task" class="text-center">
          <b-card class='head-card'>
            <div class='row'>
              <div class='col-12'>
               <span
                 v-if='task.topic'
                 v-html='task.topic'
               ></span>
              </div>
            </div>
          </b-card>
          <b-card class='head-card text-justify'>
            <div class='row'>
              <div class='col-12'>
               <span
                 v-if='task.deadline'
                 v-html='task.deadline'
               ></span>
              </div>
            </div>
          </b-card>
        </div>
      </div>
      <div class="col-6" v-if="task.fileId">
        <object class="w-100 h-100 min-h-full" :data="approvalPdfUrl" type="application/pdf"></object>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./task-details.component.ts"></script>

<template>
  <div class="page">
    <div class="row ">
      <div class="col-6">
        <div v-if="article" class="text-center">
          <b-card class='head-card'>
            <div class='row'>
              <div class='col-12'>
               <span
                 v-if='article.name'
                 v-html='article.name'
               ></span>
              </div>
            </div>
          </b-card>
          <b-card class='head-card text-justify'>
            <div class='row'>
              <div class='col-12'>
               <span
                 v-if='article.text'
                 v-html='article.text'
               ></span>
              </div>
            </div>
          </b-card>
        </div>
      </div>
      <div class="col-6">
        <img style="width: 100%" class="img-fluid"  :src="imageUrl">
      </div>
      <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
      </button>
      <button type="button" id="save"   class=" ml-4 btn btn-primary" v-on:click="save()">
        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Submit</span>
      </button>
    </div>
  </div>

</template>

<script lang="ts" src="./article-details.component.ts"></script>

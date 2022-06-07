<template>
    <div id="user-avatar-cropper">
        <div class="row pt-3 pb-3">
            <div class="col-6">
                <vue-cropper
                    v-if="imageFileUrl"
                    ref="cropper"
                    :src="imageFileUrl"
                    alt="Source Image"
                    :data="cropOptions"
                    :cropBoxResizable="false"
                    :min-container-width="250"
                    :min-container-height="250"
                    :max-container-width="250"
                    :max-container-height="250"
                    @ready="onCropReady"
                >
                </vue-cropper>
                <b-button v-if="imageFileUrl" variant="primary" type="button" @click="cropImage" class="mt-2">
                    {{ $t('kdbemdocsuiApp.edoNews.crop') }}</b-button>
                <b-button variant="primary" type="button" @click="$refs.profile_photo.click()" class="mt-2">
                    {{ $t('hr.selectImage') }}</b-button>
            </div>
            <div class="col-6">
                <b-avatar
                    button
                    class="mb-4 ml-3 cursor-pointer p-0"
                    :src="cropImageUrl" size="9rem"
                    @click="$refs.profile_photo.click()"
                >
                </b-avatar>
                <input id="imageUpload" type="file"
                       @change="fasterPreview"
                       accept="image/x-png,image/jpeg"
                       ref="profile_photo" placeholder="Photo" required capture>
            </div>
        </div>
        <hr class="my-4">
        <div class="d-flex float-right">
            <a class="btn btn-secondary-outline mr-3" @click="nextState(1)">{{ $t('hr.back') }}</a>
            <b-button variant="primary" @click="nextState(3)">{{ $t('hr.next') }}</b-button>
        </div>
    </div>
</template>

<script lang="ts" src="./user-avatar.component.ts">
</script>
<style>
#user-avatar-cropper .cropper-crop-box, .cropper-view-box {
    border-radius: 50%;
}

#user-avatar-cropper .cropper-view-box {
    box-shadow: 0 0 0 1px #39f;
    outline: 0;
}

</style>

<template>
    <div class="page page-auth-2 p-0 m-0 h-100">
        <div class="custom-row p-0 m-0 h-100">
            <div class="p-0 m-0 left-panel">
                <div class="login-container h-100">

                    <div class="login-header">
                       <div>
                           <img src="content/images/logo.png" alt="" height="80px" />

                       </div>
                    </div>
                    <div class="login-content">
                        <b-tabs content-class="mt-4">


                            <b-tab title="Авторизация" active>
                                <b-form class="login-input-form">
                                    <b-form-group>
                                        <b-form-input id="username" type="text" required placeholder="Login"
                                                      v-model="login">

                                        </b-form-input>

                                        <b-form-invalid-feedback><strong>Не удалось войти!</strong> Пожалуйста, проверьте ваши учетные данные и попробуйте еще раз.</b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-input-group class="mb-3">
                                        <b-form-input d="password" :type="viewPassword ? 'text' : 'password'" required autocomplete="false"
                                                      @keyup="$event.keyCode === 13 ? doLogin() : function() {}"
                                                      v-model.trim="name" placeholder="Пароль"
                                                      v-model="password"></b-form-input>
                                        <b-input-group-append is-text class="cursor-pointer" @click.stop="viewPassword = !viewPassword">
                                            <b-icon  :icon="viewPassword ? 'eye-fill' : 'eye-slash-fill'"></b-icon>
                                        </b-input-group-append>
                                        <b-form-invalid-feedback><strong>Не удалось войти!</strong> Пожалуйста, проверьте ваши учетные данные и попробуйте еще раз.</b-form-invalid-feedback>
                                    </b-input-group>

                                    <b-button block class="btn-theme-primary" @click="doLogin" style="height: 45px">Войти</b-button>
                                </b-form>
                            </b-tab>
                        </b-tabs>

                        <b-row class="pt-4 m-0 ">
                            <b-col cols="12" class="align-content-center" >
                                <b-link href="#" class="card-link">Вы забыли ваш пароль?</b-link>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="login-footer mt-5">
                        <span >
                            @2022 All Rights Reserved User Policy
                        </span>
                    </div>
                </div>

            </div>
            <div class="p-0 right-panel">
                <img src="content/images/home.jpg" alt=""/>
            </div>
        </div>


    </div>
</template>

<script lang="ts" src="./login-form.component.ts">
</script>

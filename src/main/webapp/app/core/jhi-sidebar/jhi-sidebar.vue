<template>
    <aside class="sidebar intranet-sidebar" :class="$store.getters.menuCollapse">
      <b-navbar-brand to="/" :class="$store.getters.menuCollapse" style='background-color: white;'>
        <img src="content/images/logo.png" alt="" width='50px' height='50px'/>
      </b-navbar-brand>
      <div class="user-info d-flex align-items-center">
        <b-avatar :src="currentUserImage" size="6rem"></b-avatar>
        <div class="d-block ml-2">
          <b-link class="user-name" style="width: 95%; text-align: right; font-size: 16px" to='/account/settings' v-text='currentUserName'></b-link>
          <b-dropdown  class="font-weight-bold user-department"
                      style="margin-right: 10px">
            <b-dropdown-item to="/account/password" tag="b-dropdown-item" v-if="authenticated"
                             active-class="active">
              <font-awesome-icon icon="lock"/>
              <span v-text="$t('global.menu.account.password')">Password</span>
            </b-dropdown-item>
            <b-dropdown-item to="/account/settings" tag="b-dropdown-item" v-if="authenticated"
                             active-class="active">
              <font-awesome-icon icon="user"/>
              <span v-text="$t('global.menu.account.main')">Password</span>
            </b-dropdown-item>
            <b-dropdown-item v-if="authenticated" v-on:click="logout()" id="logout" active-class="active">
              <font-awesome-icon icon="sign-out-alt"/>
              <span v-text="$t('global.menu.account.logout')">Sign out</span>
            </b-dropdown-item>
            <b-dropdown-item v-if="!authenticated" v-on:click="openLogin()" id="login" active-class="active">
              <font-awesome-icon icon="sign-in-alt"/>
              <span v-text="$t('global.menu.account.login')">Sign in</span>
            </b-dropdown-item>
            <b-dropdown-item to="/register" tag="b-dropdown-item" id="register" v-if="!authenticated"
                             active-class="active">
              <font-awesome-icon icon="user-plus"/>
              <span v-text="$t('global.menu.account.register')">Register</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <b-list-group class="sidebar-links" v-if="isStatistics.group">

      </b-list-group>
      <b-list-group class="sidebar-links" v-if="isStatistics.admin">
        <b-list-group-item to="/admin/users" v-if="isStatistics.admin" >
          <font-awesome-icon icon="asterisk" />
          <span v-text="$t('global.menu.entities.studyUsers')">Study Users</span>
        </b-list-group-item>
        <b-list-group-item to="/admin/role" exact exact-active-class="active" >
          <font-awesome-icon icon="asterisk" />
          <span v-text="$t('global.menu.entities.role')">Role</span>
        </b-list-group-item>
        <b-list-group-item  to="/admin/study-logs" exact exact-active-class="active" >
          <font-awesome-icon icon="asterisk" />
          <span v-text="$t('global.menu.entities.studyLogs')">Study Logs</span>
        </b-list-group-item>
<!--        <b-list-group-item to="/hr/list-training" exact exact-active-class="active" v-if="isStatistics.admin">-->
<!--          <font-awesome-icon icon="asterisk" />-->
<!--          <span v-text="$t('global.menu.entities.roleStaticPermission')">Role Static Permission</span>-->
<!--        </b-list-group-item>-->
        <b-list-group-item  to="/admin/article" exact exact-active-class="active" >
          <font-awesome-icon icon="asterisk" />
          <span v-text="$t('global.menu.entities.article')">Article</span>
        </b-list-group-item>

<!--        <b-list-group-item to="/images" exact exact-active-class="active" v-if="isStatistics.admin">-->
<!--          <font-awesome-icon icon="asterisk" />-->
<!--          <span v-text="$t('global.menu.entities.images')">Images</span>-->
<!--        </b-list-group-item>-->

<!--        <b-list-group-item to="/files" v-if="isStatistics.admin">-->
<!--          <font-awesome-icon icon="asterisk" />-->
<!--          <span v-text="$t('global.menu.entities.files')">Files</span>-->
<!--        </b-list-group-item>-->
        <b-list-group-item to="/admin/subjects" exact exact-active-class="active">
          <font-awesome-icon icon="asterisk" />
          <span v-text="$t('global.menu.entities.subjects')">Subjects</span>
        </b-list-group-item>
<!--        <b-list-group-item to="/units" exact exact-active-class="active" v-if="isStatistics.admin">-->
<!--          <font-awesome-icon icon="asterisk" />-->
<!--          <span v-text="$t('global.menu.entities.units')">Units</span>-->
<!--        </b-list-group-item>-->
        <b-list-group-item to="/admin/groups" exact exact-active-class="active" >
          <font-awesome-icon icon="asterisk" />
          <span v-text="$t('global.menu.entities.groups')">Groups</span>
        </b-list-group-item>
        <b-list-group-item to="/admin/tests" exact exact-active-class="active" >
          <font-awesome-icon icon="asterisk" />
          <span v-text="$t('global.menu.entities.tests')">Tests</span>
        </b-list-group-item>
<!--        <b-list-group-item to="/test-question" exact exact-active-class="active" v-if="isStatistics.admin">-->
<!--          <font-awesome-icon icon="asterisk" />-->
<!--          <span v-text="$t('global.menu.entities.testQuestion')">Test Question</span>-->
<!--        </b-list-group-item>-->
<!--        <b-list-group-item to="/test-answer" exact exact-active-class="active" v-if="isStatistics.admin">-->
<!--          <font-awesome-icon icon="asterisk" />-->
<!--          <span v-text="$t('global.menu.entities.testAnswer')">Test Answer</span>-->
<!--        </b-list-group-item>-->
        <b-list-group-item to="/admin/task" exact exact-active-class="active" >
          <font-awesome-icon icon="asterisk" />
          <span v-text="$t('global.menu.entities.task')">Task</span>
        </b-list-group-item>
<!--        <b-list-group-item to="/task-answer" exact exact-active-class="active" v-if="isStatistics.admin"  >-->
<!--          <font-awesome-icon icon="asterisk" />-->
<!--          <span v-text="$t('global.menu.entities.taskAnswer')">Task Answer</span>-->
<!--        </b-list-group-item>-->

<!--        Admin statistics-->

      </b-list-group>

    </aside>
</template>
<style>
.intranet-sidebar .user-department .btn.dropdown-toggle.btn-secondary {
    width: 100%;
}
</style>
<script lang="ts" src="./jhi-sidebar.component.ts">
</script>

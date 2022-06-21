<template>
  <b-navbar class='intranet-navbar' toggleable='lg' type='dark' variant='primary'>
      <b-container fluid=''>
          <b-collapse id='nav-collapse' is-nav>
          <b-navbar-nav>
              <b-nav-item class='sidebar-collapse' @click="$store.commit('setMenuCollapse')">
                  <font-awesome-icon class='mr-1' icon='bars' />
              </b-nav-item>
              <b-nav-item to="/home"  active-class='active'>
                  <span>
                    <font-awesome-icon icon="home" />
                    <span v-text="$t('global.menu.home')">Home</span>
                  </span>
              </b-nav-item>
            <b-nav-item to="/user/groups" active-class='active' v-if="$can('NavbarTeacherGroup', 'admin')" >
                  <span>
                    <font-awesome-icon icon="user-group" />
                    <span v-text="$t('global.menu.entities.groups')">Groups</span>
                  </span>
            </b-nav-item>
            <b-nav-item to="/student/groups" active-class='active' v-if="$can('NavbarStudentGroup', 'admin')" >
                  <span>
                    <font-awesome-icon icon="user-group" />
                    <span v-text="$t('global.menu.entities.groups')">Group</span>
                  </span>
            </b-nav-item>
            <b-nav-item to="/articles" active-class='active'>
                  <span>
                    <font-awesome-icon icon="user-group" />
                    <span v-text="$t('global.menu.entities.article')">Article</span>
                  </span>
            </b-nav-item>
            <b-nav-item to="/examples" active-class='active'>
                  <span>
                    <font-awesome-icon icon="user-group" />
                    <span v-text="$t('global.menu.entities.examples')">Examples</span>
                  </span>
            </b-nav-item>
            <b-nav-item to='/admin' v-if="$can('NavbarAdmin', 'admin')" key='internal'  active-class='active' >
                <font-awesome-icon class='mr-1' icon='th-large' />
                {{ $t('global.menu.admin.main') }}
            </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>

    <b-collapse is-nav id="header-tabs">
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown id="languagesnavBarDropdown" right v-if="languages && Object.keys(languages).length > 1">
          <span slot="button-content">
            <font-awesome-icon icon="flag" />
            <span class="no-bold" v-text="$t('global.menu.language')">Language</span>
          </span>
          <b-dropdown-item
            v-for="(value, key) in languages"
            :key="`lang-${key}`"
            v-on:click="changeLanguage(key)"
            :class="{ active: isActiveLanguage(key) }"
          >
            {{ value.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
<!--        <b-nav-item-dropdown-->
<!--          id="account-menu"-->
<!--          active-class="active"-->
<!--          class="pointer"-->
<!--          data-cy="accountMenu"-->
<!--        >-->
<!--          <span slot="button-content" >-->
<!--            <font-awesome-icon icon="user" />-->
<!--            <span class="no-bold" v-text="$t('global.menu.account.main')"> Account </span>-->
<!--          </span>-->
<!--          <b-dropdown-item data-cy="settings" to="/account/settings" tag="b-dropdown-item" v-if="authenticated" active-class="active">-->
<!--            <font-awesome-icon icon="wrench" />-->
<!--            <span v-text="$t('global.menu.account.settings')">Settings</span>-->
<!--          </b-dropdown-item>-->
<!--          <b-dropdown-item data-cy="passwordItem" to="/account/password" tag="b-dropdown-item" v-if="authenticated" active-class="active">-->
<!--            <font-awesome-icon icon="lock" />-->
<!--            <span v-text="$t('global.menu.account.password')">Password</span>-->
<!--          </b-dropdown-item>-->
<!--          <b-dropdown-item data-cy="logout" v-if="authenticated" v-on:click="logout()" id="logout" active-class="active">-->
<!--            <font-awesome-icon icon="sign-out-alt" />-->
<!--            <span v-text="$t('global.menu.account.logout')">Sign out</span>-->
<!--          </b-dropdown-item>-->
<!--          <b-dropdown-item data-cy="login" v-if="!authenticated" v-on:click="openLogin()" id="login" active-class="active">-->
<!--            <font-awesome-icon icon="sign-in-alt" />-->
<!--            <span v-text="$t('global.menu.account.login')">Sign in</span>-->
<!--          </b-dropdown-item>-->
<!--          <b-dropdown-item-->
<!--            data-cy="register"-->
<!--            to="/register"-->
<!--            tag="b-dropdown-item"-->
<!--            id="register"-->
<!--            v-if="!authenticated"-->
<!--            active-class="active"-->
<!--          >-->
<!--            <font-awesome-icon icon="user-plus" />-->
<!--            <span v-text="$t('global.menu.account.register')">Register</span>-->
<!--          </b-dropdown-item>-->
<!--        </b-nav-item-dropdown>-->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts" src="./jhi-navbar.component.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>




</style>

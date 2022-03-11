<template>
  <div>
    <b-dropdown-item to="/study-users">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.studyUsers')">Study Users</span>
    </b-dropdown-item>
    <b-dropdown-item to="/role">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.role')">Role</span>
    </b-dropdown-item>
    <b-dropdown-item to="/study-logs">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.studyLogs')">Study Logs</span>
    </b-dropdown-item>
    <b-dropdown-item to="/role-static-permission">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.roleStaticPermission')">Role Static Permission</span>
    </b-dropdown-item>
    <b-dropdown-item to="/article">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.article')">Article</span>
    </b-dropdown-item>
    <b-dropdown-item to="/images">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.images')">Images</span>
    </b-dropdown-item>
    <b-dropdown-item to="/files">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.files')">Files</span>
    </b-dropdown-item>
    <b-dropdown-item to="/subjects">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.subjects')">Subjects</span>
    </b-dropdown-item>
    <b-dropdown-item to="/units">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.units')">Units</span>
    </b-dropdown-item>
    <b-dropdown-item to="/groups">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.groups')">Groups</span>
    </b-dropdown-item>
    <b-dropdown-item to="/tests">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.tests')">Tests</span>
    </b-dropdown-item>
    <b-dropdown-item to="/test-question">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.testQuestion')">Test Question</span>
    </b-dropdown-item>
    <b-dropdown-item to="/test-answer">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.testAnswer')">Test Answer</span>
    </b-dropdown-item>
    <b-dropdown-item to="/task">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.task')">Task</span>
    </b-dropdown-item>
    <b-dropdown-item to="/task-answer">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.taskAnswer')">Task Answer</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>

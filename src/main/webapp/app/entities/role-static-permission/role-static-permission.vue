<template>
  <div>
    <b-card-group deck>
      <b-card class="card-document">
        <h3 class="page-title mb-4 mt-2 text-capitalize" id=""
            v-text="$t('kdbemdocsuiApp.edoDtRoleStaticPermission.home.title')">Edo Dt Role Static
          Permissions</h3>

        <div class="row">
          <div class="col-md-4">
            <div class="list-box-wrapper">
              <div class="list-box-item">
                <ul class="list-box">
                  <li :class="'list-item' + (currentRoleId === role.id ? ' active':'')"
                      @click="() => onChangeRole(role.id)"
                      v-for="role in userRoles">
                    {{ role.id }}. {{ role.nameUz }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <DualListBox
              :source="source"
              :destination="destination"
              label="name"
              @onChangeList="onChangeList"
            />
          </div>
        </div>
      </b-card>
    </b-card-group>

  </div>
</template>

<script lang="ts" src="./role-static-permission.component.ts"></script>

<template>
  <b-card class="card-home card-calendar" id="home__calendar"header-tag="header" footer-tag="footer">
    <template v-slot:header>
      <div class="d-flex w-100 align-items-center justify-content-between">
        <div>
          {{$t('home.calendar')}}
        </div>
<!--        <div>-->
<!--          <b-link :to="{name : 'EdoCalendar'}" class="text-white" style="font-size: 16px !important;">{{$t('pages.home.calendar.todo')}}</b-link>-->
<!--        </div>-->
      </div>

    </template>
    <b-calendar block
                id = 'calendar'
                v-model="calendarValue"
                @context="onContext"
                hide-header
                locale="en-US"
                start-weekday="1"
                nav-next-month
    ></b-calendar>
  </b-card>
</template>
<script lang="ts" src="./calendar-home.component.ts"></script>
<style>
.event-item {
    height: 65px;
    background-color: rgba(255, 255, 255, 0.15);
    color: #ffffff;
    padding: 10px 15px;
    margin-bottom: 7px;
}
.card-calendar{
  background-color: #0c54a0;
}

#calendar__calendar-grid_ .b-calendar-grid-caption{
    margin-bottom: 6px;
   }
#home__calendar footer{
    padding: 1.95rem 1.25rem;
}
</style>

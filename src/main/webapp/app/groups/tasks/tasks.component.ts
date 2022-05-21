import Vue from "vue";
import {Component, Inject} from "vue-property-decorator";
import TaskService from "@/entities/task/task.service";
import AlertService from "@/shared/alert/alert.service";
import Vue2Filters from "vue2-filters";



@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Tasks extends Vue{
  @Inject('taskService') private taskService: () => TaskService;
  @Inject('alertService') private alertService: () => AlertService;
}

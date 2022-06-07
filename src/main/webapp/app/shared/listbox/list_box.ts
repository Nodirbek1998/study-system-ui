import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ListBox extends Vue {
  @Prop({ default: '' }) title!: string;
  @Prop({ default: 'id' }) idParam!: string;
  @Prop({ default: [] }) labels!: string[];
  @PropSync('items', { type: Array }) syncedListItems!: object[];
  @PropSync('selectItems', { type: Array }) selectedListItems!: object[];
  public currentLanguage = '';
  public clickedItems = [];
  public clickedItemsRight = [];

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
    console.log('labels ', this.labels);
  }

  mounted() {}

  public previousState(): void {
    this.$router.go(-1);
  }

  public toggleItem(itemId, hasActive): void {
    if (hasActive) {
      this.syncedListItems.forEach(value => {
        if (value[this.idParam] === itemId) {
          this.clickedItems[itemId] = value;
        }
      });
    } else {
      this.clickedItems[itemId] = null;
    }
  }

  public toggleItemRight(itemId, hasActive): void {
    if (hasActive) {
      this.selectedListItems.forEach(value => {
        if (value[this.idParam] === itemId) {
          this.clickedItemsRight[itemId] = value;
        }
      });
    } else {
      this.clickedItemsRight[itemId] = null;
    }
  }

  public removeItemOnce(arr, value): object[] {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  public removeItemWithIndexes(arr, indexes): object[] {
    indexes.forEach(index => {
      if (index > -1) {
        arr.splice(index, 1);
      }
    });
    return arr;
  }

  public removeAllElements(arr): object[] {
    arr.splice(0, arr.length);
    return arr;
  }

  public onItemClick(event, itemId): void {
    event.currentTarget.classList.toggle('active');
    const hasActive = event.currentTarget.classList.contains('active');
    this.toggleItem(itemId, hasActive);
  }

  public onItemClickRight(event, itemId): void {
    event.currentTarget.classList.toggle('active');
    const hasActive = event.currentTarget.classList.contains('active');
    this.toggleItemRight(itemId, hasActive);
  }

  public onMoveRightOnce(): void {
    if (this.clickedItems && this.clickedItems.length > 0) {
      this.clickedItems.forEach(value => {
        if (value !== null) {
          if (this.selectedListItems.filter(v1 => v1[this.idParam] === value[this.idParam]).length === 0) {
            this.selectedListItems.push(value);
          }
          this.removeItemOnce(this.syncedListItems, value);
        }
      });
      this.clickedItems = [];
      this.$emit('onListBoxChange', this.syncedListItems, this.selectedListItems);
    }
  }

  public onMoveRightAll(): void {
    this.syncedListItems.forEach(value => {
      if (value !== null && this.selectedListItems.filter(v1 => v1[this.idParam] === value[this.idParam]).length === 0) {
        this.selectedListItems.push(value);
      }
    });
    this.clickedItems = this.removeAllElements(this.clickedItems);
    this.syncedListItems = this.removeAllElements(this.syncedListItems);
    this.$emit('onListBoxChange', this.syncedListItems, this.selectedListItems);
  }

  public onMoveLeftOnce(): void {
    if (this.clickedItemsRight && this.clickedItemsRight.length > 0) {
      this.clickedItemsRight.forEach(value => {
        if (value !== null) {
          if (this.syncedListItems.filter(v1 => v1[this.idParam] === value[this.idParam]).length === 0) {
            this.syncedListItems.push(value);
          }
          this.removeItemOnce(this.selectedListItems, value);
        }
      });
      this.clickedItemsRight = [];
      this.$emit('onListBoxChange', this.syncedListItems, this.selectedListItems);
    }
  }

  public onMoveLeftAll(): void {
    this.selectedListItems.forEach(value => {
      if (value !== null && this.syncedListItems.filter(v1 => v1[this.idParam] === value[this.idParam]).length === 0) {
        this.syncedListItems.push(value);
      }
    });
    this.clickedItemsRight = this.removeAllElements(this.clickedItemsRight);
    this.selectedListItems = this.removeAllElements(this.selectedListItems);

    this.$emit('onListBoxChange', this.syncedListItems, this.selectedListItems);
  }
}

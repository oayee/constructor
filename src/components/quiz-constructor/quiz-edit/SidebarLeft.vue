<template>
  <div class="sidebar-left" style="width: 20%">
    <div class="q-py-md q-px-sm">
      <q-select :value="value" @input="$emit('input', $event)" :options="categories" emit-value map-options square
                option-value="categoryId" option-label="category" filled dense />
    </div>
    <div class="q-pl-sm">
      <template v-for="category of sortedCategories">
        <q-item-label class="q-pl-none" :key="category.id" header>
          {{category.category}}
        </q-item-label>

        <q-separator :key="category.id + 'sep1'" />
        <q-list :key="category.id + 'list'" separator>
          <q-item v-for="page of category.pages" :key="category.id + '-' + page.pageId" clickable
                  :active="category.id + '-' + page.pageId === activeItem"
                  @click="onItemClick(page, category.id)" class="q-px-xs" style="transition: none">
            <q-item-section class="col-auto">
              <q-icon name="drag_indicator" />
            </q-item-section>
            <q-item-section>{{getPageName(page)}}</q-item-section>
            <q-item-section class="column col-auto">
              <q-btn icon="file_copy" @click="onPageCopy(page)" size="sm" flat dense />
              <q-btn icon="delete" @click="$emit('page-delete', page)" size="sm" flat dense />
            </q-item-section>
          </q-item>
        </q-list>
        <q-separator v-if="category.pages.length" :key="category.id + 'sep2'" />
      </template>
    </div>
    <q-btn round icon="add" color="grey-10" @click="onNewPage" />
  </div>
</template>

<script>
export default {
  name: 'sidebar-left',
  data () {
    return {
      activeItem: null,
      newPageId: 1
    };
  },
  props: {
    value: Number,
    sortedCategories: Array,
    categories: Array
  },
  methods: {
    onItemClick (page, categoryId) {
      this.activeItem = categoryId + '-' + page.pageId;
      this.$emit('cur-page', page);
    },
    onPageCopy (page) {
      const newPage = Object.assign({}, page);
      newPage.pageId = this.newPageId + 'page';
      this.newPageId++;
      this.$emit('page-copy', newPage);
    },
    getPageName (page) {
      let pageName = '';
      try {
        pageName = page.questions.filter(q => q.type === 'radiogroup')[0].question;
      } catch {
        pageName = 'Без имени';
      }
      return pageName;
    },
    onNewPage () {
      this.$emit('new-page', this.newPageId + 'page');
      this.newPageId++;
    }
  }
};
</script>

<style scoped>
  .sidebar-left {
    background-color: #FBFBFB;
  }

  .q-item--active {
    color: inherit;
    background-color: #E6E6E6;
  }
</style>

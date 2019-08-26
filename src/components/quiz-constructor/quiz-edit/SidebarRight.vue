<template>
  <div class="sidebar-right bg-grey-4 q-pa-sm" v-if="curPage && settingsBar" style="width: 20%">
    <!-- <q-input v-model="curQuestion.activeIf" label="включить если"></q-input>
    <q-input v-model="curQuestion.deadline" label="время на ответ" stack-label type="date"></q-input>
    <q-checkbox dense v-model="curQuestion.readonly" class="q-mt-sm" label="только чтение" color="grey"></q-checkbox> -->
    <span class="text-bold">Категории</span>
    <div v-for="category of categories" :key="category.categoryId" class="q-pa-sm">
      <div style="color: #757575" class="q-py-xs q-pl-xs">{{category.category}}</div>
      <q-select bg-color="grey-1" dense filled :options="category.values" option-label="value"
                :value="getSelectValue(category)" @input="setSelectValue($event, category.categoryId)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarRight',
  props: {
    settingsBar: Boolean,
    curPage: Object,
    categories: Array
  },
  methods: {
    getSelectValue (category) {
      const pageCategory = this.curPage.categories.filter(c => c.categoryId === category.categoryId)[0] || {};
      return { id: pageCategory.id || null, value: pageCategory.value || null };
    },
    setSelectValue (e, categoryId) {
      const value = { id: e.id, value: e.value, categoryId: categoryId };
      const idx = this.curPage.categories.findIndex(c => c.categoryId === categoryId);
      if (~idx) {
        this.$set(this.curPage.categories, idx, value);
      } else {
        this.curPage.categories.push(value);
      }
    }
  }
};
</script>

<style scoped>

</style>

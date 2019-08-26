<template>
  <div v-if="quiz.categories">
    <div class="category" v-for="cat of quiz.categories" :key="cat.categoryId">
      <div class="row align-center cat-name-wrap">
        <input class="text-overline q-my-md cat-name" style="letter-spacing: 1.5px; color: #757575"
               v-model="cat.category" placeholder="Введите название категории">
        <q-btn round flat icon="cancel" dense @click="onCatRemove(cat.categoryId)" />
      </div>
      <div class="row full-width">
        <q-chip class="q-mr-lg" removable v-for="val of cat.values" :key="val.id" @remove="onValRemove(cat, val.id)">
          <input type="text" placeholder="введите тег" @input="setInputWidth" v-model="val.value"
                 style="background: transparent; border: none; outline: none; width: 6em">
        </q-chip>
        <q-chip class="q-mr-lg">
          <input type="text" placeholder="введите тег" @input="setInputWidth" @blur="onNewCatValue($event, cat)"
                 style="background: transparent; border: none; outline: none; width: 6em">
        </q-chip>
      </div>
    </div>

    <div class="category">
      <div class="row align-center cat-name-wrap">
        <input class="text-overline q-my-md cat-name-new" style="letter-spacing: 1.5px; color: #757575"
               @blur="onNewCategory" v-model="newCategory" placeholder="Введите название новой категории">
      </div>
    </div>

    <q-btn class="q-mt-xl" round icon="add" color="grey-10" @click="categoryDialog = true" />

    <!--TODO: create separate component for such type of dialogues-->
    <q-dialog v-model="categoryDialog">
      <q-card style="width: 400px" class="q-pa-sm">
        <q-card-section class="row items-center q-pt-xs q-pr-xs">
          <q-space />
          <q-btn icon="close" style="background-color: grey" color="white" size="7.5px" flat round dense
                 v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-sm">
          <div class="text-subtitle2 q-pb-sm" style="color: #757575">НОВАЯ КАТЕГОРИЯ</div>
          <q-select class="q-mb-sm" filled v-model="newExCategory" :options="onCategoriesInput()" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Добавить" @click="onSubmitDialog" color="secondary" class="q-mr-sm" v-close-popup />
          <q-btn label="Отменить" color="black" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
  .cat-name-wrap {
    align-items: center;
  }

  .cat-name-new {
    width: 100%;
    outline: none;
    border: none;
  }

  .cat-name {
    outline: none;
    border: none;
  }

  .cat-name::placeholder {
    color: red;
  }
</style>

<script>
export default {
  name: 'categories',
  data () {
    return {
      categoryDialog: false,
      newCategory: '',
      newExCategory: null,
      newCatValue: '',
      tempCategoryId: 1,
      tempCatValueId: 1
    };
  },
  props: {
    quiz: Object,
    categories: Array
  },
  methods: {
    onCategoriesInput () {
      if (!this.categories) return [];
      if (!this.quiz.categories) return this.categories;
      return this.categories.filter(cat => {
        let res = false;
        this.quiz.categories.forEach(el => {
          res = res || el.categoryId === cat.value;
        });
        return !res;
      });
    },
    onNewCategory () {
      if (!this.newCategory) return;
      this.quiz.categories.push({
        category: this.newCategory,
        categoryId: this.tempCategoryId + '-temp',
        values: []
      });
      this.tempCategoryId++;
      this.newCategory = '';
    },
    onNewCatValue (e, category) {
      if (!e.target.value) return;
      category.values.push({
        value: e.target.value,
        id: this.tempCatValueId + '-tempVal'
      });
      this.tempCatValueId++;
      e.target.value = '';
      e.target.style.width = '6em';
    },
    onSubmitDialog () {
      if (!this.newExCategory) return;
      this.quiz.categories.push({
        category: this.newExCategory.label,
        categoryId: this.newExCategory.value,
        values: []
      });
      this.tempCategoryId++;
      this.newCategory = '';
    },
    setInputWidth (event) {
      const iLgth = event.target.value.length;
      if (iLgth) {
        event.target.style.width = (iLgth + 0.5) * 0.5 + 'em';
      } else {
        event.target.style.width = '6em';
      }
    },
    onValRemove (category, valId) {
      category.values = category.values.filter(v => v.id !== valId);
      this.quiz.pages.forEach(page => {
        page.categories = page.categories.filter(c => c.id !== valId);
      });
    },
    onCatRemove (catId) {
      this.quiz.categories = this.quiz.categories.filter(c => c.categoryId !== catId);
      this.quiz.pages.forEach(page => {
        page.categories = page.categories.filter(c => c.categoryId !== catId);
      });
    }
  }
};
</script>

<template>
  <div class="q-mt-md">
    <q-tabs v-model="curTab" align="left" dense no-caps>
      <q-tab name="category" label="Категории" />
      <q-tab name="edit" label="Редактирование" />
      <q-tab name="view" label="Просмотр" />
      <q-tab name="results" label="Результаты" />
    </q-tabs>
    <categories v-if="curTab === 'category'" :categories="commonCategories" :quiz="quiz" />
    <quiz-edit v-if="curTab === 'edit'" :quiz="quiz" />
  </div>
</template>

<script>
import Categories from './Categories';
import QuizEdit from './quiz-edit/QuizEdit';

export default {
  name: 'quiz-constructor',
  components: {
    Categories,
    QuizEdit
  },
  props: {
    quiz: Object
  },
  data () {
    return {
      curTab: 'category',
      commonCategories: [
        {
          'value': 1,
          'label': 'Зоны'
        },
        {
          'value': 2,
          'label': 'test_category'
        }
      ]
    };
  }
};
</script>

<template>
  <div class="row q-pt-sm">
    <sidebar-left v-model="curCategory" @cur-page="curPage = $event"
                  @page-delete="onPageDelete($event)"
                  @page-copy="onPageCopy($event)"
                  @new-page="onNewPage($event)"
                  :sortedCategories="sortedCategories" :categories="quiz.categories" />

    <div class="center-wrap col">
      <bar-options :curPage="curPage" @settings="settingsBar = !settingsBar" @new-question="onNewQuestion($event)" />

      <draggable v-if="curPage" v-model="curPage.questions" @start="drag = true" @end="drag = false"
                 handle=".drag-handle" class="q-pa-md">
        <div v-for="(q, idx) of curPage.questions" :key="q.questionId">
          <question :question="q" :isFirst="!idx" @delete="onQuestionDelete(q)" @copy="onQuestionCopy(q)" />
        </div>
      </draggable>
    </div>

    <sidebar-right :settings-bar="settingsBar" :curPage="curPage" :categories="quiz.categories"
                   @settings="settingsBar = !settingsBar" />
  </div>
</template>

<style>
  .drag-handle {
    cursor: move;
  }
</style>

<script>
import Question from './Question';
import SidebarLeft from './SidebarLeft';
import draggable from 'vuedraggable';
import BarOptions from './BarOptions';
import SidebarRight from './SidebarRight';

export default {
  components: {
    SidebarRight,
    BarOptions,
    Question,
    SidebarLeft,
    draggable
  },
  name: 'quiz-edit',
  props: {
    quiz: Object
  },
  computed: {
    sortedCategories: function () {
      const sortedPages = [];
      const curCategory = this.quiz.categories.filter(c => c.categoryId === this.curCategory)[0];
      if (curCategory) {
        let pages = this.quiz.pages.slice();
        curCategory.values.forEach(v => {
          const sortedPage = {
            id: v.id,
            category: v.value,
            pages: []
          };

          const pagesToRemove = [];

          pages.forEach(page => {
            if (page.categories.some(c => c.id === v.id)) {
              sortedPage.pages.push(page);
              pagesToRemove.push(page.pageId);
            }
          });

          pages = pages.filter(page => !pagesToRemove.includes(page.pageId));

          sortedPages.push(sortedPage);
        });

        // pages without category
        sortedPages.push({
          id: 'unsorted',
          category: 'Без категории',
          pages: pages
        });
      } else {
        sortedPages.push({
          id: 'unsorted',
          category: 'Без категории',
          pages: this.quiz.pages
        });
      }

      return sortedPages;
    }
  },
  beforeMount () {
    this.curCategory = (this.quiz.categories[0] && this.quiz.categories[0].categoryId) || null;
  },
  data () {
    return {
      curCategory: null,
      curPage: null,
      settingsBar: false,
      drag: false,
      newQuestionId: 1
    };
  },
  methods: {
    onPageDelete (page) {
      this.quiz.pages = this.quiz.pages.filter(p => p.pageId !== page.pageId);
    },
    onPageCopy (page) {
      page.questions.forEach(q => {
        q.questionId = this.newQuestionId + 'question';
        this.newQuestionId++;
      });
      this.quiz.pages.push(page);
    },
    onNewPage (newPageId) {
      this.quiz.pages.push({
        categories: [],
        pageId: newPageId,
        questions: [
          {
            type: 'radiogroup',
            question: 'Без имени',
            questionId: this.newQuestionId + 'question',
            radiogroupValues: [
              { label: 'Исполняется', value: '0' },
              { label: 'Не исполняется', value: '1' },
              { label: 'Нет в магазине', value: '2' }
            ]
          }
        ]
      });
      this.newQuestionId++;
    },
    onNewQuestion (newQuestion) {
      newQuestion.questionId = this.newQuestionId + 'question';
      this.newQuestionId++;
      this.curPage.questions.push(newQuestion);
    },
    onQuestionDelete (question) {
      this.curPage.questions = this.curPage.questions.filter(q => q.questionId !== question.questionId);
    },
    onQuestionCopy (q) {
      const newQuestion = Object.assign({}, q);
      newQuestion.questionId = this.newQuestionId + 'question';
      this.newQuestionId++;
      this.curPage.questions.push(newQuestion);
    }
  }
};
</script>

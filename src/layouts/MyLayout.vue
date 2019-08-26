<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <template>
        <q-page class="row q-px-xl justify-center">
          <div class="fit column items-center">
            <div style="width: 80%">
              <form class="q-pb-md" @submit.prevent.stop="onSubmit">
                <div class="shadow-5 q-px-xl q-py-md">
                  <span class="text-overline" style="letter-spacing: 1.5px; color: #757575">ПРОФИЛЬ</span>

                  <div class="column q-pt-lg">
                    <div class="row">
                      <div class="column" style="width: 350px">
                        <span style="color: #757575">Название</span>
                        <q-input color="negative" v-model="curQuiz.quiz" class="q-mr-lg" placeholder="Опрос" filled
                                 ref="quiz" :rules="[val => !!val || 'Введите название опроса']" />
                      </div>

                      <div class="column" style="width: 350px">
                        <span style="color: #757575">Описание</span>
                        <q-input color="negative" v-model="curQuiz.description" placeholder="описание" ref="desc"
                                 filled :rules="[val => !!val || 'Введите описание']" />
                      </div>
                    </div>
                  </div>
                  <quiz-constructor :quiz="curQuiz"></quiz-constructor>
                </div>

              </form>
            </div>
          </div>
        </q-page>
      </template>
    </q-page-container>
  </q-layout>
</template>

<script>
import QuizConstructor from '../components/quiz-constructor/Constructor';

export default {
  name: 'MyLayout',
  components: { QuizConstructor },
  data () {
    return {
      curQuiz: {
        'quizId': 1,
        'quiz': 'test_name',
        'description': 'desc',
        'categories': [
          {
            'values': [
              {
                'id': 3,
                'value': 'test_value'
              }
            ],
            'category': 'test_category',
            'categoryId': 2
          },
          {
            'values': [
              {
                'id': 1,
                'value': 'Вход'
              },
              {
                'id': 2,
                'value': 'Торговый зал'
              }
            ],
            'category': 'Зоны',
            'categoryId': 1
          }],
        'pages': [
          {
            'pageId': 1,
            'categories': [
              {
                'id': 1,
                'value': 'Вход',
                'categoryId': 1
              },
              {
                'id': 3,
                'value': 'test_value',
                'categoryId': 2
              }
            ],
            'questions': [
              {
                'type': 'radiogroup',
                'question': 'test_q_2',
                'questionId': 2,
                'radiogroupValues': [
                  {
                    'label': 'Исполняется',
                    'value': '0'
                  },
                  {
                    'label': 'Не исполняется',
                    'value': '1'
                  },
                  {
                    'label': 'Нет в магазине',
                    'value': '2'
                  }
                ]
              },
              {
                'type': 'text',
                'question': 'test_q',
                'questionId': 1,
                'radiogroupValues': []
              }
            ]
          },
          {
            'pageId': 2,
            'categories': [
              {
                'id': 2,
                'value': 'Торговый зал',
                'categoryId': 1
              },
              {
                'id': 3,
                'value': 'test_value',
                'categoryId': 2
              }
            ],
            'questions': [
              {
                'type': 'radiogroup',
                'question': 'test_22',
                'questionId': 4,
                'radiogroupValues': [
                  {
                    'label': 'Исполняется',
                    'value': '0'
                  },
                  {
                    'label': 'Не исполняется',
                    'value': '1'
                  },
                  {
                    'label': 'Нет в магазине',
                    'value': '2'
                  }
                ]
              },
              {
                'type': 'text',
                'question': 'test_2',
                'questionId': 3,
                'radiogroupValues': []
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

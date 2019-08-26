<template>
  <q-bar>
    <q-btn-dropdown label="Добавление элементов" dense flat :disable="!curPage">
      <q-list dense>
        <q-item clickable>
          <q-item-section>Ввод</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>

          <q-menu auto-close anchor="top right" self="top left">
            <q-list>
              <q-item dense clickable>
                <q-item-section @click="onElementAdd('number')">Число</q-item-section>
              </q-item>
              <q-item dense clickable>
                <q-item-section @click="onElementAdd('date')">Дата</q-item-section>
              </q-item>
              <q-item dense clickable>
                <q-item-section @click="onElementAdd('text')">Текст</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>

        <q-item clickable>
          <q-item-section>Выбор</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>

          <q-menu auto-close anchor="top right" self="top left">
            <q-list>
              <q-item dense clickable>
                <q-item-section @click="onElementAdd('checkbox')">Один вариант</q-item-section>
              </q-item>
              <q-item dense clickable>
                <q-item-section @click="onElementAdd('radiogroup')">Несколько вариантов</q-item-section>
              </q-item>
              <q-item dense clickable>
                <q-item-section @click="onElementAdd('hinted-checkbox')">Выбор с подсказкой</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section @click="onElementAdd('comment')">Комментарий</q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>Файл</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>

          <q-menu auto-close anchor="top right" self="top left">
            <q-list>
              <q-item dense clickable>
                <q-item-section @click="onElementAdd('file')">Файл</q-item-section>
              </q-item>
              <q-item dense clickable>
                <q-item-section @click="onElementAdd('foto')">Фото</q-item-section>
              </q-item>
              <q-item dense clickable>
                <q-item-section @click="onElementAdd('document')">Документ</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-space></q-space>
    <q-separator vertical color="grey-1" />
    <q-btn flat disable icon="undo" label="Назад" />
    <q-btn flat disable icon="redo" label="Вперед" />
    <q-separator vertical color="grey-1" />
    <q-btn flat icon="settings" label="Настройки" @click="$emit('settings')" />
  </q-bar>
</template>

<script>
export default {
  name: 'BarOptions',
  props: {
    curPage: Object
  },
  methods: {
    onElementAdd (type) {
      const question = {
        type: type,
        question: 'Без имени',
        questionId: ''
      };
      if (type === 'radiogroup') {
        question.radiogroupValues = [
          { label: 'Исполняется', value: '0' },
          { label: 'Не исполняется', value: '1' },
          { label: 'Нет в магазине', value: '2' }
        ];
      }
      this.$emit('new-question', question);
    }
  }
};
</script>

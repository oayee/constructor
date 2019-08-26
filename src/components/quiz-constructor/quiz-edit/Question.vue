<template>
  <q-card flat square bordered class="q-ma-sm q-pa-sm" style="border-style: dashed;">
    <div class="row">
      <q-icon class="drag-handle" name="drag_indicator" style="font-size: 1.5em;" />
      <q-space />
      <q-btn icon="file_copy" flat @click="$emit('copy', question)" />
      <q-btn :disable="isFirst" icon="delete" flat @click="$emit('delete', question)" />
    </div>

    <q-input v-model="question.question" filled class="q-mx-md" placeholder="введите текст">
      <template v-slot:before>
        <q-icon :name="getIconByType(question.type)" />
      </template>
    </q-input>

    <template v-if="question.type === 'radiogroup'">
      <q-input v-for="v in question.radiogroupValues" :key="v.value" v-model="v.label"
               class="q-mx-md" placeholder="вариант">
        <template v-slot:before>
          <q-icon name="radio_button_unchecked" />
        </template>
      </q-input>
    </template>

  </q-card>
</template>

<script>

export default {
  name: 'question',
  props: {
    question: Object,
    isFirst: Boolean
  },
  methods: {
    getIconByType (type) {
      const icons = {
        'checkbox': 'check_box_outline_blank',
        'date': 'event',
        'document': 'assignment',
        'file': 'attach_file',
        'photo': 'camera_alt',
        'number': 'dialpad',
        'radiogroup': '',
        'text': 'text_fields'
      };

      return icons[type] || 'text_fields';
    }
  }
};
</script>

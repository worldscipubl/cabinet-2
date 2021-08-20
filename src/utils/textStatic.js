const textStatic = {
  instructions: {
    states: {
      0: "def",
      15: "instr-1",
      18: "instr-18",
      24: "instr-24-27-33",
      27: "instr-24-27-33",
      33: "instr-24-27-33",
    },

    instruction: {
      "instr-1": [
        "Скачайте статью",
        "Скачайте результаты экспертной оценки",
        "Загрузите статью с правками, выделенными цветом",
      ],
      "instr-18": [
        "Скачайте файл со статьёй",
        "Скачайте файл с вопросами специалиста",
        "Дайте ответ на каждый вопрос в этом же файле",
        "Загрузите ответы",
      ],
      "instr-24-27-33": [
        "Скачайте файл со статьёй",
        "Скачайте файл с вопросами специалиста",
        "Дайте ответ на каждый вопрос в этом же файле",
        "Загрузите ответы",
      ],

      def: "lorewsdfvsdfkvhjbdfhjvsjdbf kv",
    },

    getInstruction(id) {
      return this.instruction[this.states[id]];
    },
  },
};

export const instructions = textStatic.instructions;

export default textStatic;

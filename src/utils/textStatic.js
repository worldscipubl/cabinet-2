import { Redirect, useHistory } from "react-router-dom";
import React from "react";

const textStatic = {
  instructions: {
    states: {
      16: "instr-16",
      19: "instr-19",
      25: "instr-25-28-34",
      28: "instr-25-28-34",
      34: "instr-25-28-34",
    },

    instruction: {
      "instr-16": [
        "Скачайте статью",
        "Скачайте результаты экспертной оценки",
        "Загрузите статью с правками, выделенными цветом",
      ],
      "instr-19": [
        "Скачайте файл со статьёй",
        "Скачайте файл с вопросами специалиста",
        "Дайте ответ на каждый вопрос в этом же файле",
        "Загрузите ответы",
      ],
      "instr-25-28-34": [
        "Скачайте файл с уточняющими вопросами",
        "Дайте ответ на каждый вопрос в этом же файле",
        "Загрузите файл с ответами",
      ],
    },

    getInstruction(id) {
      return this.instruction[this.states[id]];
    },
  },
  buttons: {
    button: {
      4: [
        {
          active: function (data) {
            return true;
          },
          text: "Приступить к подписанию договора",
          class: "button button_type_blue",
          action: function (data) {
            data
              .updateStatusArticle({
                articleId: data.articleId,
                statusAmoId: 26763844,
              })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
      ],
      5: [
        {
          active: function (data) {
            return true;
          },
          text: "Ввести данные",
          class: "button button_type_blue",
          action: function (data) {
            document.location.href =
              "/article/" + data.articleId + "/article-brief";
          },
        },
      ],
      6: [
        {
          active: function (data) {
            return true;
          },
          text: "Исправить",
          class: "button button_type_red",
          action: function (data) {
            document.location.href =
              "/article/" + data.articleId + "/article-brief";
          },
        },
      ],
      9: [
        {
          active: function (data) {
            return true;
          },
          text: "Оплатить",
          class: "button button_type_blue",
          action: function (data) {
            document.location.href =
              "/article/" + data.articleId + "/article-payment";
          },
        },
      ],
      39: [
        {
          active: function (data) {
            return true;
          },
          text: "Ссылка на выпуск",
          class: "button button_type_green",
          action: function (data) {
            if (data.article.linkPublishedArticle) {
              window.open(data.article.linkPublishedArticle, "_blank");
            }
          },
        },
        {
          active: function (data) {
            return data.hasPay;
          },
          text: "Оплатить остаток",
          class: "button button_type_blue",
          action: function (data) {
            document.location.href =
              "/article/" + data.articleId + "/article-payment";
          },
        },
      ],
    },

    getButton(id) {
      return this.button[id];
    },
  },
};

export const instructions = textStatic.instructions;
export const buttons = textStatic.buttons;

export default textStatic;

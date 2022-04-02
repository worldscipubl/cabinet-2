import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSendMessagesByArticleMutation } from "../../../../api/endpoints/ChatApi";

const ChatMessageForm = ({ articleId }) => {
  const [messagesMutation] = useSendMessagesByArticleMutation();
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  const onSubmit = ({ message, messageFile }) => {
    return new Promise((resolve, reject) => {
      const sendData = {
        articleId,
        message,
        "MessageArticleForm[file][]": messageFile,
      };
      messagesMutation(sendData)
        .unwrap()
        .then((res) => {
          resolve("success");
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onSubmit) return;
    onSubmit({ message, files }).then(() => {
      setMessage("");
    });
  };

  const handleMessage = (e) => {
    const input = e.target;
    if (!input) return;

    const isValid = input.validity.valid;

    const { value } = input;
    setMessage(value);
  };

  const handleFile = (e) => {
    const input = e.target;
    if (!input) return;

    const isValid = input.validity.valid;
    if (!isValid) return;

    const { files } = input.files;
    setFiles(files);
  };

  return (
    <div className="chat-box__footer">
      <form
        className="chat-box__send-bar send-bar"
        onSubmit={handleSubmit}
        noValidate
      >
        <textarea
          className="send-bar__field text text_size_default"
          placeholder="Введите ваше сообщение..."
          required
          value={message}
          onChange={handleMessage}
        />
        <div className="send-bar__btn-group">
          <button
            className="send-bar__btn button button_type_main active"
            type="submit"
          >
            Отправить
          </button>
          <label className="send-bar__btn">
            <i className="button button_type_main">Добавить файл</i>
            <input
              className="send-bar__origin-input"
              type="file"
              onChange={handleFile}
            />
          </label>
        </div>
      </form>
    </div>
  );
};

ChatMessageForm.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default ChatMessageForm;

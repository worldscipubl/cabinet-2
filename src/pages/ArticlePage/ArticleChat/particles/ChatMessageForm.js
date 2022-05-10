import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSendMessagesByArticleMutation } from "../../../../api/endpoints/ChatApi";

const ChatMessageForm = ({ articleId }) => {
  const [messagesMutation] = useSendMessagesByArticleMutation();
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  const handleMessage = (e) => {
    const input = e.target;
    if (!input) return;
    const { value } = input;
    setMessage(value);
  };

  const handleFile = (e) => {

    const files = e.target.files;
    console.log(files);
    if(!files) return
    setFiles(files);
  };

// debugger
  function onSubmit(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append("articleId", articleId);
    formData.append("message", message);
    formData.append("MessageArticleForm[file]", files);

    messagesMutation(formData)
      .unwrap()
      .then((res) => {
        console.log(res);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
      })

  }

  return (
    <div className="chat-box__footer">
      <form
        className="chat-box__send-bar send-bar"
        onSubmit={onSubmit}
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
              name="MessageArticleForm[file][]"
              onChange={handleFile}
              multiple
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

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSendMessagesByArticleMutation } from "../../../../api/endpoints/ChatApiFiles";
import Loader from "../../../../components/Loader/Loader";

const ChatMessageForm = ({ articleId }) => {
  const [messagesMutation] = useSendMessagesByArticleMutation();
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);




 const handleMessage = (e) => {
    const input = e.target;
    if (!input) return;

    const isValid = input.validity.valid;

    const { value } = input;
    setMessage(value);
  };

  const handleFile = (e) => {

    const files = e.target.files;
    console.log(files);
    // if(!files) return
    setFiles(files);
    console.log(files);
  };

// debugger
  function onSubmit(e) {
    e.preventDefault()
    // return new Promise((resolve, reject) => {
      // debugger
      const formData = new FormData();
      formData.append("articleId", articleId);
      formData.append("message", message);
      formData.append("MessageArticleForm[file]", files);



      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      // debugger
      console.log(formData);
      console.log(messagesMutation(formData));
      // debugger;
      messagesMutation(formData)
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        })

    }
  // )}





    // });




  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!onSubmit) return;
  //   onSubmit(message, files)
  //     setMessage("");

  // };
  // debugger;

    //   console.log(message);
    //   console.log(files);
    //   const sendData = {
    //     articleId,
    //     message,
    //     "MessageArticleForm[file][]": {files},
    //   };
    // console.log(sendData);
    //   messagesMutation(sendData)
    //     .unwrap()
    //     .then((res) => {
    //       resolve("success");
    //     })
    //     .catch((err) => {
    //       reject(err);
    //     });
// debugger;



//   formelement.onSubmit = async (e) => {
//     e.preventDefault()

//     let
// }

  return (
    <div className="chat-box__footer">
      <form
        id="formelement"
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

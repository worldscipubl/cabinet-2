import React, { useRef, useState } from "react";
import doneImg from "../../../common/images/icons/done.svg";
import ListItemContainer from "../ListItemContainer";
import "./ListItem.scss";

const ListItem = ({
  fileUpload,
  startIcon,
  endIcon,
  title,
  hint,
  onClick,
  disabled,
  link,
}) => {
  const inputFile = useRef(null);
  const [state, setState] = useState({
    startIcon,
    endIcon,
    title,
    fileUpload: null,
  });

  fileUpload && (onClick = () => inputFile.current.click());

  return (
    <ListItemContainer
      className={`list-item ${onClick ? "list-item_type_button" : ""} ${
        disabled ? "list-item_disabled" : ""
      }`}
      onClick={onClick}
      link={link}
    >
      {startIcon && (
        <span className="list-item__icon">
          <img
            src={state.startIcon}
            alt={hint}
            className="list-item__icon-img"
          />
        </span>
      )}

      <p className="text list-item__text">{state.title}</p>

      {endIcon && (
        <span className="list-item__icon">
          <img src={state.endIcon} alt={hint} className="list-item__icon-img" />
        </span>
      )}

      {fileUpload && (
        <div className="list-item__submit">
          {state.fileUpload && (
            <button
              className="button button_type_tabs"
              onClick={(e) => {
                e.stopPropagation();
                fileUpload(state.fileUpload);
              }}
            >
              Отправить
            </button>
          )}
          <input
            name="typeArticleFile[file]"
            type="file"
            ref={inputFile}
            onChange={(e) => {
              const input = e.target;
              if (!input) return;

              if (input.validity.valid) {
                const file = input.files[0];
                setState({
                  ...state,
                  startIcon: doneImg,
                  fileUpload: file,
                  title: file.name,
                });
              }
            }}
            hidden
            accept=".pdf, .doc, .docx"
            required
          />
        </div>
      )}
    </ListItemContainer>
  );
};

export default ListItem;

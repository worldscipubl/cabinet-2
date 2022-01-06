import React, {useState} from 'react';
import classNames from "classnames";
import "react-loading-skeleton/dist/skeleton.css";
import IonIcon from "../IonIcon";
import {useUploadUserFileMutation} from "../../api/endpoints/UserFilesApi";
import cn from "./UserFile.module.scss"

const UserFile = ({className, fileId, fileName, label = "label"}) => {
    const [uploadFile, {data, error, isLoading}] = useUploadUserFileMutation();
    const [file, setFile] = useState(null);
    const [titleFile, setTitleFile] = useState(label);

    function handleUploadFile(e) {
        const input = e.target;
        if (!input) return;

        if (input.validity.valid) {
            const file = input.files[0];
            setFile(file);
            setTitleFile(file.name);
        } else {
            setTitleFile(label);
        }
    }

    function handleSubmitFile(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userTypeFileId", 1);
        formData.append("UserFile[file][]", file);

        uploadFile(formData).unwrap()
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <label className={classNames(cn.Wrapper, className, {
                [cn.done]: !!data,
                [cn.disabled]: isLoading,
                [cn.error]: error
            }
        )}>
            <input className={classNames(cn.InputFile)} type="file" onChange={handleUploadFile} hidden
                   accept=".pdf, .doc, .docx"
                   required/>
            <div className={classNames(cn.ImgGroup)}>
                <IonIcon className={classNames(cn.ImgPlaceholder, {
                        [cn.error]: (!!error),
                        [cn.done]: (!!data),
                    }
                )}
                         name={data ?
                             "cloud-done-outline" :
                             "cloud-upload-outline"}/>
            </div>
            <div className={classNames(cn.LabelGroup)}>
                <p className={classNames("text text_color_gray", cn.Label)}>
                    {titleFile}
                </p>
            </div>
            {file && <div className={classNames(cn.SubmitGroup)}>
                <button className={classNames("button button_type_table")}
                        onClick={handleSubmitFile}>
                    Отправить
                </button>
            </div>}
            {error && <div className={classNames(cn.LabelGroup)}>
                <p className={classNames("text text_color_red", cn.Label)}>
                    {error}
                </p>
            </div>}
        </label>
    );
};


export default UserFile;

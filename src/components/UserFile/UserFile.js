import React, {useState} from 'react';
import classNames from "classnames";
import "react-loading-skeleton/dist/skeleton.css";
import IonIcon from "../IonIcon";
import {useUploadUserFileMutation} from "../../api/endpoints/UserFilesApi";
import useGetPassport from "../../hooks/useGetPassport";
import {getImgFromFile} from "../../utils/functions";
import cn from "./UserFile.module.scss"

const UserFile = ({className, fileId, fileName, label = "label"}) => {
    const {scanFile, errorPage, isLoadingPage} = useGetPassport(fileId);

    const [uploadFile, {error, isLoading}] = useUploadUserFileMutation();
    const [file, setFile] = useState(scanFile);
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
        formData.append("fileUserTypeId", fileId);
        formData.append("UserFile[file]", file);

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
                [cn.done]: !!file,
                [cn.disabled]: isLoading,
                [cn.error]: error
            }
        )}>
            <input className={classNames(cn.InputFile)} onChange={handleUploadFile}
                   type="file" accept="image/*"
                   hidden required/>
            <div className={classNames(cn.ImgGroup)}>
                {file ?
                    <img className={classNames(cn.ImgFile)} src={getImgFromFile(file)}/> :
                    <IonIcon className={classNames(cn.ImgPlaceholder, {
                            [cn.error]: (!!error),
                            [cn.done]: (!!file),
                        }
                    )}
                             name={"cloud-upload-outline"}/>
                }
            </div>
            <div className={classNames(cn.Footer)}>
                {!file && <p className={classNames("text text_color_gray", cn.Label)}>
                    {titleFile}
                </p>}
                {file && <div className={classNames(cn.SubmitGroup)}>
                    <button className={classNames("button button_type_main")}
                            onClick={handleSubmitFile}>
                        Отправить
                    </button>
                </div>}
                {error && <div className={classNames(cn.LabelGroup)}>
                    <p className={classNames("text text_color_red", cn.Label)}>
                        {error}
                    </p>
                </div>}
            </div>
        </label>
    );
};


export default UserFile;

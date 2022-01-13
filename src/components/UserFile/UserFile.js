import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import "react-loading-skeleton/dist/skeleton.css";
import IonIcon from "../IonIcon";
import {useUploadUserFileMutation} from "../../api/endpoints/UserFilesApi";
import useGetPassport from "../../hooks/useGetPassport";
import {getImgFromFile, getSrcBase64} from "../../utils/functions";
import cn from "./UserFile.module.scss"
import CircularProgress from "../CircularProgress";

const UserFile = ({className, fileId, typeId, label = "label"}) => {
    const {scan, isLoadingScan} = useGetPassport(fileId);
    const [uploadFile, {error, isLoading}] = useUploadUserFileMutation();
    const [file, setFile] = useState(getSrcBase64(scan));
    const [titleFile, setTitleFile] = useState();

    useEffect(() => setFile(getSrcBase64(scan)), [scan]);

    function handleUploadFile(e) {
        const input = e.target;
        if (!input) return;

        if (input.validity.valid) {
            const file = input.files[0];
            setFile(file);
            setTitleFile(file.name);
        } else {
            setTitleFile(null);
        }
    }

    function handleSubmitFile(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fileUserTypeId", typeId);
        formData.append("UserFile[file]", file);

        uploadFile(formData).unwrap()
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setTitleFile(null);
            });
    }

    return (
        <label className={classNames(cn.Wrapper, className, {
                [cn.done]: !!file,
                [cn.disabled]: (isLoading || isLoadingScan),
                [cn.error]: error
            }
        )}>
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
                {!titleFile && <p className={classNames("text text_color_gray", cn.Label)}>
                    {label}
                </p>}
                {titleFile && <div className={classNames(cn.SubmitGroup)}>
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
            <input className={classNames(cn.InputFile)} onChange={handleUploadFile}
                   type="file" accept="image/*"
                   hidden required/>
            <CircularProgress className={classNames(cn.Progress)} isLoading={(isLoading || isLoadingScan)}/>
        </label>
    );
};


export default UserFile;

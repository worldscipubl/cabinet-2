import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import Avatar from "../Avatar";
import {getImgFromFile} from "../../utils/functions";
import useGetAvatar from "../../hooks/useGetAvatar";
import {useSetUserAvatarMutation} from "../../api/endpoints/UserApi";
import cn from "./FieldAvatar.module.scss"

const FieldAvatar = ({className}) => {
    const {avatar, isLoadingAvatar} = useGetAvatar();
    const [uploadFile, {error}] = useSetUserAvatarMutation();
    const [isLoading, setLoading] = useState(isLoadingAvatar);
    const [file, setFile] = useState(avatar);
    const [uploading, setUploading] = useState(false);

    function handleUploadFile(e) {
        const input = e.target;
        if (!input?.validity.valid) return;

        const file = input.files[0];
        setFile(file);
        setUploading(true);
    }

    function submitFile() {
        setLoading(true);
        const formData = new FormData();
        formData.append("ChangeAvatar[avatar]", file);

        uploadFile(formData).unwrap()
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err);
                // TODO: Сделать вывод ошибки в snackBar
                setFile(avatar);
                setLoading(false);
            })
            .finally(() => {
                setUploading(false);
            })
    }

    useEffect(() => {
        setFile(avatar);
        setLoading(false);
    }, [avatar])

    return (
        <div className={classNames(cn.Wrapper, className, {[cn.isLoading]: isLoading})}>
            <Avatar className={classNames(cn.Avatar)} isLoading={isLoading}
                    img={getImgFromFile(file)}/>
            {
                uploading ?
                    <button className={classNames("button button_type_tabs", cn.UploadBtn)} onClick={submitFile}>
                        Загрузить фото
                    </button> :
                    <label className={classNames("button button_type_tabs", cn.UploadBtn)}>
                        <span>Изменить фото</span>
                        <input className={classNames(cn.Input)} type="file" accept="image/*" hidden
                               onChange={handleUploadFile}/>
                    </label>
            }
        </div>
    );
};

export default FieldAvatar;

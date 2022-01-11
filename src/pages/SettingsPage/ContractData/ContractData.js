import React, {useEffect} from 'react';
import {useGetUserDataQuery, useSetUserDataMutation, useSetUserPasswordMutation} from "../../../api/endpoints/UserApi";
import classNames from "classnames";
import Input from "../../../components/Input";
import CardHeadband from "../../../components/CardHeadband";
import {useGetUserFilesQuery} from "../../../api/endpoints/UserFilesApi";
import FormFieldContainer from "../../../components/FormFieldContainer";
import UserFile from "../../../components/UserFile";
import FormField from "../../../components/FormField";
import cn from "./ContractData.module.scss"

const fieldsContract = [
    {
        name: "passportSerialNumber",
        label: "Серия номер паспорта",
        placeholder: "Укажите серию и номер паспорта"
    },
    {
        name: "passportWhoIssued",
        label: "Кем выдан паспорт:",
        placeholder: "Укажите кем выдан паспорт"
    },
    {
        name: "passportDepartmentCode",
        label: "Паспорт. Код подразделения",
        placeholder: "Укажите код подразделения"
    },
    {
        name: "passportRegistration",
        label: "Паспорт. Прописка",
        placeholder: "Укажите прописку"
    },
    {
        name: "passportWhenIssued",
        label: "Когда выдан паспорт",
        placeholder: "Укажите когда выдан паспорт"
    }
];

const ContractData = () => {
    const {data, error, isLoading} = useGetUserDataQuery();
    const {data: dataUserFiles, error: errorUserFiles, isLoading: isLoadingUserFiles} = useGetUserFilesQuery();
    const [mutation, {error: errorSubmit} = {}] = useSetUserDataMutation();
    const [mutationPassword, {error: errorSubmitPassword} = {}] = useSetUserPasswordMutation();


    useEffect(() => {
        console.log(dataUserFiles);
    }, [dataUserFiles])

    const handleFieldSubmit = async (nameField, valueField) => {
        if (!valueField) return;

        const data = {[nameField]: valueField};
        return await mutation({data}).unwrap();
    };

    const handleFieldFileSubmit = async (data) => {
        if (!data) return;
        return await mutation({data, isFile: true}).unwrap();
    };

    return (
        <CardHeadband title="Данные для договора">
            <div className={classNames("brief-form", {})}>
                {fieldsContract.map((field) => (
                    <FormField
                        className="brief-form__input"
                        name={field?.name}
                        key={field?.name}
                        label={field?.label}
                        isLoading={isLoading}
                        description={field?.description}
                        defaultValue={data?.[field?.name]}
                        propsInput={{
                            type: field?.type || "text",
                            placeholder: field?.placeholder,
                            required: true,
                            multiple: !!(field?.type === "file")
                        }}
                        component={<Input/>}
                        handlers={{handleFieldSubmit, handleFieldFileSubmit}}
                    />
                ))}

                <FormFieldContainer className="brief-form__title"
                                    label="Загрузить скан паспорта"
                                    description="страница с фотографией и страница с пропиской">
                    <UserFile className={cn.UserFile} fileId={1} label="Загрузить страницу с фотографией"/>
                    <UserFile className={cn.UserFile} fileId={2} label="Загрузить страницу с пропиской"/>
                </FormFieldContainer>
            </div>
        </CardHeadband>
    );
};

export default ContractData;

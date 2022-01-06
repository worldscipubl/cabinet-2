import React, {useState} from 'react';
import CardHeadband from "../../../components/CardHeadband";
import FormFieldRow from "../../../components/FormFieldRow";
import Toggle from "../../../components/Toggle";

const NotificationSettings = () => {
    const [isNotify, setNotify] = useState(false);
    const [isEmailSub, setEmailSub] = useState(false);

    return (
        <CardHeadband title="Настройки уведомлений:">
            <FormFieldRow className="brief-form__title" label="Уведомления">
                <Toggle value={isNotify} setValue={setNotify}/>
            </FormFieldRow>
            <FormFieldRow className="brief-form__title"
                          label="Еmail подписка"
                          description="Получать уведомления по почте">
                <Toggle value={isEmailSub} setValue={setEmailSub}/>
            </FormFieldRow>
        </CardHeadband>
    );
};

export default NotificationSettings;

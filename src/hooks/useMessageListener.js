import {useEffect} from "react";
import {onMessage} from "firebase/messaging";
import {messaging} from "../firebase";

const useMessageListener = () => {
    useEffect(() => {
        const unsubscribe = onMessage(messaging,
            (payload) => {
                console.table(payload)
            });

        return () => unsubscribe();
    }, []);
}

export default useMessageListener;

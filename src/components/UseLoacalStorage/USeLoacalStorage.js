import { useState, useEffect } from "react";
// const CONTACTS = [
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ];

export default function UseLocalStorage(key, CONTACTS){
    const [state, setState] = useState(
        () => JSON.parse(window.localStorage.getItem(key)) ?? CONTACTS);

        useEffect(() => {
            window.localStorage.setItem(key, JSON.stringify(state));
          }, [key, state]);

    return [state, setState];
};
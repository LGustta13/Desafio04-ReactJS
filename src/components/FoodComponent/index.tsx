import { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

import api from '../../services/api';

export function Food(props) {

    const [isAvailable, setIsAvailable] = useState<Boolean>(false);

    async function handleToggleAvailable() {
        
        const food = [...props];
        setIsAvailable(true);

        await api.put(`/foods/${food.id}`, {
            ...food,
            available: isAvailable
        });
    }
}


// https://www.notion.so/Desafio-02-Refactoring-de-classes-e-typescript-4571541e7f8c4799bd191b6cfb53802c
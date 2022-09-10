import { useEffect, useState } from 'react';

// import Header from '../../components/HeaderClass';
import { Header } from '../../components/HeaderComponent';

// import Food from '../../components/FoodClass';
import { Food } from '../../components/FoodComponent';

import api from '../../services/api';

// import ModalAddFood from '../../components/ModalAddFoodClass';
import { ModalAddFood } from '../../components/ModalAddFoodComponent';

// import ModalEditFood from '../../components/ModalEditFoodClass';
import { ModalEditFood } from '../../components/ModalEditFoodComponent';

import { FoodsContainer } from './styles';

type FoodProps = {
  id: number,
  name: string,
  description: string,
  price: number,
  available: boolean,
  image: string
}

export function Dashboard() {

  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [editingFood, setEditingFood] = useState<FoodProps>({} as FoodProps);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {

    async function fetchData() {
      const response = await api.get('/foods');
      setFoods(response.data);
    };

    fetchData();
  });

  async function handleAddFood(food: FoodProps) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }

  };

  async function handleUpdateFood(food: FoodProps) {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food }
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  };

  function toggleModal() {
    setModalOpen(modalOpen => !modalOpen);
  };

  function toggleEditModal() {
    setEditModalOpen(editModalOpen => !editModalOpen);
  };

  function handleEditFood(food: FoodProps) {
    setEditingFood(food);
    setEditModalOpen(true);
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />

      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {
          foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))
        }
      </FoodsContainer>
    </>
  );
}
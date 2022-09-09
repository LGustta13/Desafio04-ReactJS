import { useRef } from 'react';

import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';

import { Modal } from '../ModalComponent';
// import Modal from '../ModalClass';

import Input from '../InputClass';
// import {Input} from '../InputComponent';

type FoodProps = {
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}

export type ModalEditFoodProps = {
  isOpen: boolean,
  setIsOpen: () => void,
  editingFood: FoodProps,
  handleUpdateFood: (food: FoodProps) => Promise<void>
}

export function ModalEditFood(props: ModalEditFoodProps) {

  const { isOpen, setIsOpen, editingFood, handleUpdateFood } = props;
  const formRef = useRef(null);

  async function handleSubmit(data: FoodProps) {
    handleUpdateFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
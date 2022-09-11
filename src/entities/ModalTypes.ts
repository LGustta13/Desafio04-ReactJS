export type FoodProps = {
    id: number,
    name: string,
    description: string,
    price: string,
    available: boolean,
    image: string
};

export type ModalEditFoodProps = {
  isOpen: boolean,
  setIsOpen: () => void,
  editingFood: FoodProps,
  handleUpdateFood: (food: FoodProps) => void
};

export type ModalAddFoodProps = {
  isOpen: boolean,
  setIsOpen: () => void,
  handleAddFood: (food: FoodProps) => Promise<void>
};

export type HandleFoodProps = {
  food: FoodProps,
  handleEditFood: (food: FoodProps) => void,
  handleDelete: (id: number) => void
}


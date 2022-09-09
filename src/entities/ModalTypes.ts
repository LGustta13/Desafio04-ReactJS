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
  handleUpdateFood: (food: FoodProps) => void
} 

export default FoodProps;


import { v4 as uuidv4 } from 'uuid';

const generateUID = (opción = null) => {
  try {
    const id = uuidv4();

    switch (opción) {
      case 'cart':
        return id.slice(0, 5);
      case 'reviews':
        return id.slice(0, 6);
      case 'message':
        return id.slice(0, 8);
      case 'order':
        return id.slice(0, 10);
      case 'product':
        return id.slice(0, 12);
      case 'order_item':
        return id.slice(0, 15);
      case 'payments':
        return id.slice(0, 20);
      default:
        return id.slice(0, 8);
    }
  } catch (err) {
    console.error('Error generating UID:', err);
    return null;
  }
};

export default generateUID;

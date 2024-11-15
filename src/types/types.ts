export type MenuType = {
    _id: string;
    slug: string;
    title: string;
    desc: string;
    img: string;
    color: string;
}[]

export type ProductType = {
    _id: string;
    title: string;
    desc?: string;
    img?: string;
    price: number;
    options?:{title: string; additionalPrice: number}[]
};

export type OrderType = {
    _id: string;
    userEmail: string;
    price: number;
    products: CartItemType[];
    // products: object[];
    status: string;
    createdAt: Date;
    intent_id?: String;
  };
  
  export type CartItemType = {
    _id: string;
    title: string;
    img?: string;
    price: number;
    optionTitle?: string;
    quantity: number;
  };
  
  export type CartType = {
    products: CartItemType[];
    totalItems: number;
    totalPrice: number;
  };
  
  export type ActionTypes = {
    addToCart:(item:CartItemType)=> void;
    removeFromCart:(item:CartItemType)=> void;
  }
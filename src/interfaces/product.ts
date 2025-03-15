export interface Iproduct {
    id:string|number,
    name:string,
    image:string,
    price:number,
    category: string;
    description: string; // Thêm trường mô tả ngắn
}

export interface IproductForm {
    name: string;
    image: string;
    price: number;
    description: string;
    categoryId: number; // Thêm categoryId vào đây
  }
  
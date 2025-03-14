export interface Iproduct {
    id:string|number,
    name:string,
    image:string,
    price:number,
    category: string;
    description: string; // Thêm trường mô tả ngắn
}

export type IproductForm = Omit<Iproduct,"id">
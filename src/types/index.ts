export type User = {
    username?: string;
    email?: string;
    phone?: string;
    role?: "admin" | "member";
    password?: string
    image?: string;
    id?: string | any;
    createdAt?: Date;
    updatedAt?: Date;
    type?: string
}
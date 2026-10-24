export interface ArtPicture {
    id: number
    title: string
    slug: string,
    description: string
    height: number
    width: number
    materials: string[]
    isCopied: boolean
    price: number
    isInStore: boolean
    image: string
} 

export interface User {
    id: number
    name: string
    email: string
    phone: string
    password: string
    role: "user" | "admin"
}




import { create } from "zustand";

interface FavoritesItem {
    id: number
    name: string
    price: number
}

interface FavoritesState {
    favorites: FavoritesItem[]
    addToFavorites: (item: FavoritesItem) => void
    removeFromFavorites: (id: number) => void
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
    favorites: [],
    addToFavorites: (item) => set(state => ({favorites: [...state.favorites, item]})),
    removeFromFavorites: (id) => set(state => ({favorites: state.favorites.filter(item => item.id !== id)})),
}))
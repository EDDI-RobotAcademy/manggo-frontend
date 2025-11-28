import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CategoryStore {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const useCategoryStore = create<CategoryStore>()(
    persist(
        (set) => ({
            selectedCategory: 'social', // 기본값

            setSelectedCategory: (category: string) =>
                set({ selectedCategory: category }),
        }),
        {
            name: 'category-storage', // localStorage의 키 이름
        }
    )
);

export default useCategoryStore;
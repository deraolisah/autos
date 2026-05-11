import teslaAvatar from "./tesla-avatar.png";

export const vehicles = [
    {
        id: 1,
        name: "Tesla Model Y",
        description: "qwertyuiop",
        price: 40000000,
        images: [
            "https://picsum.photos/400?random=1",
            "https://picsum.photos/400?random=2"
        ],
        avatar: teslaAvatar,
        brand: "Mercedes Benz",
        year: "2024",
        category: "Sport",
        listed: true,
        ratings: 3,
    },
    {
        id: 2,
        name: "G-Wagon",
        description: "qwertyuiop",
        price: 20000000,
        images: [
            "https://picsum.photos/400?random=3",
            "https://picsum.photos/400?random=4"
        ],
        avatar: "",
        brand: "Toyota",
        year: "2019",
        category: "Offroad",
        listed: true,
        ratings: 4
    },
    {
        id: 3,
        name: "BMW Xm",
        description: "qwertyuiop",
        price: 30000000,
        images: [
            "https://picsum.photos/400?random=5",
        ],
        avatar: "",
        brand: "BMW",
        year: "2022",
        category: "Luxury",
        listed: false,
        ratings: 5
    }
]
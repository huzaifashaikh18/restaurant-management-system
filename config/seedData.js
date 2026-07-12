const mongoose  = require('mongoose');
const MenuItem  = require('../model/MenuItem');
require('dotenv').config();

const menuItems = [

    // ─── CHEF'S SPECIAL ──────────────────────────────────────────────────────
    {
        name       : 'Truffle Mushroom Risotto',
        description: 'Creamy Arborio rice with wild truffle mushrooms, parmesan and fresh herbs',
        price      : 850,
        category   : 'Chefs Special',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVdPhyVMzfBf59AtIzDjl657yz50z0SmevnBeUN-ftlACGgV3nR_kzOHWC&s=10',
        isAvailable: true,
    },
    {
        name       : 'Grilled Norwegian Salmon',
        description: 'Fresh Norwegian salmon fillet grilled to perfection with lemon butter sauce',
        price      : 1200,
        category   : 'Chefs Special',
        image      : 'https://www.fromnorway.com/globalassets/recipes/salmon/grilled-salmon-with-salsaverde.jpg',
        isAvailable: true,
    },
    {
        name       : 'Grilled Turkish Chicken Wings',
        description: 'Juicy chicken wings marinated in Turkish spices, garlic, paprika',
        price      :  2500,
        category   : 'Chefs Special',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXgeil0bFVaBBnV4y80pa-e1XZVyHpDxaagVj2x6-iwCN_3ohCTIufyrI&s=10',
        isAvailable: true,
    },
    {
        name       : 'Wagyu Steak',
        description: 'Premium A5 Wagyu beef grilled medium rare with truffle butter and seasonal vegetables',
        price      : 3500,
        category   : 'Chefs Special',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWX6IYcHz7kNCv2t_sHa0Fcy3_-MkLl55vtmAQkyVtY5AHxuWc58jvbsY&s=10',
        isAvailable: true,
    },
    {
        name       : 'Royal Veg Platter',
        description: 'Chef curated selection of finest vegetarian delicacies from around the world',
        price      : 950,
        category   : 'Chefs Special',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhwjF6JFA4tW-dmzyK97ke63xgx455Dw-eFeuX2eY-QYhVpxIvd3OlHQ&s=10',
        isAvailable: true,
    },

    // ─── STARTERS ────────────────────────────────────────────────────────────
    {
        name       : 'tandoori chicken',
        description: 'Boneless chicken marinated in yogurt, spices, and grilled to perfection',
        price      : 380,
        category   : 'Starters',
        image      : 'https://sinfullyspicy.com/wp-content/uploads/2014/07/3-3.jpg',
        isAvailable: true,
    },
    {
        name       : 'Chicken Malai Tikka',
        description: 'Creamy chicken kebabs marinated with cheese, cream, and mild spices',
        price      : 280,
        category   : 'Starters',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSQtFxnPFXtDYigV7ygr7z917-x1BZyDOVvO4kp8ErWMsrt0Ctx8l_r7A&s=10',
        isAvailable: true,
    },
    {
        name       : 'Crispy Corn',
        description: 'Golden fried corn tossed with butter, herbs and spices',
        price      : 220,
        category   : 'Starters',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJllc3FFQLm6uU-yOEXZBxBSN2p8weC644qv9OHYKBs_jbTAQLklKmFWTg&s=10',
        isAvailable: true,
    },
    {
        name       : 'Spring Rolls',
        description: 'Crispy golden rolls stuffed with vegetables and served with sweet chili sauce',
        price      : 240,
        category   : 'Starters',
        image      : 'https://d1mxd7n691o8sz.cloudfront.net/static/recipe/recipe/2023-12/Vegetable-Spring-Rolls-2-1-906001560ca545c8bc72baf473f230b4_thumbnail_170.jpeg',
        isAvailable: true,
    },
    {
        name       : 'Cheese Balls',
        description: 'Gooey melted cheese stuffed in crispy golden breadcrumb coating',
        price      : 260,
        category   : 'Starters',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Ri8YxSlsqSUTHpU1oCZSchvSzIzyb_dc6E9NxD4shg&s=10',
        isAvailable: true,
    },
    {
        name       : 'Peri Peri Fries',
        description: 'Crispy golden fries tossed in spicy peri peri seasoning',
        price      : 180,
        category   : 'Starters',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrJrPQ11okWu63dIUo3slkFVBzMuTbaFQupcMhOwyeVIxtbYWG2_wX-D2N&s=10',
        isAvailable: true,
    },

    // ─── SOUPS ───────────────────────────────────────────────────────────────
    {
        name       : 'Tomato Basil Soup',
        description: 'Rich creamy tomato soup with fresh basil and a swirl of cream',
        price      : 180,
        category   : 'Soups',
        image      : 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Sweet Corn Soup',
        description: 'Thick sweet corn soup with vegetables and egg drop style',
        price      : 160,
        category   : 'Soups',
        image      : 'https://healthylivingjames.co.uk/wp-content/uploads/2025/03/Chicken-and-Sweetcorn-Soup-Square.jpg',
        isAvailable: true,
    },
    {
        name       : 'Manchow Soup',
        description: 'Spicy Indo-Chinese soup with vegetables and crispy noodles on top',
        price      : 170,
        category   : 'Soups',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsX5liDj9F6NOCF8jqZJSTXmb6Jt_2smtp8PeuXH-UM4_IXj2B6J5P6tU&s=10',
        isAvailable: true,
    },
    {
        name       : 'Cream of Mushroom',
        description: 'Velvety smooth mushroom soup with cream and herbs',
        price      : 200,
        category   : 'Soups',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XpICj4bKfKQv2QaX4aCDRch-x_6g9NkLsHWsf7Z9CQ&s=10',
        isAvailable: true,
    },

    // ─── SALADS ──────────────────────────────────────────────────────────────
    {
        name       : 'Caesar Salad',
        description: 'Crisp romaine lettuce with Caesar dressing, croutons and parmesan',
        price      : 320,
        category   : 'Salads',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5hXaM_GL-g-dmi-Rx8e9w87H3SaBcfkIkIksfF286Qg&s=10',
        isAvailable: true,
    },
    {
        name       : 'Greek Salad',
        description: 'Fresh cucumber, tomato, olives and feta cheese with olive oil dressing',
        price      : 280,
        category   : 'Salads',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5GtBGFky-8hhapI2vuHPrFlbmlZOgAezpyp9ezqMmaw&s=10',
        isAvailable: true,
    },
    {
        name       : 'Avocado Salad',
        description: 'Fresh avocado with mixed greens, cherry tomatoes and lemon vinaigrette',
        price      : 380,
        category   : 'Salads',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQQZattLb2xMTmqzDEZ08ccu299GtwjNArPJJrLz7VDwwtKgBaRXPP5TY&s=10',
        isAvailable: true,
    },

    // ─── GUJARATI ────────────────────────────────────────────────────────────
    {
        name       : 'Sev Tameta',
        description: 'Spicy tangy tomato curry topped with crispy sev — no onion no garlic',
        price      : 180,
        category   : 'Gujarati',
        image      : 'https://i.pinimg.com/736x/67/ef/ae/67efae2daa5ac742f72bec477c454b46.jpg',
        isAvailable: true,
    },
    {
        name       : 'Ringan Bharta',
        description: 'Roasted eggplant mashed with onion tomato and spices — Gujarati style',
        price      : 200,
        category   : 'Gujarati',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt7Xep4yKHFl4gRVVV1dsrkmZIPTu10dP6LcIwHOBwvl7_w60SG53SB-A&s=10',
        isAvailable: true,
    },
    {
        name       : 'Undhiyu',
        description: 'Traditional Gujarati winter delicacy with mixed vegetables and fenugreek dumplings',
        price      : 320,
        category   : 'Gujarati',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_21wixQnIw-XVIVn89h33KMCEFjvfCcY5EVg398S0kQ&s=10',
        isAvailable: true,
    },
    {
        name       : 'Lasaniya Bataka',
        description: 'Baby potatoes cooked in spicy garlic masala — Gujarati special',
        price      : 180,
        category   : 'Gujarati',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGBO2Bb6JRbvyBI3_jlDfEw0QZqOa7PpL-ccheOJsG0okYTPKq8JGsr0&s=10',
        isAvailable: true,
    },
    {
        name       : 'Gujarati Kadhi',
        description: 'Sweet and tangy yogurt curry tempered with mustard seeds and curry leaves',
        price      : 150,
        category   : 'Gujarati',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW1_youBMusuV62z9cQOU4PMFON7IIm945j5r1SUydYw&s=10',
        isAvailable: true,
    },
    {
        name       : 'Toor Dal',
        description: 'Slow cooked toor dal with ghee tempering and aromatic spices',
        price      : 160,
        category   : 'Gujarati',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH2V7cDvXm-BM2QLAAPfGCI819kOClRqlMizdn2j1IV7nLn-otFrVkxSo&s=10',
        isAvailable: true,
    },

    // ─── PUNJABI ─────────────────────────────────────────────────────────────
    {
        name       : 'Paneer Butter Masala',
        description: 'Soft paneer in rich creamy tomato gravy — restaurant style',
        price      : 420,
        category   : 'Punjabi',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwRO9423culvRaDaBBr4Rf0SOpclL3L0s94fC8C-_X5g&s=10',
        isAvailable: true,
    },
    {
        name       : 'Kadai Paneer',
        description: 'Paneer and bell peppers cooked in kadai masala with whole spices',
        price      : 400,
        category   : 'Punjabi',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4pDqnyOn5DZaB_O5BZIdhVYBIcGv1tQFEm2x_z6R3-w&s=10',
        isAvailable: true,
    },
    {
        name       : 'Dal Makhani',
        description: 'Slow cooked black lentils in rich buttery tomato gravy — 24 hour cook',
        price      : 380,
        category   : 'Punjabi',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRiK5jw8V9huVFwUqxNaJq61WE6p-Ac-JpYPUmmmTyFD5ch0snS90Md2kd&s=10',
        isAvailable: true,
    },
    {
        name       : 'Chole Masala',
        description: 'Spicy chickpea curry in tangy tomato onion gravy with whole spices',
        price      : 320,
        category   : 'Punjabi',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_sERKtKvive2uwKwMceaDFM8pIH6TDNrXwJZOhcRdxdxkDn_yK8A6L-a&s=10',
        isAvailable: true,
    },
    {
        name       : 'Malai Kofta',
        description: 'Soft paneer and potato dumplings in rich creamy cashew gravy',
        price      : 440,
        category   : 'Punjabi',
        image      : 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop',
        isAvailable: true,
    },

    // ─── CHINESE ─────────────────────────────────────────────────────────────
    {
        name       : 'Hakka Noodles',
        description: 'Stir fried noodles with vegetables in Indo-Chinese style',
        price      : 280,
        category   : 'Chinese',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyOwPEDZ3hWXDeq-pnuQoh65jVAb2bu1MDIjkxxzFL-w&s=10',
        isAvailable: true,
    },
    {
        name       : 'Schezwan Rice',
        description: 'Fried rice tossed in spicy schezwan sauce with vegetables',
        price      : 280,
        category   : 'Chinese',
        image      : 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Manchurian',
        description: 'Crispy vegetable balls in spicy tangy Manchurian gravy',
        price      : 300,
        category   : 'Chinese',
        image      : 'https://myfoodstory.com/wp-content/uploads/2021/10/Veg-Manchurian-FI-1.jpg',
        isAvailable: true,
    },
    {
        name       : 'Chili Paneer',
        description: 'Crispy paneer tossed with bell peppers in spicy Indo-Chinese sauce',
        price      : 340,
        category   : 'Chinese',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7mnoAa2pGd3TmpmZejtNE-vgG9Rb0P-gSJUxZ9g4tMA&s=10',
        isAvailable: true,
    },

    // ─── ITALIAN ─────────────────────────────────────────────────────────────
    {
        name       : 'Alfredo Pasta',
        description: 'Creamy white sauce pasta with parmesan and fresh herbs',
        price      : 380,
        category   : 'Italian',
        image      : 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Arrabbiata Pasta',
        description: 'Penne pasta in spicy tomato arrabbiata sauce with fresh basil',
        price      : 360,
        category   : 'Italian',
        image      : 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Garlic Bread',
        description: 'Toasted baguette with herb butter and roasted garlic',
        price      : 180,
        category   : 'Italian',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoAx2j-1dGVlHPrHL5127qHLBUcBd4_-ADxatDekZtDxJYf8iaVieM7Sk&s=10',
        isAvailable: true,
    },

    // ─── PIZZA ───────────────────────────────────────────────────────────────
    {
        name       : 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce fresh mozzarella and basil',
        price      : 380,
        category   : 'Pizza',
        image      : 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Farmhouse Pizza',
        description: 'Loaded with onion capsicum mushroom and black olives',
        price      : 420,
        category   : 'Pizza',
        image      : 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Four Cheese Pizza',
        description: 'Premium four cheese blend — mozzarella cheddar gouda and parmesan',
        price      : 520,
        category   : 'Pizza',
        image      : 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Paneer Tikka Pizza',
        description: 'Indian fusion pizza topped with tandoori paneer and mint chutney',
        price      : 480,
        category   : 'Pizza',
        image      : 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&auto=format&fit=crop',
        isAvailable: true,
    },

    // ─── BURGERS ─────────────────────────────────────────────────────────────
    {
        name       : 'Classic Veg Burger',
        description: 'Crispy veg patty with lettuce tomato onion and special sauce',
        price      : 220,
        category   : 'Burgers',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs2crwXiSeYyWF3b7OjMVJJ_p6q-7X5mD426LOLnIcqA&s=10',
        isAvailable: true,
    },
    {
        name       : 'Cheese Burger',
        description: 'Double cheese burger with crispy patty and special mayo sauce',
        price      : 280,
        category   : 'Burgers',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgxSv76_3d4__bXrCFLvkIdkPVCuFVB0q3pSsvkLJSaQ&s=10',
        isAvailable: true,
    },
    {
        name       : 'Crispy Paneer Burger',
        description: 'Crispy fried paneer patty with coleslaw and tangy sauce',
        price      : 300,
        category   : 'Burgers',
        image      : 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop',
        isAvailable: true,
    },

    // ─── RICE & BIRYANI ──────────────────────────────────────────────────────
    {
        name       : 'Veg Biryani',
        description: 'Fragrant basmati rice with vegetables and whole spices — dum style',
        price      : 320,
        category   : 'Rice & Biryani',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm0rqsn1NWCmmqcQGKXXcqRfS_tWWM2-aSInS4gYt_3gqjX9ubo4BVwJTR&s=10',
        isAvailable: true,
    },
    {
        name       : 'Hyderabadi Biryani',
        description: 'Authentic Hyderabadi dum biryani with saffron and caramelized onions',
        price      : 420,
        category   : 'Rice & Biryani',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpJc0iICTBA_EqL-XTGgcKmKrpAW_bKgN7JXhZFw8j9A&s=10',
        isAvailable: true,
    },
    {
        name       : 'Jeera Rice',
        description: 'Fragrant basmati rice tempered with cumin seeds and ghee',
        price      : 180,
        category   : 'Rice & Biryani',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh3oHzoTksjeuOMy9kMvuoQoDNlLGbOfxYnQ_kDwx9aA&s=10',
        isAvailable: true,
    },

    // ─── BREADS ──────────────────────────────────────────────────────────────
    {
        name       : 'Butter Naan',
        description: 'Soft leavened bread brushed generously with butter',
        price      : 60,
        category   : 'Breads',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Zyh75bhLzH4QJbQTlKibw-Rk6DcXDSWcTD5VLAX0SKHzUoHRpwxgDh1n&s=10',
        isAvailable: true,
    },
    {
        name       : 'Garlic Naan',
        description: 'Naan bread topped with roasted garlic and fresh coriander',
        price      : 80,
        category   : 'Breads',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25O-t_hxBZ9jsK0CiSivyQ3zDvR3Fta8bGWWrZxGzl-oP3grJND-8aECM&s=10',
        isAvailable: true,
    },
    {
        name       : 'Tandoori Roti',
        description: 'Whole wheat bread baked fresh in tandoor',
        price      : 40,
        category   : 'Breads',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR20AzNvf6oZi3FpvsYhvzyEmuo86TnyqyVaKQyLSX_JNSuFZaja_JyiK4&s=10',
        isAvailable: true,
    },
    {
        name       : 'Lachha Paratha',
        description: 'Flaky layered whole wheat paratha cooked on tawa with butter',
        price      : 70,
        category   : 'Breads',
        image      : 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&auto=format&fit=crop',
        isAvailable: true,
    },

    // ─── DESSERTS ────────────────────────────────────────────────────────────
    {
        name       : 'Gulab Jamun',
        description: 'Soft milk solid balls soaked in rose flavored sugar syrup — served warm',
        price      : 120,
        category   : 'Desserts',
        image      : 'https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2016/10/gulab-jamun-using-mix.jpg?w=1200&ssl=1',
        isAvailable: true,
    },
    {
        name       : 'Rasmalai',
        description: 'Soft cottage cheese dumplings in sweetened saffron milk',
        price      : 150,
        category   : 'Desserts',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_EBVICoLQn8DWlrbO7T47enRA8allUMeHoGcqIzWqgX4oKPt8mzaXeL8&s=10',
        isAvailable: true,
    },
    {
        name       : 'Brownie with Ice Cream',
        description: 'Warm chocolate brownie with vanilla ice cream and chocolate sauce',
        price      : 280,
        category   : 'Desserts',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlUled4g86_CIuDGBngmTUV16mWeQNtJdM65KsE-PCyrZfjLjfqoxW7FN5&s=10',
        isAvailable: true,
    },
    {
        name       : 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten chocolate center and vanilla ice cream',
        price      : 320,
        category   : 'Desserts',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDZ-pbuWruYn9L8dof4b4ZQx4ephhnnPQb7lTbjTZWKA&s=10',
        isAvailable: true,
    },
    {
        name       : 'Cheesecake',
        description: 'Creamy New York style cheesecake with strawberry compote',
        price      : 300,
        category   : 'Desserts',
        image      : 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&auto=format&fit=crop',
        isAvailable: true,
    },

    // ─── MOCKTAILS ───────────────────────────────────────────────────────────
    {
        name       : 'Blue Lagoon',
        description: 'Refreshing blue curacao mocktail with lemon and soda',
        price      : 180,
        category   : 'Mocktails',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvA50jdEbSFmG-bh0r5IrsvGlHgvKJAImY-W6oBacQOrVZqBJJwv2DGc&s=10',
        isAvailable: true,
    },
    {
        name       : 'Virgin Mojito',
        description: 'Fresh mint lime and soda — classic refreshing mocktail',
        price      : 160,
        category   : 'Mocktails',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxve_ER1I5PYDZSQRnasSf1PM4b3Cth2FqvI2F8y5mEw&s=10',
        isAvailable: true,
    },
    {
        name       : 'Strawberry Mojito',
        description: 'Fresh strawberries blended with mint lime and sparkling water',
        price      : 180,
        category   : 'Mocktails',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfLp2SHQX-7rB-tnMFz0WiJCfILAADZuaT-Yh9Xor7gXToNl72Sak3ufJi&s=10',
        isAvailable: true,
    },
    {
        name       : 'Watermelon Blast',
        description: 'Fresh watermelon juice with mint and a hint of lime',
        price      : 160,
        category   : 'Mocktails',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKgxAd1bAxXNhCMIPoC7T8uUhTLCWVc_3AIfhBhSUgt6uh8-OZYCowOduW&s=10',
        isAvailable: true,
    },

    // ─── COFFEE ──────────────────────────────────────────────────────────────
    {
        name       : 'Cappuccino',
        description: 'Espresso with steamed milk foam — Italian classic',
        price      : 180,
        category   : 'Coffee',
        image      : 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Cold Coffee',
        description: 'Chilled blended coffee with ice cream and whipped cream',
        price      : 200,
        category   : 'Coffee',
        image      : 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Latte',
        description: 'Smooth espresso with steamed milk — perfect balance',
        price      : 200,
        category   : 'Coffee',
        image      : 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&auto=format&fit=crop',
        isAvailable: true,
    },

    // ─── FRESH JUICE ─────────────────────────────────────────────────────────
    {
        name       : 'Orange Juice',
        description: 'Freshly squeezed orange juice — no added sugar',
        price      : 120,
        category   : 'Fresh Juice',
        image      : 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Mango Lassi',
        description: 'Thick creamy yogurt drink blended with fresh Alphonso mangoes',
        price      : 150,
        category   : 'Fresh Juice',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrV3FkDaKqVS3Ttsdf5rijQTs4nefVES8ixG-k2l3JYJM08zG3AmI6jKg&s=10',
        isAvailable: true,
    },
    {
        name       : 'Watermelon Juice',
        description: 'Fresh chilled watermelon juice with mint',
        price      : 100,
        category   : 'Fresh Juice',
        image      : 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&auto=format&fit=crop',
        isAvailable: true,
    },

    // ─── ICE CREAM ───────────────────────────────────────────────────────────
    {
        name       : 'Belgian Chocolate',
        description: 'Rich creamy Belgian chocolate ice cream with chocolate chips',
        price      : 180,
        category   : 'Ice Cream',
        image      : 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Vanilla',
        description: 'Classic creamy vanilla ice cream with Madagascar vanilla beans',
        price      : 120,
        category   : 'Ice Cream',
        image      : 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        name       : 'Mango Ice Cream',
        description: 'Fresh Alphonso mango flavored ice cream — seasonal special',
        price      : 150,
        category   : 'Ice Cream',
        image      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdqE6csV79l44dGJ3ZUI-3jcBIFkPjOu_89ZNzIWYRQFXKaZ3kMNZ4CfMzy-rLxCLNg7yqX1wU3TUcVVyuMMvvIYdvTXeGrV6EZoe41w&s=10',
        isAvailable: true,
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        await MenuItem.deleteMany({});
        await MenuItem.insertMany(menuItems);
        console.log(`${menuItems.length} menu items seeded successfully!`);
        process.exit();
    } catch (err) {
        console.error(' Seed error:', err.message);
        process.exit(1);
    }
};

seedDB();
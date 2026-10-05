import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to clean air.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-vera-3283084_1280.jpg", description: "Purifies air and soothes skin.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2015/07/02/20/37/lavender-829555_1280.jpg", description: "Calming scent.", cost: "$16" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2018/01/08/17/58/jasmine-3070020_1280.jpg", description: "Sweet floral fragrance.", cost: "$22" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Fresh herbal aroma.", cost: "$12" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/03/17/59/mint-1119881_1280.jpg", description: "Invigorating scent.", cost: "$8" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2021/09/20/06/55/eucalyptus-6640026_1280.jpg", description: "Refreshing aroma.", cost: "$18" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/05/23/16/23/lemon-balm-2337728_1280.jpg", description: "Citrus scent.", cost: "$10" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://cdn.pixabay.com/photo/2020/05/12/16/14/zz-plant-5163777_1280.jpg", description: "Thrives on neglect.", cost: "$25" },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/pothos-3816942_1280.jpg", description: "Tolerates low light.", cost: "$12" },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2020/03/24/09/48/plant-4963503_1280.jpg", description: "Extremely durable.", cost: "$28" },
        { name: "Succulent Mix", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", description: "Requires minimal water.", cost: "$15" },
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2017/09/16/16/09/jade-plant-2755943_1280.jpg", description: "Symbol of good luck.", cost: "$14" },
        { name: "Chinese Evergreen", image: "https://cdn.pixabay.com/photo/2021/01/29/14/41/aglaonema-5961201_1280.jpg", description: "Adapts to low light.", cost: "$22" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#4CAF50', color: 'white', alignItems: 'center' }}>
        <h2>Paradise Nursery</h2>
        <div style={{ display: 'flex', gap: '20px', cursor: 'pointer', fontSize: '18px' }}>
          <span onClick={() => setShowCart(false)}>Plants</span>
          <span onClick={() => setShowCart(true)}>🛒 Cart ({totalCartCount})</span>
        </div>
      </nav>

      {!showCart ? (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h2 style={{ color: '#2e7d32', borderBottom: '2px solid #2e7d32' }}>{categoryObj.category}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
                {categoryObj.plants.map((plant, plantIndex) => (
                  <div key={plantIndex} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '220px', textAlign: 'center' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><strong>{plant.cost}</strong></p>
                    <button 
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                      style={{ padding: '8px 12px', backgroundColor: addedToCart[plant.name] ? '#ccc' : '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer' }}>
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;

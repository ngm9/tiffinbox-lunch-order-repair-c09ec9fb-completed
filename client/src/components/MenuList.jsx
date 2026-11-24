import { useEffect, useState } from 'react';

export default function MenuList({ selectedDishId, onSelectDish }) {
  const [vegOnly, setVegOnly] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


    async function loadMenu() {
      setLoading(true);
      setError('');
      try {
        const url = vegOnly ? '/api/menu?veg=true' : '/api/menu';
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Failed to load menu');
        }
        const data = await res.json();
        setDishes(data);
      } catch (err) {
        setError('Could not load the menu. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    async function loadMenu(onlyVeg = vegOnly) {
      setLoading(true);
      setError('');
      try {
        const url = onlyVeg ? '/pi/menu?veg=true' : '/api/menu';
        const res = await fetch(url);
        if(!res.ok) {
          throw new Error('Failedto laod menu');
        }
        const data = await res.json();
        setDishes(data);
       } catch (err){
        setError('Could not load the menu. Please try again.');
       } finally {
        setLoading(false);
       }
        }
        useEffect(() =>{
          loadMenu(vegOnly);
     }, [vegOnly]);

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <div>
      <label className="veg-toggle">
        <input
          type="checkbox"
          checked={vegOnly}
          onChange={(e) => setVegOnly(e.target.checked)}
        />
        Veg only
      </label>
      <ul className="menu">
        {dishes.map((dish) => (
          <li key={dish.id}>
            <button
              type="button"
              className={dish.id === selectedDishId ? 'dish selected' : 'dish'}
              onClick={() => onSelectDish(dish.id)}
            >
              {dish.name} — ₹{dish.price} {dish.isVeg ? '(veg)' : '(non-veg)'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

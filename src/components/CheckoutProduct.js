import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
}) {

    const dispatch = useDispatch();

    const addItemToBasket = () => {
        const product = {
          id,
          title,
          price,
          rating,
          description,
          category,
          image,
          hasPrime,
        };
        dispatch(addToBasket(product));
      };

      const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }));
      };
  return (
    <div className="grid grid-cols-5">
      <Image
        src={image}
        width={200}
        height={200}
        objectFit="contain"
        //   className="w-auto h-auto object-contain"
      />

      {/* Middle section */}
      <div className=" flex justify-between flex-col col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
        {Array(rating)
            .fill()
            .map((i, index) => (
              <StarIcon key={index} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs mt-2 mb-2 line-clamp-3 text-justify">
          {description}
        </p>

        <Currency quantity={price} currency="GBP" />

        {hasPrime && (
        <div className=" flex items-center space-x-2 -mt-5">
          <img
            loading="lazy"
            className="w-12 my-4"
            src="https://www.logotypes101.com/logos/875/A41B7A0C2125D3C1F6DDDE56C1203C77/amazon_prime_icon.png"
            alt="prime"
          />
          
        </div>
      )}
      </div>


      {/* right */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button mt-auto" onClick={addItemToBasket}>
          Add to Basket{" "}
        </button>
        <button className="button mt-auto" onClick={removeItemFromBasket}>
          {" "}
          Remove from Basket{" "}
        </button>
      </div>

    </div>
  );
}

export default CheckoutProduct;
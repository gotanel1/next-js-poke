"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
function PokeInfo() {
  const params = useParams();

  const [poke, setPoke] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchPokeDetail = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.id}`
        );
        const pokeData = await response.json();

        setPoke(pokeData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchPokeDetail();
  }, []);

  console.log(poke);

  return (
    <div className="p-24">
      <Link
        href={`/`}
        className="bg-blue-500 p-3 rounded text-white shadow-md "
      >
        Back to Page
      </Link>
      <div className="flex justify-center items-center mt-10 text-center">
        <div className="shadow-md p-10 rounded-md">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h3 className="text-3xl">{poke.name}</h3>

              <Image
                className="mx-auto text-center"
                src={poke.sprites?.other.dream_world.front_default}
                width={200}
                height={200}
                alt={poke.name}
              />
              <div className="mt-5">
                <p className="my-3">Weight : {poke.weight}</p>
                <p className="my-3">
                  Abilities :
                  {poke.abilities?.map((val, index) => (
                    <span
                      className="bg-gray-300 p-1 rounded-md mx-1"
                      key={val.ability.name}
                    >
                      {val.ability.name}
                    </span>
                  ))}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokeInfo;

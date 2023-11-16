import Image from "next/image";
import React from "react";

const ElFooter = () => {
  return (
    <div className="flex justify-center items-center flex-col py-5 mt-40 bg-base-100 text-neutral-content border-t-2 border-base-content">
      <Image src="/LogoDDa.png" alt="Logo" width={300} height={300} priority />

      <p className="text-center">
        Industria 100% URUGUAYA
        <br />
        Promoviendo la tecnologia desde 1992
      </p>
    </div>
  );
};

export default ElFooter;

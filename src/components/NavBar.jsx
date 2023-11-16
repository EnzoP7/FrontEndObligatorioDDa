"use client";
import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NavBar = () => {
  // const router = useRouter();

  return (
    <div className="navbar bg-base-100 border-b-2 border-base-content">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <Link href={"/"}>
              <p>Inicio</p>{" "}
            </Link>

            <Link href={"/products"}>
              <p>Producto</p>{" "}
            </Link>

            <Link href={"/users"}>Usuarios </Link>

            <Link href={"/ventas"}>Ventas </Link>
          </ul>
        </div>
        <Image
          src="/LogoDDa.png"
          width={200}
          height={200}
          alt="logo"
          priority
        />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-3xl font-semibold">
          <li>
            <Link href={"/"}>
              <p>Inicio</p>{" "}
            </Link>
          </li>

          <li>
            <Link href={"/products"}>
              <p>Producto</p>{" "}
            </Link>
          </li>
          <li>
            <Link href={"/users"}>Usuarios </Link>
          </li>
          <li>
            <Link href={"/ventas"}>Ventas </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;

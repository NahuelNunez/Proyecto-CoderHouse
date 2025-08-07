"use client";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";

export default function FailedPayment() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <Card className="w-full max-w-md text-center p-8 shadow-lg rounded-xl border-4 border-red-600">
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-2">
            <XCircle className="mx-auto h-20 w-20 text-red-500" />
            <h1 className="text-4xl font-extrabold text-red-500">
              ¡Pago Fallido!
            </h1>
            <p className="text-lg text-gray-500 font-poppins">
              Lo sentimos, tu pago no pudo ser procesado.
            </p>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          <p className="text-center text-gray-500 font-poppins">
            Por favor, verifica los datos de tu tarjeta o intenta con otro
            método de pago.
          </p>
          <Link
            to="/"
            className="bg-red-600 text-white text-center py-2 px-2 rounded-full hover:bg-red-500 font-poppins"
          >
            Volver al Inicio
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}

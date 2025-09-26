"use client";

import React, { useState } from "react";
import {
  Clock,
  Plane,
  MoveRight,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Backpack,
} from "lucide-react";
import type {
  FlightResult,
  AirportListResult,
  AirlineListResult,
} from "@/types";
import { cn, formatPrice } from "@/utils";

function FlightCard({
  flight,
  airportList,
  airlineList,
  index,
}: {
  flight: FlightResult;
  airportList: AirportListResult;
  airlineList: AirlineListResult;
  index: number;
}) {
  const isAvailable = (flight.availableSeats ?? 0) > 0;
  const mainSegment = flight.segments?.[0] ?? {
    airline: "-",
    flightNumber: "-",
  };
  const isMultiSegment = (flight.segments?.length ?? 0) > 1;

  const departureTime = new Date(flight.departureDatetime);
  const arrivalTime = new Date(flight.arrivalDatetime);

  const durationStr = `${flight.duration?.hours ?? 0}sa ${
    flight.duration?.minutes ?? 0
  }dk`;

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className={cn(
        "relative border border-gray-200 rounded-lg p-2 transition-all duration-200 animate-slide-up",
        "hover:shadow-md hover:border-gray-300 bg-white tracking-tighter",
        showDetails && "bg-[#f8faf9]"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      role="article"
      aria-labelledby={`flight-${flight.id}-title`}
    >
      <div className="space-y-2">
        {/* Airline and Flight Info   */}
        <div className="flex flex-row flex-wrap items-center justify-between   pb-2 ">
          {/* Sol: Logo ve Firma */}
          <div className="flex flex-col font-semibold text-gray-600 text-sm min-w-[100px]">
            <div className="flex flex-row items-center mb-2 gap-2">
              <div
                className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center"
                aria-hidden
              >
                <Plane className="w-4 h-4 text-white" />
              </div>

              <div className="">
                {airlineList[mainSegment.airline]?.name ?? mainSegment.airline}
              </div>
            </div>
            <div className="">{mainSegment.flightNumber}</div>
            <div className=" mt-1">{flight.providerPackage?.name}</div>
            <div className="flex text-xs font-normal ">
              <Backpack className="w-4 h-4 bg-white " aria-hidden /> 1x
              {flight.viewBaggage?.quantity ?? "-"} kg
            </div>
          </div>

          {/* Orta: Kalkış - Süre - Aktarma - Varış */}
          <div className="flex flex-col items-center justify-center ">
            <div className="flex items-center justify-between xs:gap-2 md:gap-9 text-gray-600">
              {/* Departure */}
              <div className="text-center">
                <div className="text-lg font-bold ">
                  {departureTime.toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-sm font-medium">
                  {flight.departureAirport}
                </div>
                <div className="text-xs text-gray-500">...</div>
              </div>

              {/* Flight Route */}
              <div className="flex flex-col  space-y-2 items-center justify-center px-4">
                <div className="relative flex flex-col items-center space-x-2 text-gray-600">
                  <div className="flex items-center justify-center text-xs">
                    <span>Son</span>
                    <span className="text-lg font-bold text-red-500 mx-0.5 animate-[blink_0.5s_step-start_infinite]">
                      {mainSegment.availableSeats}
                    </span>
                    <span>Koltuk</span>
                  </div>
                  <div className="flex flex-row items-center">
                    <Clock className="w-3 h-3 mr-1" aria-hidden />
                    <div className="text-xs font-medium"> {durationStr}</div>
                  </div>
                </div>
                <div className="flex-1 h-px bg-gray-300 ">
                  <MoveRight className="  w-4 h-4 bg-white " aria-hidden />
                </div>
                {/* Detay Butonu */}
                <div className="">
                  <div className="flex items-center space-x-1">
                    <span
                      className={`text-xs ${
                        isMultiSegment ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {isMultiSegment
                        ? `${(flight.segments?.length ?? 1) - 1} Aktarma`
                        : "Direkt Uçuş"}{" "}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="px-3 py-1 text-xs text-blue-500 "
                    onClick={() => setShowDetails((v) => !v)}
                  >
                    Detay
                    {showDetails ? (
                      <ChevronUp className="inline w-4 h-4 text-blue-500" />
                    ) : (
                      <ChevronDown className="inline w-4 h-4 text-blue-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Arrival */}
              <div className="text-center ">
                <div className="text-lg font-bold ">
                  {arrivalTime.toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-sm font-medium">
                  {flight.arrivalAirport}
                </div>
                <div className="font-bold text-xs text-gray-500">...</div>
              </div>
            </div>
          </div>

          {/* Sağ: Fiyat ve Seç Butonu */}
          <div className="flex flex-col items-end min-w-[100px]">
            <div className="relative text-lg  font-extrabold text-gray-500">
              <span className="pr-5.5">{formatPrice(flight.viewPrice)}</span>
              <span className="absolute whitespace-nowrap right-1 top-1 text-xs">
                TL
              </span>
            </div>
            <button
              disabled={!isAvailable}
              className={cn(
                "flex  justify-between items-center px-3 py-1.5 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
                isAvailable
                  ? "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              )}
            >
              <span className="mr-2 text-sm font-bold">Seç</span>
              <ChevronRight className="  w-4 h-4  " aria-hidden />
            </button>
          </div>
        </div>

        {/* Detay Paneli */}
        {showDetails && (
          <div className="my-3 text-xs text-gray-700">
            {(flight.segments ?? []).map((seg, idx) => {
              const depDate = new Date(seg.departureDatetime);
              const arrDate = new Date(seg.arrivalDatetime);
              // Bekleme süresi hesaplama (sadece aktarmalı ve son segment değilse)
              let layover = null;
              if (isMultiSegment && idx < flight.segments.length - 1) {
                const nextDep = new Date(
                  flight.segments[idx + 1].departureDatetime
                );
                const diffMs = nextDep.getTime() - arrDate.getTime();
                const diffMin = Math.floor(diffMs / 60000);
                const hours = Math.floor(diffMin / 60);
                const minutes = diffMin % 60;
                layover = { hours, minutes };
              }
              return (
                <div key={idx} className="mb-3">
                  <div className="mb-1">
                    {airlineList[seg.airline]?.name ?? seg.airline} Uçuş:{" "}
                    {seg.flightNumber} Sınıf: {seg.class ?? "-"}
                  </div>
                  <div className="flex flex-col pl-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-600" />
                      <span>
                        {depDate.toLocaleTimeString("tr-TR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {depDate.toLocaleDateString("tr-TR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          weekday: "long",
                        })}{" "}
                        -{" "}
                        {airportList[seg.departureAirport]?.city_name ??
                          seg.departureAirport}
                        ,{" "}
                        {airportList[seg.departureAirport]?.name ??
                          seg.departureAirport}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-transparent border border-green-700" />
                      <span>
                        {arrDate.toLocaleTimeString("tr-TR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {arrDate.toLocaleDateString("tr-TR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          weekday: "long",
                        })}{" "}
                        -{" "}
                        {airportList[seg.arrivalAirport]?.city_name ??
                          seg.arrivalAirport}
                        ,{" "}
                        {airportList[seg.arrivalAirport]?.name ??
                          seg.arrivalAirport}
                      </span>
                    </div>
                  </div>
                  {/* Aktarma bekleme süresi */}
                  {layover && (
                    <div className="flex items-center gap-2 my-2 text-gray-700 ">
                      <span
                        className="flex-1 border-1"
                        style={{
                          borderImage:
                            "repeating-linear-gradient(to right, gray 0, gray 3px, transparent 3px, transparent 6px) 1",
                        }}
                      />
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-xs">
                        Aktarma{" "}
                        <b>
                          {layover.hours > 0 ? `${layover.hours}sa` : ""}{" "}
                          {layover.minutes > 0 ? `${layover.minutes}dk` : ""}
                        </b>{" "}
                        bekleme süresi
                      </span>
                      <span
                        className="flex-1 border-1"
                        style={{
                          borderImage:
                            "repeating-linear-gradient(to right, gray 0, gray 3px, transparent 3px, transparent 6px) 1",
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(FlightCard);
